import CircleMarker from "./CircleMarker";
import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "./main";
import { extractLongLat } from "./util";
import { Marker, useZoomPanContext } from "react-simple-maps";
import { useAtom } from "jotai";
import { Info, selectedInfoAtom } from "./Sidebar";
import { dateAtom } from "./DateSelector";

export default function Markers() {
  const [value] = useCollection(collection(db, "points"));
  const [selectedInfo, setSelectedInfo] = useAtom(selectedInfoAtom);
  const [selectedDate] = useAtom(dateAtom);
  const ctx = useZoomPanContext();

  return (
    <>
      {value?.docs.map((doc) => {
        const info = Info.parse({
          ...doc.data(),
          id: doc.id,
          coordinates: extractLongLat(doc.data().coordinates),
          dateFrom: doc.data().dateFrom.toDate(),
          dateTo: doc.data().dateTo.toDate(),
        });

        if (
          selectedDate < info.dateFrom.getUTCFullYear() ||
          selectedDate > info.dateTo.getUTCFullYear()
        )
          return;

        return (
          <Marker
            coordinates={info.coordinates as [number, number]}
            key={info.id}
            className="cursor-pointer"
            filter={
              selectedInfo?.id === info.id
                ? `drop-shadow(0 0 ${7 / ctx.k}px rgb(255 0 0)`
                : undefined
            }
            onClick={() => setSelectedInfo(info)}
          >
            <CircleMarker marker={info.type} />
          </Marker>
        );
      })}
    </>
  );
}
