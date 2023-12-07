const hidePopupButtons = document.querySelectorAll('.popup .popup__close');
hidePopupButtons.forEach(button => {
    button.addEventListener('click', () => {
        hidePopup();
    });
});
const popupEasingDurationInMs = 100;
document.querySelector('.popup').style.transition = `opacity ${popupEasingDurationInMs}ms ease-in-out`;

function showPopup(popup, contact) {
    popup.style.visibility = 'visible';
    popup.style.opacity = 1;
    
    nameInput.value = contact.name;
    phoneNumberInput.value = contact.phoneNumber;
    jobTitleInput.value = contact.jobTitle;
    const birthDate = new Date(contact.birthDate);
    birthDateInput.value = contact.birthDate ? birthDate.toISOString().split('T')[0] : '';

    popup.onclick = (event) => {
        if (!event.target.closest('.popup__main')) {
            hidePopup(event.target.closest('.popup'));
        }
    };
    
    hideAllErrors();
}

function showUpdateContactPopup(contact) {
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.onclick = async () => {
        if (!checkInputs()) {
            showAllErrors();
            return;
        }
        contact.name = nameInput.value;
        contact.phoneNumber = phoneNumberInput.value;
        contact.jobTitle = jobTitleInput.value;
        contact.birthDate = birthDateInput.value;
        updateContactsListItem(contact);
        await updateContact(contact);
        hidePopup(popup);
    };

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = async () => {
        deleteContactsListItem(contact.id);
        await deleteContact(contact.id);
        hidePopup(popup);
    };
    
    const popup = document.querySelector('.popup');
    const buttonsBlock = popup.querySelector('.popup__buttons_block');
    buttonsBlock.innerHTML = '';
    buttonsBlock.appendChild(saveButton);
    buttonsBlock.appendChild(deleteButton);
    showPopup(popup, contact);
}

function showAddContactPopup() {
    let contact = { name: '', phoneNumber: '', jobTitle: '', birthDate: '' };
    const addButton = document.createElement('button');
    addButton.textContent = 'Add';
    addButton.onclick = async () => {
        if (!checkInputs()) {
            showAllErrors();
            return;
        }
        contact.name = nameInput.value;
        contact.phoneNumber = phoneNumberInput.value;
        contact.jobTitle = jobTitleInput.value;
        contact.birthDate = birthDateInput.value;
        contact = await addContact(contact);
        const listItem = createContactsListItem(contact);
        const contactsList = document.getElementById('contacts_list');
        contactsList.appendChild(listItem);
        hidePopup(popup);
    };

    const popup = document.querySelector('.popup');
    const buttonsBlock = popup.querySelector('.popup__buttons_block');
    buttonsBlock.innerHTML = '';
    buttonsBlock.appendChild(addButton);
    showPopup(popup, contact);
}

function hidePopup(popup = '') {
    if (!popup) {
        popup = document.querySelector('.popup');
    }
    popup.style.opacity = 0;
    setTimeout(() => {
        popup.style.visibility = 'hidden';
    }, popupEasingDurationInMs);
}

function createContactsListItem(contact) {
    const listItem = document.createElement('li');
    listItem.innerHTML = contact.name;
    listItem.className = 'section__button';
    listItem.setAttribute('data-id', contact.id);
    listItem.addEventListener('click', () => {
        showUpdateContactPopup(contact);
    });
    return listItem;
}

function updateContactsListItem(contact) {
    const listItem = document.querySelector(`#contacts_list li[data-id=\'${contact.id}\']`);
    listItem.innerHTML = contact.name;
}

function deleteContactsListItem(contactId) {
    const listItem = document.querySelector(`#contacts_list li[data-id=\'${contactId}\']`);
    listItem.remove();
}
