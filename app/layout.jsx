import "./globals.css";

export const metadata = {
  title: "VOLLY — cheerful yellow bird",
  description: "$VOLLY | simple landing, trade & socials."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="root">{children}</body>
    </html>
  );
}
