"use server";

import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadCustomGift(formData: FormData) {
  try {
    const file = formData.get('image') as File | null;
    const description = formData.get('description') as string | null;

    if (!file || !description) {
      return { success: false, error: 'Image and description are required.' };
    }

    // Convert file to base64
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Data = buffer.toString('base64');
    const fileUri = `data:${file.type};base64,${base64Data}`;

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(fileUri, {
      folder: 'custom-gifts',
    });

    const secureUrl = uploadResponse.secure_url;
    
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';
    
    const message = `*New Custom Gift Order*\n\n*Description:*\n${description}\n\n*Image Link:*\n${secureUrl}`;
    const encodedMessage = encodeURIComponent(message);
    
    // Construct WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    return { success: true, redirectUrl: whatsappUrl };
  } catch (error) {
    console.error('Error uploading file:', error);
    return { success: false, error: 'Failed to process request. Please check your Cloudinary configuration.' };
  }
}
