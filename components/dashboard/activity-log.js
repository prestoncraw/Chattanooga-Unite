import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
  Input,
  Button,
  Alert,
  Chip,
} from "@mui/material";
import { counties, services } from "../../lib/services-provided";
import { orderBy } from "lodash";
import styles from "../../styles/MatchTable.module.css";

const activityLog = () => {
  const [days, setDays] = useState(7);
  const [data, setData] = useState([]);
  const [sortBy, setSortBy] = useState("timestamp");
  const [order, setOrder] = useState("desc");
  const [filterBy, setFilterBy] = useState("days");
  const [countiesList, setCountiesList] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [months, setMonths] = useState(1);
  const [daysError, setDaysError] = useState(false);
  const [monthsError, setMonthsError] = useState(false);
  const [countyName, setCountyName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setCountiesList(counties);
    setServicesList(services);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/activity`);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const resetSearchEntries = useCallback(() => {
    setSearchTerm("");
  }, []);

  const handleSortRequest = useCallback(
    (columnType) => {
      const isDesc = sortBy === columnType && order === "desc";
      setOrder(isDesc ? "asc" : "desc");
      setSortBy(columnType);
    },
    [sortBy, order]
  );

  const logs = useMemo(() => {
    return orderBy(
      data
        .filter((item) => {
          return item.email.toLowerCase().includes(searchTerm.toLowerCase());
        })
        .map((item) => {
          let timestamp = new Date(item.search_timestamp).toLocaleString();
          timestamp = timestamp.replace(",", " -");
          return {
            timestamp,
            email: item.email,
            action: item.action,
          };
        }),
      [sortBy],
      order
    );
  }, [data, sortBy, order, searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
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
          Activity Log for Updates to Database
        </Typography>
        <Box className={styles.subtitle_container} mb={2}>
          <TextField
            value={searchTerm}
            onChange={handleSearchChange}
            variant="outlined"
            size="small"
            label="Search by Email"
            sx={{
              ml: 1,
              borderRadius: "16px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",
              },
            }}
          />

          <Chip
            label="Reset Search Filters"
            clickable
            color="error"
            variant="outlined"
            sx={{ ml: 1 }}
            onClick={resetSearchEntries}
          />
        </Box>

        {daysError || monthsError ? (
          <Box mb={2}>
            <Alert severity="error">Value cannot be less than 1</Alert>
          </Box>
        ) : null}
        <Box className={styles.table_container} mb={2}>
          <Table className={styles.table}>
            <TableHead>
              <TableRow>
                <TableCell className={styles.table_header_cell}>
                  <TableSortLabel
                    active={sortBy === "timestamp"}
                    direction={order}
                    className={styles.sort_label}
                    onClick={() => handleSortRequest("timestamp")}
                  >
                    <Chip label="Timestamp" />
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left" className={styles.table_header_cell}>
                  <TableSortLabel
                    active={sortBy === "email"}
                    direction={order}
                    className={styles.sort_label}
                    onClick={() => handleSortRequest("email")}
                  >
                    <Chip label="Email" />
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left" className={styles.table_header_cell}>
                  <TableSortLabel
                    active={sortBy === "action"}
                    direction={order}
                    className={styles.sort_label}
                    onClick={() => handleSortRequest("action")}
                  >
                    <Chip label="Action" />
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map((item) => (
                <TableRow key={item.timestamp} className={styles.table_row}>
                  <TableCell component="th" scope="row" sx={{ fontSize: 16 }}>
                    {item.timestamp}
                  </TableCell>
                  <TableCell align="left" sx={{ fontSize: 16 }}>
                    {item.email}
                  </TableCell>
                  <TableCell align="left" sx={{ fontSize: 16 }}>
                    {item.action}
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

export default activityLog;
