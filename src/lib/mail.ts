import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const fromEmail = process.env.RESEND_FROM_EMAIL || 'Resort <noreply@yourdomain.com>'

export async function sendReservationEmail(to: string, subject: string, body: string) {
  try {
    if (process.env.NODE_ENV === 'production' && resend) {
      await resend.emails.send({
        from: fromEmail,
        to: [to],
        subject,
        html: body,
      })
    } else {
      console.log('Dev email:', { to, subject, body })
    }
  } catch (error) {
    console.error('Failed to send email:', error)
  }
}

export async function sendReservationConfirmation(to: string, reservationId: string, checkIn: string, checkOut: string) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #0f6e8c;">Reservation Confirmed!</h2>
      <p>Your reservation has been confirmed and payment received.</p>
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Reservation ID:</strong> ${reservationId}</p>
        <p><strong>Check-in:</strong> ${new Date(checkIn).toLocaleDateString()}</p>
        <p><strong>Check-out:</strong> ${new Date(checkOut).toLocaleDateString()}</p>
      </div>
      <p>We look forward to welcoming you!</p>
    </div>
  `
  
  await sendReservationEmail(to, 'Reservation Confirmed', html)
}


