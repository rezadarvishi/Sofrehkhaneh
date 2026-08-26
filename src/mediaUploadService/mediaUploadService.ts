import { apiClient } from './apiClient';

export const mediaUploadService = {
  async uploadImage(imageUri: string, mimeType: 'image/jpeg' | 'image/png' | 'image/webp' = 'image/jpeg'): Promise<string> {
    // ۱. گرفتن لینک امن از سرور
    const extension = mimeType === 'image/png' ? 'png' : mimeType === 'image/webp' ? 'webp' : 'jpg';
    const res = await apiClient.post<{ data: { uploadUrl: string; publicUrl: string } }>('/media/request-upload', { extension });
    
    const { uploadUrl, publicUrl } = res.data;

    // ۲. آپلود مستقیم فایل به کلودفلر R2
    const fileResponse = await fetch(imageUri);
    const blob = await fileResponse.blob();

    await fetch(uploadUrl, {
      method: 'PUT',
      body: blob,
      headers: {
        'Content-Type': mimeType,
      },
    });

    return publicUrl;
  }
};