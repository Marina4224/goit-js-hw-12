import{a as p,S as m,i as a}from"./assets/vendor-67BWzQEt.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const h="https://pixabay.com/api/",y="50906092-34cf06e72a427370f235fb117";function g(n){const r={key:y,q:n,image_type:"photo",orientation:"horizontal",safesearch:!0};return p.get(h,{params:r}).then(o=>o.data)}const c=document.querySelector(".gallery"),l=document.querySelector(".loader"),L=new m(".gallery a");function b(n){const r=n.map(({webformatURL:o,largeImageURL:s,tags:e,likes:t,views:i,comments:f,downloads:d})=>`
    <li class="gallery-item">
      <a href="${s}">
        <img src="${o}" alt="${e}" />
      </a>
      <div class="info">
        <p>Likes: ${t}</p>
        <p>Views: ${i}</p>
        <p>Comments: ${f}</p>
        <p>Downloads: ${d}</p>
      </div>
    </li>
  `).join("");c.insertAdjacentHTML("beforeend",r),L.refresh()}function v(){c.innerHTML=""}function S(){l.classList.remove("hidden")}function $(){l.classList.add("hidden")}const u=document.querySelector(".form"),q=u.elements["search-text"];u.addEventListener("submit",n=>{n.preventDefault();const r=q.value.trim();if(!r){a.warning({message:"Будь ласка, введіть запит для пошуку!",position:"topCenter"});return}v(),S(),g(r).then(o=>{if(o.hits.length===0){a.info({message:"За вашим запитом нічого не знайдено. Спробуйте інше слово.",position:"topCenter"});return}b(o.hits)}).catch(()=>{a.error({message:"Помилка при завантаженні зображень!",position:"topCenter"})}).finally(()=>{$()})});
//# sourceMappingURL=index.js.map
