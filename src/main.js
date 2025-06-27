import { getImagesByQuery } from './js/pixabay-api';
import { createGallery, clearGallery, showLoader, hideLoader } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = form.elements['search-text'];

form.addEventListener('submit', e => {
  e.preventDefault();

  const query = input.value.trim();

  if (!query) {
    iziToast.warning({
      message: 'Будь ласка, введіть запит для пошуку!',
      position: 'topCenter',
    });
    return;
  }

  clearGallery();
  showLoader();

  getImagesByQuery(query)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.info({
          message: 'За вашим запитом нічого не знайдено. Спробуйте інше слово.',
          position: 'topCenter',
        });
        return;
      }

      createGallery(data.hits);
    })
    .catch(() => {
      iziToast.error({
        message: 'Помилка при завантаженні зображень!',
        position: 'topCenter',
      });
    })
    .finally(() => {
      hideLoader();
    });
});