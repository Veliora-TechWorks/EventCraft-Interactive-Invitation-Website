import "./globals.css";

export const metadata = {
  title: "Apurva & Shubham — Wedding Invitation",
  description: "Join us to celebrate the wedding of Apurva & Shubham",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Poppins:wght@300;400;500;600&family=Great+Vibes&display=swap"
        />
        <link rel="preload" as="image" href="/images/Hero Section Mobile.jpeg" media="(max-width: 767px)" />
        <link rel="preload" as="image" href="/images/Hero Section Tablet and Desktop.jpeg" media="(min-width: 768px)" />
      </head>
      <body>{children}</body>
    </html>
  );
}
