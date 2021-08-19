const {src, dest, watch, parallel, series} = require('gulp');

const scss = require('gulp-sass'); //устанавливаем sass
const concat = require('gulp-concat'); // -..- concat
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const svgSprite = require('gulp-svg-sprite');

const fileinclude = require('gulp-file-include');

const imagemin = require('gulp-imagemin');
const del = require('del');
const browserSync = require('browser-sync').create();

function svgSprites() {
    return src(['app/images/icons/*.svg', '!app/images/sprite.svg'])
        .pipe(
            svgSprite({
                mode: {
                    stack: {
                        sprite: '../sprite.svg',
                    },
                },
            }),
        )
        .pipe(dest('./app/images'));
}

//плагин для обновления страницы после изменения
function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'app/',
        },
        notify: false,
    });
}

function htmlinclude() {
    return src(['app/html/pages/index.html',
        'app/html/pages/grow.html'])
        .pipe(
            fileinclude({
                prefix: '@@',
                basepath: '@file',
            }),
        )
        .pipe(dest('app/'));
}

//конвертация в css
function styles() {
    return src('app/scss/style.scss')
        .pipe(scss({outputStyle: 'compressed'})) //сжимаем сконфишурированный файл css
        .pipe(concat('style.min.css')) //переименовываем style.css в style min css
        .pipe(
            autoprefixer({
                overrideBrowserslist: ['last 10 versions'],
                grid: true,
            }),
        )
        .pipe(dest('app/css')) //выбрасываем сконвертированный файл
        .pipe(browserSync.stream());
}

function scripts() {
    return src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/slick-carousel/slick/slick.min.js',
        'app/js/main.js',
    ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream());
}

//конвертим и уменьшаем вес графических файлов
function images() {
    return src('app/images/**/*.*')
        .pipe(
            imagemin([
                imagemin.gifsicle({interlaced: true}),
                imagemin.mozjpeg({quality: 75, progressive: true}),
                imagemin.optipng({optimizationLevel: 5}),
                imagemin.svgo({
                    plugins: [{removeViewBox: true}, {cleanupIDs: false}],
                }),
            ]),
        )
        .pipe(dest('dist/images')); //сюда будут скидываться обработанные файлы из папки images
}

function build() {
    return src(['app/**/*.html', 'app/css/style.min.css', 'app/js/main.min.js'], {base: 'app'}) //чтоб при переносе файлов в dist они оказались в своих первонос=чальных директориях
        .pipe(dest('dist')); //переносим сюда все сконвертированные файлы проекта которые указаны выше *.html, style.min.js, main.min.js
}

function cleanDist() {
    return del('dist');
}

//монитор событий за кем следит
function watching() {
    watch(['app/scss/**/*.scss'], styles);
    watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
    watch(['app/html/**/*'], htmlinclude);
    watch(['app/images/icons/*.svg'], svgSprites);
}

exports.styles = styles; //запуск функции styles
exports.scripts = scripts;
exports.browsersync = browsersync;

exports.htmlinclude = htmlinclude;

exports.watching = watching;
exports.images = images;
exports.cleanDist = cleanDist;
exports.build = series(cleanDist, images, build); //запускает глобально после команды build стерает папкуdist, конвертит images, после запускает default

exports.default = parallel(htmlinclude, svgSprites, styles, scripts, browsersync, watching); //запускает функции

//чтоб запустить сборку надо в консоль "gulp build"
