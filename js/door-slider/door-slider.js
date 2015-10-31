// Element with class "js-slider" should be the container of slider.
// Specific styles and rules should be set up manualy in door-slider.css file.
// door-slider.js just set up and adjust behaviour of slider and default styles and layout.
// If you want to create door-slider, you should call doorSlider(arr, [wrapper]) function with one or two param:
//  arr - array of objects with proper information 
//      ([
//          {
//              img: ... (path to slider img),
//              content: [{html: {tag: %some tag%, classes: [class1, class2, class3, ...]}, content: "%some text%"},
//                          {html: {tag: %some tag%, classes: [class1, class2, class3, ...]}, content: "%some text%"},
//                          {html: {tag: %some tag%, classes:[class1, class2, class3, ...]}, content: "%some text%"}
//                      ], (array of object with information for content in particular slide; if no content required, pass empty array)

//          },
//          {
//              img: ... (path to slider img),
//              content: [{html: {tag: %some tag%, classes: %your classes for this tag from door-slider.css%}, content: "%some text%"},
//                          {html: {tag: %some tag%, classes: %your classes for this tag from door-slider.css%}, content: "%some text%"},
//                          {html: {tag: %some tag%, classes: %your classes for this tag from door-slider.css%}, content: "%some text%"}
//                      ], (array of object with information for content in particular slide; if no content required, pass empty array)

//          },
//          {
//              img: ... (path to slider img),
//              content: [{html: {tag: %some tag%, classes: %your classes for this tag from door-slider.css%}, content: "%some text%"},
//                          {html: {tag: %some tag%, classes: %your classes for this tag from door-slider.css%}, content: "%some text%"},
//                          {html: {tag: %some tag%, classes: %your classes for this tag from door-slider.css%}, content: "%some text%"}
//                      ], (array of object with information for content in particular slide; if no content required, pass empty array)

//          }
//      ]);
//      wrapper [optionaly] - should be true. If present, script will create container with class "l-wrapper" for restricting width of content. This class should be include to door-slider.css.

(function() {
    var slider = document.querySelector(".js-slider");
    if (slider) {
        window.doorSlider = function(info, wrapper) {
            var data = info,
                wrapper = wrapper || false,
                currentIndex = 0,
                queue = "odd",
                cart;

            var bindImages = function () {
                for (var i = 0, lim = data.length; i < lim; i += 1) {
                    var img = document.createElement("img");
                    img.setAttribute("src", data[i].img);
                    this.appendChild(img);
                };
            };

            var makeDisappear = function(element) {
                var i = element.children.length,
                    timer;
                timer = setInterval(function () {
                    if (i > 0) {
                        i -= 1;
                        var elem = element.children[i];
                        elem.classList.remove("slider-appear");
                    } else {
                        clearInterval(timer)
                    }
                }, 150);
            };

            var makeAppear = function(element) {
                var x = element.children, 
                    i = 0,
                    timer;

                timer = setInterval(function () {
                    if (i < x.length) {
                        x[i].classList.add("slider-appear");
                        i += 1;
                    } else {
                        clearInterval(timer)
                    }
                }, 150);
            };

            var setInfo = function (ind) {
                var children = cart.children,
                    obj = data[ind],
                    content = obj.content;
                if (children) {
                    var newCart = cart.cloneNode(false);
                    cart.parentElement.replaceChild(newCart, cart);
                    cart = newCart;
                };
                for (var i = 0, lim = content.length; i < lim; i += 1) {
                    var elem = document.createElement(content[i].html.tag),
                        classes = content[i].html.classes;
                    for (var x = 0, max = classes.length; x < max; x += 1) {
                        elem.classList.add(classes[x]);
                    };
                    switch (queue) {
                        case "odd":
                            queue = "even";
                            elem.classList.add("slider-anime-right");
                            break;
                        case "even":
                            queue = "odd";
                            elem.classList.add("slider-anime-left");
                            break;
                    };
                    elem.textContent = content[i]["content"];
                    cart.appendChild(elem);
                };
                queue = "odd";
            };

            var setBgToSlide = function (obj) {
                slider.querySelector(".js-slider__one-slide").style.backgroundImage = "url(" + obj.img + ")";
            };

            var setBgToDoors = function (obj) {
                slider.querySelector(".js-slider__left-door").style.backgroundImage = "url(" + obj.img + ")";
                slider.querySelector(".js-slider__right-door").style.backgroundImage = "url(" + obj.img + ")";
            };

            var increaseIndex = function () {
                currentIndex += 1;
                if (currentIndex >= data.length) {
                    currentIndex = 0;
                }
            };

            var changeSlides = function (obj) {
                var slide = document.querySelector(".js-slider__one-slide"),
                    leftDoor = document.querySelector(".js-slider__left-door"),
                    rightDoor = document.querySelector(".js-slider__right-door");
                setBgToSlide(obj);
                slide.classList.add("is-appeared");
                setTimeout(function() {
                    makeAppear(cart);
                    setTimeout(function() {
                        makeDisappear(cart);
                        setBgToDoors(obj);
                        leftDoor.classList.add('is-hidden');
                        rightDoor.classList.add('is-hidden');
                        leftDoor.classList.remove("is-sliding");
                        rightDoor.classList.remove("is-sliding");
                        setTimeout(function() {
                            leftDoor.classList.remove('is-hidden');
                            rightDoor.classList.remove('is-hidden');
                            slide.classList.remove("is-appeared");
                            increaseIndex();
                            setInfo(currentIndex);
                            setTimeout(function() {
                                leftDoor.classList.add("is-sliding");
                                rightDoor.classList.add("is-sliding");
                            }, 800);
                        }, (800 * cart.children.length) + 100);
                    }, (800 * cart.children.length) + 2000);
                }, 800);
            };

            (function() {
                var slide = document.createElement("div"),
                    container = document.createElement("div"),
                    preload = document.createElement("div"),
                    leftDoor = document.createElement("div"),
                    rightDoor = document.createElement("div");
                leftDoor.classList.add("js-slider__left-door");
                leftDoor.classList.add("is-hidden");
                rightDoor.classList.add("js-slider__right-door");
                rightDoor.classList.add("is-hidden");
                slide.classList.add("js-slider__one-slide");
                slide.classList.add("slider-l-cont");
                preload.classList.add(".js-slider__preload");
                bindImages.call(preload);
                slider.appendChild(slide);
                slider.appendChild(leftDoor);
                slider.appendChild(rightDoor);
                slider.appendChild(preload);
                container.classList.add("slider-l-el");
                slide.appendChild(container);
                cart = container;
                if (wrapper) {
                    var wrapElement = document.createElement("div")
                    wrapElement.classList.add("slider-l-wrapper");
                    container.appendChild(wrapElement);
                    cart = wrapElement;
                };
                setInfo(currentIndex);
                document.addEventListener("readystatechange", function() {
                    if (document.readyState == "complete") {
                        changeSlides(data[currentIndex]);
                        setTimeout(function timeSlider() {
                            var amount = cart.children.length;
                            changeSlides(data[currentIndex]);
                            setTimeout(timeSlider, (1600 * amount) + 3700)
                        }, (1600 * cart.children.length) + 3700)
                    }
                });
            })();

            (function setDoorsWidth() {
                var width = document.documentElement.clientWidth,
                    leftDoor = document.querySelector(".js-slider__left-door"), 
                    rightDoor = document.querySelector(".js-slider__right-door");
                leftDoor.style.backgroundSize = width + "px";
                rightDoor.style.backgroundSize = width + "px";
                window.addEventListener("resize", setDoorsWidth);
            })();
        };
    };
})();