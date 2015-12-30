(function() {
  var apps, clean, concat, gulp, htmlmin, jshint, path, plumber, rename, rev, runSequence, uglify;

  path = require("path");

  gulp = require("gulp");

  runSequence = require("run-sequence");

  plumber = require("gulp-plumber");

  htmlmin = require("gulp-htmlmin");

  uglify = require("gulp-uglify");

  jshint = require("gulp-jshint");

  concat = require("gulp-concat");

  rename = require("gulp-rename");

  clean = require("gulp-clean");

  rev = require("gulp-rev");

  apps = ["login", "signup", "test", "welcome"];

  gulp.task("clean", function() {
    var appName, i, len, results;
    results = [];
    for (i = 0, len = apps.length; i < len; i++) {
      appName = apps[i];
      results.push(gulp.src(["public/apps/" + appName + "/rev-manifest.json"], {
        read: false,
        force: true
      }).pipe(clean()));
    }
    return results;
  });

  gulp.task("clean:js", function() {
    var appName, i, len, results;
    results = [];
    for (i = 0, len = apps.length; i < len; i++) {
      appName = apps[i];
      results.push(gulp.src(["public/apps/" + appName + "/**/*.min.js"], {
        read: false,
        force: true
      }).pipe(clean()));
    }
    return results;
  });

  gulp.task("js", ["clean:js"], function() {
    var appName, i, len, results;
    results = [];
    for (i = 0, len = apps.length; i < len; i++) {
      appName = apps[i];
      results.push(gulp.src(["public/apps/" + appName + "/modules/**/*.js", "!public/apps/" + appName + "/modules/**/*.min.js"]).pipe(plumber()).pipe(jshint()).pipe(rename({
        extname: ".min.js"
      })).pipe(uglify({
        managle: false
      })).pipe(rev()).pipe(gulp.dest("public/apps/" + appName + "/modules/")).pipe(rev.manifest({
        path: path.join(__dirname, "public/apps/" + appName + "/rev-manifest.json"),
        cwd: path.join(__dirname, "public/apps/" + appName + "/"),
        merge: true
      })).pipe(gulp.dest("public/apps/" + appName + "/")));
    }
    return results;
  });

  gulp.task("clean:html", function() {
    var appName, i, len, results;
    results = [];
    for (i = 0, len = apps.length; i < len; i++) {
      appName = apps[i];
      results.push(gulp.src(["public/apps/" + appName + "/**/*.tmpl.html"], {
        read: false,
        force: true
      }).pipe(clean()));
    }
    return results;
  });

  gulp.task("html", ["clean:html"], function() {
    var appName, i, len, options, results;
    options = {
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      minifyJS: true,
      minifyCSS: true
    };
    results = [];
    for (i = 0, len = apps.length; i < len; i++) {
      appName = apps[i];
      results.push(gulp.src(["public/apps/" + appName + "/templates/**/*.html", "!public/apps/" + appName + "/templates/**/*.tmpl.html"]).pipe(plumber()).pipe(htmlmin(options)).pipe(rename({
        extname: ".tmpl.html"
      })).pipe(rev()).pipe(gulp.dest("public/apps/" + appName + "/templates/")).pipe(rev.manifest({
        path: path.join(__dirname, "public/apps/" + appName + "/rev-manifest.json"),
        cwd: path.join(__dirname, "public/apps/" + appName + "/"),
        merge: true
      })).pipe(gulp.dest("public/apps/" + appName + "/")));
    }
    return results;
  });

  gulp.task("default", function() {
    var appName, i, len, results;
    runSequence("clean", "js", "html");
    results = [];
    for (i = 0, len = apps.length; i < len; i++) {
      appName = apps[i];
      results.push(gulp.watch(["public/apps/" + appName + "/modules/**/*.js", "!public/apps/" + appName + "/modules/**/*.min.js", "public/apps/" + appName + "/templates/**/*.html", "!public/apps/" + appName + "/templates/**/*.tmpl.html"], (function() {
        return runSequence("clean", "js", "html");
      })));
    }
    return results;
  });

}).call(this);
