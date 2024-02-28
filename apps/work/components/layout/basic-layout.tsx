export function BasicLayout({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  return (
    <div className="bg-slate-200">
      <h1 className="font-bold text-4xl">BasicLayout</h1>
      {children}
    </div>
  );
}
