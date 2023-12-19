import CircleMarker from "./CircleMarker";
import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { extractLongLat } from "../misc/util";
import { Marker, useZoomPanContext } from "react-simple-maps";
import { useAtom } from "jotai";
import { dateAtom, formShownAtom, selectedInfoAtom } from "../misc/atoms";
import { Info, InfoType } from "../misc/types";

type Props = {
  points?: QuerySnapshot<DocumentData, DocumentData> | undefined;
};

function calculateOpacity(dateFrom: Date, dateTo: Date, selectedYear: number) {
  let temporalDistance = 0;
  if (selectedYear < dateFrom.getUTCFullYear()) {
    temporalDistance = dateFrom.getUTCFullYear() - selectedYear;
  }

  if (selectedYear > dateTo.getUTCFullYear()) {
    temporalDistance = selectedYear - dateTo.getUTCFullYear();
  }
  return 1 - temporalDistance / 5;
}

export default function Markers({ points }: Props) {
  const [selectedInfo, setSelectedInfo] = useAtom(selectedInfoAtom);
  const [, setFormShown] = useAtom(formShownAtom);
  const [selectedDate] = useAtom(dateAtom);
  const ctx = useZoomPanContext();

  return (
    <>
      {points?.docs.map((doc) => {
        let info: InfoType;
        try {
          info = Info.parse({
            ...doc.data(doc.data().dateFrom.toDate()),
            id: doc.id,
            coordinates: extractLongLat(doc.data().coordinates),
            dateFrom: doc.data().dateFrom.toDate(),
            dateTo: doc.data().dateTo.toDate(),
          });
        } catch {
          console.error("Found corrupted entry in database:", doc.id);
          return;
        }

        if (
          selectedDate < info.dateFrom.getUTCFullYear() - 5 ||
          selectedDate > info.dateTo.getUTCFullYear() + 5
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
            onClick={() => {
              setSelectedInfo(info);
              setFormShown(false);
            }}
          >
            <CircleMarker
              marker={info.type}
              opacity={calculateOpacity(
                info.dateFrom,
                info.dateTo,
                selectedDate
              )}
            />
          </Marker>
        );
      })}
    </>
  );
}
