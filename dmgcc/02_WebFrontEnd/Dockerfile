FROM node:14.20.1 as appbuilder

ARG TAG
ARG ENVMODE
#RUN npm install -g create-react-app@5.0.0
#RUN npm install -g env-cmd
WORKDIR /app
COPY . /app

RUN rm -rf /app/node_modules

RUN echo $TAG

RUN echo $ENVMODE

RUN echo yarn --version

RUN yarn install

#RUN npm run build:$ENVMODE
RUN yarn run build:$ENVMODE

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=appbuilder /app/build /usr/share/nginx/html