const gulp = require('gulp');
const ts = require('gulp-typescript');
const server = require('browser-sync').create();
// const tsProject = ts.createProject("tsconfig.json");
const concat = require('gulp-concat');
const webpack = require('webpack-stream');

const paths = {
    scripts: {
        entry: 'src/index.ts',
        src: 'src/**/*.ts',
        dest: 'dist/'
    },
    html: {
        src: 'src/**/*.html',
        dest: 'dist/'
    },
    css: {
        src: 'src/**/*.css',
        dest: 'dist/'
    }
};

function copyHtml() {
    return gulp.src(paths.html.src)
        .pipe(gulp.dest(paths.html.dest));
};

function copyCSS() {
    return gulp.src(paths.css.src)
        .pipe(gulp.dest(paths.css.dest));
};

const watch = () => {
    gulp.watch(paths.scripts.src, gulp.series(typescript, reload));
    gulp.watch(paths.html.src, gulp.series(copyHtml, reload));
    gulp.watch(paths.css.src, gulp.series(copyCSS, reload));
};

// function scripts() {
//     return tsProject.src()
//         .pipe(tsProject())
//         .js
//         .pipe(gulp.dest(paths.scripts.dest));
// }

function typescript() {
    return gulp.src(paths.scripts.entry)
        .pipe(webpack({
            mode: 'development',
            devtool: 'source-map',
            resolve: {
                extensions: [".ts", ".tsx", ".js"]
            },
            module: {
                rules: [
                    { test: /\.tsx?$/, loader: "ts-loader" }
                ]
            },
            output: {
                filename: 'bundle.js',
            },
            performance: {
                hints: false
            }
        }))
        .pipe(gulp.dest(paths.scripts.dest));
};

function libs() {
    return gulp.src([
        'node_modules/angular/angular.js',
        'node_modules/angular-animate/angular-animate.js',
        'node_modules/angular-aria/angular-aria.js',
        'node_modules/angular-messages/angular-messages.js',
        'node_modules/angular-material/angular-material.js',
    ])
        .pipe(concat('libs.min.js'))
        .pipe(gulp.dest(paths.scripts.dest));
};

function reload(done) {
    server.reload();
    done();
}

function serve(done) {
    server.init({
        server: {
            baseDir: 'dist'
        },
        notify: true,
    });
    done();
}

gulp.task('default', gulp.series(typescript, libs, copyHtml, copyCSS, serve, watch));
gulp.task('build', gulp.series(typescript, libs, copyHtml, copyCSS));
