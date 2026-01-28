<script lang="ts">
	import {
		getDataTableContext,
		joinInputClasses,
	} from '../common.js';	
	import type {
		ColumnConfig,
		DataCellChangedEvent,
	} from '../common.js';
	import { activeTheme } from '../themes/active.js';

	interface Props {
		caption?: string;
		column: ColumnConfig;
		item: any;
		max: number;
		min: number;
		oncellchanged?: (event: DataCellChangedEvent) => void;
		value: number;
		[key: string]: any;
	};

	let {
		caption,
		column,
		inputType = 'text',
		item,
		max = 100,
		min = 0,
		oncellchanged,
		value,
		...inputProps
	}: Props = $props();

	let internalValue = $derived(value);
	const tableTheme = getDataTableContext()?.theme || {};

	const changed = () => {
		if (value !== internalValue) {			
			oncellchanged?.({
				column,
				item,
				oldValue: value,
				newValue: internalValue,
			});
		}
	};

	const inputClass = $derived(joinInputClasses(
		'range',
		'input', [
			activeTheme,
			tableTheme,
			column.theme,
		],
	))
</script>

<input
	class={inputClass}
	{max}
	{min}
	onchange={changed}
	type="range"
	bind:value={internalValue}
	{...inputProps}
/>
{#if caption}{caption}{/if}	
