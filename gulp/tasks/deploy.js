'use strict';

var gulp         = require('gulp');
var dotenv       = require('dotenv');
var argv         = require('yargs').argv;
var awspublish   = require('gulp-awspublish');
var runSequence  = require('run-sequence');
var config       = require('../config');

dotenv.load();

gulp.task('deploy', function() {

  var switcHAPITask = 'emptyTask';

  var publish = function() {
    var publisher = awspublish.create({
      key: process.env.AWS_KEY,
      secret: process.env.AWS_SECRET,
      region: process.env.AWS_REGION,
      bucket: (argv.production || argv.prod) ? process.env.S3_PROD_BUCKET : process.env.S3_DEV_BUCKET
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

  // Run task to change API URL to prod server if deploying to prod
  if ( argv.production || argv.prod ) {
    switcHAPITask = 'switchAPI';
  }

  return runSequence('prod', switcHAPITask, publish);

});