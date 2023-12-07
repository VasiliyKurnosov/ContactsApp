const nameInput = document.getElementById('contact_name_input');
const phoneNumberInput = document.getElementById('contact_phone_number_input');
const jobTitleInput = document.getElementById('contact_job_title_input');
const birthDateInput = document.getElementById('contact_birth_date_input');

nameInput.addEventListener('input', () => {
    if (!checkName(nameInput)) {
        showError(nameInput, 'Enter valid name');
    } else {
        hideError(nameInput);
    }
});
phoneNumberInput.addEventListener('input', () => {
    if (!checkPhoneNumber(phoneNumberInput)) {
        showError(phoneNumberInput, 'Enter valid phone number');
    } else {
        hideError(phoneNumberInput);
    }
});
jobTitleInput.addEventListener('input', () => {
    if (!checkJobTitle(jobTitleInput)) {
        showError(jobTitleInput, 'Enter valid job title');
    } else {
        hideError(jobTitleInput);
    }
});
birthDateInput.addEventListener('input', () => {
    if (!checkBirthDate(birthDateInput)) {
        showError(birthDateInput, 'Enter valid birth date');
    } else {
        hideError(birthDateInput);
    }
});

function checkRequired(value) {
    return value === '' ? false : true;
}

function checkName(input) {
    const name = input.value;
    if (!checkRequired(name)) {
        return false;
    }
    return true;
}

function checkPhoneNumber(input) {
    const phoneNumber = input.value;
    if (!checkRequired(phoneNumber)) {
        return false;
    }
    const re = /^\+[1-9]\d{0,2}\d{1,3}\d{5,7}$/;
    return re.test(phoneNumber);
}

function checkJobTitle(input) {
    const jobTitle = input.value;
    if (!checkRequired(jobTitle)) {
        return false;
    }
    return true;
}

function checkBirthDate(input) {
    const birthDate = input.value;
    if (!checkRequired(birthDate)) {
        return false;
    }
    const re = /^(19\d{2}|2\d{3})\-\d{2}\-\d{2}$/;
    return re.test(birthDate);
}

function checkInputs() {
    return checkName(nameInput) && checkPhoneNumber(phoneNumberInput)
            && checkJobTitle(jobTitleInput) && checkBirthDate(birthDateInput);
}

function showError(input, message) {
    input.classList.add('error');
    const parent = input.parentElement;
    const error = parent.querySelector('small');
    error.textContent = message;
}

function hideError(input) {
    input.classList.remove('error');
    const parent = input.parentElement;
    const error = parent.querySelector('small');
    error.textContent = '';
}

function showAllErrors() {
    if (!checkName(nameInput)) {
        showError(nameInput, 'Enter valid name');
    }
    if (!checkPhoneNumber(phoneNumberInput)) {
        showError(phoneNumberInput, 'Enter valid phone number');
    }
    if (!checkJobTitle(jobTitleInput)) {
        showError(jobTitleInput, 'Enter valid job title');
    }
    if (!checkBirthDate(birthDateInput)) {
        showError(birthDateInput, 'Enter valid birth date');
    }
}

function hideAllErrors() {
    hideError(nameInput);
    hideError(phoneNumberInput);
    hideError(jobTitleInput);
    hideError(birthDateInput);
}
