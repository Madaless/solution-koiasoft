import { FormControl, Select, MenuItem, InputLabel, Button } from '@mui/material';
import './App.css';
import { useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import { BarChart } from '@mui/x-charts/BarChart';
import { getTheData } from './service';
import { ApiResponse } from './types';
import { AxiosResponse } from 'axios';


interface Quarter {
  value: string;
  label: string;
}

const buttonStyle = {
  marginTop: '10px', // Adjust the values as per your padding requirements
};



const generateQuarters = (): Quarter[] => {
  const quarters: Quarter[] = [];
  const startYear = 2009;
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const lastCompletedQuarter = Math.ceil(currentMonth / 3) - 1;

  for (let year = startYear; year <= currentYear; year++) {
    const endQuarter = year === currentYear ? lastCompletedQuarter : 4;

    for (let quarter = 1; quarter <= endQuarter; quarter++) {
      const quarterString = `${year}K${quarter}`;
      quarters.push({ value: quarterString, label: quarterString });
    }
  }

  return quarters;
};

const boligTypes = [
  { label: 'Boliger i alt', value: '00' },
  { label: 'Småhus', value: '02' },
  { label: 'Blokkleiligheter', value: '03' },
];



function App() {
  const quarters = generateQuarters();
  const [startQuarter, setStartQuarter] = useState<string>(quarters[0].value);
  const [endQuarter, setEndQuarter] = useState<string>(quarters[quarters.length - 1].value);
  const [selectedBoligType, setSelectedBoligType] = useState<string>(boligTypes[0].value);
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null)


  const handleBoligTypeChange = (event: SelectChangeEvent<string>) => {
    setSelectedBoligType(event.target.value as string);
  };

  const handleStartQuarterChange = (event: SelectChangeEvent<string>) => {
    const selectedStartQuarter = event.target.value as string;
    if (selectedStartQuarter <= endQuarter) {
      setStartQuarter(selectedStartQuarter);
    }
  };

  const handleEndQuarterChange = (event: SelectChangeEvent<string>) => {
    const selectedEndQuarter = event.target.value as string;
    if (selectedEndQuarter >= startQuarter) {
      setEndQuarter(selectedEndQuarter);
    }
  };

  const filterQuartersInRange = (startQuarter: string, endQuarter: string): string[] => {
    const startIndex = quarters.map(q => q.value).indexOf(startQuarter);
    const endIndex = quarters.map(q => q.value).indexOf(endQuarter);

    if (startIndex === -1 || endIndex === -1 || startIndex > endIndex) {
      return [];
    }

    return quarters.slice(startIndex, endIndex + 1).map(q => q.label);
  };

  const handleButtonClick = async () => {
    const range = filterQuartersInRange(startQuarter, endQuarter);

    getTheData(range, selectedBoligType).then(
      (res: AxiosResponse) => {
        setApiResponse(res.data)
      }).catch(e => console.log(e));
  };


  return (
    <div className="App">
      <div className="select-container">

        <FormControl>
          <InputLabel id="bolig-type-label">Bolig Type</InputLabel>
          <Select
            defaultValue={boligTypes[0].value}
            labelId="bolig-type-label"
            id="bolig-type-select"
            value={selectedBoligType}
            onChange={handleBoligTypeChange}
          >
            {boligTypes.map((boligType) => (
              <MenuItem key={boligType.value} value={boligType.value}>
                {boligType.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel id="demo-simple-select-label">Start Quarter</InputLabel>
          <Select value={startQuarter} onChange={handleStartQuarterChange} id="demo-simple-select-label">
            {quarters.map((quarter) => (
              <MenuItem key={quarter.value} value={quarter.value}>
                {quarter.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel>End Quarter</InputLabel>
          <Select value={endQuarter} onChange={handleEndQuarterChange}>
            {quarters.map((quarter) => (
              <MenuItem key={quarter.value} value={quarter.value}>
                {quarter.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <Button style={buttonStyle} variant="contained" onClick={handleButtonClick}>Print me beautiful chart! </Button>


      {apiResponse &&
        <BarChart
          xAxis={[{ scaleType: 'band', data: Object.keys(apiResponse.dimension['Tid'].category.index) }]}
          series={[
            {
              data: apiResponse?.value,
            },
          ]}
          width={500}
          height={300}
        />}
    </div>
  );
}

export default App;
