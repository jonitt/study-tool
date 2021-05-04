FROM node:14

WORKDIR /opt/studytool

COPY . .

RUN npm install 

RUN npm run build

EXPOSE 3000

CMD npm run start