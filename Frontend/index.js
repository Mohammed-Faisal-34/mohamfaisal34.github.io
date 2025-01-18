// Home page: Carousel functionality
var nextBtn = document.querySelector('.next'),
    prevBtn = document.querySelector('.prev'),
    carousel = document.querySelector('.carousel'),
    list = document.querySelector('.list-1'),
    item = document.querySelectorAll('.item'),
    runningTime = document.querySelector('.carousel .timeRunning');

let timeRunning = 3000; // Time for animation reset
let timeAutoNext = 7000; // Auto-slide duration

// Handle "Next" button click
nextBtn.onclick = function () {
    showSlider('next');
};

// Handle "Previous" button click
prevBtn.onclick = function () {
    showSlider('prev');
};

let runTimeOut;
let runNextAuto = setTimeout(() => {
    nextBtn.click();
}, timeAutoNext);

// Reset running time animation
function resetTimeAnimation() {
    runningTime.style.animation = 'none';
    runningTime.offsetHeight; // Trigger reflow
    runningTime.style.animation = 'runningTime 7s linear 1 forwards';
}

// Show the slider based on type ('next' or 'prev')
function showSlider(type) {
    let sliderItemsDom = list.querySelectorAll('.carousel .list-1 .item');

    if (type === 'next') {
        list.appendChild(sliderItemsDom[0]);
        carousel.classList.add('next');
    } else {
        list.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
        carousel.classList.add('prev');
    }

    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carousel.classList.remove('next');
        carousel.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        nextBtn.click();
    }, timeAutoNext);

    resetTimeAnimation();
}

// Start the initial animation
resetTimeAnimation();

// Packages and offers section
console.clear();

const cardsContainer = document.querySelector('.cards');
const overlay = document.querySelector('.overlay');
const cards = Array.from(document.querySelectorAll('.card'));

// Apply overlay mask on pointer move
const applyOverlayMask = (e) => {
    const x = e.pageX - cardsContainer.offsetLeft;
    const y = e.pageY - cardsContainer.offsetTop;
    e.currentTarget.style = `--opacity: 1; --x: ${x}px; --y:${y}px;`;
};

// Create CTA for overlay card
const createOverlayCta = (overlayCard, ctaEl) => {
    const overlayCta = document.createElement('div');
    overlayCta.classList.add('cta');
    overlayCta.textContent = ctaEl.textContent;
    overlayCta.setAttribute('aria-hidden', true);
    overlayCard.append(overlayCta);
};

// Resize observer to adjust overlay size
const observer = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
        const cardIndex = cards.indexOf(entry.target);
        let width = entry.borderBoxSize[0].inlineSize;
        let height = entry.borderBoxSize[0].blockSize;

        if (cardIndex >= 0) {
            overlay.children[cardIndex].style.width = `${width}px`;
            overlay.children[cardIndex].style.height = `${height}px`;
        }
    });
});

// Initialize overlay cards
const initOverlayCard = (cardEl) => {
    const overlayCard = document.createElement('div');
    overlayCard.classList.add('card');
    createOverlayCta(overlayCard, cardEl.lastElementChild);
    overlay.append(overlayCard);
    observer.observe(cardEl);
};

cards.forEach(initOverlayCard);
document.body.addEventListener('pointermove', applyOverlayMask);

// Contact Us section
const inputs = document.querySelectorAll('.input');

// Add focus class
function focusFunc() {
    this.parentNode.classList.add('focus');
}

// Remove focus class if input is empty
function blurFunc() {
    if (this.value === '') {
        this.parentNode.classList.remove('focus');
    }
}

// Add event listeners for input fields
inputs.forEach((input) => {
    input.addEventListener('focus', focusFunc);
    input.addEventListener('blur', blurFunc);
});

// FAQ Section
const accordionBtns = document.querySelectorAll('.accordion-btn');

// Toggle FAQ accordion
accordionBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
        this.classList.toggle('active');
        const accordionDescription = this.nextElementSibling;
        const plusIcon = this.querySelector('.plus-icon');
        const minusIcon = this.querySelector('.minus-icon');

        if (accordionDescription.style.maxHeight) {
            accordionDescription.style.maxHeight = null;
            plusIcon.style.display = 'block';
            minusIcon.style.display = 'none';
        } else {
            accordionDescription.style.maxHeight = accordionDescription.scrollHeight + 'px';
            plusIcon.style.display = 'none';
            minusIcon.style.display = 'block';
        }
    });
});

// Scroll to Top Button
let MyButton = document.getElementById('ScrollToTopBtn');

// Show/hide button on scroll
window.onscroll = function () {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        MyButton.style.display = 'block';
    } else {
        MyButton.style.display = 'none';
    }
};

// Scroll to top of the page
function ScrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
