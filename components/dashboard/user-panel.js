import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Chip,
  TextField,
  Modal,
  Button,
} from "@mui/material";
import { orderBy } from "lodash";
import styles from "../../styles/MatchTable.module.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useRouter } from "next/router";

const UserTable = () => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = (email) => {
    setEmailToDelete(email);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);
  const [emailToDelete, setEmailToDelete] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/users`);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      const parsedData = data;
      const foundMatch = orderBy(parsedData, "name");
      setFilteredData(
        foundMatch.filter(
          (item) =>
            item &&
            item.email &&
            item.email.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }
  }, [searchValue, data]);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `/api/delete-user-account?email=${emailToDelete}`,
        {
          method: "DELETE",
        }
      );
  
      if (response.status === 200) {
        console.log("Successfully deleted the user account");
        setSnackbarSeverity("success");
        setSnackbarMessage("User account successfully deleted.");
        setTimeout(() => {
          router.reload();
        }, 1500);
      } 
      else {
        console.error("Error deleting the user account");
        setSnackbarSeverity("error");
        setSnackbarMessage(
          "Error occurred while deleting user account. Please make sure all service providers associated with this user are deleted first."
        );
      }
      setSnackbarOpen(true); // Add this line
    } catch (error) {
      console.error("Error deleting the user account:", error);
    }
    closeModal();
  };
  
  const renderDeleteConfirmation = () => {
    return (
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6">Are you sure you want to delete?</Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button color="error" variant="contained" onClick={handleDelete}>
            Delete
          </Button>
          <Button
            color="primary"
            variant="outlined"
            onClick={closeModal}
            sx={{ ml: 2 }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    );
  };

  return (
    <main>
      <Box className={styles.container} sx={{ margin: 2 }}>
        <Typography
          variant="h6"
          className={styles.title}
          textAlign="center"
          mt={4}
          mb={2}
        >
          Dashboard Users
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
          <Typography variant="subtitle1" sx={{ marginRight: 1 }}>
            Search:
          </Typography>
          <TextField
            value={searchValue}
            onChange={handleSearchChange}
            variant="outlined"
            size="small"
            label="Search by Org or Email"
            sx={{
              ml: 1,
              borderRadius: "16px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",
              },
            }}
          />
        </Box>
        <Box className={styles.table_container} mb={2}>
          <Table className={styles.table}>
            <TableHead>
              <TableRow>
                <TableCell className={styles.table_header_cell} colSpan={2}>
                  <Chip label="Email" />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData &&
                filteredData.map((item) => (
                  <TableRow key={item.id} className={styles.table_row}>
                    <TableCell component="th" scope="row" sx={{ fontSize: 16 }}>
                      {item.email}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ textAlign: "right" }}>
                        <DeleteForeverIcon
                          onClick={() => openModal(item.email)}
                          style={{ cursor: "pointer" }}
                        />
                        <Modal
                          open={modalOpen}
                          onClose={closeModal}
                          aria-labelledby="delete-confirmation"
                          aria-describedby="confirmation-dialog-for-delete"
                        >
                          {renderDeleteConfirmation()}
                        </Modal>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={() => setSnackbarOpen(false)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <Alert
              onClose={() => setSnackbarOpen(false)}
              severity={snackbarSeverity}
              variant="filled"
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </main>
  );
};

export default UserTable;
