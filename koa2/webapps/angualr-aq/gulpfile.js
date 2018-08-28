// 引入 gulp
var gulp = require("gulp");
// 引入组件
var imagemin = require("gulp-imagemin");
var minifycss = require("gulp-minify-css");
var uglify = require("gulp-uglify");
var jshint = require("gulp-jshint");
var concat = require("gulp-concat");
var paths = {
    scripts: [
        "js/angular-1.3.0.js",
        "js/angular-ui-router.js",
        "js/jquery.min.js",
        "js/jquery.slides.min.js",
        "js/ocLazyLoad.min.js",
        "js/ocLazyLoad.min.js",
        "js/ocLazyLoad.min.js",
        "app.js",
        "router/configRouter.js",
        "controller/collectionCtrl.js",
        "controller/contact2Ctrl.js",
        "controller/contactCtrl.js",
        "controller/indexCtrl.js",
        "controller/lookbookCtrl.js",
        "controller/aboutCtrl.js",
        "controller/newsletterCtrl.js",
    ],
    /*
        images: [
            "static/images/*",
            "static/css/images/*",
            "static/js/plugin/img/*",
            "static/js/plugin/treeview/images/*",
            "static/js/plugin/selectseach/images/*.png"
        ],*/
    css: [
        "css/style.css"
    ]
};

gulp.task("images", function() {
    return gulp.src(paths.images)
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest("v1/img"))
});
// 合并、压缩、重命名css
gulp.task("minifycss", function() {
    return gulp.src(paths.css)
        .pipe(minifycss())
        .pipe(concat("all.min.css"))
        .pipe(gulp.dest("v1/css"));
});
// 检查js
gulp.task("lint", function() {
    return gulp.src(paths.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter("default"));
});
// 合并，压缩js文件
gulp.task("javascripts", function() {
    return gulp.src(paths.scripts)
        .pipe(uglify({
            //mangle: false,//类型：Boolean 默认：true 是否修改变量名
            mangle: {
                except: ["$timeout", "$scope", "$http", "publicService", '$rootScope']
            } //排除混淆关键字
        }))
        .pipe(concat("all.min.js"))
        .pipe(gulp.dest("v1/js"));
});

gulp.task("watch", function() {
    gulp.watch(paths.scripts, ["javascripts"]);
    gulp.watch(paths.css, ["minifycss"]);
});

// 默认任务
gulp.task("default", ["minifycss", "javascripts", "watch"]);

// css + js
gulp.task("d", ["minifycss", "javascripts", ]);