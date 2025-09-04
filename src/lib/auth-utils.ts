import { compare } from 'bcryptjs'

// Utility functions for authentication that can be used in server components
// This avoids Edge Runtime compatibility issues with bcryptjs

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  try {
    return await compare(password, hash)
  } catch (error) {
    console.error('Password verification error:', error)
    return false
  }
}




