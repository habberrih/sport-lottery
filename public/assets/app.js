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

function onClick() {
  numberSpin("scroll1").stop(5000, Math.floor(Math.random() * 2 + 1));
  numberSpin("scroll2").stop(6000, Math.floor(Math.random() * 6));
  numberSpin("scroll3").stop(7000, Math.floor(Math.random() * 10));
}

let btn = document.querySelector("#btn");
btn.addEventListener("click", onClick);
