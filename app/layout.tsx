import "./globals.css";

export const metadata = {
  title: "Queen Ada",
  description: "Cardano stake pool",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
