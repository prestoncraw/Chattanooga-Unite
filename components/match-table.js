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
} from "@mui/material";
import { counties, services } from "../lib/services-provided";
import { orderBy } from "lodash";
import styles from "../styles/MatchTable.module.css";

const foundMatchTable = () => {
  const [days, setDays] = useState(7);
  const [months, setMonths] = useState(1);
  const [data, setData] = useState(null);
  const [sortBy, setSortBy] = useState("numSearches");
  const [order, setOrder] = useState("desc");
  const [filterBy, setFilterBy] = useState("days");
  const [countiesList, setCountiesList] = useState([]);
  const [servicesList, setServicesList] = useState([]);

  useEffect(() => {
    setCountiesList(counties);
    setServicesList(services);
  }, []);

  useEffect(() => {
    const params = filterBy === "days" ? `days=${days}` : `months=${months}`;
    fetch(`/api/metric-search?${params}`)
      .then((response) => response.json())
      .then(({ data }) => setData(data))
      .catch((error) => console.error(error));
  }, [days, months, filterBy]);

  const foundMatch = useMemo(() => {
    return data?.filter((item) => item.found_match === 1) || [];
  }, [data]);

  const fullStringMap = useMemo(() => {
    return foundMatch.reduce((map, item) => {
      const service = servicesList.find((s) => s.id === item.service_id);
      const county = countiesList.find((c) => c.id === item.county_id);
      const fullString = `${service?.title} & ${county?.name}`;
      return map.set(fullString, (map.get(fullString) || 0) + 1);
    }, new Map());
  }, [foundMatch, servicesList, countiesList]);

  const fullStringCount = useMemo(() => {
    return Array.from(fullStringMap).map(([fullString, numSearches]) => ({
      fullString,
      numSearches,
    }));
  }, [fullStringMap]);

  const sortedData = useMemo(() => {
    return orderBy(fullStringCount, [sortBy], [order]);
  }, [fullStringCount, sortBy, order]);

  const handleDaysChange = useCallback(
    (e) => {
      setDays(e.target.value);
      if (filterBy !== "days") {
        setFilterBy("days");
      }
    },
    [setDays, setFilterBy, filterBy]
  );

  const handleMonthsChange = useCallback(
    (e) => {
      setMonths(e.target.value);
      if (filterBy !== "months") {
        setFilterBy("months");
      }
    },
    [setMonths, setFilterBy, filterBy]
  );

  const handleSortRequest = (columnId) => {
    const isDesc = sortBy === columnId && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setSortBy(columnId);
  };

  return (
    <main>
    <Box className={styles.container}>
      <Typography variant="h6" className={styles.title} mb={2}>
        Metrics: Matches for Service and Counties
      </Typography>
      <Box className={styles.subtitle_container} mb={2}>
        <Typography variant="body1" className={styles.subtitle_text} mr={1}>
          Show data from the last:
        </Typography>
        <TextField
          type="number"
          value={filterBy === "days" ? days : months}
          onChange={filterBy === "days" ? handleDaysChange : handleMonthsChange}
          variant="outlined"
          size="small"
          className={styles.subtitle_input}
          sx={{ mr: 1 }}
        />
        <Typography variant="body1">days</Typography>
      </Box>
      <Box className={styles.table_container} mb={2}>
        <Table className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell className={styles.table_header_cell} >
                <TableSortLabel
                  active={sortBy === "fullString"}
                  direction={order}
                  className={styles.sort_label}
                  onClick={() => handleSortRequest("fullString")}
                  sx={{fontSize:20}}
                >
                  Service & County
                </TableSortLabel>
              </TableCell>
              <TableCell align="right" className={styles.table_header_cell_right}>
                <TableSortLabel
                  active={sortBy === "numSearches"}
                  direction={order}
                  className={styles.sort_label}
                  onClick={() => handleSortRequest("numSearches")}
                >
                  Number of Searches
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map(({ fullString, numSearches }) => (
              <TableRow key={fullString} className={styles.table_row}>
                <TableCell component="th" scope="row"sx={{fontSize:16}} >
                  {fullString}
                </TableCell>
                <TableCell align="right" sx={{fontSize:16}}>
                  {numSearches}
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
export default foundMatchTable;