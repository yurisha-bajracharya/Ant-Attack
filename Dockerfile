# Using an official nginx image to serve website
FROM nginx:alpine

# Copying all website files into nginx's default folder
COPY . /usr/share/nginx/html

# Nginx automatically serves the website on port 80
