var gulp = require('gulp'),
  connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    root: 'client',
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('./client/*.html')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./client/*.html'], ['html']);
   gulp.watch(['./client/*.css'], ['css']);
});

gulp.task('default', ['connect', 'watch']);
