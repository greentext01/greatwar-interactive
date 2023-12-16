export default function NewPostButton(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) {
  return (
    <div {...props} className="bg-themered-500 font-bold fixed top-10 right-10 p-4 px-7 rounded-2xl text-white text-lg shadow-faintInset cursor-pointer">
      New Post
    </div>
  );
}
