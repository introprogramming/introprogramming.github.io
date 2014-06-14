var gulp = require('gulp'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    server = require('connect'),
    gutil = require('gulp-util')


gulp.task('styles', function() {
  gulp.src('*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./'))
})

gulp.task('serve', ['watch'], function() {
  var port = 3000

  server.createServer(server.static(__dirname)).listen(port)

  gutil.log("Test server listening on localhost:"+port+" ...");
  gutil.log("Press Ctrl+C to quit");
})

gulp.task('watch', function() {
  gulp.src('*.scss')
    .pipe(watch())
    .pipe(sass())
    .pipe(gulp.dest('./'))
})
