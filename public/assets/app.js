var numberSpin = function (selector) {
  var element = document.getElementById(selector);
  var factor = 10 + Math.floor(Math.random() * 10);
  var num = 10;
  var section = 100 / (num + 1);
  var stopValue = 1;
  var spin = function (flag, x) {
    var value = element.style.transform;
    value = value ? parseFloat(value.split("(")[1].split(")").join("")) : 0;
    if (flag && flag == true) {
      if (
        stopValue != 1 &&
        (value <= stopValue || value - section / factor <= stopValue) &&
        typeof x != "undefined" &&
        value >= x * -section &&
        value <= (x - 0.5 >= 0 ? x - 0.5 : stopValue == 0 ? 0 : 0.5) * -section
      ) {
        element.style.transform = "translateY(" + stopValue + "%)";
        stopValue = 1;
        return true;
      }
      stopValue =
        Math.floor(value / section) >= -num
          ? Math.floor(value / section) * section
          : 0;
    }
    if (value && value <= -(section * num)) {
      element.style.transform = "translateY(" + section + "%)";
      value = 0;
    } else {
      value -= section / factor;
    }
    element.style.transform = "translateY(" + value + "%)";
    return false;
  };
  var spinTimer = setInterval(spin, 10);
  function stop(delay, x) {
    setTimeout(function () {
      clearTimeout(spinTimer);
      var stopTimer = setInterval(function () {
        if (spin(true, x)) {
          clearInterval(stopTimer);
        }
      }, 10);
    }, delay);
  }
  return {
    stop: function (delay, x) {
      return stop(delay, x);
    },
  };
};

let header = document.querySelector("header");
let main = document.querySelector("main");
let mouseLogo = document.querySelector("#mouse_logo");
let fireworkPlaceholder = [...document.querySelectorAll(".placeholder")];
let lucky = document.querySelector("#lucky");
let slots = [...document.querySelectorAll(".slot")];
let btn = document.querySelector("#btn");

btn.addEventListener("click", () => {
  if (slots[0].classList.contains("visible")) {
    lucky.textContent = "The lucky number is...";
    fireworkPlaceholder.map((item) => item.classList.remove("firework"));
    firstNumber = Math.floor(Math.random() * 2 + 1);
    secondNumber = Math.floor(Math.random() * 6);
    thirdNumber = Math.floor(Math.random() * 10);

    numberSpin("scroll1").stop(5000, firstNumber);
    numberSpin("scroll2").stop(6000, secondNumber);
    numberSpin("scroll3").stop(7000, thirdNumber);

    setTimeout(() => {
      fireworkPlaceholder.map((item) => item.classList.add("firework"));
      lucky.textContent = "🥳🎉CONGRATULATIONS🎉🥳";
    }, 8100);
  } else {
    lucky.style.opacity = 1;
    slots.map((slot) => {
      slot.classList.add("visible");
    });
  }
});

mouseLogo.addEventListener("click", () => {
  main.scrollIntoView({ behavior: "smooth" });
});

document.addEventListener("wheel", (e) => {
  if (e.wheelDeltaY > 0) {
    header.scrollIntoView({ behavior: "smooth" });
  } else {
    main.scrollIntoView({ behavior: "smooth" });
  }
});
