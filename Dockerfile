FROM node as build
COPY . /front-end/
WORKDIR /front-end
RUN npm install
RUN npm run build



FROM nginx
COPY --from=build /front-end/dist/angular-security /usr/share/nginx/html
EXPOSE 80








