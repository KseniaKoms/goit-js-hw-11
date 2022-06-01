// import axios from "axios";

const API_KEY = '21114444-0f8d4403d37e9d68ea7490c66';
const BASE_URL = 'https://pixabay.com/api/';
const QUERY_PARAMS = 'image_type=photo&orientation=horizontal&safesearch=true';
const axios = require('axios').default;

export default class ImagesApi {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async fetchImages() {
        try {
            const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&${QUERY_PARAMS}&page=${this.page}&per_page=40`;
            const response = await axios(url);
            const images = await response.data;
            return images
        }
        catch (error) {
           console.log(error)
        }
    };

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