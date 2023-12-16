export default function FormField({ children, title }: { children: React.ReactNode, title: string }) {
  return (
    <div className="mb-4">
      <h2 className="font-bold text-xl text-white/70 text-center mb-2">
        {title}
      </h2>
      {children}
    </div>
  );
}
