"use server";

export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col justify-start items-start">
      {children}
    </section>
  );
}
