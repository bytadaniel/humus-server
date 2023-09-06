FROM node:18-slim


RUN set -ex && \
    groupadd -r app && \
    useradd -r -d /usr/src -s /bin/false -g app app && \
    chown app:app /usr/src

WORKDIR /usr/src


COPY package*.json ./
RUN set -ex && \
    npm install

COPY . .

RUN npm run build

USER app
EXPOSE 8080

CMD ["npm", "run", "start"]
