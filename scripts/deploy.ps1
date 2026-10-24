<#
  Deploys A Ray of Hope (React + Express API) to Cloud Run with Firestore.
  Usage:  ./scripts/deploy.ps1 -ProjectId my-ngo-project
  Optional: -Region asia-south1 -NotifyTo team@example.org -SmtpUrl "smtps://user:pass@smtp.example.com"
  Safe to re-run: every step is idempotent.
#>
param(
  [Parameter(Mandatory)][string]$ProjectId,
  [string]$Region = 'asia-south1',
  [string]$Service = 'a-ray-of-hope',
  [string]$NotifyTo,
  [string]$MailFrom,
  [string]$SmtpUrl
)
$ErrorActionPreference = 'Continue' # native exit codes are checked explicitly by Run
$sa = "arayofhope-api@$ProjectId.iam.gserviceaccount.com"

function Run { & $args[0] $args[1..($args.Length - 1)]; if ($LASTEXITCODE -ne 0) { throw "failed: $args" } }

Write-Host '1/5 Enabling APIs'
Run gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com firestore.googleapis.com secretmanager.googleapis.com --project $ProjectId

Write-Host '2/5 Firestore database (skipped if it exists)'
$null = gcloud firestore databases describe --project $ProjectId 2>$null
if ($LASTEXITCODE -ne 0) { Run gcloud firestore databases create --location $Region --project $ProjectId }

Write-Host '3/5 Runtime service account (least privilege: Firestore only)'
$null = gcloud iam service-accounts describe $sa --project $ProjectId 2>$null
if ($LASTEXITCODE -ne 0) { Run gcloud iam service-accounts create arayofhope-api --display-name 'A Ray of Hope API' --project $ProjectId }
Run gcloud projects add-iam-policy-binding $ProjectId --member "serviceAccount:$sa" --role roles/datastore.user --condition None --quiet | Out-Null

$deploy = @('run', 'deploy', $Service, '--source', '.', '--project', $ProjectId, '--region', $Region,
  '--service-account', $sa, '--allow-unauthenticated', '--max-instances', '3', '--memory', '512Mi')
$envVars = @('NODE_ENV=production')
if ($NotifyTo) { $envVars += "NOTIFY_TO=$NotifyTo" }
if ($MailFrom) { $envVars += "MAIL_FROM=$MailFrom" }
$deploy += @('--set-env-vars', ($envVars -join ','))

if ($SmtpUrl) {
  Write-Host '4/5 Storing SMTP_URL in Secret Manager'
  $null = gcloud secrets describe smtp-url --project $ProjectId 2>$null
  if ($LASTEXITCODE -ne 0) { Run gcloud secrets create smtp-url --replication-policy automatic --project $ProjectId }
  $SmtpUrl | gcloud secrets versions add smtp-url --data-file - --project $ProjectId
  Run gcloud secrets add-iam-policy-binding smtp-url --member "serviceAccount:$sa" --role roles/secretmanager.secretAccessor --project $ProjectId | Out-Null
  $deploy += @('--set-secrets', 'SMTP_URL=smtp-url:latest')
} else { Write-Host '4/5 No -SmtpUrl given: emails will be logged, not sent' }

Write-Host '5/5 Building and deploying'
Run gcloud @deploy
Run gcloud run services describe $Service --project $ProjectId --region $Region --format 'value(status.url)'
