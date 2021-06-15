FROM nginx:alpine
#Copy ci-dashboard-dist
COPY ./dist/otus-architect /usr/share/nginx/html
COPY ./config.json /usr/share/nginx/html/assets/config/config.json
#Copy default nginx configuration
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
