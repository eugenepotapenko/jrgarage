/// <vs />
var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var reload = browserSync.reload;
var gutil = require('gulp-util');
//var inject = require('gulp-inject');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

var onError = function (err) {
    gutil.beep();
    console.log(err);
};

var src = {
    scss: 'src/sass/**/*.scss',
    css: 'dist/css',
    
    html: ['*.html'],
    js: 'src/js/**/*.js'
};

gulp.task('serve', ['sass'], function () {

    browserSync({
        server:'./'
        // startPath: "/",
        // proxy: "localhost:4818"
    });

    gulp.watch(src.scss, ['sass']);
    gulp.watch(src.html).on('change', reload);
    gulp.watch(src.js).on('change', reload);
});

// Compile sass into CSS
gulp.task('sass', function () {
    return gulp.src(src.scss)
               .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass.sync({
            outputStyle: 'compressed',
            onError: function (err) {
               console.log(err);
            }
        }))
      //.on('error', function (err) {
      //    console.log(err.stack);
      //})
        //.pipe(sourcemaps.write(src.css))
       // .pipe(plumber.stop())
        //.on('error', gutil.log)

        .pipe(autoprefixer({
            browsers: ['last 50 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(src.css)) 
        .pipe(browserSync.stream());
});

gulp.task('autoprefix', function () {
    return gulp.src(src.css)
         .pipe(autoprefixer({
             browsers: ['last 50 versions'],
             cascade: false
         }))
});
gulp.task('default', ['serve']);
