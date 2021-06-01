const fs = require('fs');
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const del = require('del');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const { spawnSync } = require('child_process');

var notifier = require('gulp-notify');
require('colors');
var onError = function (err) {
    console.log(err);
    notifier.onError({
        title: 'Gulp',
        subtitle: 'Failure!',
        message: 'Error: <%= error.message %>',
        timeout: 5,
        sound: 'Beep',
    })(err);
};

var base64 = require('gulp-base64');
var plumber = require('gulp-plumber');

const plugins = gulpLoadPlugins();

const env = process.env.NODE_ENV || 'dev';

const buildRename=()=>{
    gulp
        .src(['src/**/*.wxml'])
        .pipe(plugins.rename({ extname: '.xml' }))
        .pipe(gulp.dest(function(file){
            del(['src/**/*.wxml'])
            return file.base
        }));
}

const build = gulp.series(gulp.parallel(buildRename));

// exports.build = build;
// gulp.task('build',()=>{
//     return gulp
//     .src(['src/**/*.wxss'])
//     .pipe(plugins.rename({ extname: '.less' }))
//     .pipe(gulp.dest(function(file){
//         del(['src/**/*.wxss']);
//         return file.base
//     }));
// })

// const clean = () => {
//     return del('dist/*');
// };

// const compileJs = () => {
//     return (
//         gulp
//             .src([
//                 'src/**/*.js',
//                 '!src/utils/config.js',
//                 '!src/utils/config.dev.js',
//                 '!src/utils/config.gray.js'
//             ])
//             .pipe(
//                 plumber({
//                     errorHandler: onError,
//                 })
//             )
//             .pipe(plugins.babel())
//             // .pipe(plugins.if(isProduction, plugins.uglify()))
//             .pipe(plugins.sourcemaps.write('.'))
//             .pipe(gulp.dest('dist'))
//     );
// };

// const compileXml = () => {
//     return (
//         gulp
//             .src(['src/**/*.xml'])
//             // .pipe(plugins.sourcemaps.init())
//             // .pipe(plugins.if(isProduction, plugins.htmlmin({
//             //     removeComments: true,   // 删除注释
//             // })))
//             .pipe(plugins.rename({ extname: '.wxml' }))
//             .pipe(plugins.sourcemaps.write('.'))
//             .pipe(gulp.dest('dist'))
//     );
// };
// const compileLess = () => {
//     return (
//         gulp
//             .src(['src/**/*.less', '!src/common/*'])
//             // .pipe(plugins.sourcemaps.init())
//             .pipe(
//                 base64({
//                     extensions: ['svg', 'png', 'jpg'],
//                     maxImageSize: 1024 * 1024 * 1024 * 1024,
//                 })
//             )
//             .pipe(plugins.less())
//             .pipe(autoprefixer())
//             .on(
//                 'error',
//                 notifier.onError(function (error) {
//                     return 'Message to the notifier: ' + error.message;
//                 })
//             )

//             // .pipe(plugins.if(isProduction, plugins.cssnano({ compatibility: '*' })))
//             .pipe(plugins.rename({ extname: '.wxss' }))
//             .pipe(plugins.sourcemaps.write('.'))
//             .pipe(gulp.dest('dist'))
//     );
// };
// const compileJson = () => {
//     return (
//         gulp
//             .src(['src/**/*.json'])
//             // .pipe(plugins.sourcemaps.init())
//             .pipe(plugins.jsonminify())
//             .pipe(plugins.sourcemaps.write('.'))
//             .pipe(gulp.dest('dist'))
//     );
// };

// const compileImg = () => {
//     return gulp
//         .src(['src/icon/*.{jpg,jpeg,png,gif}'])
//         .pipe(gulp.dest('dist/icon'));
// };

// const compilePackage = () => {
//     return gulp
//         .src(['node_modules/wpt-uploadImg/**'])
//         .pipe(gulp.dest('dist/node_modules/wpt-uploadImg'));
// };

// const extras = () => {
//     return gulp
//         .src([
//             'src/**/*.*',
//             '!src/**/*.js',
//             '!src/**/*.xml',
//             '!src/**/*.less',
//             '!src/**/*.json',
//             '!src/**/*.{jpeg,png,gif}',
//             'package.json'
//         ])
//         .pipe(gulp.dest('dist'))
//         .pipe(notifier('Gulp down'));
// };

// // 生成 dist 的 project.config.js
// const config = () => {
//     var src;
//     var ishavejson;

//     if (env === 'dev') {
//         ishavejson = fs.existsSync('dev.config.json');
//         if (ishavejson) {
//             src = 'dev.config.json';
//         } else {
//             src = 'project.config.dev.json';
//         }
//     } else {
//         ishavejson = fs.existsSync('online.config.json');
//         if (ishavejson) {
//             src = 'online.config.json';
//         } else {
//             src = 'project.config.json';
//         }
//     }
//     return gulp
//         .src(src)
//         .pipe(rename({ basename: 'project.config' }))
//         .pipe(gulp.dest('dist'))
//         .pipe(notifier('Gulp down'));
// };

// const openTool = (next) => {
//     var projectPath = __dirname + '/dist';
//     spawnSync(
//         '/Applications/wechatwebdevtools.app/Contents/MacOS/cli',
//         ['-o', projectPath],
//         {
//             stdio: 'inherit',
//         }
//     );
//     next();
// };
// // 缓存开发配置到
// const cacheConfig = () => {
//     var jsonname;

//     if (env === 'dev') {
//         jsonname = 'dev.config';
//     } else {
//         jsonname = 'online.config';
//     }
//     return gulp
//         .src(['dist/project.config.json'])
//         .pipe(rename({ basename: jsonname }))
//         .pipe(gulp.dest('./'));
// };

// const watchConfig = () => {
//     return gulp.watch('dist/project.config.json', cacheConfig);
// };

// const addConfig = () => {
//     var src;
//     if (env === 'dev') {
//         src = 'src/utils/config.dev.js';
//     } else if(env==='gray'){
//         src = 'src/utils/config.gray.js';
//     } else {
//         src = 'src/utils/config.js';
//     }
//     return (
//         gulp
//             .src(src, { base: 'src' })
//             .pipe(plumber({ errorHandler: onError }))
//             .pipe(plugins.babel())
//             // .pipe(plugins.if(isProduction, plugins.uglify()))
//             .pipe(plugins.sourcemaps.write('.'))
//             .pipe(rename({ basename: 'config' }))
//             .pipe(gulp.dest('dist'))
//     );
// };

// const compile = gulp.parallel(
//     compileJs,
//     compileLess,
//     compileXml,
//     compileJson,
//     compileImg,
//     config,
//     addConfig,
//     compilePackage
// );

// const build = gulp.series(clean, compile, extras);

// exports.online = build;

// exports.watch = gulp.series(
//     build,
//     openTool,
//     gulp.parallel(
//         function watchImg() {
//             return gulp.watch('src/**/*.{jpe?g,png,gif}', compileImg);
//         },
//         function watchJs() {
//             return gulp.watch('src/**/*.js', compileJs);
//         },
//         function watchXml() {
//             return gulp.watch('src/**/*.xml', compileXml);
//         },
//         function watchLess() {
//             return gulp.watch('src/**/*.less', compileLess);
//         },
//         function watchJson() {
//             return gulp.watch('src/**/*.json', compileJson);
//         }
//     ),
//     watchConfig
// );
