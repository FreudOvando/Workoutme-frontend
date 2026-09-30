import { jsx as _jsx } from "react/jsx-runtime";
import { WOD_TYPE_LABELS, WOD_TYPE_STYLES } from '@/lib/wodType';
export function WodTypeBadge({ type }) {
    return (_jsx("span", { className: `inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ring-1 ring-inset ${WOD_TYPE_STYLES[type]}`, children: WOD_TYPE_LABELS[type] }));
}
