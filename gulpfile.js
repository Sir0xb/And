(function() {
  var apps, clean, concat, gulp, jshint, plumber, rename, rev, runSequence, uglify;

  gulp = require("gulp");

  runSequence = require("run-sequence");

  plumber = require("gulp-plumber");

  uglify = require("gulp-uglify");

  jshint = require("gulp-jshint");

  concat = require("gulp-concat");

  rename = require("gulp-rename");

  clean = require("gulp-clean");

  rev = require("gulp-rev");

  apps = ["welcome"];

  gulp.task("clean", function() {
    var appName, i, len, results;
    results = [];
    for (i = 0, len = apps.length; i < len; i++) {
      appName = apps[i];
      results.push(gulp.src(["public/apps/" + appName + "/modules/**/*.min.js"], {
        read: false
      }).pipe(clean()));
    }
    return results;
  });

  gulp.task("js", function() {
    var appName, i, len, results;
    results = [];
    for (i = 0, len = apps.length; i < len; i++) {
      appName = apps[i];
      results.push(gulp.src(["public/apps/" + appName + "/modules/**/*.js", "!public/apps/" + appName + "/modules/**/*.min.js"]).pipe(plumber()).pipe(jshint()).pipe(rename({
        extname: ".min.js"
      })).pipe(uglify({
        managle: false
      })).pipe(rev()).pipe(gulp.dest("public/apps/" + appName + "/modules")).pipe(rev.manifest()).pipe(gulp.dest("public/apps/" + appName)));
    }
    return results;
  });

  gulp.task("default", function() {
    var appName, i, len, results;
    runSequence("clean", "js");
    results = [];
    for (i = 0, len = apps.length; i < len; i++) {
      appName = apps[i];
      results.push(gulp.watch(["public/apps/" + appName + "/modules/**/*.js", "!public/apps/" + appName + "/modules/**/*.min.js"], (function() {
        return runSequence("clean", "js");
      })));
    }
    return results;
  });

}).call(this);
