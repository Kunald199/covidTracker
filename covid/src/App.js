import React, {useState,useEffect} from 'react';
import { CardContent,Card,FormControl,MenuItem,Select } from '@material-ui/core';
import InfoBox from './InfoBox';
import './App.css';
import Map from './Map';
import Table from './Table';
import {sortData,preetyPrintStat} from './util';
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css";
function App() {
  const[countries,setCountries]=useState([]);
  const[country,setCountry]=useState('worldwide');
  const[countryInfo,setCountryInfo]=useState({});
  const[tableData,setTableData]=useState([]);
  const[mapCenter,setMapCenter]=useState({lat: 34.80746, lng: -40.4796});
  const[mapZoom,setMapZoom]=useState(5);
  const[mapCountries,setMapCountries]=useState([]);
  const[casesType,setCasesType]=useState("cases");
  useEffect(()=>{
    fetch('https://disease.sh/v3/covid-19/all')
    .then(response=>response.json())
    .then(data=>{
      setCountryInfo(data);
    })
  },[])
  useEffect(()=>{
    getData();

  },[]);


  const getData = async () =>{
    const response=await fetch("https://disease.sh/v3/covid-19/countries")
    const data = await response.json();
    setCountries(data.map((country)=>({
      name:country.country,
      value:country.countryInfo.iso2,
    })))
    const sortedData=sortData(data);
    setMapCountries(data);
    setTableData(sortedData);

  }

const onCountryChange = (e) =>{
  const countryCode= e.target.value;

  const url = countryCode === 'worldwide' ? `https://disease.sh/v3/covid-19/all`
  :`https://disease.sh/v3/covid-19/countries/${countryCode}`

  fetch(url)
  .then(response => response.json())
  .then(data =>{
    setCountry(countryCode);
    setCountryInfo(data);

    setMapCenter([data.countryInfo.lat,data.countryInfo.long]);
    setMapZoom(4);
  })
};

  return(
    <React.Fragment>
    <div className="App">
    <div className="app_left">
    <div className="app_header">
    {/* Header*/}
    {/* Title.select i/p dropdown  */}
    <h1> COVID-19 TRACKER</h1>
    <FormControl className="app_dropdown">
    <Select variant="outlined"
    onChange={onCountryChange}
    value={country} >
    <MenuItem value="worldwide"> Worldwide </MenuItem>
    { countries.map((country)=>(
      <MenuItem value={country.value}>{country.name}</MenuItem>
    ))}

    </Select>
    </FormControl>
    </div>
    <div className="app_stats">
      {/* Info Boxs */}
    <InfoBox
    active={casesType === 'cases'}
    onClick={(e)=>setCasesType('cases')}
    title="Coronavius Cases" cases={preetyPrintStat(countryInfo.todayCases)} total={preetyPrintStat(countryInfo.cases)}/>
    <InfoBox
    active={casesType === 'recovered'}
    onClick={(e)=>setCasesType('recovered')}
    title="Recovered" cases={preetyPrintStat(countryInfo.todayRecovered)} total={preetyPrintStat(countryInfo.recovered)}/>
    <InfoBox
    active={casesType === 'deaths'}
    onClick={(e)=>setCasesType('deaths')}
    title="Deaths" cases={preetyPrintStat(countryInfo.todayDeaths)} total={preetyPrintStat(countryInfo.deaths)}/>
    </div>


    {/* Map */}
    <Map casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom}/>
    </div>
    <Card className="app_right">
    <CardContent> {/* it gives vo background white */}
    <h3> Live cases by country </h3>
      {/* Table */}
      <Table countries={tableData}/>
    <h3> Worldwide New cases </h3>
    <LineGraph   />


    </CardContent>
    </Card>
    </div>
    </React.Fragment>
  );
}

export default App;
