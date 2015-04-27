'use strict';

var gulp         = require('gulp');
var dotenv       = require('dotenv');
var awspublish   = require('gulp-awspublish');
var config       = require('../config');

dotenv.load();

gulp.task('deploy', ['prod'], function() {

    var publisher = awspublish.create({
      bucket: 'admin.dev.pundittracker.com'
      key: process.env.AWS_KEY,
      secret: process.env.AWS_SECRET,
      region: process.env.AWS_REGION,
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

});