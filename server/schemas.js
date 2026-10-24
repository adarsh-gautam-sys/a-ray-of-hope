import { z } from 'zod'

// Keep these in sync with the option lists in src/components/VolunteerCTA.jsx
export const INTERESTS = [
  'Teaching',
  'Event Support',
  'Fundraising',
  'Digital Marketing',
  'Photography',
  'Research',
]
export const AVAILABILITY = ['Weekends', 'Remote / Online', 'Full-time', 'One-day Events']
export const PAYMENT_METHODS = ['UPI', 'Card', 'Net Banking']

export const MIN_DONATION_INR = 100
export const MAX_DONATION_INR = 500000

const email = z.string().trim().toLowerCase().email().max(254)
const name = z.string().trim().min(1).max(100)

const pickList = (allowed) =>
  z
    .array(z.enum(allowed))
    .min(1)
    .max(allowed.length)
    .transform((list) => [...new Set(list)])

export const volunteerSchema = z.object({
  name,
  email,
  interests: pickList(INTERESTS),
  availability: pickList(AVAILABILITY),
})

export const donationSchema = z.object({
  name,
  email,
  amount: z.number().int().min(MIN_DONATION_INR).max(MAX_DONATION_INR),
  recurring: z.boolean().default(false),
  method: z.enum(PAYMENT_METHODS).optional(),
})

export const subscribeSchema = z.object({ email })

export const contactSchema = z.object({
  name,
  email,
  message: z.string().trim().min(10).max(2000),
})
