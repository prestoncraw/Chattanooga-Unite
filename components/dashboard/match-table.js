import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  ButtonGroup,
  Input,
  Alert,
  Chip,
} from "@mui/material";
import { counties, services } from "../../lib/services-provided";
import { orderBy } from "lodash";
import styles from "../../styles/MatchTable.module.css";

const foundMatchTable = () => {
  const [days, setDays] = useState(7);
  const [data, setData] = useState(null);
  const [sortBy, setSortBy] = useState("numSearches");
  const [order, setOrder] = useState("desc");
  const [filterBy, setFilterBy] = useState("months");
  const [countiesList, setCountiesList] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [months, setMonths] = useState(1);
  const [daysError, setDaysError] = useState(false);
  const [monthsError, setMonthsError] = useState(false);
  const [searchName, setSearchName] = useState("");

  const handleSearchChange = (e) => {
    setSearchName(e.target.value.toLowerCase());
  };

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
    setSearchName("");
  };

  const foundMatch = useMemo(() => {
    return (
      data
        ?.filter((item) => item.found_match === 1)
        .map((item) => {
          const service = servicesList.find((s) => s.id === item.service_id);
          const county = countiesList.find((c) => c.id === item.county_id);
          return {
            serviceTitle: service?.title,
            countyName: county?.name,
            ...item,
          };
        }) || []
    );
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

  const filteredData = useMemo(() => {
    return sortedData.filter((item) =>
      item.fullString.toLowerCase().includes(searchName)
    );
  }, [sortedData, searchName]);

  console.log(fullStringMap);

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
          Matching Searches from Find Help Page
        </Typography>
        <Box className={styles.subtitle_container} mb={2}>
          <Typography variant="body1" className={styles.subtitle_text} mr={1}>
            Show data from the last:
          </Typography>
          <ButtonGroup>
            <Chip
              label="Days"
              clickable
              color={filterBy === "days" ? "primary" : "default"}
              onClick={() => setFilterBy("days")}
              sx={{ mr: 1 }}
            />

            <Chip
              label="Months"
              clickable
              color={filterBy === "months" ? "primary" : "default"}
              onClick={() => setFilterBy("months")}
              sx={{ mr: 1 }}
            />
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
              sx={{
                mr: 1,
                borderRadius: "16px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "16px",
                },
              }}
              onFocus={(e) => e.target.select()} // Select the text within the input box when it receives focus
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
              sx={{
                mr: 1,
                borderRadius: "16px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "16px",
                },
              }}
              onFocus={(e) => e.target.select()} // Select the text within the input box when it receives focus
            />
          )}
          <Typography variant="body1">
            {filterBy === "days" ? "days" : "months"}
          </Typography>
          <Chip
            label="Reset Search Filters"
            clickable
            color="error"
            variant="outlined"
            sx={{ ml: 1 }}
            onClick={resetSearchEntries}
          />
          <TextField
            value={searchName}
            onChange={handleSearchChange}
            variant="outlined"
            size="small"
            label="Search by Service & County"
            sx={{
              ml: 1,
              borderRadius: "16px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",
              },
              width: "15%",
            }}
          />
        </Box>

        {daysError || monthsError ? (
          <Box mb={2}>
            <Alert severity="error">Value cannot be less than 1</Alert>
          </Box>
        ) : null}
        <Box className={styles.table_container} mb={2}>
          <Table sx={{ border: "1px solid #dddddd", borderRadius: "16px" }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ padding: "16px" }}>
                  <Chip
                    label="Service & County - Searches"
                    sx={{ borderRadius: "16px" }}
                  />
                </TableCell>
                <TableCell align="right" sx={{ padding: "16px" }}>
                  <Chip
                    label="Number of Searches"
                    sx={{ borderRadius: "16px" }}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map(({ fullString, numSearches }) => (
                <TableRow
                  key={fullString}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ padding: "16px" }}
                    bgcolor="#ffffff"
                  >
                    {fullString}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ padding: "16px" }}
                    bgcolor="#ffffff"
                  >
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
