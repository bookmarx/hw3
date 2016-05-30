// Gulpfile.js
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var webpack = require('webpack-stream');
var FileCache = require("gulp-file-cache");

var fileCache = new FileCache();

gulp.task('webpack', function(){
    return gulp.src('client-webpack/app.js')
    .pipe(fileCache.filter())
	.pipe(webpack( require('./webpack.config.js') ))
	.pipe(fileCache.cache())
    .pipe(gulp.dest('client/'));
})

gulp.task('start', function () {
    nodemon({
        script: 'server/app.js',
        ext: 'js html ejs css',
        ignore: [
            'client',
            'node_module',
            'gulpfile.js'
        ],
        env: { 'NODE_ENV': 'development' },
        tasks: ['webpack']
    })
    .on('restart', function () {
        console.log('restarted!')
    })
})



gulp.task('default', ['webpack','start'])
