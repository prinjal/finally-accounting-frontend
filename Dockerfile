# Step 1: Build the React/Vite application
FROM node:16 as build

WORKDIR /app

COPY package*.json ./

RUN npm install --frozen-lockfile

COPY . .

RUN npm run build

# Step 2: Set up nginx to serve the static files
FROM nginx:stable-alpine as production

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 5173

# Customize default nginx configuration
RUN sed -i 's/listen  .*/listen 5173;/g' /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
