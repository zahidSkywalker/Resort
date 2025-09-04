import clsx from 'classnames'
import Link from 'next/link'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
  href?: string
}

const base = 'inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium transition'
const variants: Record<string, string> = {
  primary: 'bg-brand text-white hover:bg-brand-dark',
  secondary: 'bg-white text-gray-900 hover:bg-gray-100 border',
  ghost: 'text-brand hover:bg-brand/10',
}

export function Button({ variant = 'primary', className, href, ...props }: ButtonProps) {
  const cls = clsx(base, variants[variant], className)
  if (href) return <Link href={href} className={cls}>{props.children}</Link>
  return <button className={cls} {...props} />
}


