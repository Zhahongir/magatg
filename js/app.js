const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 0;

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener("click", function (e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}
const popupCloseIcon = document.querySelectorAll('.close-popup');
const iframe = document.querySelectorAll('video');

if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.popup'));
			iframe.forEach(function (item) {
				item.pause()
			})
			e.preventDefault();
		});
	}
}



function popupOpen(curentPopup) {
	if (curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('open');
		curentPopup.addEventListener("click", function (e) {
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}

function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnlock) {
			bodyUnLock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnLock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});

(function () {
	// проверяем поддержку
	if (!Element.prototype.closest) {
		// реализуем
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	// проверяем поддержку
	if (!Element.prototype.matches) {
		// определяем свойство
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();



const anchors = document.querySelectorAll('a.scroll-to')

for (let anchor of anchors) {
	anchor.addEventListener('click', function (e) {
		e.preventDefault()

		const blockID = anchor.getAttribute('href')

		document.querySelector(blockID).scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		})
	})
}



var swiper = new Swiper('.rev__slider', {

	slidesPerView: 1,
	slidesPerGroup: 1,

	loop: true,
	spaceBetween: 150,

	simulateTouch: true,
	speed: 700,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	breakpoints: {



		768: {
			slidesPerView: 2,

			spaceBetween: 30,
			slidesPerGroup: 1,
		},

		1025: {
			slidesPerView: 3,

			spaceBetween: 100,
			slidesPerGroup: 1,
		},




	}
});


const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 10;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('_active');
			} else {
				if (!animItem.classList.contains('_anim-no-hide')) {
					animItem.classList.remove('_active');
				}
			}
		}
	}
	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}

	setTimeout(() => {
		animOnScroll();
	}, 300);
}

let questions = document.querySelectorAll('.question__plus');

questions.forEach(element => {
	element.addEventListener('click', () => {
		if (element.firstElementChild.innerHTML === '-') {
			element.firstElementChild.innerHTML = '+';
			element.removeAttribute("style");
			console.log(element.previousElementSibling)
			element.previousElementSibling.classList.toggle("active");
			element.setAttribute("style", "top: 80%");
		} else {
			element.firstElementChild.innerHTML = '-';
			element.setAttribute("style", "padding-bottom: 20px");
			console.log(element.previousSibling)
			element.setAttribute("style", "top: 90%");
			element.previousElementSibling.classList.toggle("active");
		}
	})
});

let btnMore = document.querySelector('._btn_more');

btnMore.addEventListener('click', e => {
	btnMore.classList.toggle('_display');
	let modules = document.querySelectorAll('._no_lessons');
	modules.forEach(element => {
		element.classList.toggle('_display');
	})
})



const TimerDays = document.querySelector('.tarif__timer-days span');
const TimerHours = document.querySelector('.tarif__timer-hours span');
const TimerMins = document.querySelector('.tarif__timer-mins span');
const TimerSec = document.querySelector('.tarif__timer-sec span');






let countDownDate = new Date("Aug 31, 2022").getTime();

setInterval(() => {
	// Get today's date and time in milliseconds from 1970 UTC
	let now = new Date().getTime();

	let distance = countDownDate - now;

	let months = Math.floor(distance / (1000 * 60 * 60 * 24 * 30));
	let days = Math.floor(
		(distance % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
	);
	let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	let seconds = Math.floor((distance % (1000 * 60)) / 1000);


	TimerHours.textContent = hours;
	TimerMins.textContent = minutes;
	TimerSec.textContent = seconds;
}, 1000);