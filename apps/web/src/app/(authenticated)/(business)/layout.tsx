import BusinessLayoutHeader from "../../../components/layout/business/header";
import BusinessLayout from "../../../components/layout/business/business";

export default async function BusinessRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BusinessLayout header={<BusinessLayoutHeader />}>
      {children}
    </BusinessLayout>
  );
}
