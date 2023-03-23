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
  ButtonGroup,
  Button,
  Alert, 
} from "@mui/material";
import { counties, services } from "../../lib/services-provided";
import { orderBy } from "lodash";
import styles from "../../styles/MatchTable.module.css";

const foundMatchTable = () => {
  const [days, setDays] = useState(7);
  const [data, setData] = useState(null);
  const [sortBy, setSortBy] = useState("numSearches");
  const [order, setOrder] = useState("desc");
  const [filterBy, setFilterBy] = useState("days");
  const [countiesList, setCountiesList] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [months, setMonths] = useState(1);
  const [daysError, setDaysError] = useState(false);
  const [monthsError, setMonthsError] = useState(false);
  const [searchName, setSearchName] = useState('');
const [countyName, setCountyName] = useState('');

  useEffect(() => {
    setCountiesList(counties);
    setServicesList(services);
  }, []);

  useEffect(() => {
    let params = "";
    if (filterBy === "days") {
      params = `days=${days}`;
    } else if (filterBy === "months") {
      const daysForMonths = months * 30;
      params = `days=${daysForMonths}`;
    }
    fetch(`/api/metric-search?${params}`)
      .then((response) => response.json())
      .then(({ data }) => setData(data))
      .catch((error) => console.error(error));
  }, [days, months, filterBy]);
  
  const resetSearchEntries = () => {
    setDays(1);
    setMonths(1);
    setFilterBy("days");
    setDaysError(false);
    setMonthsError(false);
  };

  const foundMatch = useMemo(() => {
    return data?.filter((item) => item.found_match === 1)
      .map((item) => {
        const service = servicesList.find((s) => s.id === item.service_id);
        const county = countiesList.find((c) => c.id === item.county_id);
        return {
          serviceTitle: service?.title,
          countyName: county?.name,
          ...item
        };
      }) || [];
  }, [data, servicesList, countiesList]);

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
      const value = parseInt(e.target.value);
      if (value >= 1) {
        setDays(value);
        setDaysError(false);
        if (filterBy !== "days") {
          setFilterBy("days");
        }
      } else {
        setDaysError(true);
      }
    },
    [setDays, setFilterBy, filterBy]
  );

  const handleMonthsChange = useCallback(
    (e) => {
      const value = parseInt(e.target.value);
      if (value >= 1) {
        setMonths(value);
        setMonthsError(false);
        if (filterBy !== "months") {
          setFilterBy("months");
        }
      } else {
        setMonthsError(true);
      }
    },
    [setMonths, setFilterBy, filterBy]
  );

  
  const handleSortRequest = (columnType) => {
    const isDesc = sortBy === columnType && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setSortBy(columnType);
  };

  
  console.log(fullStringMap)

  return (
    <main>
      <Box className={styles.container}>
        <Typography variant="h6" className={styles.title} textAlign="center" mt={2}mb={2}>
          Metrics: Matching Seaches for Service and Counties
        </Typography>
        <Box className={styles.subtitle_container} mb={2}>
          <Typography variant="body1" className={styles.subtitle_text} mr={1}>
            Show data from the last:
          </Typography>
          <ButtonGroup>
            <Button
              variant={filterBy === "days" ? "contained" : "outlined"}
              onClick={() => setFilterBy("days")}
            >
              Days
            </Button>
            
            <Button
              variant={filterBy === "months" ? "contained" : "outlined"}
              onClick={() => setFilterBy("months")}
            >
              Months
            </Button>
            
          </ButtonGroup>
          {filterBy === "days" ? (
            <TextField
              type="number"
              value={days}
              onChange={handleDaysChange}
              variant="outlined"
              size="small"
              className={styles.subtitle_input}
              error={daysError}
              helperText={daysError ? "Value cannot be less than 1" : null}
              sx={{ mr: 1, ml:1 }}
            />
          ) : (
            <TextField
              type="number"
              value={months}
              onChange={handleMonthsChange}
              variant="outlined"
              size="small"
              className={styles.subtitle_input}
              error={monthsError}
              helperText={monthsError ? "Value cannot be less than 1" : null}
              sx={{ mr: 1, }}
            />
            
          )}
          <Typography variant="body1">
            {filterBy === "days" ? "days" : "months"}
          </Typography>
          <Button
            variant="outlined"
            onClick={resetSearchEntries}
            sx={{ ml: 1 }}
            color="error"
          >
            Reset Search Entries
          </Button>
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
                    active={sortBy === "fullString"}
                    direction={order}
                    className={styles.sort_label}
                    onClick={() => handleSortRequest("fullString")}
                    sx={{ fontSize: 20 }}
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
                  <TableCell component="th" scope="row" sx={{ fontSize: 16 }}>
                    {fullString}
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: 16 }}>
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