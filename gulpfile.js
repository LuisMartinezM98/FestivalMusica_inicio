const { src, dest, watch } = require('gulp')
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

function css(done){

    src('src/scss/**/*.scss')    //Identificar el arhivos de SASS
    .pipe( plumber() ) //Evita parar la ejecución cada que haya un error en scss
    .pipe( sass() ) //Compilar el arhivo de SASS
    .pipe( dest('build/css')); //Almacenarla en el disco duro

    done(); //callback que avisa a gulp que llegamos al final
}

function dev(done){

    watch('src/scss/**/*.scss', css)

    done();
}

exports.css = css;
exports.dev = dev;