#!/usr/bin/env bash

# compile gulpfile
coffee -c -b ./lib/gulpfile.coffee

# deployment
cd ./lib
rm -r dst
gulp

# vendor files
mv ./src/vendor/flexbox-reset.css dst/assets/css

# serve app
npx http-server ./dst --proxy http://localhost:8080?
