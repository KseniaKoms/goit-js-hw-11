import './css/common.css';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import ImagesApi from './js/images-api';

const imagesApi = new ImagesApi();

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreButton: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.loadMoreButton.addEventListener('click', onLoadMoreButtonClick)

function onFormSubmit(e) {
  e.preventDefault();
  imagesApi.query = e.currentTarget.elements.searchQuery.value;
  imagesApi.resetPage();

  try {
    imagesApi.fetchImages()
      .then((images) => {
      if (!images) {
        clearImagesGallery();
        return;
      } else if (images.length === 40) {
        imagesApi.notificationSuccess();
        clearImagesGallery();
        renderImagesCards(images);
        showLoadMoreButton();
      } else if (images.length > 0 && images.length < 40) {
        hideLoadMoreButton();
        renderImagesCards(images);
      }
    } 
    )
  } catch (error) {
    console.log(error.name)
  }
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
  // gallery.refresh();
};

function clearImagesGallery() {
  refs.gallery.innerHTML = '';
};

function onLoadMoreButtonClick() {
  imagesApi.fetchImages().then(images => {
    renderImagesCards(images);
      if (images.length > 0 && images.length < 40) {
        imagesApi.notificationInfo();
        renderImagesCards(images);
        hideLoadMoreButton();
      }
  });
}

function showLoadMoreButton() {
  refs.loadMoreButton.classList.remove('load-more--hidden');
}

function hideLoadMoreButton() {
 refs.loadMoreButton.classList.add('load-more--hidden');
}

























