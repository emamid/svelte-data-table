import type { DataTableTheme } from '../common.js';

export const daisyUITheme: DataTableTheme = {
	inputs: {
		button: {
			button: {
				append: 'btn btn-primary',
			}
		},
		checkbox: {
			input: {
				append: 'toggle',
			},
		},
		input: {
			input: {
				append: 'input',
			},
		},
		multiSelect: {
			select: {
				append: 'select',
			}
		},
		numberInput: {
			input: {
				append: 'input',
			},
		},
		radio: {
			input: {
				append: 'mask mask-star',
			},
			span: {
				append: 'rating',
			},
		},
		range: {
			input: {
				append: 'range',
			},
		},
		select: {
			select: {
				append: 'select',
			}
		},
	},
}
