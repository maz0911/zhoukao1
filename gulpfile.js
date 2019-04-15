const gulp = require("gulp");
const css = require("gulp-clean-css")
const server = require("gulp-webserver");
const uglify = require("gulp-uglify");
const img = require("gulp-imagemin");
const sass = require("gulp-sass");

//压缩css
gulp.task("css", () => {
        return gulp.src("./src/css/*.css")
            .pipe(css())
            .pipe(gulp.dest("./dest/css"))
    })
    //压缩js
gulp.task("script", () => {
        return gulp.src("./src/js/*.js")
            .pipe(uglify())
            .pipe(gulp.dest("./dest/js"))
    })
    //server起服务
gulp.task("server", () => {
    return gulp.src(".")
        .pipe(server({
            host: "localhost",
            port: 8080,
            livereload: true,
            open: true,
        }))
})
gulp.task("sass", () => {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./dest/css"))
})