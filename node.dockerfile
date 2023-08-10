FROM node:18-alpine
ENV APP_HOME /app

WORKDIR $APP_HOME

COPY ./ $APP_HOME

RUN npm install


EXPOSE ${PORT}

CMD npm start -- --port=4200 --host=0.0.0.0
