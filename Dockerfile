FROM node:lts
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "node", "server.js" ]
# RUN mkdir -p /opt/nodejs
# ADD package.json /opt/nodejs
# WORKDIR /opt/nodejs
# RUN npm install
# EXPOSE 3000
# CMD ["npm", "run", "start"]
# ADD . /opt/nodejs