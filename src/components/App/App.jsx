import "./App.css";

import ContactForm from "../ContactForm/ContactForm";
import SearchBox from "../SearchBox/SearchBox";
import ContactList from "../ContactList/ContactList";

import { useEffect, useState } from "react";

const storageKey = "contacts-key";

const initialContacts = [
  { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
  { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
  { id: "id-3", name: "Eden Clements", number: "645-17-79" },
  { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
];

function App() {
  const loadContacts = () => {
    const jsonData = localStorage.getItem(storageKey);
    const data = JSON.parse(jsonData);
    if (!data) {
      return initialContacts;
    }

    return data;
  };

  const saveContacts = () => {
    const strData = JSON.stringify(contacts);
    localStorage.setItem(storageKey, strData);
  };

  const [contacts, setContacts] = useState(loadContacts);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [filterInput, setFilterInput] = useState("");

  useEffect(saveContacts, [contacts]);

  const addContact = (contact) => {
    setContacts([...contacts, contact]);
  };

  const deleteContact = (contactId) => {
    setContacts(contacts.filter((con) => con.id !== contactId));
  };

  const findContact = (input) => {
    const normalizedInput = input.trim().toLowerCase();
    setFilterInput(normalizedInput);

    if (!normalizedInput) {
      setFilteredContacts([]);
      return;
    }

    setFilteredContacts(() => {
      return contacts.filter((contact) =>
        contact.name.toLowerCase().includes(normalizedInput)
      );
    });
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAdd={addContact} />
      <SearchBox value={filterInput} onChange={findContact} />
      <ContactList
        contacts={
          filteredContacts.length > 0
            ? filteredContacts
            : !filterInput
            ? contacts
            : []
        }
        onDelete={deleteContact}
      />
    </div>
  );
}

export default App;
