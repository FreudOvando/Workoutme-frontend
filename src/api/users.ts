import { apiClient } from './client'

export async function updateProfilePhoto(photoUrl: string | null): Promise<void> {
  await apiClient.patch('/users/me/photo', { photoUrl })
}