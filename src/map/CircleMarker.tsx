import { useZoomPanContext } from "react-simple-maps";
import Battle from "../icons/markers/battle.svg?react";
import Context from "../icons/markers/context.svg?react";
import Event from "../icons/markers/event.svg?react";
import Info from "../icons/markers/info.svg?react";
import Important from "../icons/markers/important.svg?react";

export const markerMap = {
  battle: Battle,
  context: Context,
  event: Event,
  info: Info,
  important: Important,
};

type Props = {
  marker: keyof typeof markerMap;
  opacity: number;
};

function CircleMarker({
  marker,
  opacity
}: Props) {
  const ctx = useZoomPanContext();
  const Marker = markerMap[marker];

  return (
    <g
      opacity={opacity}
      style={{
        transformBox: "fill-box",
        transformOrigin: "center center",
        transform: `scale(${2 / ctx.k})`,
      }}
    >
      <Marker />
    </g>
  );
}

export default CircleMarker;
