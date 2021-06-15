FROM nginx:alpine AS builder

#!/bin/sh

COPY nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=builder /dist /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
