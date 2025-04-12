export default function AuthenticationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-dvh grid-cols-2">
      <main className="flex flex-col items-center justify-center">
        <div className="grid grid-cols-1 items-center rounded-xl bg-white max-sm:p-6 sm:p-10">
          <div className="grid grid-cols-1 gap-10 relative">{children}</div>
        </div>
      </main>
      <div className="border-l border-slate-100 inset bg-zinc-50">A</div>
    </div>
  );
}
