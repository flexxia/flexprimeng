/**
 * @file gulp 4
 *
 * pulgin
 * npm install autoprefixer --save-dev
 * npm install cssnano --save-dev
 * npm install gulp-rename --save-dev
 * npm install postcss-for --save-dev
 *
 */
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var cssnano = require('cssnano');
var rename = require("gulp-rename");

// 不压缩输出
function defaultTask(){
  return gulp.src('css/*.css')
    .pipe( postcss([require('autoprefixer'), require('postcss-for')]) )
    .pipe( rename({ suffix: "-plugin" }) )
    .pipe( gulp.dest('dest/') );
}

// 压缩输出
function minifierCss(){
  return gulp.src('css/*.css')
    .pipe( postcss([require('autoprefixer'), cssnano(), require('postcss-for')]) )
    .pipe( rename({ suffix: "-plugin.min" }) )
    .pipe( gulp.dest('min/') );
}

// 打包两个任务
gulp.task('default', gulp.parallel(defaultTask, minifierCss));
