export default function ContactPage() {
  return (
    <main className="container-page py-12">
      <h1 className="text-2xl sm:text-3xl font-semibold">Contact Us</h1>
      <form className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input className="mt-1 w-full border rounded-md px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input type="email" className="mt-1 w-full border rounded-md px-3 py-2" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium">Message</label>
          <textarea rows={5} className="mt-1 w-full border rounded-md px-3 py-2" />
        </div>
        <div className="sm:col-span-2">
          <button className="bg-brand text-white px-6 py-3 rounded-md">Send</button>
        </div>
      </form>
    </main>
  )
}


