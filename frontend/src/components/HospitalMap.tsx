import React, { useRef, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
} from "@react-google-maps/api";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

type Props = {
  center: google.maps.LatLngLiteral;
  radius?: number;
};

const HospitalMap: React.FC<Props> = ({ center, radius = 5000 }) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([]);

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;

    const service = new google.maps.places.PlacesService(map);
    const request: google.maps.places.PlaceSearchRequest = {
      location: center,
      radius,
      type: "hospital",
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        setPlaces(results);
      }
    });
  };

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "400px",
          borderRadius: "16px",
        }}
        center={center}
        zoom={13}
        onLoad={onLoad}
      >
        {places.map(
          (place, index) =>
            place.geometry?.location && (
              <Marker
                key={index}
                position={{
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng(),
                }}
                title={place.name}
              />
            )
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default HospitalMap;
