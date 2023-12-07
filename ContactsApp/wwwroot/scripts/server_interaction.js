async function getContacts() {
    const response = await fetch('/contacts', {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const contacts = await response.json();
    return contacts;
}

async function getContact(id) {
    const response = await fetch(`/contacts/${id}`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const contact = await response.json();
    return contact;
}

async function addContact(contact) {
    const response = await fetch('/contacts', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(contact)
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    contact = await response.json();
    return contact;
}

async function updateContact(contact) {
    const response = await fetch('/contacts', {
        method: 'PUT',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(contact)
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
}

async function deleteContact(contactId) {
    const response = await fetch(`/contacts/${contactId}`, {
        method: 'DELETE',
        headers: { 'Accept': 'application/json' },
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
}
