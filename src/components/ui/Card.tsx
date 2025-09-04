export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl overflow-hidden border shadow-sm">
      {children}
    </div>
  )
}

export function CardBody({ children }: { children: React.ReactNode }) {
  return <div className="p-5">{children}</div>
}


