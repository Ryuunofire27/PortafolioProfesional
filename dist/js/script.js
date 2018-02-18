'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/*
       Changing TextWithout Animation
*/

var setText = function setText(textContainerElement, text) {
  textContainerElement.innerHTML = text;
};

var getTextAboutGallery = function getTextAboutGallery(carouselImageElement, galleryArray) {
  var i = carouselImageElement.id.split('-')[1];
  return galleryArray[i].description;
};

var changeText = function changeText(textContainerElement, text, carouselImageElement, galleryObject, delay) {
  setInterval(function () {}, delay);
};

var getArrayChildrens = function getArrayChildrens(element) {
  return [].concat(_toConsumableArray(element.children));
};

/*        LIGHTBOX     */

var getImagesElements = function getImagesElements(contentElement) {
  return [].concat(_toConsumableArray(contentElement.querySelectorAll('img')));
};

var getLargeImages = function getLargeImages(images) {
  return images.map(function (el) {
    return el.src;
  }).map(function (el) {
    return el.replace('thumb', 'large');
  });
};

var getImagesDescriptions = function getImagesDescriptions(images) {
  return images.map(function (el) {
    return el.alt;
  });
};

var navigateLightbox = function navigateLightbox(lightboxElement, larges, descriptions, i) {
  var prevButton = lightboxElement.querySelector('.prev');
  var nextButton = lightboxElement.querySelector('.next');
  var image = lightboxElement.querySelector('img');
  var description = lightboxElement.querySelector('p');
  var counter = lightboxElement.querySelector('span');
  var closeButton = lightboxElement.querySelector('.close-modal');

  window.addEventListener('keyup', function (e) {
    if (e.key === 'ArrowRight') nextButton.click();
    if (e.key === 'ArrowLeft') prevButton.click();
    if (e.key === 'Escape') closeButton.click();
  });

  lightboxElement.addEventListener('click', function (e) {
    e.preventDefault();

    if (e.target === prevButton) {
      if (i > 0) {
        image.src = larges[--i];
      } else {
        image.src = larges[larges.length - 1];
        i = larges.length - 1;
      }
    } else if (e.target === nextButton) {
      if (i < larges.length - 1) {
        image.src = larges[++i];
      } else {
        image.src = larges[0];
        i = 0;
      }
    }
    description.textContent = descriptions[i];
    counter.textContent = 'Imagen ' + (i + 1) + ' de ' + larges.length;
  });
};

var closeModal = function closeModal(modalElement) {
  var closeModalElement = modalElement.querySelector('.close-modal');
  closeModalElement.addEventListener('click', function (e) {
    e.preventDefault();
    document.body.removeChild(modalElement);
  });
};

var openLightbox = function openLightbox(images, i, larges, descriptions) {
  var lightboxElement = document.createElement('div');
  lightboxElement.innerHTML += '\n\t\t\t<div class="lightbox-overlay">\n\t\t\t\t<figure class="lightbox-container">\n\t\t\t\t\t<div class="close-modal">\uD83D\uDDD9</div>\n\t\t\t\t\t<img src="' + larges[i] + '" alt="' + descriptions[i] + '"\n\t\t\t\t\t\tclass="lightbox-image">\n\t\t\t\t\t<figcaption>\n\t\t\t\t\t\t<p class="lightbox-description">' + descriptions[i] + '</p>\n\t\t\t\t\t\t<nav class="lightbox-navigation">\n\t\t\t\t\t\t\t<a href="#" class="lightbox-navigation__button prev">\u25C0</a>\n\t\t\t\t\t\t\t<span class="lightbox-navigation__counter">Imagen ' + (i + 1) + ' de ' + images.length + '</span>\n\t\t\t\t\t\t\t<a href="#" class="lightbox-navigation__button next">\u25B6</a>\n\t\t\t\t\t\t</nav>\n\t\t\t\t\t</figcaption>\n\t\t\t\t</figure>\n\t\t\t</div>\n\t\t';
  lightboxElement.id = 'lightbox';
  document.body.insertBefore(lightboxElement, document.querySelector('script'));
  closeModal(lightboxElement);
  navigateLightbox(lightboxElement, larges, descriptions, i);
};

var openLightboxEvent = function openLightboxEvent(container, images, larges, descriptions) {
  container.addEventListener('click', function (e) {
    var el = e.target;
    var i = images.indexOf(el);
    if (el.tagName === 'IMG') {
      openLightbox(images, i, larges, descriptions);
    }
  });
};

var lightbox = function lightbox(container) {
  var images = getImagesElements(container);
  var largeImgs = getLargeImages(images);
  var descriptions = getImagesDescriptions(images);

  openLightboxEvent(container, images, largeImgs, descriptions);
};

/*        LIGHTBOX      */

/*        Carousel      */

var getImages = function getImages(imagesContainerElement) {
  return [].concat(_toConsumableArray(imagesContainerElement.querySelectorAll('img')));
};

var setImageToCarousel = function setImageToCarousel(carouselImageElement, imagen) {
  var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  carouselImageElement.src = imagen.src.replace('thumb', 'large');
  carouselImageElement.id = 'gallery-' + i;
};

var getIndexCarouselCurrentImg = function getIndexCarouselCurrentImg(carouselImageElement) {
  return parseInt(carouselImageElement.id.split('-')[1], 10);
};

var animateCarousel = function animateCarousel(carouselImageElement, images, textContainer, gallery, delay) {
  var time = 0;
  var timeDelay = delay;
  var i = 1;
  var description = void 0;
  setImageToCarousel(carouselImageElement, images[0]);
  description = getTextAboutGallery(carouselImageElement, gallery);
  setText(textContainer, description);
  setInterval(function () {
    if (i === getIndexCarouselCurrentImg(carouselImageElement)) {
      if (time === timeDelay) {
        if (i < images.length - 1) {
          i++;
        } else {
          i = 0;
        }
        setImageToCarousel(carouselImageElement, images[i], i);
        description = getTextAboutGallery(carouselImageElement, gallery);
        setText(textContainer, description);
        time = 0;
        timeDelay = delay;
      } else {
        time += 100;
      }
    } else {
      i = getIndexCarouselCurrentImg(carouselImageElement);
      time = 0;
      timeDelay = delay * 2;
    }
  }, 100);
};

var prevButtonEvent = function prevButtonEvent(carouselImageElement, prevNavElement, images, textContainer, gallery) {
  prevNavElement.addEventListener('click', function () {
    var i = getIndexCarouselCurrentImg(carouselImageElement);
    var description = getTextAboutGallery(carouselImageElement, gallery);
    i = i > 0 ? --i : images.length - 1;
    setImageToCarousel(carouselImageElement, images[i], i);
    setText(textContainer, description);
  });
};
var nextButtonEvent = function nextButtonEvent(carouselImageElement, nextNavElement, images, textContainer, gallery) {
  nextNavElement.addEventListener('click', function () {
    var i = getIndexCarouselCurrentImg(carouselImageElement);
    var description = getTextAboutGallery(carouselImageElement, gallery);
    i = i < images.length - 1 ? ++i : 0;
    setImageToCarousel(carouselImageElement, images[i], i);
    setText(textContainer, description);
  });
};

var navigatorCarousel = function navigatorCarousel(carouselImageElement, prevNavElement, nextNavElement, images, textContainer, gallery) {
  prevButtonEvent(carouselImageElement, prevNavElement, images, textContainer, gallery);
  nextButtonEvent(carouselImageElement, nextNavElement, images, textContainer, gallery);
};

var carousel = function carousel(carouselImageElement, prevNavElement, nextNavElement, images, textContainer, gallery, delay) {
  animateCarousel(carouselImageElement, images, textContainer, gallery, delay);
  navigatorCarousel(carouselImageElement, prevNavElement, nextNavElement, images, textContainer, gallery);
};

/*
  const galleryImageEvent = (galleryContainerElement) => {
    galleryContainerElement.
  };
*/
/*
       Carousel
*/

/*        Changing TextWithout Animation  */

var descriptionElement = document.querySelector('.description');

var navigatorListElement = document.querySelector('.navigator-list');

var carouselImageElement = document.querySelector('.carousel-container-img').querySelector('img');

var controlCarouselContainer = document.getElementById('carousel-container');

var prevNavElement = controlCarouselContainer.querySelector('#prev-button');

var nextNavElement = controlCarouselContainer.querySelector('#next-button');

var imagesContainerElement = document.getElementById('gallery-container');

var images = getImages(imagesContainerElement);

var textContainer = document.querySelector('.dev-page-description');

var headerElement = document.querySelector('header');

var gallery = [{
  name: 'Proyecto 1',
  description: 'En este proyecto utilice las siguientes tecnologias: react, node.js, mongodb, express',
  imgs: [{
    name: '1',
    alt: '1',
    ext: 'png'
  }, {
    name: '2',
    alt: '2',
    ext: 'png'
  }, {
    name: 'adopta-mascotas',
    alt: 'adopta tu mascota',
    ext: 'png'
  }, {
    name: 'bd',
    alt: 'base de datos',
    ext: 'png'
  }]
}, {
  name: 'Proyecto 2',
  description: 'En este proyecto utilice el MEAN',
  imgs: [{
    name: '2',
    alt: '2',
    ext: 'png'
  }, {
    name: '1',
    alt: '1',
    ext: 'png'
  }, {
    name: 'adopta-mascotas',
    alt: 'adopta tu mascota',
    ext: 'png'
  }, {
    name: 'bd',
    alt: 'base de datos',
    ext: 'png'
  }]
}, {
  name: 'Proyecto 3',
  description: 'En este proyecto utilice las siguientes tecnologias: javaEE, angular y graphQL',
  imgs: [{
    name: 'adopta-mascotas',
    alt: 'adopta tu mascota',
    ext: 'png'
  }, {
    name: '1',
    alt: '1',
    ext: 'png'
  }, {
    name: '2',
    alt: '2',
    ext: 'png'
  }, {
    name: 'bd',
    alt: 'base de datos',
    ext: 'png'
  }]
}, {
  name: 'Proyecto 2',
  description: 'En este proyecto utilice Vue.js, go y mongodb',
  imgs: [{
    name: 'bd',
    alt: 'base de datos',
    ext: 'png'
  }, {
    name: '1',
    alt: '1',
    ext: 'png'
  }, {
    name: '2',
    alt: '2',
    ext: 'png'
  }, {
    name: 'adopta-mascotas',
    alt: 'adopta tu mascota',
    ext: 'png'
  }]
}, {
  name: 'Proyecto 2',
  description: 'En este proyecto utilice las siguientes tecnologias: react, node.js, mongodb, express',
  imgs: [{
    name: 'adopta-mascotas',
    alt: 'adopta tu mascota',
    ext: 'png'

  }, {
    name: '1',
    alt: '1',
    ext: 'png'

  }, {
    name: '2',
    alt: '2',
    ext: 'png'

  }, {
    name: 'bd',
    alt: 'base de datos',
    ext: 'png'

  }]

}, {
  name: 'Proyecto 2',
  description: 'En este proyecto utilice las siguientes tecnologias: react, node.js, mongodb, express',
  imgs: [{
    name: '1',
    alt: '1',
    ext: 'png'

  }, {
    name: '2',
    alt: '2',
    ext: 'png'

  }, {
    name: 'adopta-mascotas',
    alt: 'adopta tu mascota',
    ext: 'png'

  }, {
    name: 'bd',
    alt: 'base de datos',
    ext: 'png'

  }]

}];

lightbox(document.documentElement);

scrollAnimation(getArrayChildrens(navigatorListElement), 200, headerElement.clientHeight);

carousel(carouselImageElement, prevNavElement, nextNavElement, images, textContainer, gallery, 3000);

writingAnimation('Hola soy Charlie y esta es mi página web, espero que te guste', descriptionElement, 50, false, 2000);