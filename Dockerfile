# Node stage
FROM node:20-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
# RUN npm run build --prod // Angular v12+. Angular automáticamente optimiza en builds de producción por eso lo quitamos.

# Nginx stage
FROM nginx:alpine AS production-stage
# Elimina la página por defecto
# RUN rm -rf /usr/share/nginx/html/*
COPY --from=build-stage /app/dist/frontend/browser /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
