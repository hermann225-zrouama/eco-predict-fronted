# Dockerfile for React Application
FROM node:18 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN echo $REACT_APP_API_URL
RUN npm install

COPY . ./

ARG REACT_APP_API_URL

ENV REACT_APP_API_URL "http://eco-predict-backend.eco-predict-backend-space.svc.cluster.local:8000"

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
