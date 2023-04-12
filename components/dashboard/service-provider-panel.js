import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
  Chip,
  TextField,
  Modal,
  Button,
} from "@mui/material";
import { orderBy } from "lodash";
import styles from "../../styles/MatchTable.module.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";

const OrgTable = () => {
  const [data, setData] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/part-orgs`);
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
      const parsedData = JSON.parse(data);
      const foundMatch = orderBy(parsedData, "name");
      setFilteredData(
        foundMatch.filter(
          (item) =>
            (item &&
              item.name &&
              item.name.toLowerCase().includes(searchValue.toLowerCase())) ||
            (item &&
              item.contact_email &&
              item.contact_email
                .toLowerCase()
                .includes(searchValue.toLowerCase()))
        )
      );
    }
  }, [searchValue, data]);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
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
          <Button color="error" variant="contained" onClick={() => {}}>
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
          mt={2}
          mb={2}
        >
          Service Providers
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
                <TableCell className={styles.table_header_cell}>
                    <Chip label="Organization Name" />
                </TableCell>
                <TableCell className={styles.table_header_cell}>
                    <Chip label="Contact Email" />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData &&
                filteredData.map((item) => (
                  <TableRow key={item.id} className={styles.table_row}>
                    <TableCell component="th" scope="row" sx={{ fontSize: 16 }}>
                      <Link href={`/dashboard/org/${item.id}`}>
                        {item.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link href={`/dashboard/org/${item.id}`}>
                        {item.email}
                      </Link>
                      <Box sx={{ textAlign: "right" }}>
                        <Link href={`/dashboard/org/${item.id}`}>
                          <EditIcon sx={{ mr: 2 }} />
                        </Link>
                        <DeleteForeverIcon onClick={openModal} style={{ cursor: 'pointer' }} />
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
        </Box>
      </Box>
    </main>
  );
};

export default OrgTable;
