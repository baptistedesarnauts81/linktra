export async function generateMetadata({
  params,
}: {
  params: { store: string };
}) {
  const title = `linktra - custom domain`;
  const description = `linktra - custom description`;

  return {
    title,
    description,
  };
}

export default async function StorePage() {
  return (
    <section className="flex flex-col justify-start items-start"></section>
  );
}
