import { useAtom } from "jotai";
import InfoSidebar from "./InfoSidebar";
import NewPostForm from "./NewPostForm";
import { sidebarStateAtom } from "../misc/atoms";
import { FormOutline } from "./FormOutline";
import { ErrorBoundary } from "react-error-boundary";
import { fallbackRender } from "../misc/Error";
import MyPosts from "./MyPosts";

export default function Sidebar() {
  const [sidebarStatus] = useAtom(sidebarStateAtom);

  switch (sidebarStatus.kind) {
    case "formShown":
      return (
        <FormOutline width="650px">
          <ErrorBoundary fallbackRender={fallbackRender}>
            <NewPostForm post={sidebarStatus.info} />
          </ErrorBoundary>
        </FormOutline>
      );
    case "selectedInfo":
      return (
        <FormOutline width="600px" height="350px">
          <ErrorBoundary fallbackRender={fallbackRender}>
            <InfoSidebar selectedInfo={sidebarStatus.info} />
          </ErrorBoundary>
        </FormOutline>
      );
    case "myPostsShown":
      return (
        <FormOutline width="650px">
          <ErrorBoundary fallbackRender={fallbackRender}>
            <MyPosts />
          </ErrorBoundary>
        </FormOutline>
      );
    case "closed":
      return <></>;
  }
}
