(function() {
  var apps, browserSync, clean, concat, es6Apps, es6transpiler, gulp, htmlmin, jshint, path, plumber, rename, rev, runSequence, uglify;

  path = require("path");

  gulp = require("gulp");

  es6transpiler = require("gulp-es6-transpiler");

  browserSync = require("browser-sync").create();

  runSequence = require("run-sequence");

  plumber = require("gulp-plumber");

  htmlmin = require("gulp-htmlmin");

  uglify = require("gulp-uglify");

  jshint = require("gulp-jshint");

  concat = require("gulp-concat");

  rename = require("gulp-rename");

  clean = require("gulp-clean");

  rev = require("gulp-rev");

  es6Apps = ["es6apps"];

  apps = ["demos", "login", "menus", "signup", "test", "users", "welcome"];

  gulp.task("cleanLog", function() {
    return gulp.src(["log/*.log"], {
      read: false,
      force: true
    }).pipe(clean());
  });

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

  gulp.task("es6", ["clean:js"], function() {
    var appName, i, len, results;
    results = [];
    for (i = 0, len = es6Apps.length; i < len; i++) {
      appName = es6Apps[i];
      results.push(gulp.src(["public/apps/" + appName + "/modules/**/*.js", "!public/apps/" + appName + "/modules/**/*.min.js"]).pipe(plumber()).pipe(es6transpiler()).pipe(jshint()).pipe(rename({
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

  gulp.task("js", function() {
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
      removeComments: false,
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

  gulp.task("browser-sync", function() {
    return browserSync.init({
      proxy: "http://localhost:5678",
      files: ["./**/*.html", "./**/*.css", "./**/*.js", "./**/*.json"],
      port: 3000
    });
  });

  gulp.task("default", function() {
    var appName, i, len, results;
    runSequence("cleanLog", "clean", "es6", "js", "html");
    results = [];
    for (i = 0, len = apps.length; i < len; i++) {
      appName = apps[i];
      results.push(gulp.watch(["public/apps/" + appName + "/modules/**/*.js", "!public/apps/" + appName + "/modules/**/*.min.js", "public/apps/" + appName + "/templates/**/*.html", "!public/apps/" + appName + "/templates/**/*.tmpl.html"], (function() {
        return runSequence("clean", "es6", "js", "html");
      })));
    }
    return results;
  });

}).call(this);
