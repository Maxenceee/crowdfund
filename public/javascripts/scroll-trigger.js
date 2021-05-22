
let numbers = [89914, 5007, 56]

var didShown = false

// Detect request animation frame
var scroll = window.requestAnimationFrame ||
    function(callback){ window.setTimeout(callback, 1000/60)};

var elementsToShow = document.querySelectorAll('.show-on-scroll'); 
var elementsTrigger = document.querySelectorAll('.s3-tp')
const infoNums = document.querySelectorAll('.info-numbers')

function loop() {

    Array.prototype.forEach.call(elementsToShow, function(element) {
        if (isElementInViewport(element)) {
            element.style.animation = `pb-entry-animation 2s ease forwards`;
        //setTimeout(() => { element.classList.add('pb-isvisible'); }, 3000);
        if (!didShown) {
            infoNums.forEach((e, i) => {
                setTimeout(() => { animateValue(e, 0, numbers[i], 1500 , i); }, 300);
            });
            didShown = true
        }
        }
    });

    scroll(loop);
}

// Call the loop for the first time
loop();

function isElementInViewport(el) {
  if (typeof jQuery === "function" && el instanceof jQuery) {
    el = el[0];
  }
  var rect = el.getBoundingClientRect();
  return (
    (rect.top <= 0
      && rect.bottom >= 0)
    ||
    (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight))
    ||
    (rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
  );
}

function animateValue(obj, start, end, duration, index) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      if (index==0) {
        obj.innerHTML = "$" + numberWithCommas(Math.floor(progress * (end - start) + start));
      } else {
        obj.innerHTML = numberWithCommas(Math.floor(progress * (end - start) + start));
      }
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}