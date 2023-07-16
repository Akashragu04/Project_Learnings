FROM node:14.21.1  as node
ARG TAG
ARG REACT_APP_API_URL
ARG REACT_APP_WEBSITE_NAME
WORKDIR /landingapp
COPY . /landingapp
ENV TAG=${TAG}
ENV REACT_APP_API_URL=${REACT_APP_API_URL}
ENV REACT_APP_WEBSITE_NAME=${REACT_APP_WEBSITE_NAME}
RUN rm -rf /app/node_modules
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=node /landingapp/build /usr/share/nginx/html
EXPOSE 80