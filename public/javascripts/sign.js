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

var usernames = ['maxence'];
var passwords = ['-1402147925'];
var emails = ["maxence.gama@gmail.com"];

var isSignUp = false


document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
      console.log("juste appear")
      container.classList.remove("sign-up-mode");
      clearTextflied()
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
            console.log('Element has focus!');
            switch (isSignUp) {
                case true:
                    wrongIndicator[1].style.display = 'none'
                case false:
                    wrongIndicator[0].style.display = 'none'
            }
        } else {
            console.log('Element is not focused.');
        }
    })
}

login_btn.addEventListener('click', () => {
    signinUser()
})

signup_btn.addEventListener('click', () => {
    console.log("u:", usernames_field_S.value, "p:", password_field_S.value, "e:", email_field.value)
    signupUser()
})

function signinUser() {
    for (var i in usernames) {
        //console.log("u:", usernames[i], "in:" , usernames_field.value)
        if (usernames[i] == usernames_field.value) {
            //console.log("did")
            if (passwords[i] == password_field.value.hashCode()) {
                console.log("granted")
                //window.open("https://google.com", "_blank")
                closeSign()
            } else {
                console.log("password or username incorrect")
                wrongIndicator[0].style.display = 'flex'
                console.log(passwords[i], password_field.value.hashCode())
            }
        } else {
            console.log("not found")
            wrongIndicator[0].style.display = 'flex'
        }
    }
}

function signupUser() {
    if (usernames_field_S.value != "" && password_field_S.value != "" && email_field.value != "") {
        for (var i in usernames) {
            if (usernames[i] == usernames_field_S.value) { //check if user already registered
                if (passwords[i] == password_field_S.value) {
                    console.log("already registered");
                    wrongIndicator[1].innerHTML = 'You are already registered'
                    wrongIndicator[1].style.display = 'flex'
                } else {
                    console.log("username already used")
                    wrongIndicator[1].innerHTML = 'Username unavailable'
                    wrongIndicator[1].style.display = 'flex'
                }
            } else if (emails[i] == email_field.value) { //check if mail already used
                console.log("mail already used");
                wrongIndicator[1].innerHTML = 'This email is used with another account'
                wrongIndicator[1].style.display = 'flex'
            } else if (ValidateEmail(email_field.value) == false) {
                console.log("wrong email");
                wrongIndicator[1].innerHTML = 'Incorrect email address'
                wrongIndicator[1].style.display = 'flex'
            } else {            
                console.log(ValidateEmail(email_field.value))
                usernames.push(usernames_field_S.value);
                passwords.push(password_field_S.value.hashCode());
                emails.push(email_field.value);
                console.log(usernames, passwords, emails)
                closeSign()
                //window.open("https://google.com", "_blank")
            }
        }
    } else {
        console.log("missing one at least");
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
    document.querySelector('.sign-container').style.display = 'none'
    document.body.style.overflow = "initial";
    container.classList.remove("sign-up-mode");
    clearTextflied()
}

function ValidateEmail(mail) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
        return (true)
    }
    return (false)
}