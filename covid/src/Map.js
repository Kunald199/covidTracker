import React from 'react'
import{Map as LeafletMap,TileLayer} from "react-leaflet";
import "./Map.css";
import {showDataonMap} from './util';

function Map({countries,casesType,center,zoom}) {
  return (
    <div className="map">
  <LeafletMap center={center} zoom={zoom}>
  <TileLayer
  url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  attribution='&copy; <a href="https://osm.org/copyright">OpenStreet'
   />

   {/* Loop through countries and draw circles */}
   {showDataonMap(countries,casesType)}
  </LeafletMap>
      </div>
  )
}

export default Map
