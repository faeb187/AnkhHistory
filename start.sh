#!/usr/bin/env bash

# compile gulpfile
coffee -c -b ./lib/gulpfile.coffee

# deployment
cd ./lib
rm -r assets/js
rm -r assets/css/main.min.css
gulp

# serve app
npx http-server ./dst --proxy http://localhost:8080?
