#!/usr/bin/env bash

#clean up
rm gulpfile.js
rm dst/index.html
rm -r dst/assets/css
rm -r dst/assets/js


# compile gulpfile
coffee -c -b gulpfile.coffee

# deployment
gulp

# vendor files
cp ./src/vendor/flexbox-reset.css dst/assets/css

# serve app
npx http-server ./dst --proxy http://localhost:8080?

exit 0