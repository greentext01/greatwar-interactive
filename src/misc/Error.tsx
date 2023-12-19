import { FallbackProps } from "react-error-boundary";

export default function Error({
  children,
  fullHeight,
}: {
  children: React.ReactNode;
  fullHeight?: boolean;
}) {
  return (
    <div
      className={`text-themered-900 font-semibold text-center text-lg bg-red-400 shadow rounded-lg py-2 ${
        fullHeight ? "h-full" : "mt-2"
      }`}
    >
      {children}
    </div>
  );
}

export function fallbackRender({ error }: FallbackProps) {
  return (
    <div className="h-screen flex justify-center items-center">
      <Error fullHeight>An error occured: {error.message}. Please reload the page.</Error>
    </div>
  );
}
