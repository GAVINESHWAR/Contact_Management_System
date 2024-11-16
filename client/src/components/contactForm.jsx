import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Snackbar, Alert } from "@mui/material";
import { createContact, updateContact } from "../api";

const ContactForm = ({ fetchContacts, selectedContact, clearSelection }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  useEffect(() => {
    if (selectedContact) {
      setFormData(selectedContact);
    }
  }, [selectedContact]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedContact) {
        // Update existing contact
        await updateContact(selectedContact._id, formData);
        setSnackbar({
          open: true,
          message: "Contact updated successfully!",
          severity: "success",
        });
      } else {
        // Create a new contact
        await createContact(formData);
        setSnackbar({
          open: true,
          message: "Contact added successfully!",
          severity: "success",
        });
      }
      setTimeout(() => window.location.reload(), 3000);
      fetchContacts();
      clearForm();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "duplicate key error collection";
      if (errorMessage.includes("duplicate key error collection")) {
        setSnackbar({
          open: true,
          message: "Email already exists. Please use a different email.",
          severity: "error",
        });
      } else if (errorMessage.includes("duplicate")) {
        setSnackbar({
          open: true,
          message: "Duplicate data is not allowed.",
          severity: "error",
        });
      } else {
        setSnackbar({
          open: true,
          message: errorMessage,
          severity: "error",
        });
      }
    }
  };

  const clearForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      jobTitle: "",
    });
    clearSelection();
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "info" });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Job Title"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              {selectedContact ? "Update" : "Create"}
            </Button>
            {selectedContact && (
              <Button
                onClick={clearForm}
                variant="outlined"
                color="secondary"
                style={{ marginLeft: "10px" }}
              >
                Cancel
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ContactForm;
