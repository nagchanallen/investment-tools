FROM --platform=$BUILDPLATFORM node:21.2 As builder

WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn

COPY . .
RUN yarn build

FROM nginx:1.25.3-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
