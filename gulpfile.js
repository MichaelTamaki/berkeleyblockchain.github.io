const gulp           = require('gulp');
const browserSync    = require('browser-sync').create();
const sass           = require('gulp-sass');
const concat         = require('gulp-concat');
const uglify         = require('gulp-uglify');
const nunjucksRender = require('gulp-nunjucks-render');
const newer          = require('gulp-newer');
const imagemin       = require('gulp-imagemin');

// Compile html files using nunjucks
gulp.task('nunjucks', function() {
    return gulp.src('src/html/pages/**/*.html')
        .pipe(nunjucksRender({
            path: ['src/html/templates']
        }))
        .pipe(gulp.dest('docs/'))
        .pipe(browserSync.stream());
});

// Compile Sass & Inject Into Browser
gulp.task('sass', function() {
    return gulp.src(['src/scss/**/*.scss'])
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('docs/css'))
        .pipe(browserSync.stream());
});

// Bundle jquery, popper, and bootstrap. Move js files to docs
// https://getbootstrap.com/docs/4.0/getting-started/javascript/
gulp.task('js-core', ['js'], function() {
    return gulp.src([
            'node_modules/jquery/dist/jquery.slim.min.js',
            'node_modules/popper.js/dist/umd/popper.min.js',
            'node_modules/bootstrap/js/dist/util.js',
            'node_modules/bootstrap/js/dist/button.js', 
            'node_modules/bootstrap/js/dist/collapse.js', 
            'node_modules/bootstrap/js/dist/dropdown.js'
        ])
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(gulp.dest('docs/js'))
        .pipe(browserSync.stream());
});
gulp.task('js', function() {
    return gulp.src(['src/js/**/*.js'])
        .pipe(newer('docs/js'))
        .pipe(uglify())
        .pipe(gulp.dest('docs/js'))
        .pipe(browserSync.stream());
});

// Minify images
gulp.task('img', function() {
    return gulp.src(['src/img/**'])
        .pipe(newer('docs/img'))
        .pipe(imagemin())
        .pipe(gulp.dest('docs/img'))
});

// Watch Sass/html/js & Serve
gulp.task('serve', ['sass', 'nunjucks', 'js-core', 'img'], function() {

    browserSync.init({
        server: {
            baseDir: './docs',
            serveStaticOptions: {
                extensions: ['html']
            }
        }
    });

    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/html/**/*.html', ['nunjucks']);
    gulp.watch('src/js/**/*.js', ['js']);
});

// Called at npm start
gulp.task('default', ['serve']);
