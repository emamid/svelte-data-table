import type { DataTableTheme } from '../common.js'

export const defaultTheme: DataTableTheme = {
	inputs: {
		action: {
			button: {
				override: 'border-0 p-1',
			},
			icon: {
				override: 'w-4 h-4',
			},
		},
		spinner: {
			div: {
				override: 'spinner',
			},
			minusButton: {
				override: 'pr-1',
			},
			minusIcon: '-',
			plusButton: {
				override: 'pl-1',
			},
			plusIcon: '+',
		},
	},
	parts: {
		dataCell: {
			td: {
				override: 'px-6 py-4 whitespace-nowrap font-medium',
			},
			tdFocused: {
				override: 'px-6 py-4 whitespace-nowrap font-medium',
			},
		},
		headerCell: {
			sortAscending: '▲',
			sortDescending: '▼',
			span: {
				override: 'inline-flex items-center',
			},
			th: {},
			titleSpan: {},
		},
		row: {
			tr: {},
		},
		table: {
			table: {
				override: 'table-fixed',
			},
			tbody: {},
			thead: {
				override: 'text-xs uppercase sticky top-0 z-10',
			},
			theadTR: {},
		},
	},
}
