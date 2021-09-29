#!/usr/bin/env bash

# cleaning
rm dist/*.js
rm dist/index.html
rm -r dist/assets/css
rm -r dist/assets/js

# deployment
npm run build
cp src/index.html dist
npx http-server ./dist --proxy http://localhost:8080?

exit 0
