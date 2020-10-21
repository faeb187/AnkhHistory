#!/usr/bin/env bash

#clean up
rm dist/*.js
rm gulpfile.js
rm dist/index.html
rm -r dist/assets/css
rm -r dist/assets/js

# some webpack
npm run build

# compile gulpfile
coffee -c -b gulpfile.coffee

# deployment
gulp

# vendor files
cp ./src/vendor/flexbox-reset.css dist/assets/css

# graphQL server
# cd ../graphql-server && npm start && cd ../ankh

# serve app
npx http-server ./dist --proxy http://localhost:8080?

exit 0
