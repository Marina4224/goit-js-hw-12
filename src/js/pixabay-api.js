import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '50906092-34cf06e72a427370f235fb117';

export function getImagesByQuery(query) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  return axios.get(BASE_URL, { params }).then(res => res.data);
}