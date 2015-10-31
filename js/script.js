;(function() {
	// This IIFE sets appropriate height for element.
	// If some element should always correspond to some proportions,
	// you shoul demark this element with "js-setAppropriateHeight" class
	// and set "data-divider" attribute with appropriate divider (number).
	(function setAppropriateHeight() {
		var elems = document.querySelectorAll(".js-setAppropriateHeight");
		if (elems.length) {
			var width = document.documentElement.clientWidth;
			for (var i = 0, lim = elems.length; i < lim; i += 1) {
				var param = elems[i].dataset.divider;
				if (!isNaN(param)) {
					elems[i].style.height = (width/param) + "px";
				};
			};
			window.addEventListener("resize", setAppropriateHeight);
		};
	})();

	// This IIFE makes element squaresized.
	// If some element should always be square according to devise width 
	// or computed style of some parent element, you should demark this element 
	// with "js-makeSquaresized" class and set "data-known" attribute
	// with known property from CSS (width or height).
	(function makeSquaresized() {
		var elems = document.querySelectorAll(".js-makeSquaresized");
		if (elems.length) {
			for (var i = 0, lim = elems.length; i < lim; i += 1) {
				var known = elems[i].dataset.known;
				switch (known) {
					case "height":
						var value = "width";
						break;
					case "width":
						var value = "height";
						break;
					default:
						return
				};
				elems[i].style[value] = window.getComputedStyle(elems[i]).getPropertyValue(known);
			};
			window.addEventListener("resize", makeSquaresized);
		};
	})();

	// This IIFE makes smooth scroll.
	// It takes all links on the page, sorts them and make smooth scroll to appropriate target.
	(function() {
		var links = document.querySelectorAll('a'),
			sortedLinks = [],
			timer;

		// Function for scrolling to top.
		var scrollTop = function(elem) {
			if (timer) {
				clearInterval(timer);
			};
			timer = setInterval(function() {
				if (parseInt(elem.getBoundingClientRect().top) > 0) {
					clearInterval(timer);
				};
				window.scrollBy(0, -40);
			}, 10)
		};

		// Function for scrolling to bottom.
		var scrollBottom = function(elem) {
			if (timer) {
				clearInterval(timer);
			};
			var memo;
			timer = setInterval(function() {
				if ( (parseInt(elem.getBoundingClientRect().top) - 50) === memo || (parseInt(elem.getBoundingClientRect().top) - 50) < 0 ) {
					clearInterval(timer);
				};
				memo = parseInt(elem.getBoundingClientRect().top) - 50;
				window.scrollBy(0, 40);
			}, 10)
		};

		if (links.length) {
			// Sorting all anchors.
			for (var i = 0, lim = links.length; i < lim; i += 1) {
				var target = links[i].getAttribute("href");
				if (target[0] === "#") {
					sortedLinks.push(links[i])
				}
			}
			// Add event to all appropriate links.
			for (var i = 0, lim = sortedLinks.length; i < lim; i += 1) {
				sortedLinks[i].addEventListener("click", function(e) {
					var target = document.getElementById(this.getAttribute("href").slice(1)), 
						targetCoord = parseInt(target.getBoundingClientRect().top);

					if (targetCoord >= 0) {
						scrollBottom(target);
					} else {
						scrollTop(target);
					};

					e.preventDefault();
				})
			};
		};
	})();

	// This IIFE makes proper masks that cover images.
	(function makeMask() {
		var i, img, height, width,
			args = document.querySelectorAll('.mask');
		if (args.length) {
			for (i = 0; i < args.length; i += 1) {
				img = args[i].nextElementSibling;
				height = window.getComputedStyle(img).height;
				width = window.getComputedStyle(img).width;
				args[i].style.height = height;
				args[i].style.width = width;
			};
		};

		document.addEventListener("readystatechange", function() {
			if (document.readyState == "complete") {
				makeMask();
			};
		});

		window.addEventListener("resize", makeMask);
	})();

	// This IIFE makes appearing content on the page gradualy.
	(function animateContent() {
		var makeAppear = function (element) {
			var elem = element, i = 0;
			var timer = setInterval(function () {
				if (i < elem.children.length) {
					if (!elem.children[i].classList.contains("is-appear") && !elem.children[i].classList.contains("js-moved")) {
						elem.children[i].classList.add("is-appear");
					}
					i += 1;
				} else {
					clearInterval(timer);
				}
			}, 250);
		};

		var movers = document.documentElement.querySelectorAll('.js-moved'),
			docHeight = document.documentElement.clientHeight;
		if (movers.length) {
			for (var i = 0; i < movers.length; i += 1) {
				(function (arg) {
					setTimeout(function () {
						var elem = movers[arg];
						var elemH = parseInt(elem.getBoundingClientRect().top);
						if (elemH < (docHeight - 100)) {
							makeAppear(elem);
						}
					}, 100)
				})(i);
			};
		};
		
		window.addEventListener("scroll", animateContent)
	})();

	window.addEventListener("scroll", function() {
		(function() {
			var header = document.querySelector(".main-header"),
				logo = header.querySelector(".main-header__logo"),
				navigation = header.querySelector(".main-header__nav"),
				toTopBtn = document.querySelector('.to-top-btn');
			if (window.pageYOffset > 35) {
				header.classList.remove("is-normal");
				logo.classList.remove("is-normal");
				navigation.classList.remove("is-normal");
				header.classList.add("is-fixed");
				logo.classList.add("is-fixed");
				navigation.classList.add("is-fixed");
			} else {
				header.classList.remove("is-fixed");
				logo.classList.remove("is-fixed");
				navigation.classList.remove("is-fixed");
				header.classList.add("is-normal");
				logo.classList.add("is-normal");
				navigation.classList.add("is-normal");
			}
			if (window.pageYOffset > 350) {
				toTopBtn.style.opacity = "1";
			} else {
				toTopBtn.style.opacity = "";
			}
		})();
	});

	var paramArray = ([
         {
             img: "images/image1.jpg",
             content: [{html: {tag: "h1", classes: ["js-slider__title"]}, content: "Make it real"},
                         {html: {tag: "p", classes: ["js-slider__text"]}, content: "Even the most audacious ideas come true."}]

         },
         {
             img: "images/image2.jpg",
             content: [{html: {tag: "h1", classes: ["js-slider__title"]}, content: "Make it hard-headed"},
                         {html: {tag: "p", classes: ["js-slider__text"]}, content: "Developing clear, maintanable and reusable parts of code."}]

         },
         {
             img: "images/image3.jpg",
             content: [{html: {tag: "h1", classes: ["js-slider__title"]}, content: "Make it lithe"},
                         {html: {tag: "p", classes: ["js-slider__text"]}, content: "Refinement regardless of the width of the screen."}]

         },
         {
             img: "images/image4.jpg",
             content: [{html: {tag: "h1", classes: ["js-slider__title"]}, content: "Make it optimal"},
                         {html: {tag: "p", classes: ["js-slider__text"]}, content: "Golden mean between crossbrowser compability and modern capabilities."}]

         },
         {
             img: "images/image5.jpg",
             content: [{html: {tag: "h1", classes: ["js-slider__title"]}, content: "Make it serious"},
                         {html: {tag: "p", classes: ["js-slider__text"]}, content: "No-nonsense approach in development and business."}]

         }
     ])

    doorSlider(paramArray, true);

	document.querySelector(".sandwich").addEventListener("click", function() {
		var nav = document.querySelector(".main-nav");
		this.classList.toggle("is-opened");
		nav.classList.toggle("is-opened");
	});
})();