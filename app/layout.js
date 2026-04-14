import "./globals.css";

export const metadata = {
  title: "Shubham & Apurva — Wedding Invitation",
  description: "Join us to celebrate the wedding of Shubham & Apurva",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover" />
      </head>
      <body>{children}</body>
    </html>
  );
}
