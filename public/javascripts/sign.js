const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

const usernames_field = document.querySelector(".Username");
const password_field = document.querySelector(".Password");
const email_field = document.querySelector(".Email");

const usernames_field_S = document.querySelector(".UsernameS");
const password_field_S = document.querySelector(".PasswordS");

const login_btn = document.querySelector("#Login");
const signup_btn = document.querySelector("#sign-up");

const wrongIndicator = document.querySelectorAll('.we-up')

const inputs = document.querySelectorAll('.SIU-tf')

const closeSignBtn = document.querySelector('.close-sign-btn')

var usernames = ['maxence'];
var passwords = ['-1402147925'];
var emails = ["maxence.gama@gmail.com"];

var isSignUp = false

var isSmallScreen = false

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
    signup_btn.style.opacity = "0.5";
    login_btn.style.opacity = "0.5";
});

document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
      //console.log("juste appear")
      container.classList.remove("sign-up-mode");
      clearTextflied()
      if (document.body.clientWidth < 650) {
        isSmallScreen = true
    }
    //console.log('isSmallScreen:', isSmallScreen)
    }
};

sign_up_btn.addEventListener('click', () => {
    container.classList.add("sign-up-mode");
    isSignUp = true
    setTimeout(() => { clearTextflied() }, 1000);
});

sign_in_btn.addEventListener('click', () => {
    container.classList.remove("sign-up-mode");
    isSignUp = false    
    setTimeout(() => { clearTextflied() }, 1000);
});

closeSignBtn.addEventListener('click', () => {
    if (isSmallScreen == true) {
        backTomain()
    } else {
        closeSign()
    }
})

function clearTextflied() {
    usernames_field.value = ''
    email_field.value = ''
    password_field.value = ''
    usernames_field_S.value = ''
    password_field_S.value = ''
    wrongIndicator.forEach(e => {
        e.style.display = 'none'
    })
}

document.addEventListener("keyup", function(event) {
    if (event.key === 'Enter') {
        switch (isSignUp) {
            case true:
                signupUser()
            case false:
                signinUser()
        }
    }
});

function SIUInpute() {
    inputs.forEach((element, index) => {
        if (element === document.activeElement) {
            //console.log('Element has focus!');
            switch (isSignUp) {
                case true:
                    if (wrongIndicator[1].style.display != 'none') {
                        wrongIndicator[1].style.display = 'none'
                    }
                    if (!checkForEmptyField(usernames_field_S) && !checkForEmptyField(password_field_S) && !checkForEmptyField(password_field_S)) {
                        signup_btn.style.opacity = "1";
                        signup_btn.classList.add('hovering')
                    } else {
                        signup_btn.style.opacity = "0.5";
                        signup_btn.classList.remove('hovering')
                    }
                case false:
                    if (wrongIndicator[0].style.display != 'none') {
                        wrongIndicator[0].style.display = 'none'
                    }
                    if (!checkForEmptyField(usernames_field) && !checkForEmptyField(password_field)) {
                        login_btn.style.opacity = "1";
                        login_btn.classList.add('hovering')
                    } else {
                        login_btn.style.opacity = "0.5";
                        login_btn.classList.remove('hovering')
                    }
            }
        } else {
            //console.log('Element is not focused.');
        }
    })
}

login_btn.addEventListener('click', () => {
    if (!checkForEmptyField(usernames_field) && !checkForEmptyField(password_field)) {
        signinUser()
    }
})

signup_btn.addEventListener('click', () => {
    //console.log("u:", usernames_field_S.value, "p:", password_field_S.value, "e:", email_field.value)
    if (!checkForEmptyField(usernames_field_S) && !checkForEmptyField(password_field_S) && !checkForEmptyField(password_field_S)) {
        signupUser()
    }
})

function checkForEmptyField(textfield) {
    if (textfield.value === null || textfield.value === "") {
        return true
    }
    return false
}

function signinUser() {
    for (var i in usernames) {
        //console.log("u:", usernames[i], "in:" , usernames_field.value)
        if (usernames[i] == usernames_field.value) {
            //console.log("did")
            if (passwords[i] == password_field.value.hashCode()) {
                //console.log("granted")
                //window.open("https://google.com", "_blank")
                if (isSmallScreen == true) {
                    backTomain()
                } else {
                    closeSign()
                }
            } else {
                //console.log("password or username incorrect")
                wrongIndicator[0].style.display = 'flex'
                //console.log(passwords[i], password_field.value.hashCode())
            }
        } else {
            //console.log("not found")
            wrongIndicator[0].style.display = 'flex'
        }
    }
}

function signupUser() {
    if (usernames_field_S.value != "" && password_field_S.value != "" && email_field.value != "") {
        for (var i in usernames) {
            if (usernames[i] == usernames_field_S.value) { //check if user already registered
                if (passwords[i] == password_field_S.value) {
                    //console.log("already registered");
                    wrongIndicator[1].innerHTML = 'You are already registered'
                    wrongIndicator[1].style.display = 'flex'
                } else {
                    //console.log("username already used")
                    wrongIndicator[1].innerHTML = 'Username unavailable'
                    wrongIndicator[1].style.display = 'flex'
                }
            } else if (emails[i] == email_field.value) { //check if mail already used
                //console.log("mail already used");
                wrongIndicator[1].innerHTML = 'This email is used with another account'
                wrongIndicator[1].style.display = 'flex'
            } else if (ValidateEmail(email_field.value) == false) {
                //console.log("wrong email");
                wrongIndicator[1].innerHTML = 'Incorrect email address'
                wrongIndicator[1].style.display = 'flex'
            } else {            
                //console.log(ValidateEmail(email_field.value))
                usernames.push(usernames_field_S.value);
                passwords.push(password_field_S.value.hashCode());
                emails.push(email_field.value);
                //console.log(usernames, passwords, emails)
                if (isSmallScreen == true) {
                    backTomain()
                } else {
                    closeSign()
                }
                //window.open("https://google.com", "_blank")
            }
        }
    } else {
        //console.log("missing one at least");
        wrongIndicator[1].innerHTML = 'You need to fill all the field'
        wrongIndicator[1].style.display = 'flex'
    }
}

String.prototype.hashCode = function() {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr   = this.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

function closeSign() {
    setTimeout(() => { 
        container.classList.remove("sign-up-mode");
        clearTextflied()
        document.querySelector('.sign-container').style.display = 'none'
        document.body.style.overflow = "initial";
    }, 500);
}

function backTomain() {
    setTimeout(() => { 
        window.location.href="/#";
    }, 500);
}

function ValidateEmail(mail) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
        return (true)
    }
    return (false)
}