# ビルド環境
FROM node:19.9-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 本番環境
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /etc/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
