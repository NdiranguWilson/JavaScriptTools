/**
 * Cytonn Technologies
 * @author Ndirangu Wilson <wndirangu@cytonn.com>
 * Javascript Tools
 *
 */

// include gulp
var gulp = require('gulp');

// include plug-ins
var jshint = require('gulp-jshint');
// Requires the gulp-sass plugin
var sass = require('gulp-ruby-sass');
// Requires the browserSync plugin
var browserSync = require('browser-sync').create();
//uglify var
var uglify = require('gulp-uglify');

/**
 * A jshint task  which checks for errors in javascripts file
 */

gulp.task('jshint', function() {
  gulp.src('./src/scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

//sass task

gulp.task('sass', function() {
  return sass('./src/scss/**/*.scss')
    .on('error', sass.logError)
    .pipe(gulp.dest('./src/css'));
});

//browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'src'
    },
  });
});

//Watch task concatenated with other tasks that run simultaneously when gulp is run
gulp.task('default', ['browserSync', 'sass'], function() {
  gulp.watch('./src/scss/**/*.scss', ['sass']);
  // Other watchers
  gulp.watch('./src/*.html', browserSync.reload);
  gulp.watch('./src/scripts/**/*.js', browserSync.reload);
});

//uglify task
gulp.task('compress', function() {
  return gulp.src('./src//scripts/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build/scripts'));
});
