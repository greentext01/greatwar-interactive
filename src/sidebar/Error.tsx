export default function Error({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-themered-900 font-semibold text-center text-lg bg-red-400 shadow rounded-lg mt-2 py-2">
      {children}
    </div>
  );
}
