/*
       Changing TextWithout Animation
*/

const setText = (textContainerElement, text) => {
  textContainerElement.innerHTML = text;
};

const getTextAboutGallery = (carouselImageElement, galleryArray) => {
  const i = carouselImageElement.id.split('-')[1];
  return galleryArray[i].description;
};

const changeText = (textContainerElement, text, carouselImageElement, galleryObject, delay) => {
  setInterval(() => {


  }, delay);
};

const getArrayChildrens = element => [...element.children];

/*        LIGHTBOX     */

const getImagesElements = contentElement => [...contentElement.querySelectorAll('img')];

const getLargeImages = images =>
  images
    .map(el => el.src)
    .map(el => el.replace('thumb', 'large'));

const getImagesDescriptions = images => images.map(el => el.alt);

const navigateLightbox = (lightboxElement, larges, descriptions, i) => {
  const prevButton = lightboxElement.querySelector('.prev');
  const nextButton = lightboxElement.querySelector('.next');
  const image = lightboxElement.querySelector('img');
  const description = lightboxElement.querySelector('p');
  const counter = lightboxElement.querySelector('span');
  const closeButton = lightboxElement.querySelector('.close-modal');

  window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowRight') nextButton.click();
    if (e.key === 'ArrowLeft') prevButton.click();
    if (e.key === 'Escape') closeButton.click();
  });

  lightboxElement.addEventListener('click', (e) => {
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
    counter.textContent = `Imagen ${i + 1} de ${larges.length}`;
  });
};

const closeModal = (modalElement) => {
  const closeModalElement = modalElement.querySelector('.close-modal');
  closeModalElement.addEventListener('click', (e) => {
    e.preventDefault();
    document.body.removeChild(modalElement);
  });
};

const openLightbox = (images, i, larges, descriptions) => {
  const lightboxElement = document.createElement('div');
  lightboxElement.innerHTML += `
			<div class="lightbox-overlay">
				<figure class="lightbox-container">
					<div class="close-modal">🗙</div>
					<img src="${larges[i]}" alt="${descriptions[i]}"
						class="lightbox-image">
					<figcaption>
						<p class="lightbox-description">${descriptions[i]}</p>
						<nav class="lightbox-navigation">
							<a href="#" class="lightbox-navigation__button prev">◀</a>
							<span class="lightbox-navigation__counter">Imagen ${i + 1} de ${images.length}</span>
							<a href="#" class="lightbox-navigation__button next">▶</a>
						</nav>
					</figcaption>
				</figure>
			</div>
		`;
  lightboxElement.id = 'lightbox';
  document.body.insertBefore(lightboxElement, document.querySelector('script'));
  closeModal(lightboxElement);
  navigateLightbox(lightboxElement, larges, descriptions, i);
};

const openLightboxEvent = (container, images, larges, descriptions) => {
  container.addEventListener('click', (e) => {
    const el = e.target;
    const i = images.indexOf(el);
    if (el.tagName === 'IMG') {
      openLightbox(images, i, larges, descriptions);
    }
  });
};

const lightbox = (container) => {
  const images = getImagesElements(container);
  const largeImgs = getLargeImages(images);
  const descriptions = getImagesDescriptions(images);

  openLightboxEvent(container, images, largeImgs, descriptions);
};

/*        LIGHTBOX      */

/*        Carousel      */

const getImages = imagesContainerElement => [...imagesContainerElement.querySelectorAll('img')];

const setImageToCarousel = (carouselImageElement, imagen, i = 0) => {
  carouselImageElement.src = imagen.src.replace('thumb', 'large');
  carouselImageElement.id = `gallery-${i}`;
};

const getIndexCarouselCurrentImg = carouselImageElement => parseInt(carouselImageElement.id.split('-')[1], 10);

const animateCarousel = (carouselImageElement, images, textContainer, gallery, delay) => {
  let time = 0;
  let timeDelay = delay;
  let i = 1;
  let description;
  setImageToCarousel(carouselImageElement, images[0]);
  description = getTextAboutGallery(carouselImageElement, gallery);
  setText(textContainer, description);
  setInterval(() => {
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

const prevButtonEvent =
  (
    carouselImageElement,
    prevNavElement, images, textContainer, gallery,
  ) => {
    prevNavElement.addEventListener('click', () => {
      let i = getIndexCarouselCurrentImg(carouselImageElement);
      const description = getTextAboutGallery(carouselImageElement, gallery);
      i = i > 0 ? --i : images.length - 1;
      setImageToCarousel(carouselImageElement, images[i], i);
      setText(textContainer, description);
    });
  };
const nextButtonEvent =
  (
    carouselImageElement,
    nextNavElement, images, textContainer, gallery,
  ) => {
    nextNavElement.addEventListener('click', () => {
      let i = getIndexCarouselCurrentImg(carouselImageElement);
      const description = getTextAboutGallery(carouselImageElement, gallery);
      i = i < images.length - 1 ? ++i : 0;
      setImageToCarousel(carouselImageElement, images[i], i);
      setText(textContainer, description);
    });
  };

const navigatorCarousel =
  (
    carouselImageElement, prevNavElement,
    nextNavElement, images,
    textContainer, gallery,
  ) => {
    prevButtonEvent(carouselImageElement, prevNavElement, images, textContainer, gallery, );
    nextButtonEvent(carouselImageElement, nextNavElement, images, textContainer, gallery, );
  };

const carousel =
  (
    carouselImageElement,prevNavElement,
    nextNavElement, images,
    textContainer, gallery, delay,
  ) => {
    animateCarousel(
      carouselImageElement, images,
      textContainer, gallery, delay,
    );
    navigatorCarousel
    (
      carouselImageElement,
      prevNavElement, nextNavElement, images, textContainer,
      gallery,
    );
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

const descriptionElement = document.querySelector('.description');

const navigatorListElement = document.querySelector('.navigator-list');

const carouselImageElement = document.querySelector('.carousel-container-img').querySelector('img');

const controlCarouselContainer = document.getElementById('carousel-container');

const prevNavElement = controlCarouselContainer.querySelector('#prev-button');

const nextNavElement = controlCarouselContainer.querySelector('#next-button');

const imagesContainerElement = document.getElementById('gallery-container');

const images = getImages(imagesContainerElement);

const textContainer = document.querySelector('.dev-page-description');

const headerElement = document.querySelector('header');

const gallery = [
  {
    name: 'Proyecto 1',
    description: 'En este proyecto utilice las siguientes tecnologias: react, node.js, mongodb, express',
    imgs: [
      {
        name: '1',
        alt: '1',
        ext: 'png',
      },
      {
        name: '2',
        alt: '2',
        ext: 'png',
      },
      {
        name: 'adopta-mascotas',
        alt: 'adopta tu mascota',
        ext: 'png',
      },
      {
        name: 'bd',
        alt: 'base de datos',
        ext: 'png',
      },
    ],
  },
  {
    name: 'Proyecto 2',
    description: 'En este proyecto utilice el MEAN',
    imgs: [

      {
        name: '2',
        alt: '2',
        ext: 'png',
      },
      {
        name: '1',
        alt: '1',
        ext: 'png',
      },
      {
        name: 'adopta-mascotas',
        alt: 'adopta tu mascota',
        ext: 'png',
      },
      {
        name: 'bd',
        alt: 'base de datos',
        ext: 'png',
      },
    ],
  },
  {
    name: 'Proyecto 3',
    description: 'En este proyecto utilice las siguientes tecnologias: javaEE, angular y graphQL',
    imgs: [
      {
        name: 'adopta-mascotas',
        alt: 'adopta tu mascota',
        ext: 'png',
      },
      {
        name: '1',
        alt: '1',
        ext: 'png',
      },
      {
        name: '2',
        alt: '2',
        ext: 'png',
      },

      {
        name: 'bd',
        alt: 'base de datos',
        ext: 'png',
      },
    ],
  },
  {
    name: 'Proyecto 2',
    description: 'En este proyecto utilice Vue.js, go y mongodb',
    imgs: [
      {
        name: 'bd',
        alt: 'base de datos',
        ext: 'png',
      },
      {
        name: '1',
        alt: '1',
        ext: 'png',
      },
      {
        name: '2',
        alt: '2',
        ext: 'png',
      },
      {
        name: 'adopta-mascotas',
        alt: 'adopta tu mascota',
        ext: 'png',
      },
    ],
  },
  {
    name: 'Proyecto 2',
    description: 'En este proyecto utilice las siguientes tecnologias: react, node.js, mongodb, express',
    imgs: [
      {
        name: 'adopta-mascotas',
        alt: 'adopta tu mascota',
        ext: 'png'
        ,
      },
      {
        name: '1',
        alt: '1',
        ext: 'png'
        ,
      },
      {
        name: '2',
        alt: '2',
        ext: 'png'
        ,
      },
      {
        name: 'bd',
        alt: 'base de datos',
        ext: 'png'
        ,
      },
    ]
    ,
  },
  {
    name: 'Proyecto 2',
    description: 'En este proyecto utilice las siguientes tecnologias: react, node.js, mongodb, express',
    imgs: [
      {
        name: '1',
        alt: '1',
        ext: 'png'
        ,
      },
      {
        name: '2',
        alt: '2',
        ext: 'png'
        ,
      },
      {
        name: 'adopta-mascotas',
        alt: 'adopta tu mascota',
        ext: 'png'
        ,
      },
      {
        name: 'bd',
        alt: 'base de datos',
        ext: 'png'
        ,
      },
    ]
    ,
  },
];

lightbox(document.documentElement);


scrollAnimation(getArrayChildrens(navigatorListElement), 200, headerElement.clientHeight);

carousel(
  carouselImageElement, prevNavElement,
  nextNavElement, images,
  textContainer, gallery, 3000
  ,
);

writingAnimation('Hola soy Charlie y esta es mi página web, espero que te guste', descriptionElement, 50, false, 2000);
