<script lang="ts">
	import {
		getDataTableContext,
		joinInputClasses,
	} from '../common.js';
	import type {
		ColumnConfig,
		DataCellChangedEvent,
	} from '../common.ts';
	import { activeTheme } from '../themes/active.js';

	interface Props {
		caption?: string;
		column: ColumnConfig;
		item: any;
		oncellchanged?: (event: DataCellChangedEvent) => void;
		value: any;
		[key: string]: any;
	}

	let {
		caption = '',
		column,
		item,
		oncellchanged,
		value,
		...inputProps
	}: Props = $props();

	let internalValue = $derived(value);
	const tableTheme = getDataTableContext()?.theme || {};

	const toggleChanged = () => {
		oncellchanged?.({
			column,
			item,
			oldValue: value,
			newValue: internalValue,
		});
	};

	const getClass = (element: string) => joinInputClasses(
		'checkbox',
		element, [
			activeTheme,
			tableTheme,
			column.theme,
		],
	)

	const labelClass = $derived(getClass('label'));
	const inputClass = $derived(getClass('input'));
</script>

{#if caption}
	<label class={labelClass}>
		<input
			bind:checked={internalValue}
			class={inputClass}
			onchange={toggleChanged}
			type="checkbox"
			{...inputProps}
		/>
		{caption}
	</label>
{:else}
	<input
		bind:checked={internalValue}
		class={inputClass}
		onchange={toggleChanged}
		type="checkbox"
		{...inputProps}
	/>
{/if}
