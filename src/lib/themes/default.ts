import type { DataTableTheme } from '../common.js';

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
		button: {
			button: {
				override: 'size-full',
			},
		},
		checkbox: {
			input: {
				override: 'size-full',
			},
		},		
		input: {
			input: {
				override: 'size-full',
			},
		},
		multiSelect: {
			select: {
				override: 'size-full',
			}
		},
		numberInput: {
			input: {
				override: 'size-full',
			},
		},
		radio: {

		},
		range: {
			input: {
				override: 'size-full',
			},
		},
		select: {
			select: {
				override: 'size-full',
			}
		},
		spinner: {
			div: {
				override: 'size-full spinner',
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
				override: 'px-1',
			},
			tdFocused: {
				override: 'px-1',
			},
		},
		headerCell: {
			sortAscending: '▲',
			sortDescending: '▼',
			span: {
				override: 'inline-flex items-center',
			},
			th: {
				override: 'px-1',
			},
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
				override: 'sticky top-0 z-10',
			},
			theadTR: {},
		},
	},
}
