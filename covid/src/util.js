 /*export const sortData=(data)=>{
  const sortedData=[...data];
  sortedData.sort((a,b)=>{
    if(a.cases>b.cases){
      return -1; //-1 coz stands for false
    }
    else{
      return 1;
    }
  })
  return sortedData;
} */
import React from "react";
import {Circle,Popup} from "react-leaflet";
import numeral from "numeral";

const casesTypeColors={
  cases:{
    hex:"blue",
    rgb:"rgb(204,16,52)",
    multiplies:800,
  },
  recovered:{
    hex:"#7dd71d",
    rgb:"rgb(125,215,29)",
    multiplies:1200,
  },
deaths:{
    hex:"#fb4442",
    rgb:"rgb(251,68,67)",
    multiplies:2000,
  },
}

export const sortData=(data)=>{
  const sortedData=[...data];
  return sortedData.sort((a,b)=>(a.cases>b.cases?-1:1))
};


export const preetyPrintStat=(stat) =>
stat ? `+${numeral(stat).format("0.0a")}` : "+0";
//draw circle on map with interattive tooltop
export const showDataonMap =(data,caseType='cases')=>(
  data.map((country) => (
    <Circle
    center={[country.countryInfo.lat,country.countryInfo.long]}
    fillOpacity={0.4}
    color={casesTypeColors[caseType].hex}
    fillColor={casesTypeColors[caseType].hex}
    radius={
      Math.sqrt(country[caseType])*casesTypeColors[caseType].multiplies
    }
    >
    <Popup>
    <div className="info-container">



    <div className="info_name">{country.country}</div>
    <div className="info_confirmed">
    Cases:{numeral(country.cases).format("0,0")}
    </div>

    <div className="info_recovered">
    Recovered:{numeral(country.recovered).format("0,0")}
    </div>
    <div className="info_deaths">
    Deaths:{numeral(country.deaths).format("0,0")}
    </div>
    </div>





    </Popup>

    </Circle>
  ))
);
