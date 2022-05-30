import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import axios from "axios";

const API_KEY = '21114444-0f8d4403d37e9d68ea7490c66';
const BASE_URL = 'https://pixabay.com/api/';
const QUERY_PARAMS = 'image_type=photo&orientation=horizontal&safesearch=true';
const axios = require('axios').default;

export default class ImagesApi {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.totalHits = 0;
    }

    fetchImages() {
     const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&${QUERY_PARAMS}&page=${this.page}&per_page=40`;
        return axios(url)
            .then(response => {
             return response.data;
            })
            .then(({ total, totalHits, hits }) => {
                this.totalHits = totalHits;
                if (total === 0) {
                    this.notificationFailure(); 
                } else if (totalHits > 0) {
                    this.incrementPage(); 
                    return hits; 
                }         
            })
    };

    notificationFailure() {
      Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    }

    notificationInfo() {
        Notify.info("We're sorry, but you've reached the end of search results.")
    }

    notificationSuccess() {
        Notify.success(`Hooray! We found ${this.totalHits} images.`)
    }

    incrementPage() {
      this.page += 1;  
    }

    resetPage() {
      this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }

}