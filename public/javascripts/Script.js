const finishButton = document.querySelectorAll('.ms-vl-button')
const bookmarkButton = document.querySelector('.bookmark-button')
const closeButton = document.querySelector('.check-cf')
const indicator = document.querySelectorAll('.ms-indicator')
const pastilIndicator = document.querySelectorAll('.ms-indicator-inner')
const pastilContainerView = document.querySelectorAll('.ms-element')
const vlViewTextField = document.querySelectorAll('.ms-validating')
const modalView = document.querySelector('.ms-body')
const rewardButton = document.querySelectorAll('.sub-card-button')

const backerView = document.querySelector('.modal-selector')

const backerButton = document.querySelector('.rsv-button')
const closeBacker = document.querySelector('.close-button')

const pledgeInput = document.querySelectorAll('.pledge-input')

const msPrice = document.querySelectorAll('.ms-price')

const signBtn = document.querySelector('.sign-btn')
const signContainer = document.querySelector('.sign-container')

const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li')

const bgimage = document.querySelector('.bg-image')

let pricesList = [5, 25, 75, 200]

window.addEventListener("resize", () => {
    checkForScreenSize()
    if (nav.style.transform == 'translateX(-100%)' && document.body.clientWidth > 650) {
        nav.style.transform = 'translateX(0%)'
    }
});

document.addEventListener("DOMContentLoaded", () => {
    //console.log("before appearing");
    checkForScreenSize()
});

$(document).ready(function(){
    $(this).scrollTop(0);
});

finishButton.forEach((element) => {
    element.addEventListener('click', () => {
        if (document.querySelector('.bg-modal').style.display == '' || document.querySelector('.bg-modal').style.display == 'none') {
            closeBackerWindow()
            openTanksWindow()
        }
    });
});

backerButton.addEventListener('click', () => {
    if (document.body.clientWidth > 650) {
        if (backerView.style.display == '' || backerView.style.display == 'none') {
            backerView.style.display = 'flex'
            setTimeout(() => { 
                document.body.style.height = "100%"
                document.body.style.overflow = "hidden";
            }, 500);
        }
    } else {
        window.location.href="/project";
    }
});

pastilContainerView.forEach((element, index) => {
    element.addEventListener('click', () => {
        if (pastilIndicator[index].classList.contains('toggle-indicator')) {
            //console.log('already toggle')
            //toggleOff(index)
        } else {
            pastilIndicator.forEach((pastil, pindex) => {
                if (pastil.classList.contains('toggle-indicator')) {
                    toggleOff(pindex)
                    msPrice[index].innerHTML = pricesList[index]
                    pledgeInput[index].classList.remove('input-ph')
                    pledgeInput[index].placeholder ="Enter your pledge"
                }
            });
            toggleOn(index)
        }
    });
});

rewardButton.forEach(element => {
    element.addEventListener('click', () => {
        if (document.body.clientWidth > 650) {
            if (backerView.style.display == '' || backerView.style.display == 'none') {
                backerView.style.display = 'flex'
                setTimeout(() => { 
                    document.body.style.height = "100%"
                    document.body.style.overflow = "hidden";
                }, 500);
            }
        } else {
            window.location.href="/project";
        }
    });
});

closeButton.addEventListener('click', () => {
    document.querySelector('.bg-modal').style.display = 'none';
    document.body.style.overflow = "initial";
});

closeBacker.addEventListener('click', () => {
    closeBackerWindow()
    pastilIndicator.forEach((pastil, pindex) => {
        if (pastil.classList.contains('toggle-indicator')) {
            toggleOff(pindex)
            msPrice[pindex].innerHTML = pricesList[pindex]
            pledgeInput[pindex].classList.remove('input-ph')
            pledgeInput[pindex].placeholder ="Enter your pledge"
        }
    })
    document.querySelectorAll('.we-up').forEach(e => {
        e.style.display = 'none'
    });
});

bookmarkButton.addEventListener('click', () => {
    if (bookmarkButton.style.flexDirection == 'row' || bookmarkButton.style.flexDirection == '') {
        bookmarkButton.style.flexDirection = 'row-reverse'
        document.querySelector('.bk-txt').style.color = "#137972"
        document.querySelector('.bk-txt').innerHTML = "Bookmarked";
        //document.getElementById('bk-logo circle').style.fill = 'red'
        //console.log('bookmarked')
    } else {
        bookmarkButton.style.flexDirection = 'row'
        document.querySelector('.bk-txt').style.color = "#717171"
        document.querySelector('.bk-txt').innerHTML = "Bookmark";
        //document.getElementById('bk-logo circle').style.fill = 'blue'
        //console.log('unbookmarked')
    }
});

function checkForScreenSize() {
    if (document.body.clientWidth < 650) {
        bgimage.src = './images/image-hero-mobile.jpg'
    } else {
        bgimage.src = './images/image-hero-desktop.jpg'
    }
};

function openTanksWindow() {
    document.querySelector('.bg-modal').style.display = 'flex'
    document.body.style.overflow = "hidden";
    document.body.style.height = "100%";
};

function closeBackerWindow() {
    document.querySelector('.modal-selector').style.display = 'none'
    document.body.style.overflow = "initial";
};

function toggleOff(pindex) {
    pastilIndicator[pindex].classList.toggle('toggle-indicator')
    pastilContainerView[pindex].classList.toggle('toggle-border')
    vlViewTextField[pindex].classList.toggle('toggle-indicator')
    //console.log('removed', pindex)
};

function toggleOn(index) {
    pastilIndicator[index].classList.toggle('toggle-indicator')
    pastilContainerView[index].classList.toggle('toggle-border')
    vlViewTextField[index].classList.toggle('toggle-indicator')
    //console.log('clicked', index)
};

function PLInpute() {
    pledgeInput.forEach((element, index) => {
        if (element === document.activeElement) {
            //console.log('Element has focus!');
            if (!isNaN(element.value)) {
                msPrice[index].innerHTML = element.value
                if (element.value == "") {
                    msPrice[index].innerHTML = "0"
                }
            }
        } else {
            //console.log(`Element is not focused.`);
        }
    });
};

document.addEventListener("keyup", function(event) {
    if (event.key === 'Enter') {
        pledgeInput.forEach((element, index) => {
            if (element === document.activeElement) {
                //console.log('Element has focus!');
                if (isNaN(element.value)) {
                    element.value = ""
                } else {
                    checkPriceValue(element.value, index)
                    element.value = ""
                }
            } else {
                //console.log('Element is not focused.');
            }
        });
    }
});

function checkPriceValue(value, index) {
    switch (index) {
        case 0:
            //console.log('current index 1', index)
            //console.log('no limit', value)
            msPrice[index].innerHTML = value;
            break;
        case 1:
            //console.log('current index 2', index)
            testValue(value, 25, index)
            break;
        case 2:
            //console.log('current index 3', index)
            testValue(value, 75, index)
            break;
        case 3:
            //console.log('current index 4', index)
            testValue(value, 200, index)
            break;
        default:
            break;
    };
};

function testValue(value, minValue, index) {
    if (value >= minValue) {
        //console.log(`upper than ${minValue}`, value)
        msPrice[index].innerHTML = value;
        removeInputClass(index)
    } else {
        pledgeInput[index].classList.add('input-ph')
        pledgeInput[index].placeholder = `Must be more than ${minValue}`;
        msPrice[index].innerHTML = minValue;
    }
};

function removeInputClass(index) {
    pledgeInput[index].classList.remove('input-ph')
    pledgeInput[index].placeholder = "Enter your pledge"
};

document.querySelectorAll('.modal-present').forEach(element => {
    element.addEventListener("click", (evt) => {
        const flyoutElement = document.getElementById("flyout-example");
        let targetElement = evt.target;
    
        do {
            if (targetElement == flyoutElement) {
                //console.log("Clicked inside!")
                return;
            }
            // Go up the DOM
            targetElement = targetElement.parentNode;
        } while (targetElement);
        
        //console.log("Clicked outside!")
        closeBackerWindow()
    });
});

function openSign() {
    if (document.body.clientWidth > 650) {
        document.querySelector('.container').style.animation = `showAnim 0s ease forwards`;
        document.querySelector('.sign-container').style.animation = `opacityAnim 0s ease forwards`;
        signContainer.style.display = 'flex';
        document.body.style.overflow = "hidden";
        document.body.style.height = "100%";
        //console.log(burger.style)
    } else {
        window.location.href="/sign";
    }
};

signBtn.addEventListener('click', () => {
    openSign()
});

const navSlide = () => {
    burger.addEventListener('click', () => {
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                nav.style.transform = 'translateX(-100%)'
                link.style.animation = ``
            } else {
                nav.style.transform = 'translateX(0%)'
                link.style.animation = `navLinkFade 0.3s ease forwards ${index / 5 + 0.1}s`;
            }
        });

        burger.classList.toggle('toggle');
    });
};

navSlide();


/* change svg color
$(function () {
    $("img.svg").each(function () {
      var $img = jQuery(this);
      var attributes = $img.prop("attributes");
      var imgURL = $img.attr("src");
      $.get(imgURL, function (data) {
        var $svg = $(data).find('svg');
        $svg = $svg.removeAttr('xmlns:a');
        $.each(attributes, function() {
          $svg.attr(this.name, this.value);
        });
        $img.replaceWith($svg);
      });
    });
});
*/

let matched = window.matchMedia('(prefers-color-scheme: dark)').matches;

if(matched)
	console.log('Currently in dark mode');
else
	console.log('Currently not in dark mode');