const form = document.getElementsByTagName('form')[0];
const email = document.getElementById('email');
const country = document.getElementById('country');
const zipcode = document.getElementById('zipcode');
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('password-confirm');
const result = document.getElementById('result');

form.addEventListener('submit', (e) => {
    if(
        !email.validity.valid || 
        !country.validity.valid ||
        !zipcode.validity.valid ||
        !password.validity.valid ||
        !passwordConfirm.validity.valid ||
        !passwordsMatch()
    ) {
        e.preventDefault();
        showEmailErrors();
        showCountryErrors();
        showZipcodeErrors();
        showPasswordErrors();
        showPasswordConfirmErrors();
    } else {
        result.textContent = "Good job!";
    }
});

email.addEventListener('input', () => {
    if(email.validity.valid) {
        email.nextElementSibling.textContent = '';
    } else {
        showEmailErrors();
    }
});

country.addEventListener('input', () => {
    if(country.validity.valid) {
        country.nextElementSibling.textContent = '';
    } else {
        showCountryErrors();
    }
});

zipcode.addEventListener('input', () => {
    if(zipcode.validity.valid) {
        zipcode.nextElementSibling.textContent = '';
    } else {
        showZipcodeErrors();
    }
});

password.addEventListener('input', () => {
    if(password.validity.valid) {
        password.nextElementSibling.textContent = '';
    } else {
        showPasswordErrors();
    }
});

passwordConfirm.addEventListener('input', () => {
    if(passwordConfirm.validity.valid && passwordsMatch()) {
        passwordConfirm.nextElementSibling.textContent = '';
    } else {
        showPasswordConfirmErrors();
    }
});

const showEmailErrors = () => {
    const span = email.nextElementSibling;
    if(email.validity.valueMissing) {
        span.textContent = 'Please, enter an e-mail address.';
    } else if(email.validity.typeMismatch) {
        span.textContent = 'Invalid e-mail format.';
    } else if(email.validity.tooShort) {
        span.textContent = `E-mail should be at least ${ email.minLength } characters.`;
    }
};

const showCountryErrors = () => {
    const span = country.nextElementSibling;
    if(country.validity.valueMissing) {
        span.textContent = 'Please, enter a country name.';
    } else if(country.validity.patternMismatch) {
        span.textContent = 'Enter a valid country name (at least 4 letters...)';
    }
};

const showZipcodeErrors = () => {
    const span = zipcode.nextElementSibling;
    if(zipcode.validity.valueMissing) {
        span.textContent = 'Please, enter your Zip Code.';
    } else if(zipcode.validity.patternMismatch) {
        span.textContent = 'Zip Code must be 4 numbers.'
    }
};

const showPasswordErrors = () => {
    const span = password.nextElementSibling;
    if(password.validity.valueMissing) {
        span.textContent = 'Please, enter a password.';
    } else if(password.validity.tooShort) {
        span.textContent = `The password must be at least ${ password.minLength } characters.`;
    }
};

const showPasswordConfirmErrors = () => {
    const span = passwordConfirm.nextElementSibling;
    if(passwordConfirm.validity.valueMissing) {
        span.textContent = 'Please, enter a password.';
    } else if(passwordConfirm.validity.tooShort) {
        span.textContent = `The password must be at least ${ passwordConfirm.minLength } characters.`;
    } else if(!passwordsMatch()) {
        span.textContent = 'Password does not match.';
    }
};

const passwordsMatch = () => {
    return password.value === passwordConfirm.value ? true : false;
};