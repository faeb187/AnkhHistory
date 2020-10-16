#!/usr/bin/env bash

# compile gulpfile
coffee -c -b ./lib/gulpfile.coffee

# deployment
gulp

# vendor files
cp ./src/vendor/flexbox-reset.css dst/assets/css

# serve app
npx http-server ./dst --proxy http://localhost:8080?
