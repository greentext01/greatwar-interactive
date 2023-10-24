import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";
import CircleMarker from "./CircleMarker";

function Map() {

  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{
        scale: 1000,
      }}
      className="bg-themeblue-500 select-none"
      style={{ height: "100vh", width: "100vw" }}
    >
      <ZoomableGroup center={[3, 52]}>
        <Geographies
          geography="/world_1914.geojson"
          fill="#060c29"
          stroke="#8f9dce"
          strokeWidth={0.7}
        >
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                className="focus:outline-none"
              />
            ))
          }
        </Geographies>
        <Marker coordinates={[2.3522, 48.8566]}>
          <CircleMarker />
        </Marker>
      </ZoomableGroup>
    </ComposableMap>
  );
}

export default Map;
