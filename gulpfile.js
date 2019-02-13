const gulp = require("gulp");
const gutil = require('gulp-util')
const {
    dest
} = require("gulp");
const ts = require('gulp-typescript');
const merge = require('merge2');
const revAppend = require('gulp-rev-append');
const eslint = require('gulp-eslint');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const uglify = require('gulp-uglify');
// const browserify = require('browserify');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const base64 = require('gulp-base64');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const proxy = require('http-proxy-middleware')
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const Sequence = require('gulp-sequence')
const distPath = './dist';
const devPath = './dev';


const tsProject = ts.createProject({
    noImplicitAny: true,
    outDir: '/js',
    target: "ES5",
    removeComments: true,
    declaration: true
})


// * TODO 



// NOTE 'clean' is async task , please note the task sequence.
gulp.task('clean', () => {
    del.sync([
        'dist/**'
    ])
});


// NOTE 活动页不打算使用module
// gulp.task("browserify", function () {
//     return browserify({
//             basedir: '.',
//             debug: true,
//             entries: ['src/ts/index.ts'],
//             cache: {},
//             packageCache: {}
//         })
//         .plugin(tsify)
//         .bundle()
//         .pipe(source('bundle.js'))
//         .pipe(gulp.dest("dist/js/"));
// })

// * version number append to avoid cache
gulp.task('html', () => {
    // 必须先转到devPath , 才能根据已存在的js文件获取md5指纹.
    gulp.src('./src/index.html')
        .pipe(dest(`${devPath}/`)).pipe(revAppend()).pipe(dest(`${devPath}/`));

})

// * Scss to css file.
gulp.task('scss-to-css', () => {
    gulp.src('./src/scss/*.scss')
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['>5%', 'last 2 versions', 'IE 9-11']
        }))
        .pipe(dest(`${devPath}/css/`))
        .pipe(reload({
            stream: true
        }));
})

// * Typescript to js file. 
// 转化ES6
gulp.task('compile-ts:dev', () => {

    let src = gulp.src('./src/ts/*.ts').pipe(plumber());
    let tsResult = src.pipe(sourcemaps.init()).pipe(tsProject());

    // 自动生成tds文件:
    // 添加SourceMaps文件.
    return merge([
        tsResult.dts.pipe(plumber.stop()).pipe(gulp.dest('./src/ts/dts/')),
        tsResult.js.pipe(sourcemaps.write('./')).pipe(plumber.stop()).pipe(gulp.dest('./dev/js'))
    ]);
})

// 格式化js
gulp.task('format-js', () => {
    gulp.src('./dev/js/*.js').pipe(eslint({
            fix: true,
            configFile: '.eslintrc.json'
        }))
        // eslint.format() outputs the lint results to the console.
        .pipe(eslint.format())
        .pipe(dest(`${distPath}/js`))
})

// 压缩js
gulp.task('minify-js', () => {
    gulp.src('./dist/js/*.js')
        .pipe(uglify)
})

// 压缩图片
gulp.task('minify-images', () => {
    gulp.src('./src/images/**/*')
        .pipe(imagemin([
            imagemin.gifsicle({
                interlaced: true
            }),
            imagemin.jpegtran({
                progressive: true
            }),
            imagemin.optipng({
                optimizationLevel: 3
            }),
            imagemin.svgo({
                plugins: [{
                        removeViewBox: true
                    },
                    {
                        cleanupIDs: false
                    }
                ]
            })
        ]))
        .pipe(gulp.dest('./dist/images'))
})

// 对于<8kb的图片转成base64
gulp.task('toBase64', () => {
    gulp.src('./dist/css/*.css')
        .pipe(base64({
            baseDir: './dist',
            extensions: ['svg', 'png'],
            exclude: [/\.server\.(com|net)\/dynamic\//, '--live.jpg'],
            maxImageSize: 8 * 1024, // bytes 
            debug: true
        }))
        .pipe(concat('index.css'))
        .pipe(gulp.dest('./dist/css'));
})

// 复制图片到开发环境
gulp.task('copy-images', () => {
    gulp.src('./src/images/**/*')
        .pipe(gulp.dest('./dev/images'))
})

// 动态监测更新文件
gulp.task('html:watch', () => {
    gulp.watch('./src/*.html', ['html']);
});
gulp.task('sass:watch', () => {
    gulp.watch('./src/**/*.scss', ['scss-to-css']);
});
gulp.task('ts:watch', ['compile-ts:dev'], () => {
    gulp.watch('./src/ts/*.ts', ['compile-ts:dev'])
})

gulp.task('images:watch', ['copy-images'], () => {
    gulp.watch('src/images/**/*', {
        cwd: './'
    }, ['copy-images']);
})

// 生成生产环境 ,依赖于dev文件夹,所以先执行build:dev.
gulp.task('build:prod', ['clean', 'build:dev'], () => {
    // move html
    gulp.src('./dev/*.html').pipe(gulp.dest('./dist/'))

    // move css
    gulp.src('./dev/css/**/*.css').pipe(gulp.dest('./dist/css/'))

    //move & format  js
    gulp.src('./dev/js/*.js')
        .pipe(eslint({
            fix: true,
            configFile: '.eslintrc.json'
        }))
        // eslint.format() outputs the lint results to the console.
        .pipe(eslint.format())
        // .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'))

    //minify images
    gulp.start('minify-images');
})

// 热重载服务器,以及跨域设置
gulp.task('serve', () => {
    const apiProxy = proxy('/api/', {
        target: "localhost:3001/api/",
        changeOrigin: true,
        ws: true
    });
    browserSync.init({
        port: 3001,
        server: {
            baseDir: "./dev",
            index: 'index.html',
            middleware: [apiProxy]
        }
    });
    // 当更新html时,进行重载
    gulp.watch(`${devPath}/index.html`).on("change", reload);
    // 当更新js时 ,进行重载
    gulp.watch(`${devPath}/js/**/*.js`).on("change", reload)
})

// 生成开发环境
gulp.task('build:dev', ['html', 'scss-to-css', 'compile-ts:dev'], () => {
    gulp.start('html:watch')
    gulp.start('ts:watch')
    gulp.start('sass:watch')
    gulp.start('images:watch')

    gulp.start('serve')
})



gulp.task('default', ['html', 'scss-to-css'], function () {
    gulp.start('build:dev');
    gutil.log(gutil.colors.green('Big bro is Watching something...') + ":goodLuck")
});