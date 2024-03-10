var buttonOn = false;
var timerId;
controlButton = document.querySelector(".slider__control-button");
controlButton.style.setProperty("--button-progress-delay", slideTime + "ms");
controlButton.addEventListener("click", (event) => {
    event.target.classList.toggle("slider__control-button--pause");
    event.target.classList.toggle("slider__control-button--play");

    buttonOn = !buttonOn;

    if (buttonOn) {
        timerId = startTimer();
    } else {
        stopTimer(timerId);
    }
}
);
