FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY <<EOF /etc/nginx/conf.d/default.conf
server {
  listen 80;
  root /usr/share/nginx/html;
  index index.html index.htm;
  
  location / {
    try_files \$uri \$uri/ /index.html;
  }
  
  location /api {
    proxy_pass http://backend:5000;
    proxy_set_header Host \$host;
    proxy_set_header X-Real-IP \$remote_addr;
  }
}
EOF

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
