FROM nginx as dev
COPY ./default.conf /etc/nginx/conf.d/default.conf

FROM dev as prod
COPY ./default.prod.conf /etc/nginx/conf.d/default.prod.conf
