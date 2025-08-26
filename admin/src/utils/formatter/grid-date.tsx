import type { ValueFormatterParams } from 'ag-grid-community';

const GridDateFormatter = (params: ValueFormatterParams) => {
    return new Date(params.value).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

export { GridDateFormatter };