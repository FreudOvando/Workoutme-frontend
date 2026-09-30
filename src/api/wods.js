import { apiClient } from './client';
export async function getWods() {
    const { data } = await apiClient.get('/wods');
    return data;
}
export async function getWod(id) {
    const { data } = await apiClient.get(`/wods/${id}`);
    return data;
}
export async function createWod(payload) {
    const { data } = await apiClient.post('/wods', payload);
    return data;
}
export async function updateWod(id, payload) {
    const { data } = await apiClient.put(`/wods/${id}`, payload);
    return data;
}
export async function deleteWod(id) {
    await apiClient.delete(`/wods/${id}`);
}
