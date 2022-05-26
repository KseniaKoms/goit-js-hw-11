import './css/common.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';

const axios = require('axios').default;
const API_KEY = '21114444-0f8d4403d37e9d68ea7490c66';
const BASE_URL = 'https://pixabay.com/api/';
const QUERY_PARAMS = 'image_type=photo&orientation=horizontal&safesearch=true';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  const searchQuery = refs.form.searchQuery.value;

  fetchImages(searchQuery)
    .then(({ total, hits }) => {
      if (total === 0) {
        Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      } else {
        renderImagesCards(hits)
      };
})
};

function fetchImages(query) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${query}&${QUERY_PARAMS}`;
  return fetch(url).then(response => {
    return response.json();
  })
};

function renderImagesCards(images) {
  const imageCard = images.map(image => {
    return `<div class="photo-card">
  <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" width="300"/>
  <div class="info">
    <div class="info-item">
      <b>Likes:</b>
      <p> ${image.likes}</p>
    </div>
    <div class="info-item">
      <b>Views: </b>
      <p> ${image.views}</p>
    </div>
    <div class="info-item">
      <b>Comments: </b>
      <p> ${image.comments}</p>
    </div>
    <div class="info-item">
      <b>Downloads: </b>
      <p> ${image.downloads}</p>
    </div>
  </div>
</div>`
  }).join('');
  refs.gallery.innerHTML = imageCard;
}






















// async function aMakeSmoothie(name) {
// try {
//     // console.time('opa')
//   const apple =getFruit('apple');
//   // console.log(apple);
//   const kiwi =getFruit('kiwi');
//   // console.log(kiwi);
//   // console.timeEnd('opa')
//   const fruits = await Promise.all([apple, kiwi]);
//   console.log(fruits)
// } catch (error) {
//   console.log(error)
// }
// };

// aMakeSmoothie();

// function getFruit(name) {
//   const fruits = { 
//     strawberry: '🍓',
//     kiwi: '🥝',
//     apple: '🍎',
//   }

//   return new Promise(resolve => setTimeout(() => resolve(fruits[name]), 1000))
// }

// function makeSmoothie() {
//   getFruit('apple').then(apple => {
//     console.log(apple);
//       getFruit('kiwi').then(apple => console.log(apple))
//   })
// }

// makeSmoothie();