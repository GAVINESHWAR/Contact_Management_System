import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TableContainer,
  TablePagination,
  Paper,
  TableSortLabel,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { fetchContacts, deleteContact } from "../api";

const ContactsTable = ({ setSelectedContact }) => {
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("firstName");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const getContacts = async () => {
    try {
      const { data } = await fetchContacts();
      setContacts(data);
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to fetch contacts!",
        severity: "error",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteContact(id);
      setSnackbar({
        open: true,
        message: "Contact deleted successfully!",
        severity: "success",
      });
      getContacts();
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to delete contact!",
        severity: "error",
      });
    }
  };

  const handleEdit = (contact) => {
    setSelectedContact(contact); // Pass selected contact to parent
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedContacts = () => {
    return contacts
      .slice()
      .sort((a, b) => {
        const aValue = a[orderBy]?.toString().toLowerCase() || "";
        const bValue = b[orderBy]?.toString().toLowerCase() || "";
        if (aValue < bValue) return order === "asc" ? -1 : 1;
        if (aValue > bValue) return order === "asc" ? 1 : -1;
        return 0;
      })
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: "90%", margin: "20px auto", padding: "20px" }}
    >
      <Typography variant="h6" sx={{ marginBottom: "10px" }}>
        Contacts List
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            {[
              "firstName",
              "lastName",
              "email",
              "phone",
              "company",
              "jobTitle",
            ].map((column) => (
              <TableCell key={column}>
                <TableSortLabel
                  active={orderBy === column}
                  direction={orderBy === column ? order : "asc"}
                  onClick={() => handleRequestSort(column)}
                >
                  {column
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </TableSortLabel>
              </TableCell>
            ))}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedContacts().map((contact) => (
            <TableRow key={contact._id} hover>
              <TableCell>{contact.firstName}</TableCell>
              <TableCell>{contact.lastName}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.phone}</TableCell>
              <TableCell>{contact.company}</TableCell>
              <TableCell>{contact.jobTitle}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleEdit(contact)}
                  sx={{ marginRight: "10px" }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDelete(contact._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={contacts.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
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
    </TableContainer>
  );
};

export default ContactsTable;
