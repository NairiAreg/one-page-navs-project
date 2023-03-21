const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const server = require("gulp-webserver");
const zip = require("gulp-zip");

const css = () =>
  src("./src/css/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("./src/css/"));
const watchScss = () => watch("./src/css/*.scss", css);
const gulpDist = (done) => {
  src([
    "src/*",
    "src/**/*.js",
    "src/**/*.png",
    "src/**/**/*.png",
    "src/**/*.css",
    "gulpfile.js",
    "package.json",
  ]).pipe(dest("dist"));
  done();
};
const gulpZip = (done) => {
  src([
    "src/*",
    "src/**/*.js",
    "src/**/*.png",
    "src/**/**/*.png",
    "src/**/*.css",
    "gulpfile.js",
    "package.json",
  ])
    .pipe(zip("front-hatspanyan.zip"))
    .pipe(dest("build"));
  done();
};
const gulpServer = () => {
  watchScss();
  src("./src").pipe(
    server({
      livereload: true,
      open: true,
      port: 3000,
    })
  );
};

exports.css = css;
exports.watchScss = watchScss;
exports.gulpServer = gulpServer;
exports.gulpZip = gulpZip;
exports.build = series(css, gulpZip, gulpDist);
