import React, { useState } from "react";
import ContactForm from "./components/contactForm";
import ContactsTable from "./components/contactTable";

const App = () => {
  const [selectedContact, setSelectedContact] = useState(null);

  const fetchContacts = async () => {
    // Trigger data refresh in both components (handled via props)
  };

  const clearSelection = () => {
    setSelectedContact(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Contact Management</h1>
      <ContactForm
        fetchContacts={fetchContacts}
        selectedContact={selectedContact}
        clearSelection={clearSelection}
      />
      <ContactsTable setSelectedContact={setSelectedContact} />
    </div>
  );
};

export default App;
