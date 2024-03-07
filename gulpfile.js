const { src, dest, watch, parallel} = require('gulp')

//CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

//Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done){

    src('src/scss/**/*.scss')    //Identificar el arhivos de SASS
    .pipe( plumber() ) //Evita parar la ejecución cada que haya un error en scss
    .pipe( sass() ) //Compilar el arhivo de SASS
    .pipe( dest('build/css')); //Almacenarla en el disco duro

    done(); //callback que avisa a gulp que llegamos al final
}

function imagenes ( done ){

    const opciones ={
        optimizationLevel: 3
    }

    src('src/img/**/*.{png,jpg}')
        .pipe( cache( imagemin(opciones) ))
        .pipe( dest('build/img') )
    done();
}

function versionWebp(done) {

    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{png,jpg}')
        .pipe( webp(opciones) )
        .pipe( dest('build/img') )
    done();
} 

function versionAvif(done) {

    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{png,jpg}')
        .pipe( avif(opciones) )
        .pipe( dest('build/img') )
    done();
} 

function dev(done){

    watch('src/scss/**/*.scss', css)

    done();
}

exports.css = css;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.imagenes = imagenes;
exports.dev = parallel( imagenes, versionWebp, versionAvif, dev); 