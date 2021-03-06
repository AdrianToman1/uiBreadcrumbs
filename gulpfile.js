var gulp = require('gulp'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    eslint = require('gulp-eslint'),
    karma = require('karma');

gulp.task('lint', function(){
  return gulp.src(['uiBreadcrumbs.js'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('test', function (done) {
  new karma.Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('default',  ['lint', 'test'], function(){
  return gulp.src(['uiBreadcrumbs.js'])
  .on('error', console.log)
  .pipe(uglify().on('error', gutil.log))
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('.'));
});
