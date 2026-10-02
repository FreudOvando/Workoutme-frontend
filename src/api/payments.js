import { apiClient } from './client';
export async function getUserPayments(userId) {
    const { data } = await apiClient.get(`/payments/user/${userId}`);
    return data;
}
export async function getAllPayments() {
    const { data } = await apiClient.get('/payments');
    return data;
}
export async function createPayment(payload) {
    const { data } = await apiClient.post('/payments', payload);
    return data;
}
