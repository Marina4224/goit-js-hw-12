import { getImagesByQuery } from './js/pixabay-api';
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton, } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = form.elements['search-text'];
const loadMoreBtn = document.querySelector('.load-more');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

form.addEventListener('submit', async e => {
  e.preventDefault();

  const query = input.value.trim();

  if (!query) {
    iziToast.warning({
      message: 'Будь ласка, введіть запит для пошуку!',
      position: 'topCenter',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;


  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    totalHits = data.totalHits;
          if (data.hits.length === 0) {
        iziToast.info({
          message: 'За вашим запитом нічого не знайдено. Спробуйте інше слово.',
          position: 'topCenter',
        });
        return;
      }

      createGallery(data.hits);
      createGallery(data.hits);
      if (totalHits > currentPage * 15) {
        showLoadMoreButton();
      } else {
        hideLoadMoreButton();
      }
  
    } catch (error) {
      iziToast.error({
        message: 'Помилка при завантаженні зображень!',
        position: 'topCenter',
      });
    } finally {
      hideLoader();
    }
  });
  
  loadMoreBtn.addEventListener('click', async () => {
    currentPage += 1;
    showLoader();
    hideLoadMoreButton();
  
    try {
      const data = await getImagesByQuery(currentQuery, currentPage);
      createGallery(data.hits);
  
      smoothScroll();
  
      if (currentPage * 15 >= totalHits) {
        hideLoadMoreButton();
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topCenter',
        });
      } else {
        showLoadMoreButton();
      }
  
    } catch {
      iziToast.error({
        message: 'Помилка при завантаженні зображень!',
        position: 'topCenter',
      });
    } finally {
      hideLoader();
    }
  });
  
  function smoothScroll() {
    const card = document.querySelector('.gallery-item');
    if (card) {
      const cardHeight = card.getBoundingClientRect().height;
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
  }