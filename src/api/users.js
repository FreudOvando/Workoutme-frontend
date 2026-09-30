import { apiClient } from './client';
export async function updateProfilePhoto(photoUrl) {
    await apiClient.patch('/users/me/photo', { photoUrl });
}
