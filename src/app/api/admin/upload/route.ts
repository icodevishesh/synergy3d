import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import { createHash } from 'crypto';

async function isAuthorized() {
  const session = await getServerSession(authOptions);
  return !!session;
}

export async function POST(req: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json({ error: 'Cloudinary not configured' }, { status: 500 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const timestamp = Math.round(Date.now() / 1000);
    const folder = 'synergy3d-articles';

    const paramsToSign = `folder=${folder}&timestamp=${timestamp}`;
    const signature = createHash('sha256')
      .update(paramsToSign + apiSecret)
      .digest('hex');

    const uploadForm = new FormData();
    uploadForm.append('file', file);
    uploadForm.append('api_key', apiKey);
    uploadForm.append('timestamp', String(timestamp));
    uploadForm.append('signature', signature);
    uploadForm.append('folder', folder);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: 'POST', body: uploadForm }
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data.error?.message || 'Cloudinary upload failed' },
        { status: 400 }
      );
    }

    return NextResponse.json({ url: data.secure_url });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
