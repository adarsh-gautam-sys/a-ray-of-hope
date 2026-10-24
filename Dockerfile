# ── Stage 1: build the React app ──────────────────────────────────────
FROM node:22-slim AS web
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY index.html vite.config.js postcss.config.js tailwind.config.js ./
COPY public ./public
COPY src ./src
RUN npm run build

# ── Stage 2: slim runtime (Express API + built static files) ──────────
FROM node:22-slim
ENV NODE_ENV=production
WORKDIR /app
COPY server/package.json server/package-lock.json ./server/
RUN cd server && npm ci --omit=dev
COPY server ./server
COPY --from=web /app/dist ./dist
USER node
EXPOSE 8080
CMD ["node", "server/index.js"]
