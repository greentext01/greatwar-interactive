import { useSetAtom } from "jotai";
import Close from "../icons/close.svg?react";
import { sidebarStateAtom } from "../misc/atoms";

type Props = {
  children: React.ReactNode;
  width: string;
  height?: string;
};

export function FormOutline({ children, width, height }: Props) {
  const setSidebarStatus = useSetAtom(sidebarStateAtom);

  return (
    <div className="relative z-10" style={{ width: width }}>
      <div
        className="absolute top-10 left-10 right-0 rounded-3xl shadow-evenInset z-20 pointer-events-none"
        style={{ height: height ?? 400 }}
      />
      <div
        className="absolute top-10 left-10 right-0 rounded-3xl overflow-clip p-4 bg-themered-500 resize-x"
        style={{ height: height ?? 400 }}
      >
        <div
          className="p-4 bg-themered-500 overflow-auto h-full scrollbar-theme"
        >
          <Close
            className="left-4 top-4 w-6 h-6 cursor-pointer absolute bg-red-950/50 rounded-full p-1"
            onClick={() => setSidebarStatus({ kind: "closed" })}
          />
          {children}
        </div>
      </div>
    </div>
  );
}
