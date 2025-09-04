"use client"
import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const res = await signIn('credentials', { email, password, redirect: false })
    if (res?.error) setError('Invalid credentials')
    else window.location.href = '/'
  }

  return (
    <main className="container-page py-12">
      <h1 className="text-2xl font-semibold">Sign In</h1>
      <form className="mt-6 max-w-sm" onSubmit={onSubmit}>
        <label className="block text-sm font-medium">Email</label>
        <input className="mt-1 w-full border rounded-md px-3 py-2" value={email} onChange={e => setEmail(e.target.value)} />
        <label className="block text-sm font-medium mt-4">Password</label>
        <input type="password" className="mt-1 w-full border rounded-md px-3 py-2" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
        <button className="mt-6 bg-brand text-white px-6 py-3 rounded-md">Sign In</button>
      </form>
    </main>
  )
}


