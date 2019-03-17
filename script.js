// Slider
var slider = document.getElementById('slider')
var slides = document.getElementsByClassName("slide");
var dots = document.getElementsByClassName('slider-dot');

var currentSlide = 0;
var sliderIsBusy = true;
var sliderIsFocused = false;

function clearSlider () {
	for (var i = 0; i < slides.length; i++) {
		slides[i].classList.remove("active-slide");
		dots[i].classList.remove("active-dot");
	};
};

function dotEventHandler () {
	setTimeout(function () {
		sliderIsBusy = false;
	},1500);
};
dotEventHandler();

function showSlide (num) {
	if (sliderIsBusy == false) {
		sliderIsBusy = true;
		slides[currentSlide].classList.add("slide-out");
		setTimeout(function () {
			clearSlider();
			slides[currentSlide].classList.remove("slide-out");
			currentSlide = num;
			slides[num].classList.add("active-slide");
			dots[currentSlide].classList.add("active-dot");
			dotEventHandler();
		},1000);
	};
};

function nextSlide () {
	if (sliderIsBusy == false) {
		sliderIsBusy = true;
		slides[currentSlide].classList.add("slide-out");
		setTimeout(function () {
			clearSlider();
			slides[currentSlide].classList.remove("slide-out");
			if(currentSlide == slides.length-1) {
				currentSlide = 0;
			} else {
				currentSlide += 1;
			};
			slides[currentSlide].classList.add("active-slide");
			dots[currentSlide].classList.add("active-dot");
			dotEventHandler();
		}, 1000);		
	};
}

slider.onmouseenter = function () {
	sliderIsFocused = true;
}
slider.onmouseleave = function () {
	sliderIsFocused = false;
}

var timer = 0;
function slideTimer () {
	if (sliderIsFocused == true) {
		timer = 0;
	} else {
		timer += 1;
		if (timer == 8) {
			timer = 0;
			nextSlide();
		};
	};
}
setInterval(slideTimer, 1000)


// Works section carousel

var worksWrapper = document.getElementById('works-wrapper');
var worksPrev = document.getElementById('works-prev');
var worksNext = document.getElementById('works-next');

var worksCount = worksWrapper.children.length;
var distance = 0;
var carouselLength = (worksCount*260)-40;
var equalizer = 0;


function moveCarousel () {
	worksWrapper.style.transform = `translateX(${-distance}px)`;
}

function stepLeft () {
	if (distance >= 260) {
		if (equalizer != 0) {
			distance -= equalizer;
			equalizer = 0;
		} else {
			distance -= 260;
		};
		moveCarousel();
	}
}
function stepRight () {
	if (distance < carouselLength-worksWrapper.clientWidth-260) {
		distance += 260;
		moveCarousel();
	} else {
		equalizer = carouselLength-(worksWrapper.clientWidth + distance);
		distance += equalizer;
		moveCarousel();
	}
}
// worksWrapper.clientWidth + distance <= length.
worksPrev.onclick = stepLeft;
worksNext.onclick = stepRight;

window.addEventListener('resize', function () {
	if (distance != 0) {
		distance = 0;
		moveCarousel();
	};
})


// Works section overlays

var works = document.getElementsByClassName('works-cell');
var overlays = document.getElementsByClassName('work-overlay');

function hideOverlays () {
	for (var i = 0; i < overlays.length; i++) {
		overlays[i].style.display = "none";
	};
}

function showOverlay (num) {
	hideOverlays();
	overlays[num].style.display = "flex";
}

for (let i = 0; i < works.length; i++) {
	works[i].addEventListener("mouseenter", function () {
		showOverlay(i);
	});
	works[i].addEventListener("mouseleave", hideOverlays);
}

// Desktop-Mobile Menu switcher

var openMenuIcons = document.getElementsByClassName('icon-menu');
var closeMenuIcons = document.getElementsByClassName('icon-close');
var mobileNavBox = document.getElementById('mobile-nav-box');
var menuSwitcherIsBusy = false;

function openMobileMenu () {
	if (menuSwitcherIsBusy == false) {
		menuSwitcherIsBusy = true;
		setTimeout(function () {
			menuSwitcherIsBusy = false;
		}, 600);
		mobileNavBox.style.display = "flex";
		mobileNavBox.classList.remove("close-mobile-menu");
		mobileNavBox.classList.add("show-mobile-menu");
	};
}
function closeMobileMenu () {
	if (menuSwitcherIsBusy == false) {
		menuSwitcherIsBusy = true;
		setTimeout(function () {
			menuSwitcherIsBusy = false;
			mobileNavBox.style.display = "none";
		}, 600);
		mobileNavBox.classList.remove("show-mobile-menu");
		mobileNavBox.classList.add("close-mobile-menu");
	};
}

for (let i = 0; i < 2; i++) {
	openMenuIcons[i].onclick = openMobileMenu;
	closeMenuIcons[i].onclick = closeMobileMenu;
}
