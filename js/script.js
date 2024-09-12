const swiper = new Swiper(".swiper", {
  // Optional parameters
  loop: true,
  slidesPerView: 1.2,
  spaceBetween: 20,
  speed: 800,
  watchOverflow: true,
  autoHeight: true,
  //centeredSlides: true,
  fadeEffect: {
    crossFade: true,
  },
  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    950: {
      spaceBetween: 32,
      slidesPerView: 2,
    },
    600: {
      slidesPerView: 2.2,
    },
  },
});

document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tabs__buttons button");
  const tabContents = document.querySelectorAll(".tabs__content .tab");

  const burgerMenu = document.getElementById("burger-menu");
  const navLinks = document.querySelector(".header__nav");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.dataset.tabTarget);

      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      button.classList.add("active");
      target.classList.add("active");
    });
  });

  burgerMenu.addEventListener("click", () => {
    burgerMenu.classList.toggle("open");
    navLinks.classList.toggle("open");
    document.body.classList.toggle("menu-open");
  });

  document.addEventListener("click", (e) => {
    if (!burgerMenu.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove("open");
      document.body.classList.remove("menu-open");
      burgerMenu.classList.remove("open");
    }
  });

  const cards = document.querySelectorAll(".card");
  const paginationContainer = document.querySelector(".pagination");
  const itemsPerPage = 4; // Количество карточек на одну страницу
  let currentPage = 1;

  // Функция для создания кнопок пагинации на основе количества страниц
  function createPagination(totalItems, itemsPerPage) {
    paginationContainer.innerHTML = "";

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Добавляем кнопки страниц
    for (let i = 1; i <= totalPages; i++) {
      const pageLink = document.createElement("button");
      pageLink.classList.add("page-link");
      pageLink.textContent = i;

      // Делать первую страницу активной по умолчанию
      if (i === currentPage) {
        pageLink.classList.add("active");
      }

      pageLink.addEventListener("click", () => {
        currentPage = i;
        displayCards(currentPage);
        updatePagination();
      });

      paginationContainer.appendChild(pageLink);
    }

    // Добавляем кнопку "Вперёд" (если нужно)
    if (totalPages > 1) {
      const nextButton = document.createElement("button");
      nextButton.classList.add("page-link", "next");
      nextButton.textContent = ">";

      nextButton.addEventListener("click", () => {
        if (currentPage < totalPages) {
          currentPage++;
          displayCards(currentPage);
          updatePagination();
        }
      });

      paginationContainer.appendChild(nextButton);
    }
  }

  // Функция для отображения карточек на основе страницы
  function displayCards(page) {
    cards.forEach((card) => card.classList.remove("active"));

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    for (let i = startIndex; i < endIndex && i < cards.length; i++) {
      cards[i].classList.add("active");
    }
  }

  // Функция для обновления активного состояния пагинации
  function updatePagination() {
    const pageLinks = document.querySelectorAll(".page-link");
    pageLinks.forEach((link) => link.classList.remove("active"));

    pageLinks[currentPage - 1].classList.add("active");
  }

  // Инициализация пагинации
  createPagination(cards.length, itemsPerPage);

  // Отображаем первую страницу карточек
  displayCards(currentPage);
});
