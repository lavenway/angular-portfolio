'use strict';

// INCLUDE GULP
var gulp = require('gulp'),

// DEFINE BASE FOLDERS
    src = 'prod/',
    dest = 'dist/',

// INCLUDE PLUGINS
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    cache = require('gulp-cache'),
    concat = require('gulp-concat'),
    cssnano = require('gulp-cssnano'),
    del = require('del'),
    environments = require('gulp-environments'),
    flatten = require('gulp-flatten'),
    ignore = require('gulp-ignore'),
    include = require('gulp-html-tag-include'),
    imagemin = require('gulp-imagemin'),
    jshint = require('gulp-jshint'),
    phpconnect = require('gulp-connect-php'),
    phplint = require('gulp-phplint'),
    rename = require('gulp-rename'),
    runSequence = require('run-sequence'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    zip = require('gulp-zip');


// CONFIGURTIONS
// -------------
  // ENVIRONMENT TYPES
  var development = environments.development, //RUN - gulp --env development
      production = environments.production; //RUN gulp --env production

  // PORT TO USE FOR THE DEVELOPMENT SERVER
  var PORT = 8000;

  // BROWSERS TO TARGET WHEN PREFIXING CSS.
  var COMPATIBILITY = ['last 2 versions', 'ie >= 9'];

  // ASSET PATHS
  var PATHS = {
    imagefiles: [
      'img/**/*'
    ],
    faviconfiles: [
      'favicon/**/*'
    ],
    fontfiles: [
      'fonts/**/*'
    ],
    sassfiles: [
      'sass/**/*.scss'
    ],
    jslibfiles: [
      'js/lib/*.js'
    ],
    jsutilfiles: [
      'js/util/*.js'
    ],
    jsframeworkfiles: [
      'js/framework/**/*.js'
    ],
    jsallfiles: [
      'js/**/*.js'
    ],
    jsonfiles: [
      'json/**/*.json'
    ],
    htmlfiles: [
      'templates/**/*.html'
    ],
    phpfiles: [
      'php/**/*.php'
    ],
  };

// OPTIMISATION TASKS
// ------------------
  // BUILD HTML FILES
  gulp.task('html-include', function() {
    var condition = '*/_*.html'; //exclude condition
    return gulp.src(src + PATHS.htmlfiles)
      .pipe(include())
      .pipe(ignore.exclude(condition))
      .pipe(flatten())
      .pipe(gulp.dest(dest));
  });

  // COPY JS UTIL FILES
  gulp.task('util-scripts', function() {
    return gulp.src(src + PATHS.jsutilfiles)
      .pipe(concat('util.js'))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(dest + 'HTMLResources/js'));
  });

  // CONCATENATE & MINIFY LIBRARY JS
  gulp.task('lib-scripts', function() {
    return gulp.src(src + PATHS.jslibfiles)
      .pipe(development(sourcemaps.init()))
      .pipe(concat('lib.js'))
      .pipe(production(uglify()))
      .pipe(rename({suffix: '.min'}))
      .pipe(development(sourcemaps.write('.')))
      .pipe(gulp.dest(dest + 'HTMLResources/js'));
  });

  // CONCATENATE & MINIFY FRAMEWORK JS
  gulp.task('framework-scripts', function() {
    return gulp.src(src + PATHS.jsframeworkfiles)
      .pipe(development(sourcemaps.init()))
      .pipe(concat('framework.js'))
      .pipe(production(uglify()))
      .pipe(rename({suffix: '.min'}))
      .pipe(development(sourcemaps.write('.')))
      .pipe(gulp.dest(dest + 'HTMLResources/js'));
  });

  // LINT JS FILES
  gulp.task('lint', function() {
  return gulp.src([src + PATHS.jsframeworkfiles, 'gulpfile.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'));
  });

  // LINT PHP FILES
  gulp.task('phplint', function() {
  return gulp.src([src + PATHS.phpfiles])
    .pipe(phplint());
  });

  // Compile CSS from Sass files
  gulp.task('sass', function() {
    return gulp.src(src + PATHS.sassfiles, {style: 'compressed'})
      .pipe(development(sourcemaps.init()))
      .pipe(sass())
      .pipe(autoprefixer({browsers: COMPATIBILITY}))
      .pipe(concat('main.css'))
      .pipe(production(cssnano()))
      .pipe(rename({suffix: '.min'}))
      .pipe(development(sourcemaps.write('.')))
      .pipe(gulp.dest(dest + 'HTMLResources/css'));
  });

  // COPYING JSON
  gulp.task('json', function() {
    return gulp.src(src + PATHS.jsonfiles)
      .pipe(gulp.dest(dest + 'HTMLResources/json'));
  });

  // COPYING PHP
  gulp.task('php', function() {
    return gulp.src(src + PATHS.phpfiles)
      .pipe(gulp.dest(dest + 'HTMLResources/php'));
  });

  // COMPRESS IMAGES
  gulp.task('images', function() {
    return gulp.src(src + PATHS.imagefiles)
      .pipe(production(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))))
      .pipe(gulp.dest(dest + 'HTMLResources/img'));
  });

  // COPYING FONTS
  gulp.task('fonts', function() {
    return gulp.src(src + PATHS.fontfiles)
      .pipe(gulp.dest(dest + 'HTMLResources/fonts'));
  });

  // COPYING FAVICONS
  gulp.task('favicon', function() {
    return gulp.src(src + PATHS.faviconfiles)
      .pipe(gulp.dest(dest));
  });

  // CLEANING
  gulp.task('clean', function() {
    return del.sync(dest).then(function(cb) {
      return cache.clearAll(cb);
    });
  });

  gulp.task('clean:dist', function() {
    return del.sync([dest + '**/*', '!dist/HTMLResources/img', '!dist/HTMLResources/img/**/*']);
  });

  // REMOVE REMOTE DIST DIRECTORY
  gulp.task('rmdirdist', function (cb) {
    return gulp.src(dest, {buffer: true});
  });


// BUILD SEQUENCES
// ---------------
  // BUILD THE 'DIST' FOLDER BY RUNNING ALL OF THE SPECIFIED TASKS
  gulp.task('build', function(callback) {
    runSequence('clean:dist',
      ['html-include', 'sass', 'util-scripts', 'lib-scripts', 'framework-scripts', 'lint', 'phplint', 'images', 'favicon', 'fonts', 'json', 'php'],
      callback
    );
  });

  // START BROWSERSYNC SERVER
  gulp.task('browserSync', ['build'], function() {
    browserSync.init({
      proxy: '127.0.0.1:8000'
      /*server: {
        baseDir: dest, port: PORT
      }*/
    });
  });

  gulp.task('phpserver', ['build'], function() {
    phpconnect.server({ base: dest, port: PORT, keepalive: true});
  });

  /*gulp.task('phpserver', ['build'], function() {
    phpconnect.server({ proxy: '127.0.0.1:8000', port: PORT, keepalive: true});
  });*/

  // BUILD THE SITE, RUN THE SERVER IN PRODUCTION MODE
  gulp.task('default', ['build', 'browserSync', 'phpserver'], function() {
    // WATCH HTML FILES
    gulp.watch(src + PATHS.htmlfiles, ['html-include', browserSync.reload]);
    // WATCH JS FILES
    gulp.watch(src + PATHS.jsallfiles, ['util-scripts', 'lib-scripts', 'framework-scripts', 'lint', 'phplint', browserSync.reload]);
    // WATCH JSON FILES
    gulp.watch(src + PATHS.jsonfiles, ['json', browserSync.reload]);
    // WATCH PHP FILES
    gulp.watch(src + PATHS.phpfiles, ['php', browserSync.reload]);
     // WATCH SASS FILES
    gulp.watch(src + PATHS.sassfiles, ['sass', browserSync.reload]);
     // WATCH IMAGE FILES
    gulp.watch(src + PATHS.imagefiles, ['images', browserSync.reload]);
  });
