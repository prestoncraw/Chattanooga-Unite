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
                  <TableSortLabel
                    active={true}
                    direction="asc"
                    className={styles.sort_label}
                  >
                    <Chip label="Organization Name" />
                  </TableSortLabel>
                </TableCell>
                <TableCell className={styles.table_header_cell}>
                  <TableSortLabel
                    active={false}
                    direction="asc"
                    className={styles.sort_label}
                  >
                    <Chip label="Contact Email" />
                  </TableSortLabel>
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
                        <DeleteForeverIcon />
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
