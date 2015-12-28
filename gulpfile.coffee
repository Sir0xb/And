# out: gulpfile.js, sourcemap: false

gulp = require "gulp"

runSequence = require "run-sequence"

plumber = require "gulp-plumber"
uglify  = require "gulp-uglify"
jshint  = require "gulp-jshint"
concat  = require "gulp-concat"
rename  = require "gulp-rename"
clean   = require "gulp-clean"
rev     = require "gulp-rev"

apps = [
    "welcome"
]

gulp.task "clean", ->
    gulp.src ["public/apps/#{appName}/modules/**/*.min.js"],
        read: false
    .pipe(clean()) for appName in apps

gulp.task "js", ->
    gulp.src ["public/apps/#{appName}/modules/**/*.js", "!public/apps/#{appName}/modules/**/*.min.js"]
    .pipe plumber()
    .pipe jshint()
    .pipe rename
        extname: ".min.js"
    .pipe uglify
        managle: no
    .pipe rev()
    .pipe gulp.dest "public/apps/#{appName}/modules"
    .pipe rev.manifest()
    .pipe gulp.dest "public/apps/#{appName}" for appName in apps

gulp.task "default", ->
    runSequence "clean", "js"

    gulp.watch ["public/apps/#{appName}/modules/**/*.js", "!public/apps/#{appName}/modules/**/*.min.js"], (->
        runSequence "clean", "js"
    ) for appName in apps
