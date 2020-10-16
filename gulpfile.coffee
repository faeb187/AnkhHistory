#
#  gulpfile
#
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

# app deployment
gulp.task "ankh", ->
  gulp
    .src "src/**/*.coffee"
    .pipe coffee bare: true, transpile: presets: ["@babel/env"]
    .pipe gulp.dest "dst/assets/js"

# ankh pug
gulp.task "pug", ->
  gulp
    .src "src/pug/index.pug"
    .pipe pug()
    .pipe gulp.dest "dst"

# ankh styl
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

# ankh bundling
gulp.task "bundle", ->
  process.chdir "dst/assets/js"
  gulp.src("*.js", read: false).pipe shell ["browserify app.js -o ./app.min.js"]

gulp.task "default", gulp.series("ankh", "pug", "styl", "bundle"), (done) =>
  done()
