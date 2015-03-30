'use strict';

var gulp         = require('gulp');
var awspublish   = require('gulp-awspublish');
var runSequence  = require('run-sequence');
var config       = require('../config');

gulp.task('deploy', ['prod'], function() {

  return function() {
    var publisher = awspublish.create({
      key: 'AKIAJTL7QEGHS6OTMSMQ',
      secret: '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',
      region: 'us-west-2',
      bucket: 'admin.dev.pundittracker.com'
    });
    var oneWeekInSeconds = 60*60*24*7;
    var headers = {
      'Cache-Control': 'max-age=' + oneWeekInSeconds + ', no-transform, public'
    };

    // Upload assets to S3
    return gulp.src(config.buildDir + '**/*')
    .pipe(awspublish.gzip())
    .pipe(publisher.publish(headers))
    .pipe(awspublish.reporter());
  };

});