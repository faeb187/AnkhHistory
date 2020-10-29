#!/usr/bin/env bash

#clean up
rm dist/*.js
rm gulpfile.js
rm dist/index.html
rm -r dist/assets/css
rm -r dist/assets/js

# deployment
npm run build

# _deployment (@todo migrate to webpack)
coffee -c -b gulpfile.coffee
gulp

# provide index.html
cp src/index.html dist

# serve app
npx http-server ./dist --proxy http://localhost:8080?

exit 0