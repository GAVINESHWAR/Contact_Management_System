# Contact Management System

The Contact Management System is a mini-feature of a CRM that helps users manage customer and client contact information. Users can add, view, update, and delete contact details efficiently.

---

## Features

1. Add new contacts with details like name, email, phone, company, and job title.
2. View all contacts in a sortable and paginated table.
3. Update contact details when information changes.
4. Delete outdated or duplicate contacts.
5. Provides error handling for duplicate entries and missing fields.

---

## Tech Stack

- **Frontend**: React.js, Material-UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas

---

## Setup Instructions

### Backend
1. Navigate to the `server` folder:
   ```bash
   cd server
2. npm install
3. PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/contact-management?retryWrites=true&w=majority
JWT_SECRET=your_secret_key
4.npm start
## Frontend 
1. cd client
2. npm install
3. npm start
## API Endpoints
1. POST /contacts: Add a new contact.
2. GET /contacts: Retrieve all contacts.
3. PUT /contacts/
  : Update a specific contact.
4. DELETE /contacts/
  : Delete a contact.

## Challenges and Solutions

## Dependency Conflicts:
  Resolved issues with @mui/styles and React 18 by switching to sx props and styled components.

## Duplicate Email Handling:
  Added unique indexing on the email field in MongoDB and displayed specific error messages in the frontend.

## supporting Images
![Screenshot 2024-11-16 191347](https://github.com/user-attachments/assets/07691464-7175-401d-a6bb-7d05dac800db)
![Screenshot 2024-11-16 191401](https://github.com/user-attachments/assets/8d173d3e-98f3-4b0c-b4ae-28739d56d894)

## Pagination and Sorting:
  Used Material-UI table components and implemented server-side pagination and sorting for scalability.

## Contact
If you have any questions or suggestions, feel free to reach out at:
Your Name: avineshwar2002@gmail.com
