FROM node:6.11

#Make application home
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy resources
COPY ./dist /usr/src/app/
RUN NODE_ENV=production npm install

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]