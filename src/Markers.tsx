import CircleMarker from "./CircleMarker";
import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "./main";
import { extractLongLat } from "./util";
import { Marker } from "react-simple-maps";
import { useAtom } from "jotai";
import { Info, selectedInfoAtom } from "./Sidebar";
import { dateAtom } from "./DateSelector";

export default function Markers() {
  const [value] = useCollection(collection(db, "battles"));
  const [_, setSelectedInfo] = useAtom(selectedInfoAtom);
  const [selectedDate] = useAtom(dateAtom);

  return (
    <>
      {value?.docs.map((doc) => {
        const info = Info.parse({
          ...doc.data(),
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
            coordinates={extractLongLat(doc.data().coordinates)}
            key={doc.id}
            onClick={() => setSelectedInfo(info)}
          >
            Hi mom
            <CircleMarker />
          </Marker>
        );
      })}
    </>
  );
}
