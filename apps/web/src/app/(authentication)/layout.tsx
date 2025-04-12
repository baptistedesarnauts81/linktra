export default function AuthenticationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-dvh grid-cols-[1fr_2.5rem_minmax(0,var(--container-lg))_2.5rem_1fr] grid-rows-[1fr_auto_1fr] overflow-clip">
      <div className="col-start-2 row-span-full row-start-1 max-sm:hidden text-gray-950/5 border-x border-x-current bg-[size:10px_10px] bg-fixed bg-[image:repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,_transparent_0,_transparent_50%)]"></div>
      <div className="col-start-4 row-span-full row-start-1 max-sm:hidden text-gray-950/5 border-x border-x-current bg-[size:10px_10px] bg-fixed bg-[image:repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,_transparent_0,_transparent_50%)]"></div>
      <main className="grid grid-cols-1 max-sm:col-span-full border-t border-b border-gray-950/5 max-sm:col-start-1 max-sm:row-span-full max-sm:bg-gray-950/5 max-sm:p-2 sm:line-y sm:col-start-3 sm:row-start-2 sm:-mx-px sm:p-[calc(0.5rem+1px)]">
        <div className="grid grid-cols-1 items-center rounded-xl bg-white max-sm:p-6 sm:p-10">
          <div className="grid grid-cols-1 gap-10">{children}</div>
        </div>
      </main>
    </div>
  );
}
