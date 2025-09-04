export function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="container-page py-8 text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} Resort. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a className="hover:text-brand" href="/privacy">Privacy</a>
          <a className="hover:text-brand" href="/terms">Terms</a>
        </div>
      </div>
    </footer>
  )
}


