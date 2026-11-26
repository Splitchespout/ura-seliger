/* ==========================================================================
   Интерактивная логика сайта «Ура, Селигер!»
   - Полная интеграция официального модуля бронирования TravelLine (providerId: 30650)
   - Прямая привязка категорий номеров (203154, 203155, 203156) и Hero-поиска к TravelLine
   - Карусели реальных фото на карточках номеров
   - Модальные окна (<dialog>), лайтбокс фотогалереи и Scroll Reveal
   ========================================================================== */

const WHATSAPP_PHONE = '79259223340';

const TL_CONFIG = {
  providerId: '30650',
  context: 'TL-EXPRESS',
  theme: 'express-green',
  currency: 'RUB',
  language: 'ru',
  hosts: ['ru-ibe.tlintegration.ru', 'ibe.tlintegration.ru', 'ibe.tlintegration.com'],
  guestAccountUrl: 'https://uraseliger.ru/guest-account/',
  directBookingUrl: 'https://uraseliger.ru/ru-ru/booking/',
  smartWidgetToken: '3b36c6c5-5ded-433f-9be3-000022210100',
};

const ROOMS = {
  apt: {
    id: 'apt',
    tlRoomType: '203156',
    name: 'Апартаменты-студия с кухней',
    tag: 'Собственная кухня · до 4 гостей',
    priceLabel: 'от 5 000 ₽ / ночь · точная цена в TravelLine',
    description:
      'Просторные светлые апартаменты с отдельным входом, деревянными балками, уютной спальной зоной, обеденным столом и собственной кухней. Идеальны для уединённого семейного отдыха.',
    amenities: [
      'Собственная кухня: плита, холодильник, микроволновка, чайник и посуда',
      'Двуспальная кровать + раскладной диван (до 4 человек)',
      'Отдельный санузел с душевой кабиной',
      'Бесплатные прогулочные лодки, песчаный пляж, мангальная зона и Wi-Fi',
      'Домашнее питание по желанию: завтрак 350 ₽, обед 600 ₽, ужин 400 ₽',
    ],
    photos: [
      { src: 'assets/images/tl_apt_2.jpg', alt: 'Апартаменты-студия: спальная зона, обеденный стол и гостиная' },
      { src: 'assets/images/tl_apt_1.jpg', alt: 'Гостиная зона апартаментов с диваном, столом и витражным окном' },
      { src: 'assets/images/tl_apt_5.jpg', alt: 'Собственная кухня с холодильником, плитой, микроволновкой и посудой' },
      { src: 'assets/images/tl_apt_8.jpg', alt: 'Вид из мансардного окна апартаментов на зелёную территорию' },
      { src: 'assets/images/tl_apt_4.jpg', alt: 'Отдельная прихожая в апартаментах' },
      { src: 'assets/images/vk_apt_4.jpg', alt: 'Чайная коллекция для гостей апартаментов' },
    ],
  },
  family: {
    id: 'family',
    tlRoomType: '203155',
    name: '4-местный номер с диваном',
    tag: '3-разовое домашнее питание включено',
    priceLabel: 'от 5 000 ₽ / ночь за двоих · точная цена в TravelLine',
    description:
      'Просторный тёплый номер (20 м²) с отделкой из натурального дерева в основном доме. Включает полный 3-разовый домашний пансион и доступ в уютную лаундж-зону с самоваром, чаем и настольными играми.',
    amenities: [
      'Домашнее 3-разовое питание (завтрак, обед, ужин) включено',
      'Две комфортные кровати + раскладной диван (до 4 человек)',
      'Собственный санузел с душем, телевизор, шкаф и столик',
      'Дети до 2 лет — бесплатно; от 2 до 10 лет с питанием — 1 000 ₽/сут',
      'Бесплатные лодки, пляж с лежаками, мангал, настольный теннис и Wi-Fi',
    ],
    photos: [
      { src: 'assets/images/tl_family_4.jpg', alt: 'Общий вид 4-местного номера: две кровати, стол и окно в сад' },
      { src: 'assets/images/tl_family_1.jpg', alt: 'Зона отдыха с раскладным диваном, телевизором и столом' },
      { src: 'assets/images/tl_family_5.jpg', alt: 'Прихожая зона, вместительный шкаф, ТВ и диван' },
      { src: 'assets/images/tl_family_2.jpg', alt: 'Две отдельные кровати с тёплым локальным освещением' },
      { src: 'assets/images/tl_family_7.jpg', alt: 'Собственный санузел номера с душевой кабиной' },
      { src: 'assets/images/tl_family_3.jpg', alt: 'Деревянный холл и лестница на втором этаже основного дома' },
    ],
  },
  double: {
    id: 'double',
    tlRoomType: '203154',
    name: '2-местный номер в основном доме',
    tag: '3-разовое домашнее питание включено',
    priceLabel: 'от 3 000 ₽ / ночь · точная цена в TravelLine',
    description:
      'Светлый уютный номер с большой двуспальной кроватью и видом из окна на озеро Серменок и зелёный сад. Отличный вариант для пары или спокойного отдыха у воды с домашним питанием.',
    amenities: [
      'Домашнее 3-разовое питание включено в стоимость',
      'Удобная двуспальная кровать, ТВ и обеденный столик',
      'Собственный санузел с душевой кабиной',
      'Чай, кофе, книги и самовар в общей гостиной на 1-м этаже',
      'Бесплатные прогулочные лодки, свой пляж и мангальная зона',
    ],
    photos: [
      { src: 'assets/images/tl_double_3.jpg', alt: 'Двухместный номер: большая кровать, прихожая и телевизор' },
      { src: 'assets/images/tl_double_2.jpg', alt: 'Вид прямо из окна номера на озеро Серменок и территорию' },
      { src: 'assets/images/tl_double_5.jpg', alt: 'Светлая спальная зона с окном и обеденным столиком' },
      { src: 'assets/images/tl_double_4.jpg', alt: 'Вид на два больших окна, стол и шкаф в номере' },
      { src: 'assets/images/tl_double_1.jpg', alt: 'Интерьер двухместного номера со стороны окна' },
      { src: 'assets/images/tl_double_6.jpg', alt: 'Собственная ванная комната с душевой кабиной в номере' },
    ],
  },
};

function buildWhatsAppUrl(text) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
}

function toLocalIso(d) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function isValidIsoDate(val) {
  return typeof val === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(val);
}

function calcNightsBetween(startIso, endIso) {
  if (!isValidIsoDate(startIso) || !isValidIsoDate(endIso)) return 2;
  const start = new Date(startIso + 'T00:00:00');
  const end = new Date(endIso + 'T00:00:00');
  const diff = Math.round((end - start) / (1000 * 60 * 60 * 24));
  return Math.max(1, Math.min(365, diff || 2));
}

function isMobileDevice() {
  return window.innerWidth <= 768 || /android|iphone|ipad|ipod|mobile/i.test(navigator.userAgent || '');
}

/* ---------------- Мобильное меню и клик по логотипу «Ура, Селигер!» ---------------- */
const brandLink = document.querySelector('.brand');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');

function setMobileMenuOpen(open) {
  if (!mobileNav || !mobileMenuBtn) return;
  mobileNav.hidden = !open;
  mobileMenuBtn.classList.toggle('is-open', open);
  mobileMenuBtn.setAttribute('aria-expanded', String(open));
  mobileMenuBtn.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
}

if (brandLink) {
  brandLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  });
}

if (mobileMenuBtn && mobileNav) {
  mobileMenuBtn.addEventListener('click', () => {
    setMobileMenuOpen(mobileNav.hidden);
  });
  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMobileMenuOpen(false));
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileNav.hidden) {
      setMobileMenuOpen(false);
    }
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && !mobileNav.hidden) {
      setMobileMenuOpen(false);
    }
  });
}

/* ---------------- Мини-карусели на карточках номеров ---------------- */
const cardSlideIndex = {};

document.querySelectorAll('[data-carousel]').forEach((wrap) => {
  const roomId = wrap.dataset.carousel;
  const room = ROOMS[roomId];
  if (!room) return;

  const img = wrap.querySelector('.room-img');
  const dotsContainer = wrap.querySelector('.carousel-dots');
  let index = 0;
  cardSlideIndex[roomId] = 0;

  room.photos.forEach((_, idx) => {
    const dot = document.createElement('span');
    dot.className = 'carousel-dot' + (idx === 0 ? ' active' : '');
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.carousel-dot');

  const updatePortraitClass = () => {
    img.classList.toggle('is-portrait', img.naturalHeight > img.naturalWidth);
  };
  img.addEventListener('load', updatePortraitClass);

  const renderSlide = (nextIdx) => {
    index = (nextIdx + room.photos.length) % room.photos.length;
    cardSlideIndex[roomId] = index;
    img.src = room.photos[index].src;
    img.alt = room.photos[index].alt;
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  };

  wrap.querySelector('.prev').addEventListener('click', (e) => {
    e.stopPropagation();
    renderSlide(index - 1);
  });

  wrap.querySelector('.next').addEventListener('click', (e) => {
    e.stopPropagation();
    renderSlide(index + 1);
  });
});

/* ---------------- Интеграция официального модуля бронирования TravelLine ---------------- */
const heroCheckin = document.getElementById('heroCheckin');
const heroCheckout = document.getElementById('heroCheckout');
const heroGuests = document.getElementById('heroGuests');
const heroBookingForm = document.getElementById('heroBookingForm');
const tlRoomFilter = document.getElementById('tlRoomFilter');
const tlBookingContainer = document.getElementById('tl-booking-form');
const tlLoadingState = document.getElementById('tlLoadingState');
const tlFallbackLink = document.getElementById('tlFallbackLink');
const bookingSection = document.getElementById('booking');

const tlState = {
  date: '',
  nights: 2,
  adults: 2,
  roomType: '',
  pendingSync: false,
};

function findTravelLineIframe() {
  return document.querySelector('#tl-booking-form iframe[src*="tlintegration"]');
}

function updateTravelLineIframeSrc(iframe) {
  if (!iframe) return false;
  const rawSrc = iframe.getAttribute('src') || iframe.src || '';
  if (!rawSrc.includes('tlintegration')) return false;
  try {
    const iframeUrl = new URL(rawSrc);
    if (tlState.date) iframeUrl.searchParams.set('date', tlState.date);
    iframeUrl.searchParams.set('nights', String(tlState.nights || 2));
    iframeUrl.searchParams.set('adults', String(tlState.adults || 2));
    iframeUrl.searchParams.delete('room-type');
    if (tlState.roomType) {
      iframeUrl.searchParams.set('roomTypes', tlState.roomType);
    } else {
      iframeUrl.searchParams.delete('roomTypes');
    }
    iframeUrl.searchParams.set('_tlr', String(Date.now()));
    iframeUrl.hash = '#/rooms';
    iframe.setAttribute('src', iframeUrl.toString());
    tlState.pendingSync = false;
    return true;
  } catch (_) {
    return false;
  }
}

function initBookingDates() {
  const now = new Date();
  const todayIso = toLocalIso(now);
  const urlParams = new URLSearchParams(window.location.search);

  let checkinIso = urlParams.get('date');
  let nights = parseInt(urlParams.get('nights') || '2', 10);
  if (!Number.isFinite(nights) || nights < 1 || nights > 365) nights = 2;

  if (!isValidIsoDate(checkinIso) || checkinIso < todayIso) {
    const daysUntilFri = (5 - now.getDay() + 7) % 7 || 7;
    const fri = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysUntilFri);
    checkinIso = toLocalIso(fri);
  }

  const endDate = new Date(checkinIso + 'T00:00:00');
  endDate.setDate(endDate.getDate() + nights);
  const checkoutIso = toLocalIso(endDate);

  const adultsParam = parseInt(urlParams.get('adults') || '2', 10);
  const adults = Number.isFinite(adultsParam) && adultsParam >= 1 && adultsParam <= 4 ? adultsParam : 2;
  const roomTypeParam = urlParams.get('room-type') || '';

  heroCheckin.min = todayIso;
  heroCheckin.value = checkinIso;
  heroCheckout.min = checkinIso;
  heroCheckout.value = checkoutIso;
  heroGuests.value = String(adults);

  tlState.date = checkinIso;
  tlState.nights = nights;
  tlState.adults = adults;
  tlState.roomType = ['203154', '203155', '203156'].includes(roomTypeParam) ? roomTypeParam : '';
}

function syncHeroDates(changedField) {
  const checkinVal = heroCheckin.value;
  if (!isValidIsoDate(checkinVal)) return;

  let checkoutVal = heroCheckout.value;
  if (!isValidIsoDate(checkoutVal) || checkoutVal <= checkinVal) {
    const start = new Date(checkinVal + 'T00:00:00');
    const keepNights = changedField === 'checkin' ? Math.max(1, tlState.nights || 2) : 1;
    start.setDate(start.getDate() + keepNights);
    checkoutVal = toLocalIso(start);
  }

  heroCheckout.min = checkinVal;
  heroCheckout.value = checkoutVal;
  tlState.date = checkinVal;
  tlState.nights = calcNightsBetween(checkinVal, checkoutVal);
  updateFallbackLink();
}

function buildTravelLineDirectUrl() {
  const params = new URLSearchParams();
  if (tlState.date) params.set('date', tlState.date);
  params.set('nights', String(tlState.nights || 2));
  params.set('adults', String(tlState.adults || 2));
  if (tlState.roomType) params.set('room-type', tlState.roomType);
  return `${TL_CONFIG.directBookingUrl}?${params.toString()}`;
}

function updateFallbackLink() {
  if (tlFallbackLink) {
    tlFallbackLink.href = buildTravelLineDirectUrl();
  }
}

function syncUrlWithTlState() {
  try {
    const url = new URL(window.location.href);
    if (tlState.date) url.searchParams.set('date', tlState.date);
    url.searchParams.set('nights', String(tlState.nights || 2));
    url.searchParams.set('adults', String(tlState.adults || 2));
    if (tlState.roomType) {
      url.searchParams.set('room-type', tlState.roomType);
    } else {
      url.searchParams.delete('room-type');
    }
    window.history.replaceState(null, '', url.pathname + '?' + url.searchParams.toString() + url.hash);
  } catch (_) {}
}

function updateActiveFilterButton() {
  if (!tlRoomFilter) return;
  tlRoomFilter.querySelectorAll('.tl-filter-btn').forEach((btn) => {
    btn.classList.toggle('is-active', (btn.dataset.tlFilter || '') === tlState.roomType);
  });
}

function hideTlLoaderIfIframeReady() {
  if (!tlLoadingState) return;
  const iframe = findTravelLineIframe();
  if (iframe) {
    tlLoadingState.hidden = true;
    if (tlState.pendingSync) {
      updateTravelLineIframeSrc(iframe);
    }
  }
}

function loadTravelLineBookingWidget() {
  if (!tlBookingContainer) return;

  // Отслеживаем появление рабочего iframe от TravelLine (в контейнере бывают служебные пустые iframe с src=null)
  if ('MutationObserver' in window) {
    const obs = new MutationObserver(() => {
      const iframe = findTravelLineIframe();
      if (iframe) {
        if (tlLoadingState) tlLoadingState.hidden = true;
        if (tlState.pendingSync) {
          updateTravelLineIframeSrc(iframe);
        }
        obs.disconnect();
      }
    });
    obs.observe(tlBookingContainer, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['src'],
    });
  }

  // Страховка: если на медленном соединении скрипт долго грузится, через 12 сек показываем подсказку со ссылкой
  window.setTimeout(() => {
    if (tlLoadingState && !tlLoadingState.hidden && !findTravelLineIframe()) {
      const p = tlLoadingState.querySelector('p');
      if (p) {
        p.innerHTML =
          'Модуль TravelLine загружается дольше обычного. Вы можете <a href="' +
          buildTravelLineDirectUrl() +
          '" target="_blank" rel="noopener noreferrer" style="color:var(--pine);font-weight:700;text-decoration:underline;">открыть бронирование напрямую ↗</a>.';
      }
    }
  }, 12000);

  const bookingSource = isMobileDevice() ? 'BS-MOBILE_SITE' : '';

  const q = [
    ['setContext', TL_CONFIG.context, TL_CONFIG.language],
    [
      'embed',
      'booking-form',
      {
        gpPagePath: TL_CONFIG.guestAccountUrl,
        provider: TL_CONFIG.providerId,
        theme: TL_CONFIG.theme,
        container: 'tl-booking-form',
        adults: String(tlState.adults || 2),
        language: TL_CONFIG.language,
        currency: TL_CONFIG.currency,
        autoScroll: 'none',
        accommodationMode: 'auto',
        source: bookingSource,
        defaultCitizenship: 'RUS',
      },
    ],
  ];

  const t = (window.travelline = window.travelline || {});
  const ti = (t.integration = t.integration || {});
  ti.__cq = ti.__cq ? ti.__cq.concat(q) : q;

  if (!ti.__loader) {
    ti.__loader = true;
    const head = document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0];
    const loadNextHost = (hosts) => {
      if (!hosts.length) return;
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = 'https://' + hosts[0] + '/integration/loader.js';
      script.onerror = script.onload = () => {
        if (window.TL) {
          hideTlLoaderIfIframeReady();
          return;
        }
        if (script.parentNode === head) {
          head.removeChild(script);
        }
        loadNextHost(hosts.slice(1));
      };
      head.appendChild(script);
    };
    loadNextHost(TL_CONFIG.hosts.slice());
  }
}

function applyBookingParamsToTravelLine({ scrollToBooking = false } = {}) {
  syncUrlWithTlState();
  updateFallbackLink();
  updateActiveFilterButton();

  const iframe = findTravelLineIframe();
  if (iframe) {
    updateTravelLineIframeSrc(iframe);
  } else {
    tlState.pendingSync = true;
  }

  if (scrollToBooking && bookingSection) {
    bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

initBookingDates();
updateFallbackLink();
updateActiveFilterButton();
loadTravelLineBookingWidget();

// Открываем нативный календарь при клике в любое место поля даты
[heroCheckin, heroCheckout].forEach((el) => {
  if (!el) return;
  el.addEventListener('click', () => {
    if (typeof el.showPicker === 'function') {
      try {
        el.showPicker();
      } catch (_) {}
    }
  });
});

['input', 'change'].forEach((evt) => {
  heroCheckin.addEventListener(evt, () => syncHeroDates('checkin'));
  heroCheckout.addEventListener(evt, () => syncHeroDates('checkout'));
});

heroGuests.addEventListener('change', () => {
  tlState.adults = Math.max(1, Math.min(4, parseInt(heroGuests.value, 10) || 2));
  updateFallbackLink();
});

heroBookingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  syncHeroDates('checkin');
  tlState.adults = Math.max(1, Math.min(4, parseInt(heroGuests.value, 10) || 2));
  applyBookingParamsToTravelLine({ scrollToBooking: true });
});

// Кнопки фильтра категорий номеров над виджетом TravelLine
if (tlRoomFilter) {
  tlRoomFilter.querySelectorAll('.tl-filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      tlState.roomType = btn.dataset.tlFilter || '';
      applyBookingParamsToTravelLine({ scrollToBooking: false });
    });
  });
}

// Кнопки «Забронировать» на карточках номеров (сразу выбирают категорию в TravelLine)
document.querySelectorAll('.book-tl-room').forEach((btn) => {
  btn.addEventListener('click', () => {
    const roomType = btn.dataset.tlRoom || '';
    tlState.roomType = roomType;
    if (roomType === '203154' && tlState.adults > 2) {
      tlState.adults = 2;
      heroGuests.value = '2';
    }
    applyBookingParamsToTravelLine({ scrollToBooking: true });
  });
});

/* ---------------- Нативные модальные окна (<dialog>) + Light Dismiss ---------------- */
function enableDialogLightDismiss(dialog) {
  if (!dialog) return;
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) {
      dialog.close();
    }
  });
  dialog.querySelectorAll('[data-close-dialog]').forEach((btn) => {
    btn.addEventListener('click', () => dialog.close());
  });
}

const roomModal = document.getElementById('roomModal');
const lightboxModal = document.getElementById('lightboxModal');

[roomModal, lightboxModal].forEach(enableDialogLightDismiss);

/* ---------------- Модалка подробностей номера (с листанием всех 6 фото и подписями) ---------------- */
const modalMainImg = document.getElementById('modalMainImg');
const modalThumbs = document.getElementById('modalThumbs');
const modalPhotoCaption = document.getElementById('modalPhotoCaption');
const modalPrevBtn = document.getElementById('modalPrevBtn');
const modalNextBtn = document.getElementById('modalNextBtn');
const modalTag = document.getElementById('modalTag');
const roomModalTitle = document.getElementById('roomModalTitle');
const modalPrice = document.getElementById('modalPrice');
const modalDesc = document.getElementById('modalDesc');
const modalAmenities = document.getElementById('modalAmenities');
const modalWhatsappBtn = document.getElementById('modalWhatsappBtn');
const modalToBookingBtn = document.getElementById('modalToBookingBtn');

let activeModalRoomId = 'family';
let activeModalPhotoIdx = 0;

function renderModalPhoto(idx) {
  const room = ROOMS[activeModalRoomId];
  if (!room) return;
  activeModalPhotoIdx = (idx + room.photos.length) % room.photos.length;
  const p = room.photos[activeModalPhotoIdx];
  modalMainImg.src = p.src;
  modalMainImg.alt = p.alt;
  if (modalPhotoCaption) {
    modalPhotoCaption.textContent = `${activeModalPhotoIdx + 1} / ${room.photos.length} · ${p.alt}`;
  }
  modalThumbs.querySelectorAll('button').forEach((b, i) => {
    b.classList.toggle('active', i === activeModalPhotoIdx);
  });
}

if (modalPrevBtn && modalNextBtn) {
  modalPrevBtn.addEventListener('click', () => renderModalPhoto(activeModalPhotoIdx - 1));
  modalNextBtn.addEventListener('click', () => renderModalPhoto(activeModalPhotoIdx + 1));
}

if (roomModal) {
  roomModal.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') renderModalPhoto(activeModalPhotoIdx - 1);
    if (e.key === 'ArrowRight') renderModalPhoto(activeModalPhotoIdx + 1);
  });
}

document.querySelectorAll('.open-room-modal').forEach((btn) => {
  btn.addEventListener('click', () => {
    const room = ROOMS[btn.dataset.room];
    if (!room) return;
    activeModalRoomId = room.id;

    modalTag.textContent = room.tag;
    roomModalTitle.textContent = room.name;
    modalPrice.textContent = room.priceLabel;
    modalDesc.textContent = room.description;
    modalAmenities.innerHTML = room.amenities.map((item) => `<li>${item}</li>`).join('');

    modalThumbs.innerHTML = '';
    room.photos.forEach((p, idx) => {
      const thumbBtn = document.createElement('button');
      thumbBtn.type = 'button';
      if (idx === 0) thumbBtn.className = 'active';
      thumbBtn.innerHTML = `<img src="${p.src}" alt="${p.alt}" />`;
      thumbBtn.addEventListener('click', () => renderModalPhoto(idx));
      modalThumbs.appendChild(thumbBtn);
    });

    const startIdx = btn.classList.contains('room-photos-btn') ? (cardSlideIndex[room.id] || 0) : 0;
    renderModalPhoto(startIdx);

    const msg = `Здравствуйте! Интересует «${room.name}» в гостевом доме «Ура, Селигер!». Подскажите, пожалуйста, детали размещения.`;
    modalWhatsappBtn.href = buildWhatsAppUrl(msg);

    roomModal.showModal();
  });
});

if (modalToBookingBtn) {
  modalToBookingBtn.addEventListener('click', () => {
    const room = ROOMS[activeModalRoomId];
    if (room && room.tlRoomType) {
      tlState.roomType = room.tlRoomType;
      if (room.tlRoomType === '203154' && tlState.adults > 2) {
        tlState.adults = 2;
        heroGuests.value = '2';
      }
    }
    roomModal.close();
    applyBookingParamsToTravelLine({ scrollToBooking: true });
  });
}

/* ---------------- Лайтбокс фотогалереи ---------------- */
const galleryButtons = Array.from(document.querySelectorAll('#galleryGrid .gallery-item'));
const lbImg = document.getElementById('lbImg');
const lbCaption = document.getElementById('lbCaption');
const lbPrev = document.getElementById('lbPrev');
const lbNext = document.getElementById('lbNext');
let lbIndex = 0;

function showLightboxPhoto(idx) {
  lbIndex = (idx + galleryButtons.length) % galleryButtons.length;
  const item = galleryButtons[lbIndex];
  lbImg.src = item.dataset.full;
  lbImg.alt = item.dataset.caption || '';
  lbCaption.textContent = item.dataset.caption || '';
}

galleryButtons.forEach((btn, idx) => {
  btn.addEventListener('click', () => {
    showLightboxPhoto(idx);
    lightboxModal.showModal();
  });
});

lbPrev.addEventListener('click', () => showLightboxPhoto(lbIndex - 1));
lbNext.addEventListener('click', () => showLightboxPhoto(lbIndex + 1));

lightboxModal.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') showLightboxPhoto(lbIndex - 1);
  if (e.key === 'ArrowRight') showLightboxPhoto(lbIndex + 1);
});

/* ---------------- Плавное появление карточек при прокрутке (Scroll Reveal) ---------------- */
function initScrollReveal() {
  const revealSelectors = [
    '.highlight-item',
    '.room-card',
    '.children-note',
    '.leisure-card',
    '.gallery-item',
    '.review-card',
    '.faq-item',
    '.contacts-info',
    '.contacts-map-card',
  ];

  const items = Array.from(document.querySelectorAll(revealSelectors.join(', ')));

  const showElement = (el) => {
    if (el.dataset.revealed === '1') return;
    el.dataset.revealed = '1';
    el.classList.add('is-visible');
    window.setTimeout(() => {
      el.style.transitionDelay = '';
      el.classList.remove('reveal-item');
    }, 750);
  };

  if (!('IntersectionObserver' in window)) {
    items.forEach(showElement);
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          showElement(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.01, rootMargin: '0px 0px 140px 0px' }
  );

  items.forEach((el, idx) => {
    el.classList.add('reveal-item');
    el.style.transitionDelay = `${(idx % 4) * 45}ms`;
    observer.observe(el);
  });

  // Страховка на случай быстрого прыжка по якорю, клавиши End или смещения высоты после загрузки iframe TravelLine
  const revealVisibleFallback = () => {
    const vh = window.innerHeight || 800;
    const atBottom = window.scrollY + vh >= document.documentElement.scrollHeight - 140;
    items.forEach((el) => {
      if (el.dataset.revealed === '1') return;
      const rect = el.getBoundingClientRect();
      if (atBottom || rect.top < vh + 180) {
        showElement(el);
        observer.unobserve(el);
      }
    });
  };

  window.addEventListener('scroll', revealVisibleFallback, { passive: true });
  window.addEventListener('scrollend', revealVisibleFallback, { passive: true });
  window.addEventListener('resize', revealVisibleFallback, { passive: true });
  window.addEventListener('hashchange', () => window.setTimeout(revealVisibleFallback, 120));
  if ('ResizeObserver' in window && document.body) {
    const ro = new ResizeObserver(revealVisibleFallback);
    ro.observe(document.body);
  }
  window.setTimeout(revealVisibleFallback, 250);
  window.setTimeout(revealVisibleFallback, 900);
}

initScrollReveal();
