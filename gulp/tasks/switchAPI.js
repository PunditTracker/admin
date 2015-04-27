'use strict';

var gulp    = require('gulp');
var replace = require('gulp-replace');
var config  = require('../config');

gulp.task('switchAPI', function() {

  return gulp.src(config.scripts.dest + '**/*.js')
  .pipe(replace(/api.dev.pundittracker.com/gi, 'api.pundittracker.com'))
  .pipe(gulp.dest(config.scripts.dest));

});