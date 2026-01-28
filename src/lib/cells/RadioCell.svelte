<!-- @migration-task Error while migrating Svelte code: $$props is used together with named props in a way that cannot be automatically migrated. -->
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
		column: ColumnConfig;
		item: any;
		maxValue: number;
		oncellchanged?: (event: DataCellChangedEvent) => void;
		value: number;
		[key: string]: any;
	}

	let {
		column,
		item,
		maxValue,
		oncellchanged,
		value,
		...inputProps
	}: Props = $props();

	let internalValue: number = $derived(value);
	const tableTheme = getDataTableContext()?.theme || {};

	const getClass = (element: string) => joinInputClasses(
		'radio',
		element, [
			activeTheme,
			tableTheme,
			column.theme,
		],
	)

	const spanClass = $derived(getClass('span'));
	const inputClass = $derived(getClass('input'));
</script>

<span class={spanClass}>
	{#each { length: maxValue}, buttonNum}
		<input
			checked={internalValue === buttonNum + 1}
			class={inputClass}
			onchange={() => {
				internalValue = buttonNum + 1;
				console.log('Radio selected value:', internalValue);
				oncellchanged?.({
					column,
					item,
					oldValue: value,
					newValue: internalValue,
				});
			}}
			type="radio"
			{...inputProps}
		/>
	{/each}
</span>
