import { useZoomPanContext } from "react-simple-maps";
import Battle from "./icons/markers/battle.svg?react";
import Context from "./icons/markers/context.svg?react";
import Event from "./icons/markers/event.svg?react";
import Info from "./icons/markers/info.svg?react";
import Important from "./icons/markers/important.svg?react";

const markerMap = {
  battle: Battle,
  context: Context,
  event: Event,
  info: Info,
  important: Important,
};

function CircleMarker({ marker }: { marker: keyof typeof markerMap }) {
  const ctx = useZoomPanContext();
  const Marker = markerMap[marker];

  return (
    <g
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
{
  /* <circle
      r={8 / ctx.k}
      strokeWidth={2 / ctx.k}
      className="fill-themered-600 stroke-white drop-shadow-md "
    >
          <g>
        <path fill="none" d="M0 0h24v24H0z"/>
        <path fill-rule="nonzero" d="M7.05 13.406l3.534 3.536-1.413 1.414 1.415 1.415-1.414 1.414-2.475-2.475-2.829 2.829-1.414-1.414 2.829-2.83-2.475-2.474 1.414-1.414 1.414 1.413 1.413-1.414zM3 3l3.546.003 11.817 11.818 1.415-1.414 1.414 1.414-2.474 2.475 2.828 2.829-1.414 1.414-2.829-2.829-2.475 2.475-1.414-1.414 1.414-1.415L3.003 6.531 3 3zm14.457 0L21 3.003l.002 3.523-4.053 4.052-3.536-3.535L17.457 3z"/>
    </g>
    </circle> */
}
