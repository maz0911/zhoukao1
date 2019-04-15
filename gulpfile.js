const gulp = require("gulp");
const css = require("gulp-clean-css")
const server = require("gulp-webserver");
const uglify = require("gulp-uglify");
const img = require("gulp-imagemin");
const sass = require("gulp-sass");
const fs = require("fs");
const path = require("path");
const url = require("url");

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
            middleware: (req, res) => {
                let filepath = url.parse(req.url).pathname;
                if (req.url === "/favicon.ico") return;
                if (filepath === "/") {
                    let path1 = fs.readFileSync(path.join(__dirname, "./src/index.html"))
                    res.end(path1)
                } else if (filepath === "/api") {
                    let data = fs.readFileSync(path.join(__dirname, "./src/data/data.json"))
                    res.end(data);
                } else {
                    let file1 = fs.readFileSync(path.join(__dirname, "src", filepath))
                    res.end(file1);
                }
            }
        }))
})