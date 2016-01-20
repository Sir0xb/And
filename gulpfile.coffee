# out: gulpfile.js, sourcemap: false

path = require "path"
gulp = require "gulp"

browserSync = require("browser-sync").create()
runSequence = require "run-sequence"

plumber = require "gulp-plumber"
htmlmin = require "gulp-htmlmin"
uglify  = require "gulp-uglify"
jshint  = require "gulp-jshint"
concat  = require "gulp-concat"
rename  = require "gulp-rename"
clean   = require "gulp-clean"
rev     = require "gulp-rev"

apps = [
    "login"
    "signup"
    "test"
    "welcome"
]

gulp.task "clean", ->
    gulp.src [
        "public/apps/#{appName}/rev-manifest.json"
    ],
        read    : no
        force   : yes
    .pipe(clean()) for appName in apps

gulp.task "clean:js", ->
    gulp.src ["public/apps/#{appName}/**/*.min.js"],
        read    : no
        force   : yes
    .pipe(clean()) for appName in apps

gulp.task "js", ["clean:js"], ->
    gulp.src ["public/apps/#{appName}/modules/**/*.js", "!public/apps/#{appName}/modules/**/*.min.js"]
    .pipe plumber()
    .pipe jshint()
    .pipe rename
        extname: ".min.js"
    .pipe uglify
        managle: no
    .pipe rev()
    .pipe gulp.dest "public/apps/#{appName}/modules/"
    .pipe rev.manifest
        path    : path.join(__dirname, "public/apps/#{appName}/rev-manifest.json"),
        cwd     : path.join(__dirname, "public/apps/#{appName}/"),
        merge   : yes
    .pipe gulp.dest "public/apps/#{appName}/" for appName in apps

gulp.task "clean:html", ->
    gulp.src ["public/apps/#{appName}/**/*.tmpl.html"],
        read    : no
        force   : yes
    .pipe(clean()) for appName in apps

gulp.task "html", ["clean:html"], ->
    options =
        removeComments                  : false      # 清除HTML注释
        collapseWhitespace              : true      # 压缩HTML
        collapseBooleanAttributes       : true      # 省略布尔属性的值 <input checked="true"/> ====> <input />
        removeEmptyAttributes           : true      # 删除所有空格作属性值 <input id="" /> ====> <input />
        removeScriptTypeAttributes      : true      # 删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes   : true      # 删除<style>和<link>的type="text/css"
        minifyJS                        : true      # 压缩页面JS
        minifyCSS                       : true      # 压缩页面CSS

    gulp.src ["public/apps/#{appName}/templates/**/*.html", "!public/apps/#{appName}/templates/**/*.tmpl.html"]
    .pipe plumber()
    .pipe htmlmin options
    .pipe rename
        extname: ".tmpl.html"
    .pipe rev()
    .pipe gulp.dest "public/apps/#{appName}/templates/"
    .pipe rev.manifest
        path    : path.join(__dirname, "public/apps/#{appName}/rev-manifest.json"),
        cwd     : path.join(__dirname, "public/apps/#{appName}/"),
        merge   : yes
    .pipe gulp.dest "public/apps/#{appName}/" for appName in apps

gulp.task "browser-sync", ->
    browserSync.init
        proxy   : "http://localhost:5678"
        files   : ["./**/*.html", "./**/*.css", "./**/*.js", "./**/*.json"]
        port    : 3000

gulp.task "default", ->
    runSequence "clean", "js", "html", "browser-sync"

    gulp.watch [
        "public/apps/#{appName}/modules/**/*.js"
        "!public/apps/#{appName}/modules/**/*.min.js"
        "public/apps/#{appName}/templates/**/*.html"
        "!public/apps/#{appName}/templates/**/*.tmpl.html"
    ], (->
        runSequence "clean", "js", "html"
    )
    .on "change", browserSync.reload for appName in apps
