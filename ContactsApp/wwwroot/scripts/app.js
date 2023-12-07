(async () => {
    const contacts = await getContacts();
    showContacts(contacts);
    const addButton = document.getElementById('add_button');
    addButton.addEventListener('click', () => {
        showAddContactPopup();
    });
})();

function showContacts(contacts) {
    const contactsList = document.getElementById('contacts_list');
    contacts.forEach(contact => {
        const listItem = createContactsListItem(contact);
        contactsList.appendChild(listItem);
    });
}
