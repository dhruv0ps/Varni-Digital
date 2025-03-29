import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '~/server/utils/cloudinaryConfig';

export async function POST(req: NextRequest) {
  try {
    const { image } = await req.json();
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: 'your_folder_name',
    });

    return NextResponse.json({ url: uploadResponse.secure_url });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}
