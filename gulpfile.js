'use strict';

const gulp = require('gulp'),
  pug = require('gulp-pug'),
  sass = require('gulp-sass'),
  babel = require('gulp-babel'),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),
  useref = require('gulp-useref'),
  concat = require('gulp-concat'),
  uncss = require('gulp-uncss'),
  autoprefixer = require('gulp-autoprefixer'),
  cleanCSS = require('gulp-clean-css'),
  uglify = require('gulp-uglify'),
  htmlmin = require('gulp-htmlmin'),
  dir = {
    src: 'src',
    dist: 'dist',
    nm: 'node_modules'
  },
  files = {
    CSS: [
      `${dir.nm}/animate.css/animate.min.css`,
      `${dir.nm}/font-awesome/css/font-awesome.min.css`,
      `${dir.nm}/responsimple/responsimple.min.css`,
      `${dir.nm}/owl.carousel/dist/assets/owl.carousel.min.css`,
      `${dir.nm}/owl.carousel/dist/assets/owl.theme.default.min.css`,
      `${dir.dist}/css/estilos.css`
    ],
    mCSS: 'estilos.min.css',
    JS: [
      `${dir.nm}/writing-animation/dist/writing-animation.js`,
      `${dir.nm}/scroll-animation-js/dist/scroll-animation.js`,
      `${dir.nm}/carousel-slider-js/dist/carousel-js.js`,
      `${dir.dist}/js/script.js`
    ],
    mJS: 'codigos.min.js',
    fonts: [`${dir.nm}/font-awesome/fonts/*.*`],
    statics : [
      `${dir.src}/humans.txt`,
      `${dir.src}/sitemap.xml`
    ]
  },
  opts = {
    pug: {
      pretty : true,
      locals : {
        title : 'Carlos Villagomez',
        files : files,
        galleries:[
          {
            name: 'Proyecto 1',
            description: 'En este proyecto utilice las siguientes tecnologias: react, node.js, mongodb, express',
            imgs : [
              {
                name: '1',
                alt: '1',
                ext: 'png'
              },
              {
                name: '2',
                alt: '2',
                ext: 'png'
              },
              {
                name: 'adopta-mascotas',
                alt: 'adopta tu mascota',
                ext: 'png'
              },
              {
                name: 'bd',
                alt: 'base de datos',
                ext: 'png'
              }
            ]
          },
          {
            name: 'Proyecto 2',
            description: 'En este proyecto utilice las siguientes tecnologias: react, node.js, mongodb, express',
            imgs : [
              {
                name: '2',
                alt: '2',
                ext: 'png'
              },
              {
                name: '1',
                alt: '1',
                ext: 'png'
              },
              {
                name: 'adopta-mascotas',
                alt: 'adopta tu mascota',
                ext: 'png'
              },
              {
                name: 'bd',
                alt: 'base de datos',
                ext: 'png'
              }
            ]
          },
          {
            name: 'Proyecto 3',
            description: 'En este proyecto utilice las siguientes tecnologias: react, node.js, mongodb, express',
            imgs : [
              {
                name: 'adopta-mascotas',
                alt: 'adopta tu mascota',
                ext: 'png'
              },
              {
                name: '1',
                alt: '1',
                ext: 'png'
              },
              {
                name: '2',
                alt: '2',
                ext: 'png'
              },
              {
                name: 'bd',
                alt: 'base de datos',
                ext: 'png'
              }
            ]
          },
          {
            name: 'Proyecto 2',
            description: 'En este proyecto utilice las siguientes tecnologias: react, node.js, mongodb, express',
            imgs : [
              {
                name: 'bd',
                alt: 'base de datos',
                ext: 'png'
              },
              {
                name: '1',
                alt: '1',
                ext: 'png'
              },
              {
                name: '2',
                alt: '2',
                ext: 'png'
              },
              {
                name: 'adopta-mascotas',
                alt: 'adopta tu mascota',
                ext: 'png'
              }
            ]
          },
          {
            name: 'Proyecto 2',
            description: 'En este proyecto utilice las siguientes tecnologias: react, node.js, mongodb, express',
            imgs : [
              {
                name: '2',
                alt: '2',
                ext: 'png'
              },
              {
                name: '1',
                alt: '1',
                ext: 'png'
              },
              {
                name: 'adopta-mascotas',
                alt: 'adopta tu mascota',
                ext: 'png'
              },
              {
                name: 'bd',
                alt: 'base de datos',
                ext: 'png'
              }
            ]
          },
          {
            name: 'Proyecto 2',
            description: 'En este proyecto utilice las siguientes tecnologias: react, node.js, mongodb, express',
            imgs : [
              {
                name: '1',
                alt: '1',
                ext: 'png'
              },
              {
                name: '2',
                alt: '2',
                ext: 'png'
              },
              {
                name: 'adopta-mascotas',
                alt: 'adopta tu mascota',
                ext: 'png'
              },
              {
                name: 'bd',
                alt: 'base de datos',
                ext: 'png'
              }
            ]
          }
        ],
        sections: [
          /*{
            name: 'Inicio',
            hash: 'top'
          },*/
          {
            name: 'Sobre mi',
            hash: 'aboutme'
          },
          {
            name: 'Paginas Desarrolladas',
            hash: 'devpages'
          },
          {
            name: 'Contactame',
            hash: 'contactme'
          }
        ]
      }
    },
    sass : { outputStyle: 'compressed' },
    es6 : { presets : ['es2015'] },
    imagemin : {
      progressive : true,
      use : [ pngquant() ]
    },
    uncss : { html : [`${dir.dist}/*.html`] },
    autoprefixer : {
      browsers : ['last 5 versions'],
      cascade : false
    },
    htmlmin : {collapseWhitespace: true}
  };

gulp.task('pug', () => {
  gulp
  .src( `${dir.src}/pug/*.pug` )
  .pipe( pug(opts.pug) )
  .pipe( gulp.dest(dir.dist) );
});

gulp.task('sass', () => {
  gulp
  .src(`${dir.src}/scss/*.scss`)
  .pipe( sass( opts.sass ) )
  .pipe( gulp.dest(`${dir.dist}/css`) );
});

gulp.task('es6', () => {
  gulp
  .src(`${dir.src}/js/*.js`)
  .pipe( babel(opts.es6) )
  .pipe( gulp.dest(`${dir.dist}/js`) );
});

gulp.task('img', () => {
  gulp
  .src( `${dir.src}/img/**/*.+(png|jpeg|jpg|gif)` )
  .pipe( imagemin(opts.imagemin) )
  .pipe( gulp.dest(`${dir.dist}/img`) );
});

gulp.task('fonts', () => {
  gulp
  .src(files.fonts)
  .pipe( gulp.dest(`${dir.dist}/fonts`) );
});

gulp.task('statics', () => {
  gulp
  .src(files.statics)
  .pipe( gulp.dest(dir.dist) );
});

gulp.task('css', () => {
  gulp
  .src(files.CSS)
  .pipe( concat(files.mCSS) )
  .pipe( uncss(opts.uncss) )
  .pipe( autoprefixer(opts.autoprefixer) )
  .pipe( cleanCSS() )
  .pipe( gulp.dest(`${dir.dist}/css`) );
});

gulp.task('js', () => {
  gulp
  .src( files.JS )
  .pipe( concat(files.mJS) )
  .pipe( uglify() )
  .pipe( gulp.dest(`${dir.dist}/js`) );
});

gulp.task('html', () => {
  gulp
  .src(`${dir.dist}/*.html`)
  .pipe( useref() )
  .pipe( htmlmin(opts.htmlmin) )
  .pipe( gulp.dest(dir.dist) );
});

gulp.task('dist',['css','js','html']);

gulp.task('default', ()=>{
  gulp.watch(`${dir.src}/js/*.js`,['es6', 'js']);
  gulp.watch(`${dir.src}/scss/*.scss`,['sass']);
  gulp.watch(`${dir.src}/pug/*.pug`,['pug']);
});