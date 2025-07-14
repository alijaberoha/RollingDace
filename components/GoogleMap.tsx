// components/GoogleMap.tsx
"use client";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 50.8503, // Bruxelles par défaut
  lng: 4.3517,
};

export default function GoogleMapComponent() {
  return (
    <div id="etape2">
      <h2>📍 Vérifiez votre position</h2>
      <LoadScript googleMapsApiKey="TA_CLE_API">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
