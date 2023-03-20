FROM node:19.8-alpine as build

# Copy local code to the container image.
ENV APP_HOME /app
WORKDIR $APP_HOME
COPY . .

RUN npm install && npm --global install serve
RUN npm run build 

CMD && serve -s build
