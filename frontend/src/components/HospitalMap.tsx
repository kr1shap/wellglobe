import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
} from "@react-google-maps/api";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

type Props = {
  center: { lat: number; lng: number };
};

type Place = {
  name: string;
  geometry: {
    location: {
      lat: number | (() => number);
      lng: number | (() => number);
    };
  };
};

const HospitalMap: React.FC<Props> = ({ center }) => {
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/nearby-hospitals?lat=${center.lat}&lng=${center.lng}`
        );
        const data = await response.json();
        console.log("Fetched hospitals/clinics:", data.results);
        setPlaces(data.results || []);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };

    fetchHospitals();
  }, [center]);

  return (
    <div className="rounded-xl border-2 border-[#4B7399] overflow-hidden shadow-md w-full max-w-[1084px] mx-auto mb-15">
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={{
            width: "800px",
            height: "350px", // matches screenshot
          }}
          center={center}
          zoom={13}
        >
          {places.map((place, idx) => (
            <Marker
              key={idx}
              position={{
                lat: typeof place.geometry.location.lat === "function"
                  ? place.geometry.location.lat()
                  : place.geometry.location.lat,
                lng: typeof place.geometry.location.lng === "function"
                  ? place.geometry.location.lng()
                  : place.geometry.location.lng,
              }}
              title={place.name}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default HospitalMap;
