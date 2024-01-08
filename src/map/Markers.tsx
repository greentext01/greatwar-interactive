import CircleMarker from "./CircleMarker";
import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { Marker, useZoomPanContext } from "react-simple-maps";
import { useAtom } from "jotai";
import { dateAtom, sidebarStateAtom } from "../misc/atoms";
import { InfoType, processInfo } from "../misc/types";
import { useMemo } from "react";

type Props = {
  points?: QuerySnapshot<DocumentData, DocumentData> | undefined;
};

function calculateTempDistance(
  dateFrom: Date,
  dateTo: Date,
  selectedYear: number
) {
  if (selectedYear < dateFrom.getUTCFullYear()) {
    return dateFrom.getUTCFullYear() - selectedYear;
  } else if (selectedYear > dateTo.getUTCFullYear()) {
    return selectedYear - dateTo.getUTCFullYear();
  }
  return 0;
}

function calculateOpacity(dateFrom: Date, dateTo: Date, selectedYear: number) {
  return 1 - calculateTempDistance(dateFrom, dateTo, selectedYear) / 6;
}

export default function Markers({ points }: Props) {
  const [sidebarStatus, setSidebarStatus] = useAtom(sidebarStateAtom);
  const [selectedDate] = useAtom(dateAtom);
  const ctx = useZoomPanContext();

  const selectedInfo =
    sidebarStatus.kind === "selectedInfo" ? sidebarStatus.info : undefined;

  const infos = useMemo(() => {
    return points?.docs
      .map((info) => processInfo(info))
      .filter((info) => {
        return (
          info !== undefined &&
          selectedDate >= info.dateFrom.getUTCFullYear() - 5 &&
          selectedDate <= info.dateTo.getUTCFullYear() + 5
        );
      })
      .sort((a, b) => {
        if (a!.id === selectedInfo?.id) return 1;
        if (b!.id === selectedInfo?.id) return -1;
        const aTempDist = calculateTempDistance(
          a!.dateFrom,
          a!.dateTo,
          selectedDate
        );
        const bTempDist = calculateTempDistance(
          b!.dateFrom,
          b!.dateTo,
          selectedDate
        );

        return bTempDist - aTempDist;
      }) as InfoType[] | undefined;
  }, [points, selectedDate, selectedInfo?.id]);

  return (
    <>
      {infos &&
        infos.map((info) => {
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
              onClick={() => setSidebarStatus({ kind: "selectedInfo", info })}
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
