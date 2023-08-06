export const metadata = {
  title: 'Fuel Price Insights',
  description: 'A Fuel Provider',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  )
}

