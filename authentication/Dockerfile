FROM mysql
ADD init.sql /docker-entrypoint-initdb.d

FROM node:18-alpine
WORKDIR /src
CMD sh -c "npm install && npm run build && npm run start"

EXPOSE 8080
EXPOSE 3307