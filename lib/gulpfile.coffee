###
  GULPFILE
  @AUTHOR faeb187
###

# @REQUIRE npm modules
gulp = require "gulp"
rename = require "gulp-rename"
shell = require "gulp-shell"
seq = require "run-sequence"
coffee = require "gulp-coffee"
pug = require "gulp-pug"
stylus = require "gulp-stylus"
rupture = require "rupture"
poststyl = require "poststylus"
rucksack = require "rucksack-css"

# ANKH config
gulp.task "ankh", ->
  gulp
    .src "src/ankh.coffee"
    .pipe coffee bare: true, transpile: presets: ["@babel/env"]
    .pipe gulp.dest "dst/assets/js"

# lang libraries
gulp.task "i18n", ->
  gulp
    .src "src/i18n/*.coffee"
    .pipe coffee bare: true, transpile: presets: ["@babel/env"]
    .pipe gulp.dest "dst/assets/js/i18n"

# network
gulp.task "network", ->
  gulp
    .src "src/network/**/*.coffee"
    .pipe coffee bare: true, transpile: presets: ["@babel/env"]
    .pipe gulp.dest "dst/assets/js/network"

# UIs
gulp.task "uis", ->
  gulp
    .src "src/uis/*"
    .pipe coffee bare: true, transpile: presets: ["@babel/env"]
    .pipe gulp.dest "dst/assets/js/uis"

# designs
gulp.task "designs", ->
  gulp
    .src "src/designs/*"
    .pipe coffee bare: true, transpile: presets: ["@babel/env"]
    .pipe gulp.dest "dst/assets/js/designs"

# sites
gulp.task "sites", ->
  gulp
    .src "src/sites/*"
    .pipe coffee bare: true, transpile: presets: ["@babel/env"]
    .pipe gulp.dest "dst/assets/js/sites"

# site confs
gulp.task "conf", ->
  gulp
    .src "src/conf/*"
    .pipe coffee bare: true, transpile: presets: ["@babel/env"]
    .pipe gulp.dest "dst/assets/js/conf"

# helpers
gulp.task "helpers", ->
  gulp
    .src "src/helpers/*.coffee"
    .pipe coffee bare: true, transpile: presets: ["@babel/env"]
    .pipe gulp.dest "dst/assets/js/helpers"

# app
gulp.task "coffee", ->
  gulp
    .src "src/app.coffee"
    .pipe coffee bare: true, transpile: presets: ["@babel/env"]
    .pipe gulp.dest "dst/assets/js"

# pug
gulp.task "pug", ->
  gulp
    .src "src/pug/index.pug"
    .pipe pug()
    .pipe gulp.dest "dst"

# tpls
gulp.task "tpls", ->
  gulp
    .src "src/tpls/**/*.pug"
    .pipe pug()
    .pipe gulp.dest "dst/assets/tpls"

  gulp
    .src "src/tpls/**/*.styl"
    .pipe(
      stylus
        compress: true
        use: [rupture(), poststyl [rucksack autoprefixer: true]]
    )
    .pipe gulp.dest "dst/assets/tpls"

# stylus
gulp.task "styl", ->
  gulp
    .src "src/styl/main.styl"
    .pipe(
      stylus
        compress: true
        use: [
          rupture scale: "0 400px 600px 800px 1050px 1800px"
          poststyl [rucksack autoprefixer: true]
        ]
    )
    .pipe rename "main.min.css"
    .pipe gulp.dest "dst/assets/css"

gulp.task "bundle", ->
  process.chdir "dst/assets/js"
  gulp.src("*.js", read: false).pipe shell ["browserify app.js -o ./app.min.js"]

gulp.task(
  "default"
  gulp.series(
    "ankh"
    "i18n"
    "network"
    "uis"
    "helpers"
    "pug"
    "styl"
    "conf"
    "designs"
    "sites"
    "coffee"
    "bundle"
  )
  (done) => done()
)
