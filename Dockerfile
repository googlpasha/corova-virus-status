FROM node

RUN mkdir /app

RUN cd /app

WORKDIR /app

COPY package.json /app

RUN npm install
COPY . /app
# RUN yarn test
RUN npm run build

EXPOSE 3000

CMD npm start
