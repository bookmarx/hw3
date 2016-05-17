// Gulpfile.js
var gulp = require('gulp'),
nodemon = require('gulp-nodemon')


gulp.task('start', function () {
    nodemon({
        script: 'server/app.js',
        ext: 'js html ejs',
        env: { 'NODE_ENV': 'development' }
    })
    .on('restart', function () {
        console.log('restarted!')
    })
})

gulp.task('default', ['start'])
