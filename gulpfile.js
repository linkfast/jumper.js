var gulp = require('gulp'),
    rename = require('gulp-rename'),
    minify = require('gulp-minify'),
    ts = require('gulp-typescript'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps')

var tsProject = ts.createProject('src/tsconfig.json');

gulp.task('compile', () => {
    return gulp.src('src/jumper.ts')
        .pipe(tsProject())
        .pipe(gulp.dest('dist'));
});

gulp.task('minify', () => 
    gulp.src('dist/jumper.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename('jumper.min.js'))
    .pipe(sourcemaps.write('dist/..'))
    .pipe(gulp.dest('dist'))
)

gulp.task('default', ['compile', 'minify'], () => {

})