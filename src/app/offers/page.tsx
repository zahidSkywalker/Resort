export default function OffersPage() {
  return (
    <main className="container-page py-12">
      <h1 className="text-2xl sm:text-3xl font-semibold">Offers</h1>
      <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {['Early Bird 15%', 'Stay 3 Pay 2', 'Weekend Escape'].map((offer) => (
          <li key={offer} className="border rounded-lg p-4">
            <h3 className="font-medium">{offer}</h3>
            <p className="text-sm text-gray-600 mt-1">Limited time promotion with flexible cancellation.</p>
          </li>
        ))}
      </ul>
    </main>
  )
}


