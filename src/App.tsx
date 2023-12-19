import { Toaster } from "react-hot-toast";
import Map from "./map/Map";
import Overlay from "./Overlay";

function App() {
  return (
    <>
      <Overlay />
      <Map />
      <Toaster />
    </>
  );
}

export default App;
