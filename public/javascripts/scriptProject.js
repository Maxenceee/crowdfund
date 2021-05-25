const indicator = document.querySelectorAll('.ms-indicator')
const pastilIndicator = document.querySelectorAll('.ms-indicator-inner')
const pastilContainerView = document.querySelectorAll('.ms-element')
const vlViewTextField = document.querySelectorAll('.ms-validating')
const modalView = document.querySelector('.ms-body')
const rewardButton = document.querySelectorAll('.sub-card-button')
const pledgeInput = document.querySelectorAll('.pledge-input')
const msPrice = document.querySelectorAll('.ms-price')
const finishButton = document.querySelectorAll('.ms-vl-button')
const closeButton = document.querySelector('.check-cf')

let pricesList = [5, 25, 75, 200]

if (window.performance) {
    //console.info("window.performance works fine on this browser");
    //console.info(performance.navigation.type);
    if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
        //console.info( "This page is reloaded" );
        backTomain()
    } else {
        //console.info( "This page is not reloaded");
    }
}

$(document).ready(function(){
    $(this).scrollTop(0);
});

document.querySelector('.close-button').addEventListener('click', () => {
    backTomain()
})

function backTomain() {
    window.location.href="/#";
}

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

finishButton.forEach((element) => {
    element.addEventListener('click', () => {
        document.querySelector('.ms-content').style.display = 'none'
        openTanksWindow()
    });
});

closeButton.addEventListener('click', () => {
    backTomain()
});

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

function openTanksWindow() {
    document.querySelector('.bg-modal').style.display = 'flex'
    document.body.style.overflow = "hidden";
    document.body.style.height = "100%";
};