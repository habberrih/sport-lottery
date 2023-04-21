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
let numberInput = document.querySelector("#number");
let scroll1 = document.querySelector("#scroll1");
let drumRoll = document.querySelector("#drum_roll");
let cheer = document.querySelector("#cheer");
let fireworkPlaceholder = document.querySelector(".placeholder");
let lucky = document.querySelector("#lucky");
let slots = [...document.querySelectorAll(".slot")];
let btn = document.querySelectorAll(".btn")[1];
let maxNumber = 0;

numberInput.addEventListener("submit", (e) => {
  e.preventDefault();
  maxNumber = parseInt(e.target.number.value);
  for (let i = 0; i < 11; i++) {
    let myDiv = document.createElement("div");
    myDiv.innerText = i % (e.target.number.value[0] + 1);
    scroll1.appendChild(myDiv);
  }
  main.scrollIntoView({ behavior: "smooth" });
});

btn.addEventListener("click", () => {
  if (slots[0].classList.contains("visible")) {
    drumRoll.play();
    lucky.textContent = "...الفائز هو";
    fireworkPlaceholder.classList.remove("pyro");
    let winner = Math.floor(Math.random() * maxNumber);
    console.log(winner);

    numberSpin("scroll1").stop(5000, Math.floor(winner / 100));
    numberSpin("scroll2").stop(6000, Math.floor((winner % 100) / 10));
    numberSpin("scroll3").stop(7000, winner % 10);

    setTimeout(() => {
      fireworkPlaceholder.classList.add("pyro");
      lucky.textContent = "🥳🎉ألف مبارك🎉🥳";
      drumRoll.pause();
      cheer.play();
    }, 8100);
  } else {
    lucky.style.opacity = 1;
    slots.map((slot) => {
      slot.classList.add("visible");
    });
  }
});

document.addEventListener("wheel", (e) => {
  if (e.wheelDeltaY > 0) {
    header.scrollIntoView({ behavior: "smooth" });
  } else {
    main.scrollIntoView({ behavior: "smooth" });
  }
});
