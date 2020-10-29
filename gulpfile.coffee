#
#  gulpfile
#
gulp = require "gulp"
poststyl = require "poststylus"
rename = require "gulp-rename"
rucksack = require "rucksack-css"
rupture = require "rupture"
stylus = require "gulp-stylus"

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
    .pipe gulp.dest "dist/assets/css"

gulp.task "default", gulp.series("styl"), (done) =>
  done()
