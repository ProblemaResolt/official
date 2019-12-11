FROM node:10.13-alpine

# Install Npm
RUN \
    mkdir -p /opt/app && \
    chmod -R 777 /opt/app && \
    apk update && \
    apk --no-cache --update add \
      nodejs nodejs-npm && \
    npm install npm -g --no-progress && \
    npm install --global elm --unsafe-perm=true --allow-root && \
    yarn add core-js react react-dom regenerator-runtime && \
    yarn add -D  @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript @types/react @types/react-dom babel-loader css-loader node-sass sass-loader source-map-loader style-loader webpack webpack-cli typescript ts-loader && \
    update-ca-certificates --fresh && \
    rm -rf /var/cache/apk/*
# Add local node module binaries to PATH
ENV PATH=./node_modules/.bin:$PATH \
    HOME=/opt/app

WORKDIR /opt/app