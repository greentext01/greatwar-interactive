import { useAtom } from "jotai";
import InfoSidebar from "./InfoSidebar";
import NewPostForm from "./NewPostForm";
import { formShownAtom, selectedInfoAtom } from "../misc/atoms";
import { FormOutline } from "./FormOutline";
import { ErrorBoundary } from "react-error-boundary";
import { fallbackRender } from "../misc/Error";

export default function Sidebar() {
  const [selectedInfo, setSelectedInfo] = useAtom(selectedInfoAtom);
  const [formShown, setFormShown] = useAtom(formShownAtom);

  if (formShown)
    return (
      <FormOutline close={() => setFormShown(false)} width="650px">
        <ErrorBoundary fallbackRender={fallbackRender}>
          <NewPostForm />
        </ErrorBoundary>
      </FormOutline>
    );
  else if (selectedInfo)
    return (
      <FormOutline close={() => setSelectedInfo(undefined)} width="600px" height="350px">
        <ErrorBoundary fallbackRender={fallbackRender}>
          <InfoSidebar selectedInfo={selectedInfo} />
        </ErrorBoundary>
      </FormOutline>
    );
  else return <></>;
}
