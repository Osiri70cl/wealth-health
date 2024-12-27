import Modal from "@/global/modal/Modal.component";

export default async function AppRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <Modal />
    </div>
  );
}
