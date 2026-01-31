<script lang="ts">
	import {
		getDataTableContext,
		joinInputClasses,
	} from '../common.js';
	import type {
		ColumnConfig,
		DataCellChangedEvent,
		DataCellEvent,
	} from '../common.js';
	import { activeTheme } from '../themes/active.js';

	import TabWrapper from './TabWrapper.svelte';

	interface Props {
		column: ColumnConfig;
		item: any;
		displayProp?: string;
		valueProp?: string;
		items: any[];
		oncellchanged?: (event: DataCellChangedEvent) => void;
		onnexttab?: (event: DataCellEvent) => void;
		onprevtab?: (event: DataCellEvent) => void;
		value: any;
		[key: string]: any;
	}

	let {
		column,
		item,
		displayProp = 'name',
		valueProp = 'id',
		items,
		oncellchanged,
		onnexttab,
		onprevtab,
		value,
		...inputProps
	}: Props = $props();

	let newValue = $derived(value);
	const tableTheme = getDataTableContext()?.theme || {};

	const dispatchCellChanged = () => {
		if (value !== newValue) {
			oncellchanged?.({
				column,
				item,
				oldValue: value,
				newValue: newValue,
			});
		}		
	};

	const getClass = (element: string) => joinInputClasses(
		'select',
		element, [
			activeTheme,
			tableTheme,
			column.theme,
		],
	)

	const selectClass = $derived(getClass('select'));
	const optionClass = $derived(getClass('option'));
</script>

<TabWrapper
	{column}
	{item}
	{onprevtab}
	{onnexttab}
>
	<!-- svelte-ignore a11y_autofocus -->
	<select
		autofocus
		class={selectClass}
		onchange={dispatchCellChanged}
		bind:value={newValue}
		{...inputProps}
	>
		{#each items as selectItem}
			<option
				class={optionClass}
				value={selectItem[valueProp]}
			>
				{selectItem[displayProp]}
			</option>
		{/each}
	</select>
</TabWrapper>
