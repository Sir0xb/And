# out: gulpfile.js, sourcemap: false

gulp = require "gulp"

runSequence = require "run-sequence"

uglify = require "gulp-uglify"
jshint = require "gulp-jshint"
concat = require "gulp-concat"
rename = require "gulp-rename"
watch  = require "gulp-watch"
clean  = require "gulp-clean"
rev    = require "gulp-rev"

base = "public"
