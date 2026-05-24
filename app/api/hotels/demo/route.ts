import { NextResponse } from 'next/server';

/** Demo inquiry stub — wire to CRM / email when ready */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, propertyName, contact, propertyType, message } = body ?? {};

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: 'Valid name is required.' }, { status: 400 });
    }
    if (!propertyName || typeof propertyName !== 'string') {
      return NextResponse.json({ error: 'Property name is required.' }, { status: 400 });
    }
    if (!contact || typeof contact !== 'string' || contact.trim().length < 8) {
      return NextResponse.json({ error: 'Valid phone or email is required.' }, { status: 400 });
    }

    // eslint-disable-next-line no-console
    console.info('[hotels/demo]', {
      name: name.trim(),
      propertyName: propertyName.trim(),
      contact: contact.trim(),
      propertyType: propertyType ?? 'hotel',
      message: typeof message === 'string' ? message.trim() : '',
      at: new Date().toISOString(),
    });

    return NextResponse.json({
      ok: true,
      message: 'Demo request received. Our team will contact you shortly.',
    });
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }
}
