//request data to server side with js by click button
const formEl = document.querySelector('.form-style');
formEl.addEventListener('submit', event => {
    event.preventDefault();
    let passwordValid = checkPassword(),
        cityValid = checkCity(),
        zipValid = checkZipCode(),
        addressValid = checkAddress(),
        stateValid = checkState();
    emailValid = checkEmail();

    let isFormvalid = passwordValid && emailValid && zipValid && cityValid && stateValid && addressValid;

    if (isFormvalid) {
        const formData = new FormData(formEl);
        const data = Object.fromEntries(formData);

        fetch('https://reqres.in/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(data => console.log(data))
            .catch(error => console.log(error)); value = " "
        window.alert("Log in success!");
    } else {
        window.alert("Please verify your information");
    }
})

///Declare element from form //////////////////  
const passwordEl = document.querySelector('#password');
const emailEl = document.querySelector('#email');
const zipEl = document.querySelector('#zip');
const cityEl = document.querySelector('#city');
const stateEl = document.querySelector('#state');
const addressEl = document.querySelector('#address');
const checkedBtnEl = document.querySelector('#check');
// const checkSubmitEl = document.querySelector('#submit');

// Disable and enable function

const checkCheckedBtn = () => {
    checkedBtnEl.disabled = !(
        passwordEl.value && emailEl.value && zipEl.value && cityEl.value && addressEl.value && stateEl.value !== ""
    )
}

// const checkSubmitBtn = () => {
//     checkSubmitEl.disabled = !(checkedBtnEl.value !== "");
// }
passwordEl.addEventListener('change', checkCheckedBtn);
emailEl.addEventListener('change', checkCheckedBtn);
zipEl.addEventListener('change', checkCheckedBtn);
cityEl.addEventListener('change', checkCheckedBtn);
addressEl.addEventListener('change', checkCheckedBtn);
stateEl.addEventListener('change', checkCheckedBtn);

// checkedBtnEl.addEventListener('click', checkSubmitBtn);

// End Disable and enable function

const checkPassword = () => {
    let valid = false;
    max = 25;

    const password = passwordEl.value.trim();
    if (!isRequired(password)) {
        showError(passwordEl, 'Password must contain at lease 8 character.');

    } else if (!isPasswordSecure(password)) {
        showError(passwordEl, 'Passsword not secure (Ex: Example*12345)');

    } else if (!isMax(password.length, max)) {
        showError(passwordEl, 'Password does not meet requirement');
    } else {
        showSuccess(passwordEl);
        valid = true;
    }
    return valid;
}

const checkEmail = () => {
    let valid = false;
    max = 75;

    const email = emailEl.value.trim();
    if (!isEmailStand(email)) {
        showError(emailEl, 'Email not valid (Ex: Example@gmail.com)');
    } else if (!isMax(email.length, max)) {
        showError(emailEl, "Should be Email Address");
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
}

const checkCity = () => {
    let valid = false;
    const city = cityEl.value.trim();
    if (!isCity(city)) {
        showError(cityEl, 'Please enter your country');
    } else {
        showSuccess(cityEl);
        valid = true;
    }
    return valid;
}
const checkAddress = () => {
    let valid = false;
    const address = addressEl.value.trim();
    if (!isAddress(address)) {
        showError(addressEl, 'Please enter a address');
    } else {
        showSuccess(addressEl);
        valid = true;
    }
    return valid;
}

const checkState = () => {
    let valid = false;
    const state = stateEl.value.trim();
    if (!isRequired(state)) {
        showError(stateEl, 'Please select State');
    } else {
        showSuccess(stateEl);
        valid = true;
    }
    return valid;
}

const checkZipCode = () => {
    let valid = false;
    max = 5;
    const zip = zipEl.value.trim();
    if (!isMax(zip.length, max)) {
        showError(zipEl, "Zip code must be less than 5")
    } else if (!isRequired(zip)) {
        showError(zipEl, 'Please enter Zip Code')
    }
    else {
        showSuccess(zipEl);
        valid = true;
    }
    return valid;
}

///Key function//////////////////
const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password)
};

const isEmailStand = (email) => {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,3})$/i;

    return re.test(email);
}

const isAddress = (address) => {
    const re = /[,#-\/\s\!\@\$.....]/gi;
    return re.test(address);
};


const isCity = (city) => {
    const re = new RegExp("[a-zA-Z]{2,}");
    return re.test(city);
};



const isRequired = value => value === '' ? false : true;

const isMax = (length, max) => length > max ? false : true;

const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.add('error');


    // show the error message
    const error = formField.querySelector('#Msg');

    error.textContent = message;
};
const showSuccess = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;

    // add the success class
    formField.classList.remove('error');


    // hide the error message
    const error = formField.querySelector('#Msg');
    error.textContent = "";

}


///dynamic show error 
const debounce = (fn, delay = 200) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
        case 'address':
            checkAddress();
            break;
        case 'city':
            checkCity();
            break;
        case 'zip':
            checkZipCode();
            break;
        case 'state':
            checkState();
            break;
    }
}));
