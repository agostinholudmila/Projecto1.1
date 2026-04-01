FROM  node:18-alpine

LABEL maintainer="agostinholudmila69@gmail.com"

COPY . /app

WORKDIR /app

RUN npm install

EXPOSE 3000

CMD ["node", "app.js"]