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

var worksWrappper = document.getElementById('works-wrapper');
var worksPrev = document.getElementById('works-prev');
var worksNext = document.getElementById('works-next');

var distance = 0;
var worksCount = worksWrappper.children.length;
var range = (worksCount-4)*260 - 20;

function moveCarousel () {
	worksWrappper.style.transform = `translateX(${-distance}px)`;
}

function stepLeft () {
	if (distance >= 260) {
		distance -= 260;
	}
	moveCarousel();
}
function stepRight () {
	if (distance <= range)
	distance += 260;
	moveCarousel();
}

worksPrev.onclick = stepLeft;
worksNext.onclick = stepRight;


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