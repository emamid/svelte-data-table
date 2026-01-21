import type { DataTableTheme } from '../common'

export const iconifyTheme: DataTableTheme = {
	inputs: {
		spinner: {
			minusIcon: {
				height: '24px',
				icon: 'ic:sharp-remove-circle',
				width: '24px',
			},
			plusIcon: {
				height: '24px',
				icon: 'ic:sharp-add-circle',
				width: '24px',
			},
		},
	},
	parts: {
		headerCell: {
			sortAscending: {
				height: '24px',
				icon: 'ic:sharp-keyboard-arrow-up',
				width: '24px',
			},
			sortDescending: {
				height: '24px',
				icon: 'ic:sharp-keyboard-arrow-down',
				width: '24px',
			},
			th: {
				override: 'h-8',
			},
		},
	},
}