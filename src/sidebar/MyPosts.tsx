import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../main";
import { markerMap } from "../map/CircleMarker";
import { processInfo } from "../misc/types";
import Info from "../icons/markers/info.svg?react";
import DOMPurify from "dompurify";
import DateDisplay from "./DateDisplay";
import { dateAtom, zoomPanAtom, sidebarStateAtom } from "../misc/atoms";
import { useAtom, useSetAtom } from "jotai";

export default function MyPosts() {
  const collectionRef = collection(db, "points");
  const [points] = useCollection(collectionRef);
  const setSidebarStatus = useSetAtom(sidebarStateAtom);
  const setDate = useSetAtom(dateAtom);
  const [zoomPan, setZoomPan] = useAtom(zoomPanAtom);

  return (
    <>
      <h1 className="font-bold text-3xl text-white text-center mb-6">
        My posts
      </h1>
      <div className="flex flex-col">
        {points?.docs.map((doc) => {
          const info = processInfo(doc);
          if (info === undefined) return;
          const Marker = markerMap[info.type] ?? Info;

          return (
            <div
              key={info.id}
              className="flex flex-col p-3 m-2 bg-red-900 hover:bg-themered-900 hover:cursor-pointer shadow-lg rounded-lg"
              onClick={() => {
                setSidebarStatus({ kind: "selectedInfo", info });
                setDate(info.dateFrom.getUTCFullYear());
                setZoomPan({
                  coordinates: info.coordinates as [number, number],
                  zoom: zoomPan.zoom
                });
              }}
            >
              <div className="relative w-full">
                <div className="flex flex-row gap-3">
                  <Marker height={30} width={30} />
                  <p className="text-white/80 font-semibold text-lg">
                    {info.name}
                  </p>
                </div>
                <p className="text-white/70 absolute right-0 top-1">
                  <DateDisplay dateFrom={info.dateFrom} dateTo={info.dateTo} />
                </p>
                <div
                  className="mt-3 text-white/50 ml-11 truncate-children overflow-ellipsis"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(info.body),
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
