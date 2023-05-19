import {
  GoogleMap,
  LoadScript,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import "./App.css";
import React from "react";
import { useState, useEffect } from "react";

function App() {
  const [coordinates, setCoordinates] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const google = window.google;
  const options = {
    disableDefaultUI: true,
  };

  useEffect(() => {
    fetch("https://data.sfgov.org/resource/rqzj-sfat.json")
      .then((data) => data.json())
      .then((res) => {
        // const coordinates = [];
        for (let i = 0; i < res.length; i++) {
          setCoordinates((arr) => [
            ...arr,
            {
              position: {
                lat: parseFloat(res[i].latitude),
                lng: parseFloat(res[i].longitude),
              },
            },
          ]);
          // coordinates.push({position: {lat: res[i].latitude, lng: res[i].longitude}})
        }
      });
  }, []);

  // console.log(coordinates);

  // console.log(coordinates)
  // console.log(coordinates.map(element=> element.lat))

  const containerStyle = {
    width: "800px",
    height: "400px",
  };

  // const center = {
  //   lat: 37.755030726766726,
  //   lng: -122.38453073422282
  // };

  const position = {
    lat: 37.772,
    lng: -122.214,
  };

  const center = {
    lat: 37.7529,
    lng: -122.4474,
  };

  // const onLoad = marker => {
  //   console.log('marker: ', marker)
  // }

  const markerClickHandler = (position) => {
    setSelectedCenter(position);
    // console.log(position);
  };

  const handleClose = () => {
    console.log("hi")
    setSelectedCenter(null)
  };

  function Maps() {
    return (
      <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={11}
          options={options}
        >
          {coordinates.map((item, index) => (
            <MarkerF
              key={index}
              position={item.position}
              onClick={markerClickHandler(item.position)}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    );
  }

  return (
    <div>
      <Maps />
    </div>
  );
}

export default App;
