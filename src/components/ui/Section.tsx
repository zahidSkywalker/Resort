export function Section({ title, subtitle, children, className = '', id }: { title?: string; subtitle?: string; children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={className}>
      <div className="container-page">
        {title && <h2 className="text-2xl sm:text-3xl font-semibold">{title}</h2>}
        {subtitle && <p className="text-gray-600 mt-2 max-w-3xl">{subtitle}</p>}
        <div className={title || subtitle ? 'mt-8' : ''}>{children}</div>
      </div>
    </section>
  )
}


