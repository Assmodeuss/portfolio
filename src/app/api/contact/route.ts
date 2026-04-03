import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { name?: string; message?: string }
    const { name, message } = body

    if (!name || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // In production: send via Resend API or similar
    // For now, log to console (remove before deployment)
    // Contact form submission received

    return NextResponse.json({ success: true }, { status: 200 })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
