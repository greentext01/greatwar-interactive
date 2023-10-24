import { Ref, forwardRef } from "react";

const Pointer = forwardRef(function Pointer(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >,
  ref: Ref<HTMLDivElement>
) {
  return (
    <div className="w-2 absolute h-28 rounded bg-white" {...props} ref={ref}>
      <div className="-mx-4 -mt-7">
        <img src="/pointer.svg" className="w-full" draggable={false} />
      </div>
    </div>
  );
})

export default Pointer;
