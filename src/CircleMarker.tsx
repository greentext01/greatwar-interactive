import {
  useZoomPanContext,
} from "react-simple-maps"

function CircleMarker() {
  const ctx = useZoomPanContext();

  return (
    <circle
      r={8/ctx.k}
      strokeWidth={2/ctx.k}
      className="fill-themered-600 stroke-white drop-shadow-md "
    />
  );
}

export default CircleMarker;
