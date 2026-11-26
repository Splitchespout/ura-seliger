/* ==========================================================================
   Интерактивная логика сайта «Ура, Селигер!»
   - Карусели реальных фото на карточках номеров
   - Быстрый выбор дат в Hero
   - Калькулятор стоимости по реальным тарифам гостевого дома
   - Модальные окна (<dialog>) и лайтбокс фотогалереи
   ========================================================================== */

const WHATSAPP_PHONE = '79259223340';

const ROOMS = {
  apt: {
    id: 'apt',
    name: 'Апартаменты-студия с кухней',
    tag: 'Собственная кухня · до 4 гостей',
    priceLabel: '5 000 ₽ / ночь за апартаменты',
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
    name: '4-местный номер с диваном',
    tag: '3-разовое домашнее питание включено',
    priceLabel: '5 000 ₽ / ночь за двоих (+2 000 ₽ доп. место)',
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
    name: '2-местный номер в основном доме',
    tag: '3-разовое домашнее питание включено',
    priceLabel: '3 000 ₽ за 1 гостя · 5 000 ₽ за двоих / ночь',
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

/* ---------------- Форматирование чисел и дат ---------------- */
function formatRub(amount) {
  return new Intl.NumberFormat('ru-RU').format(Math.round(amount)) + ' ₽';
}

function formatDateRu(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
}

function pluralize(n, one, few, many) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n} ${one}`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${n} ${few}`;
  return `${n} ${many}`;
}

function buildWhatsAppUrl(text) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
}

/* ---------------- Мобильное меню ---------------- */
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');

if (mobileMenuBtn && mobileNav) {
  mobileMenuBtn.addEventListener('click', () => {
    const isHidden = mobileNav.hidden;
    mobileNav.hidden = !isHidden;
    mobileMenuBtn.setAttribute('aria-expanded', String(isHidden));
  });
  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.hidden = true;
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------------- Мини-карусели на карточках номеров ---------------- */
document.querySelectorAll('[data-carousel]').forEach((wrap) => {
  const roomId = wrap.dataset.carousel;
  const room = ROOMS[roomId];
  if (!room) return;

  const img = wrap.querySelector('.room-img');
  const dotsContainer = wrap.querySelector('.carousel-dots');
  let index = 0;

  room.photos.forEach((_, idx) => {
    const dot = document.createElement('span');
    dot.className = 'carousel-dot' + (idx === 0 ? ' active' : '');
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.carousel-dot');

  const renderSlide = (nextIdx) => {
    index = (nextIdx + room.photos.length) % room.photos.length;
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

/* ---------------- Даты по умолчанию в Hero и Калькуляторе (ближайшие пт–вс) ---------------- */
const heroCheckin = document.getElementById('heroCheckin');
const heroCheckout = document.getElementById('heroCheckout');
const heroGuests = document.getElementById('heroGuests');
const heroBookingForm = document.getElementById('heroBookingForm');

const calcCheckin = document.getElementById('calcCheckin');
const calcCheckout = document.getElementById('calcCheckout');

function toLocalIso(d) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function setAllDates(checkinIso, checkoutIso) {
  heroCheckin.value = checkinIso;
  heroCheckout.min = checkinIso;
  heroCheckout.value = checkoutIso;
  if (calcCheckin && calcCheckout) {
    calcCheckin.value = checkinIso;
    calcCheckout.min = checkinIso;
    calcCheckout.value = checkoutIso;
  }
}

function initDefaultDates() {
  const now = new Date();
  const daysUntilFri = (5 - now.getDay() + 7) % 7 || 7;
  const fri = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysUntilFri);
  const sun = new Date(fri.getFullYear(), fri.getMonth(), fri.getDate() + 2);

  const todayIso = toLocalIso(now);
  const friIso = toLocalIso(fri);
  const sunIso = toLocalIso(sun);

  heroCheckin.min = todayIso;
  if (calcCheckin) calcCheckin.min = todayIso;
  setAllDates(friIso, sunIso);
}

initDefaultDates();

// Открываем нативный календарь при клике в любое место поля даты
[heroCheckin, heroCheckout, calcCheckin, calcCheckout].forEach((el) => {
  if (!el) return;
  el.addEventListener('click', () => {
    if (typeof el.showPicker === 'function') {
      try {
        el.showPicker();
      } catch (_) {}
    }
  });
});

function isValidIsoDate(val) {
  return typeof val === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(val);
}

function handleDateChange(checkinVal, checkoutVal, changedField) {
  if (!isValidIsoDate(checkinVal)) return;

  let outVal = checkoutVal;
  if (!isValidIsoDate(outVal) || outVal <= checkinVal) {
    // Если дата выезда раньше или равна дате заезда — сохраняем текущее число ночей (или минимум 1)
    const start = new Date(checkinVal + 'T00:00:00');
    const keepNights = changedField === 'checkin' ? Math.max(1, parseInt(calcNights.value, 10) || 2) : 1;
    start.setDate(start.getDate() + keepNights);
    outVal = toLocalIso(start);
  }

  setAllDates(checkinVal, outVal);
  syncDatesToCalculator();
}

['input', 'change'].forEach((evt) => {
  heroCheckin.addEventListener(evt, () => handleDateChange(heroCheckin.value, heroCheckout.value, 'checkin'));
  heroCheckout.addEventListener(evt, () => handleDateChange(heroCheckin.value, heroCheckout.value, 'checkout'));
  if (calcCheckin && calcCheckout) {
    calcCheckin.addEventListener(evt, () => handleDateChange(calcCheckin.value, calcCheckout.value, 'checkin'));
    calcCheckout.addEventListener(evt, () => handleDateChange(calcCheckin.value, calcCheckout.value, 'checkout'));
  }
});

heroGuests.addEventListener('change', syncHeroGuestsToCalculator);

heroBookingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  syncDatesToCalculator();
  syncHeroGuestsToCalculator();
  document.getElementById('calculator').scrollIntoView({ behavior: 'smooth' });
});

/* ---------------- Калькулятор стоимости ---------------- */
const calcRoom = document.getElementById('calcRoom');
const calcNights = document.getElementById('calcNights');
const calcAdults = document.getElementById('calcAdults');
const calcKids = document.getElementById('calcKids');
const calcBabies = document.getElementById('calcBabies');
const aptMealsWrap = document.getElementById('aptMealsWrap');
const calcAptMeals = document.getElementById('calcAptMeals');

const summaryDates = document.getElementById('summaryDates');
const summaryBreakdown = document.getElementById('summaryBreakdown');
const summaryTotalPrice = document.getElementById('summaryTotalPrice');
const whatsappBookBtn = document.getElementById('whatsappBookBtn');

let lastCalculationText = '';

function syncDatesToCalculator() {
  if (!isValidIsoDate(heroCheckin.value) || !isValidIsoDate(heroCheckout.value)) {
    updateCalculator();
    return;
  }
  const start = new Date(heroCheckin.value + 'T00:00:00');
  const end = new Date(heroCheckout.value + 'T00:00:00');
  const diffDays = Math.round((end - start) / (1000 * 60 * 60 * 24));
  if (diffDays >= 1) {
    calcNights.value = Math.min(365, diffDays);
  }
  updateCalculator();
}

function syncHeroGuestsToCalculator() {
  const g = parseInt(heroGuests.value, 10) || 2;
  calcAdults.value = g;
  if (g > 2 && calcRoom.value === 'double') {
    calcRoom.value = 'family';
  }
  updateCalculator();
}

function updateCalculator() {
  const roomType = calcRoom.value;
  const nights = Math.max(1, parseInt(calcNights.value, 10) || 2);
  let adults = Math.max(1, parseInt(calcAdults.value, 10) || 2);
  let kids = Math.max(0, parseInt(calcKids.value, 10) || 0);
  const babies = Math.max(0, parseInt(calcBabies.value, 10) || 0);

  // Ограничение вместимости для 2-местного номера
  if (roomType === 'double' && adults > 2) {
    adults = 2;
    calcAdults.value = 2;
  }

  aptMealsWrap.hidden = roomType !== 'apt';

  const lines = [];
  let perNight = 0;

  if (roomType === 'apt') {
    perNight = 5000;
    lines.push([`Апартаменты-студия × ${pluralize(nights, 'ночь', 'ночи', 'ночей')}`, formatRub(5000 * nights)]);
    if (calcAptMeals.checked) {
      const eaters = adults + kids;
      const mealCost = eaters * 1350 * nights;
      perNight += eaters * 1350;
      lines.push([`3-разовое питание (${eaters} чел.)`, formatRub(mealCost)]);
    }
  } else if (roomType === 'double') {
    const baseRate = adults === 1 ? 3000 : 5000;
    perNight = baseRate;
    lines.push([
      `2-местный номер (${adults === 1 ? '1 гость' : '2 гостя'}, с питанием)`,
      formatRub(baseRate * nights),
    ]);
    if (kids > 0) {
      perNight += kids * 1000;
      lines.push([`Дети 2–10 лет (${kids} чел., с питанием)`, formatRub(kids * 1000 * nights)]);
    }
  } else {
    // 4-местный номер с диваном: база 5 000 ₽ за двоих, доп. взрослый +2 000 ₽, ребёнок 2–10 лет +1 000 ₽
    const baseRate = adults === 1 ? 3000 : 5000;
    const extraAdults = Math.max(0, adults - 2);
    perNight = baseRate + extraAdults * 2000 + kids * 1000;
    lines.push([
      `4-местный номер (${adults === 1 ? '1 гость' : 'база за 2 гостей'}, с питанием)`,
      formatRub(baseRate * nights),
    ]);
    if (extraAdults > 0) {
      lines.push([`Доп. взрослые (${extraAdults} чел., с питанием)`, formatRub(extraAdults * 2000 * nights)]);
    }
    if (kids > 0) {
      lines.push([`Дети 2–10 лет (${kids} чел., с питанием)`, formatRub(kids * 1000 * nights)]);
    }
  }

  if (babies > 0) {
    lines.push([`Малыши до 2 лет (${babies} чел.)`, 'Бесплатно']);
  }

  lines.push(['Пляж, лодки, мангал, Wi-Fi', 'Включено']);

  const total = perNight * nights;

  // Заголовок дат
  const d1 = formatDateRu(heroCheckin.value);
  const d2 = formatDateRu(heroCheckout.value);
  summaryDates.textContent = d1 && d2
    ? `${d1} — ${d2} · ${pluralize(nights, 'ночь', 'ночи', 'ночей')}`
    : pluralize(nights, 'ночь', 'ночи', 'ночей');

  summaryBreakdown.innerHTML = lines
    .map(([label, val]) => `<div class="breakdown-line"><span>${label}</span><strong>${val}</strong></div>`)
    .join('');

  summaryTotalPrice.textContent = formatRub(total);

  const guestsText = [
    pluralize(adults, 'взрослый', 'взрослых', 'взрослых'),
    kids > 0 ? pluralize(kids, 'ребёнок 2–10 лет', 'ребёнка 2–10 лет', 'детей 2–10 лет') : '',
    babies > 0 ? pluralize(babies, 'малыш до 2 лет', 'малыша до 2 лет', 'малышей до 2 лет') : '',
  ]
    .filter(Boolean)
    .join(', ');

  const mealNote = roomType === 'apt' && calcAptMeals.checked ? ' + 3-разовое питание' : '';

  lastCalculationText =
    `Здравствуйте! Хотим забронировать «Ура, Селигер!»:\n` +
    `• Размещение: ${ROOMS[roomType].name}${mealNote}\n` +
    `• Даты: ${summaryDates.textContent}\n` +
    `• Гости: ${guestsText}\n` +
    `• Ориентировочный расчёт на сайте: ${formatRub(total)}\n` +
    `Подскажите, пожалуйста, свободны ли эти даты?`;

  whatsappBookBtn.href = buildWhatsAppUrl(lastCalculationText);
}

// Кнопки степперов (+/-)
document.querySelectorAll('.step-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const input = document.getElementById(btn.dataset.target);
    const delta = parseInt(btn.dataset.delta, 10);
    const min = parseInt(input.min, 10);
    const max = parseInt(input.max, 10);
    const next = Math.min(max, Math.max(min, (parseInt(input.value, 10) || 0) + delta));
    input.value = next;
    // Синхронизируем дату выезда в Hero и Калькуляторе при изменении количества ночей
    if (btn.dataset.target === 'calcNights' && heroCheckin.value) {
      const start = new Date(heroCheckin.value + 'T00:00:00');
      start.setDate(start.getDate() + next);
      setAllDates(heroCheckin.value, toLocalIso(start));
    }
    updateCalculator();
  });
});

calcRoom.addEventListener('change', updateCalculator);
calcAptMeals.addEventListener('change', updateCalculator);

updateCalculator();

/* ---------------- Нативные модальные окна (<dialog>) + Light Dismiss ---------------- */
function enableDialogLightDismiss(dialog) {
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
const requestModal = document.getElementById('requestModal');
const lightboxModal = document.getElementById('lightboxModal');

[roomModal, requestModal, lightboxModal].forEach(enableDialogLightDismiss);

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
const modalToCalcBtn = document.getElementById('modalToCalcBtn');

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

roomModal.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') renderModalPhoto(activeModalPhotoIdx - 1);
  if (e.key === 'ArrowRight') renderModalPhoto(activeModalPhotoIdx + 1);
});

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

    renderModalPhoto(0);

    const msg = `Здравствуйте! Интересует «${room.name}» в гостевом доме «Ура, Селигер!». Подскажите свободные даты и стоимость.`;
    modalWhatsappBtn.href = buildWhatsAppUrl(msg);

    roomModal.showModal();
  });
});

modalToCalcBtn.addEventListener('click', () => {
  calcRoom.value = activeModalRoomId;
  updateCalculator();
  roomModal.close();
  document.getElementById('calculator').scrollIntoView({ behavior: 'smooth' });
});

/* ---------------- Модалка быстрой заявки на звонок ---------------- */
const openQuickRequestBtn = document.getElementById('openQuickRequestBtn');
const callbackForm = document.getElementById('callbackForm');
const callbackSuccess = document.getElementById('callbackSuccess');
const callbackSummaryText = document.getElementById('callbackSummaryText');
const callbackWhatsappLink = document.getElementById('callbackWhatsappLink');

openQuickRequestBtn.addEventListener('click', () => {
  callbackForm.hidden = false;
  callbackSuccess.hidden = true;
  requestModal.showModal();
});

callbackForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('guestName').value.trim();
  const phone = document.getElementById('guestPhone').value.trim();
  const comment = document.getElementById('guestComment').value.trim();

  const fullText =
    `${lastCalculationText}\n` +
    `• Имя: ${name}\n` +
    `• Телефон: ${phone}` +
    (comment ? `\n• Комментарий: ${comment}` : '');

  callbackSummaryText.textContent =
    `${name}, спасибо! Мы подготовили вашу заявку на ${summaryDates.textContent}. Нажмите кнопку ниже, чтобы мгновенно отправить её администратору в WhatsApp.`;
  callbackWhatsappLink.href = buildWhatsAppUrl(fullText);

  callbackForm.hidden = true;
  callbackSuccess.hidden = false;
});

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
    '.calc-shell',
    '.gallery-item',
    '.review-card',
    '.faq-item',
    '.contacts-info',
    '.contacts-map-card',
  ];

  const items = document.querySelectorAll(revealSelectors.join(', '));
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -36px 0px' }
  );

  items.forEach((el, idx) => {
    el.classList.add('reveal-item');
    // Мягкая каскадная задержка внутри одного ряда
    el.style.transitionDelay = `${(idx % 4) * 55}ms`;
    observer.observe(el);
  });
}

initScrollReveal();

