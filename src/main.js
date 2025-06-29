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
      message: 'Please enter a search query.',
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
          if (!data.hits.length) {
        iziToast.info({
          message: 'Sorry, there are no images matching your search query. Please try again!',
          position: 'topCenter',
        });
        return;
      }

            createGallery(data.hits);
            decideLoadMoreVisibility();

          } catch {
            iziToast.error({ message: 'Something went wrong. Please try again later.', position: 'topCenter' });
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
  
      decideLoadMoreVisibility();
  } catch {
    iziToast.error({ message: 'Error loading images!', position: 'topCenter' });
  } finally {
    hideLoader();
  }
  });
  function decideLoadMoreVisibility() {
    const shown = currentPage * 15;
    if (shown >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({ message: 'Sorry, but you have reached the end of search results.', position: 'topCenter' });
    } else {
      showLoadMoreButton();
    }
  }

    function smoothScroll() {
    const card = document.querySelector('.gallery-item');
    if (!card) return;
    const { height } = card.getBoundingClientRect();
    window.scrollBy({ top: height * 2, behavior: 'smooth' });
  }