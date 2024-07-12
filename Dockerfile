FROM node:latest

COPY . /home/app/

WORKDIR /home/app/

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
