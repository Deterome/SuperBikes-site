class SliderElement {
    constructor(mainContent, marker) {
        this.mainContent = mainContent;
        this.marker = marker;
    }
}
class Roulette {
    #rouletteArray;
    #currentElementId;
    constructor() {
        this.#rouletteArray = new Array();
        this.#currentElementId = 0;
    }

    pop() {
        let popedElement = this.#rouletteArray[this.#currentElementId];
        this.#spinRoulette();
        return popedElement;
    }
    push(newElement) {
        this.#rouletteArray.push(newElement);
    }
    getCurrent() {
        return this.#rouletteArray[this.#currentElementId];
    }
    getLast() {
        return this.#rouletteArray[this.#getLastId()];
    }
    getNext() {
        return this.#rouletteArray[this.#getNextId()];
    }
    #spinRoulette() {
        this.#currentElementId = this.#getNextId();
    }
    #getNextId() {
        if (this.#currentElementId == this.#rouletteArray.length - 1) {
            return 0;
        } else {
            return this.#currentElementId + 1;
        }
    }
    #getLastId() {
        if (this.#currentElementId == 0) {
            return this.#rouletteArray.length - 1;
        } else {
            return this.#currentElementId - 1;
        }
    }
}

var productsList = document.querySelectorAll(".product");
var sliderMarkers = document.querySelectorAll(".slider__element");

var sliderElements = new Roulette();
for (let sliderElId = 0; sliderElId < productsList.length; sliderElId++) {
    let sliderEl = new SliderElement(productsList[sliderElId], sliderMarkers[sliderElId]);
    sliderElements.push(sliderEl);
}

var slideTime = 10000;
var lastSliderEl = sliderElements.getLast();
var currentSliderEl = sliderElements.pop();
var nextSliderEl = sliderElements.pop();

const ACTIVE_SLIDER_CLASS = "product--active"
const LAST_SLIDER_CLASS = "product--last"
const NEXT_SLIDER_CLASS = "product--next"

const ACTIVE_SLIDER_MARKER_CLASS = "slider__element--active"

function nextSliderElement(sliderElements) {
    lastSliderEl.mainContent.classList.remove(LAST_SLIDER_CLASS);
    currentSliderEl.mainContent.classList.remove(ACTIVE_SLIDER_CLASS);
    currentSliderEl.marker.classList.remove(ACTIVE_SLIDER_MARKER_CLASS);
    currentSliderEl.mainContent.classList.add(LAST_SLIDER_CLASS);

    lastSliderEl = currentSliderEl;
    currentSliderEl = nextSliderEl;
    
    currentSliderEl.mainContent.classList.remove(NEXT_SLIDER_CLASS);
    currentSliderEl.mainContent.classList.add(ACTIVE_SLIDER_CLASS);
    currentSliderEl.marker.classList.add(ACTIVE_SLIDER_MARKER_CLASS);

    nextSliderEl = sliderElements.pop();
    nextSliderEl.mainContent.classList.add(NEXT_SLIDER_CLASS);
}

function stopTimer(timerId) {
    clearInterval(timerId);
}

function startTimer() {
    return setInterval(nextSliderElement, slideTime, sliderElements);
}