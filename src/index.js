import './css/common.css';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import ImagesApi from './js/images-api';
import './js/scroll';
import { Notify } from 'notiflix';

const imagesApi = new ImagesApi();

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  sentinel: document.querySelector('#sentinel'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  imagesApi.query = e.currentTarget.elements.searchQuery.value;
  imagesApi.resetPage();

    imagesApi.fetchImages()
      .then(({ totalHits, hits }) => {
        if (totalHits === 0) {
        clearImagesGallery();
        Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      } else if (hits.length===40) {
        clearImagesGallery();
        renderImagesCards(hits);
        imagesApi.incrementPage();
        Notify.success(`Hooray! We found ${totalHits} images.`);
        }      
    } 
  )

};

function renderImagesCards(images) {
  const imageCard = images.map(image => {
    return `<a class="item" href="${image.largeImageURL}">
    <div class="photo-card">
    <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" width="300" height="200"/>
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
</div></a>`
  }).join('');
 
  refs.gallery.insertAdjacentHTML('beforeend', imageCard);
  simpleLightbox();
};

function simpleLightbox() {
  let gallery = new SimpleLightbox('.gallery a', {captionsData: 'alt'});
  gallery.on('show.simplelightbox');
  gallery.refresh();
};

function clearImagesGallery() {
  refs.gallery.innerHTML = '';
};



const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && imagesApi.query !== '') {
      imagesApi.fetchImages().then(({ hits }) => {
        if (hits.length === 0) {
          Notify.info("We're sorry, but you've reached the end of search results.")
        }
        renderImagesCards(hits);
        imagesApi.incrementPage();
      })
    }
  });
};

const observer = new IntersectionObserver(onEntry, {
  rootMargin: '150px',
});
observer.observe(refs.sentinel);


























