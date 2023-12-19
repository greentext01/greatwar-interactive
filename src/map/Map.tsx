import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import Markers from "./Markers";
import yearList from "../data/yearList.json";
import { useAtom } from "jotai";
import { dateAtom } from "../misc/atoms";
import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../main";

function yearToFilename(year: number) {
  let prevYear = 2010;
  for (let y of yearList) {
    if (y > year) break;
    prevYear = y;
  }

  let yearStr;
  if (prevYear < 0) {
    yearStr = `${Math.abs(prevYear)}bc`;
  } else {
    yearStr = prevYear.toString();
  }
  return `/maps/world_${yearStr}.geojson`;
}

function Map() {
  const [year] = useAtom(dateAtom);
  const [points] = useCollection(collection(db, "points"));

  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{
        scale: 700,
      }}
      className="bg-themeblue-500 select-none"
      style={{ height: "100vh", width: "100vw" }}
    >
      <ZoomableGroup center={[3, 52]}>
        <Geographies
          geography={`${yearToFilename(year)}`}
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
        <Markers points={points} />
      </ZoomableGroup>
    </ComposableMap>
  );
}

export default Map;
