export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <header className="bg-primary text-black p-4">
            <h1 className="text-center text-2xl font-bold">Apartment Listings</h1>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="bg-gray-800 text-gray-200 p-4 text-center text-sm">
            © 2024 Listing Apartments App
          </footer>
        </div>
      </body>
    </html>
  );
}
