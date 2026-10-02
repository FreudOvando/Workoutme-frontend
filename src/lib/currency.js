export function formatMXN(amount) {
    if (amount === null || amount === undefined)
        return '—';
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);
}
