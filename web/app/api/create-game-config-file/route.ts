import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { contractAddress, event } = data;

    if (!contractAddress) {
      return NextResponse.json({ status: 'fail', error: 'Contract address is required' }, { status: 400 });
    }

    const gameConfig = {
      event: {
        name: event.name || '',
        duration: event.duration || '',
        game: event.game || '',
        assets: event.assets || {},
        backgroundColor: event.backgroundColor || '',
        settings: {
          tokenAddress: event.settings?.tokenAddress || '',
          tokensPerSecond: event.settings?.tokensPerSecond || 0,
          maxPlayers: event.settings?.maxPlayers || 0,
          serverLocation: event.settings?.serverLocation || '',
        },
      },
    };

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `${contractAddress}.json`,
      Body: JSON.stringify(gameConfig),
      ContentType: 'application/json',
    };

    const command = new PutObjectCommand({
      ...params,
      ACL: 'public-read',
    });
    await s3Client.send(command);

    revalidatePath('/');

    const configUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${contractAddress}.json`;
    return NextResponse.json({ status: 'success', configUrl });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ status: 'fail', error: e });
  }
}
