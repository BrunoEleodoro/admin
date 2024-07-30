import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const base64String = Buffer.from(buffer).toString('base64');

    return NextResponse.json({ base64: base64String });
  } catch (error) {
    console.error('Error converting file to base64:', error);
    return NextResponse.json({ error: 'Failed to convert file' }, { status: 500 });
  }
}
