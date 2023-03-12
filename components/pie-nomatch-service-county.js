import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as Tooltip2 } from "recharts";
import { counties, services } from "../lib/services-provided";

const COLORS = [
  "#FFC107",
  "#FF9800",
  "#F44336",
  "#E91E63",
  "#9C27B0",
  "#673AB7",
  "#3F51B5",
  "#2196F3",
  "#00BCD4",
  "#4CAF50",
  "#8BC34A",
  "#CDDC39",
  "#FFEB3B",
];


const PieChartNoMatch = () => {
  const [days, setDays] = useState(7);
  const [months, setMonths] = useState(1);
  const [data, setData] = useState(null);
  const [sortBy, setSortBy] = useState("numSearches");
  const [filterBy, setFilterBy] = useState("days"); // Add state for filtering by "days" or "months"

  useEffect(() => {
    const params = filterBy === "days" ? `days=${days}` : `months=${months}`; // Update parameters based on new state for filtering
    fetch(`/api/metric-search?${params}`)
      .then((response) => response.json())
      .then((data) => setData(data.data))
      .catch((error) => console.error(error));
  }, [days, months, filterBy]);

const noMatch = useMemo(() => {
  return data?.filter((item) => item.found_match === 0) || [];
}, [data]);

const fullStringMap = useMemo(() => {
  return noMatch.reduce((map, item) => {
    const service = services.find((s) => s.id === item.service_id);
    const county = counties.find((c) => c.id === item.county_id);
    const fullString = `${service?.title} & ${county?.name}`;
    return map.set(fullString, (map.get(fullString) || 0) + 1);
  }, new Map());
}, [noMatch]);

    

  const fullStringCount = Array.from(fullStringMap).map(([fullString, numSearches]) => ({
    fullString,
    numSearches,
  }));

  const sortedData =
    sortBy === "numSearches"
      ? fullStringCount.sort((a, b) => b.numSearches - a.numSearches)
      : fullStringCount.sort((a, b) => a.fullString.localeCompare(b.fullString));

      const handleDaysChange = (e) => {
        setDays(e.target.value);
        if (filterBy !== "days") {
          setFilterBy("days");
        }
      };
      
      const handleMonthsChange = (e) => {
        setMonths(e.target.value);
        if (filterBy !== "months") {
          setFilterBy("months");
        }
      };
      
const handleSortByChange = (e) => {
  const newSortBy = e.target.value;
  if (sortBy !== newSortBy) {
    setSortBy(newSortBy);
  }
};

const handleFilterByChange = (e) => {
  const newFilterBy = e.target.value;
  if (filterBy !== newFilterBy) {
    setFilterBy(newFilterBy);
  }
};


  const legend = (
    <Paper sx={{ p: 2 }}>
{sortedData.map((item, index) => (
  <Box key={`legend-${item.fullString}`} 
    sx={{
    display: "flex",
    alignItems: "center",
    mb: 1,
  }}
>
  <Box
    sx={{
      width: 16,
      height: 16,
      mr: 1,
      bgcolor: COLORS[index % COLORS.length],
    }}
  />
  <Typography variant="body2">{item.fullString}</Typography>
  <Tooltip
    title={`${item.fullString}: ${item.numSearches} searches`}
    placement="right"
  >
    <Box ml={1}>
      <Typography variant="body2" color="text.secondary">
        {item.numSearches}
      </Typography>
    </Box>
  </Tooltip>
</Box>

      ))}
    </Paper>
  );
        
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        Metrics: No Match
      </Typography>
      <Grid container alignItems="center" sx={{ mb: 2 }}>
        <Grid item sx={{ mr: 2 }}>
          <Typography variant="body1" sx={{ mr: 1 }}>
            Show data from the last:
          </Typography>
        </Grid>
        <Grid item sx={{ mr: 2 }}>
          <TextField
            type="number"
            value={filterBy === "days" ? days : months}
            onChange={filterBy === "days" ? handleDaysChange : handleMonthsChange}
            variant="outlined"
            size="small"
            sx={{ width: "80px" }}
          />
        </Grid>
        <Grid item>
          <Typography variant="body1">{filterBy === "days" ? "days" : "months"}</Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" sx={{ mb: 2 }}>
        <Grid item sx={{ mr: 2 }}>
          <Typography variant="body1" sx={{ mr: 1 }}>
            Sort by:
          </Typography>
        </Grid>
        <Grid item sx={{ mr: 2 }}>
          <FormControl variant="outlined" size="small">
            <InputLabel>Sort By</InputLabel>
            <Select value={sortBy} onChange={handleSortByChange} label="Sort By">
              <MenuItem value="numSearches">Number of Searches</MenuItem>
              <MenuItem value="fullString">Alphabetically</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Typography variant="body1">in</Typography>
        </Grid>
        <Grid item sx={{ mr: 2 }}>
          <FormControl variant="outlined" size="small">
            <InputLabel>Filter By</InputLabel>
            <Select value={filterBy} onChange={handleFilterByChange} label="Filter By">
              <MenuItem value="days">Days</MenuItem>
              <MenuItem value="months">Months</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <ResponsiveContainer width="100%" height={1000}>
            <PieChart>
            <Pie
  data={sortedData}
  nameKey="fullString"
  dataKey="numSearches"
  cx="50%"
  cy="50%"
  outerRadius={400}
  fill="#8884d8"
  label
>
  {sortedData.map((item, index) => (
    <Cell
      key={`cell-${item.fullString}`}
      fill={COLORS[index % COLORS.length]}
      
    />
  ))}
  <Tooltip2
    animationDuration={500}
    itemStyle={{ backgroundColor: "#f5f5f5", color: "#333" }}
  />
</Pie>

            </PieChart>
          </ResponsiveContainer>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              height: "1000px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {legend}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

          };

          export default PieChartNoMatch;
