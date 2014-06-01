var gulp = require('gulp'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch')


gulp.task('styles', function() {
  gulp.src('*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./'))
})

gulp.task('watch', function() {
  gulp.src('*.scss')
    .pipe(watch())
    .pipe(sass())
    .pipe(gulp.dest('./'))
})
