const gulp           = require('gulp');
const browserSync    = require('browser-sync').create();
const sass           = require('gulp-sass');
const concat         = require('gulp-concat');
const uglify         = require('gulp-uglify');
const nunjucksRender = require('gulp-nunjucks-render');

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
        .pipe(gulp.dest("docs/css"))
        .pipe(browserSync.stream());
});

// Move JS Files to paid/js
gulp.task('js', function() {
    return gulp.src(['node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js', 'node_modules/bootstrap/dist/js/bootstrap.min.js'])
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(gulp.dest('docs/js'))
        .pipe(browserSync.stream());
});

// Watch Sass/html & Serve
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: {
            baseDir: './docs',
            serveStaticOptions: {
                extensions: ['html']
            }
        }
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/**/*.scss'], ['sass']);
    gulp.watch('src/html/pages/**/*.html', ['nunjucks']),
    gulp.watch('docs/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['nunjucks', 'js', 'serve']);