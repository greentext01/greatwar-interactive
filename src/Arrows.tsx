export function RightArrow(props: React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      className="w-12 h-full bg-themered-900 rounded-r-3xl flex items-center justify-center"
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        className="bi bi-chevron-right fill-themered-100"
        viewBox="0 0 16 16"
      >
        <path
          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
    </div>
  );
}

export function LeftArrow(props: React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      className="w-12 h-full bg-themered-900 rounded-l-3xl flex items-center justify-center"
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        className="bi bi-chevron-left fill-themered-100"
        viewBox="0 0 16 16"
      >
        <path
          d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
        />
      </svg>
    </div>
  );
}
