/* -----------------------------------------------------------------------------
                          The npm n i g h t m a r e
  ------------------------------------------------------------------------------*/
const gulp         = require('gulp');

const merge        = require('merge-stream');

const sass         = require('gulp-dart-sass');

const browserify   = require('browserify');

const uglifyes     = require('uglify-es');
const composer     = require('gulp-uglify/composer');
const uglify       = composer(uglifyes, console);

const source       = require('vinyl-source-stream');
const buffer       = require('vinyl-buffer');

const concat       = require('gulp-concat');


/*
  --- Assets ---
*/
const cssInputPath = 'dev/style/routes/';
const cssOutputPath = 'assets/styles/';

const cssAssetsPaths = [
  {
    src: 'dev/style/core.scss',
    dest: cssOutputPath
  },
  {
    src: cssInputPath + 'home/home.scss',
    dest: cssOutputPath
  },
  {
    src: cssInputPath + 'single/single.scss',
    dest: cssOutputPath
  },
  {
    src: cssInputPath + 'archive/archive.scss',
    dest: cssOutputPath
  },
  {
    src: cssInputPath + 'glitch-art/glitch-art.scss',
    dest: cssOutputPath
  },
  {
    src: cssInputPath + '404/404.scss',
    dest: cssOutputPath
  },
];

/* Function building the CSS from the various SCSS assets */
function cssAssets() {
  let tasks = cssAssetsPaths.map(function(asset){
    return gulp.src(asset.src)
      .pipe(sass({outputStyle: 'compressed'}))
      .pipe(gulp.dest(asset.dest));
  });

  return merge(tasks);
}


/*
  --- Watch ---
*/
const cssWatchPath = 'dev/style/**/**/*.scss';

function cssWatch() {
  gulp.watch(cssWatchPath, cssAssets);
}


/* -----------------------------------------------------------------------------
                                  JS stuff
------------------------------------------------------------------------------*/
/*
  --- Core ---
*/
const jsCoreConfig = {
  src: 'dev/scripts/core.js',
  dest: 'assets/scripts/',
  name: 'core.min.js',
};

function jsCore() {
  const b = browserify({
    entries: jsCoreConfig.src,
    debug: true
  })
  .transform('babelify', { presets: ["@babel/preset-env"] });

  return b.bundle()
    .pipe(source(jsCoreConfig.name))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(jsCoreConfig.dest));
}


/*
  --- Assets---
*/
const jsInputPath = 'dev/scripts/routes/';
const jsOutputPath = 'assets/scripts/';

const jsAssetsPaths = [
    {
      src: jsInputPath + 'home.js',
      dest: jsOutputPath,
      name: 'home.min.js'
    },
    {
      src: jsInputPath + 'single.js',
      dest: jsOutputPath,
      name: 'single.min.js'
    },
    {
      src: jsInputPath + 'glitch-art.js',
      dest: jsOutputPath,
      name: 'glitch-art.min.js'
    },
    {
      src: jsInputPath + '404.js',
      dest: jsOutputPath,
      name: '404.min.js'
    },
];

function jsAssets() {
  let tasks = jsAssetsPaths.map(function(element){
    let b = browserify({
      entries: element.src,
      debug: true
    })
    .transform('babelify', { presets: ["@babel/preset-env"] });

    return b.bundle()
      .pipe(source(element.name))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(gulp.dest(element.dest));
  });
  
  return merge(tasks);
}


/*
  --- Libraries ---
*/
const jsLibConfig = {
  src: 'dev/scripts/libs/*.js',
  dest: 'assets/scripts/',
  name: 'libs.min.js'
};

/* Function used to concat all the libs code into one minified file */
function jsLib() {
  return gulp.src(jsLibConfig.src)
    .pipe(uglify())
    .pipe(concat(jsLibConfig.name))
    .pipe(gulp.dest(jsLibConfig.dest));
}


/*
  --- Watch ---
*/
const jsWatchPath = 'dev/scripts/**/*.js'

function jsWatch() {
  gulp.watch(jsWatchPath, gulp.parallel(jsCore, jsAssets));
}


/* -----------------------------------------------------------------------------
                                f i n a l l y
------------------------------------------------------------------------------*/
// starting by building everything (including JS libraries)
// then watching css and js
const start = gulp.series(
                gulp.series(cssAssets, jsCore, jsAssets, jsLib),
                gulp.parallel(cssWatch, jsWatch)
              );

/*
* Export a default task
*/
exports.default = start;
