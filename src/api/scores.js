import { apiClient } from './client';
export async function saveOrUpdateScore(payload) {
    const { data } = await apiClient.post('/scores', payload);
    return data;
}
export async function getScore(userId, wodId) {
    const { data } = await apiClient.get(`/scores/user/${userId}/wod/${wodId}`);
    return data;
}
export async function getScoresByWod(wodId) {
    const { data } = await apiClient.get(`/scores/wod/${wodId}`);
    return data;
}
