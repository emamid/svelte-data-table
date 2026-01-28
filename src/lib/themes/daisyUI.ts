import type { DataTableTheme } from '../common.js'

export const daisyUITheme: DataTableTheme = {
	inputs: {
		button: {
			button: {
				override: 'btn btn-primary',
			}
		},
		checkbox: {
			input: {
				override: 'toggle',
			},
		},
		input: {
			input: {
				override: 'input',
			},
		},
		multiSelect: {
			select: {
				override: 'select',
			}
		},
		numberInput: {
			input: {
				override: 'input',
			},
		},
		radio: {
			input: {
				override: 'mask mask-star',
			},
			span: {
				override: 'rating',
			},
		},
		range: {
			input: {
				override: 'range',
			},
		},
		select: {
			select: {
				override: 'select',
			}
		},
	},
}
