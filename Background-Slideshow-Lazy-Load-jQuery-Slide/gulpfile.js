var gulp = require('gulp');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var header = require('gulp-header');
var rename = require('gulp-rename');
var del = require('del');
var pkg = require('./package.json');

// Config
var config = {
  src: 'src/',
  dist: 'dist/'
};

// Banner
var banner = [
  '/*!',
  ' * <%= pkg.name %> v<%= pkg.version %>',
  ' * <%= pkg.title %>',
  ' * <%= pkg.homepage %>',
  '',
  ' * Copyright (c) 2016, <%= pkg.author.name %>',
  ' * Released under the <%= pkg.license.name %> license.',
  ' */',
  ''
].join('\n');

// Clean task
gulp.task('clean', function(cb) {
  del(['dist/*.js'], cb);
});

// Default task
gulp.task('default', function() {
  return gulp.src(config.src + '*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(header(banner, {pkg: pkg}))
    .pipe(gulp.dest(config.dist))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify({preserveComments: 'some'}))
    .pipe(gulp.dest(config.dist));
});

// Watch task
gulp.task('watch', function() {
  gulp.watch(config.src + '*.js', ['default']);
});
