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
  Alert,
  Chip,
} from "@mui/material";
import { counties, services } from "../../lib/services-provided";
import styles from "../../styles/MatchTable.module.css";

const EngagementTable = ({ orgs }) => {
  const [days, setDays] = useState(7);
  const [data, setData] = useState(null);
  const [filterBy, setFilterBy] = useState("months");
  const [countiesList, setCountiesList] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [months, setMonths] = useState(1);
  const [daysError, setDaysError] = useState(false);
  const [monthsError, setMonthsError] = useState(false);

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
    fetch(`/api/metric-search-engagement?${params}`)
      .then((response) => response.json())
      .then(({ data }) => setData(data))
      .catch((error) => console.error(error));
  }, [days, months, filterBy]);

  const resetSearchEntries = () => {
    setDays(7);
    setMonths(1);
    setFilterBy("months");
    setDaysError(false);
    setMonthsError(false);
  };

  const handleDaysChange = useCallback(
    (e) => {
      const value = parseInt(e.target.value);
      if (value >= 1) {
        setDays(value);
        setDaysError(false);
        if (filterBy !== "days") {
          setFilterBy("days");
        }
        e.target.select(); // Select the text within the input box
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
        e.target.select(); // Select the text within the input box
      } else {
        setMonthsError(true);
      }
    },
    [setMonths, setFilterBy, filterBy]
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    const organizations = orgs;
    return (
      data
        ?.filter((item) =>
          `${servicesList.find((s) => s.id === item.service_id)?.title} ${
            countiesList.find((c) => c.id === item.county_id)?.name
          } ${
            organizations.find((org) => org.id === item.service_provider_id)
              ?.name
          }`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
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
  }, [data, servicesList, countiesList, searchQuery, orgs]);

  const organizations = orgs;
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
          Engagement for Service Providers
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
              sx={{ mr: 1, height: 40  }}
            />

            <Chip
              label="Months"
              clickable
              color={filterBy === "months" ? "primary" : "default"}
              onClick={() => setFilterBy("months")}
              sx={{ mr: 1, height: 40  }}
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
            sx={{ ml: 1, height: 40  }}
            onClick={resetSearchEntries}
          />
          <TextField
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
                    label="Service Provider"
                    sx={{ borderRadius: "16px" }}
                  />
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredData.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell sx={{ padding: "16px" }} bgcolor="#ffffff">
                    {`${item.serviceTitle} & ${item.countyName}`}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ padding: "16px" }}
                    bgcolor="#ffffff"
                  >
                    {
                      organizations.find(
                        (org) => org.id === item.service_provider_id
                      ).name
                    }
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

export default EngagementTable;
