# Install dependencies only when needed
# FROM node:18 AS deps
# WORKDIR /app
# COPY . .
# RUN yarn --frozen-lockfile && yarn build:stg-export

# nginx
FROM nginx:alpine AS runner
WORKDIR /app
# COPY --from=deps /app/out ./
# COPY --from=deps /app/next-routes.conf /etc/nginx/conf.d/custom/
COPY ./next-routes.conf /etc/nginx/custom/
COPY ./nginx.conf /etc/nginx/
COPY ./default.conf /etc/nginx/conf.d/
# COPY ./gzip.conf /etc/nginx/conf.d/
COPY ./public ./
RUN rm -rf ./_next && rm -rf ./fonts

EXPOSE 8080
ENV PORT 8080

CMD nginx -g "daemon off;"
