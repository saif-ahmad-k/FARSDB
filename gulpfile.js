var gulp = require('gulp');
var concat = require('gulp-concat');

var del = require('del');

var files = ['./dist/runtime.js', './dist/polyfills.js', './dist/scripts.js', './dist/main.js'];

gulp.task('default', function () {
    return gulp.src(files)
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./dist/'))
        .on('end', function () {
            del(files).then(function () {
                console.log('... gulp has completed');
            });
        });
});
