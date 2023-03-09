import React from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import { useState } from "react";
import { services, counties } from "../lib/services-provided";


// Define an array of colors to use for the chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FFC0CB"];

const PieChartMatch = () => {
  const [days, setDays] = useState(7);
  const [data, setData] = useState(null);

  const handleDayChange = (event) => {
    const newDays = event.target.value;
    setDays(newDays);
    // fetch the matching SPs
    fetch(`/api/metric-search?days=${newDays}`)
      .then(response => response.json())
      .then(data => setData(data.data))
      console.log(data)
  }
  
  const matchFound = []

  if (data) {
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const service = services.find(s => s.id === item.service_id);
      const county = counties.find(c => c.id === item.county_id);
      item.fullString = `${service.title} & ${county.name}`;
      if (item.found_match === 1) {
        matchFound.push(item);
      }
    }
  }

  const fullStringCount = [];
  const fullStringMap = new Map();
  
  for (let i = 0; i < matchFound.length; i++) {
    const fullString = matchFound[i].fullString;
    if (fullStringMap.has(fullString)) {
      fullStringMap.set(fullString, fullStringMap.get(fullString) + 1);
    } else {
      fullStringMap.set(fullString, 1);
    }
  }
  
  for (let [fullString, numSearches] of fullStringMap) {
    fullStringCount.push({ fullString, numSearches });
  }
  


console.log(services[0].title)
  return (
    <div className="flex caption2 flex-col ui-chart">
      <div className="ml-24 flex justify-center flex-col w-48 items-center mt-32 mb-10">
        <p className="center">Metrics: Match</p>
      </div>
      <PieChart width={1500} height={1100}>
        <Pie
          data={fullStringCount}
          nameKey="fullString"
          dataKey="numSearches"
          cx={700}
          cy={500}
          outerRadius={500}
        >
          {data && data.map((item, index) => (
            <Cell key={`cell-${item.fullString}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <input type="text" value={days} onChange={handleDayChange}></input>

<ul>
  {/*fullStringCount.map((item, index) => (
    <li key={index}>
      {item.fullString}, Num Searches: {item.numSearches}
    </li>
  ))*/}
</ul>

    </div>
  );
};

export default PieChartMatch;
