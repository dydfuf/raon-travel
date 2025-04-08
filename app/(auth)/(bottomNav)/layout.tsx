import BottomNavigation from "@/components/ui/BottomNavigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="pb-[61px]">{children}</main>
      <BottomNavigation />
    </>
  );
}
