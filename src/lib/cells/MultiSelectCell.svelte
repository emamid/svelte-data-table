<script lang="ts">
	import {
		getDataTableContext,
		joinInputClasses,
	} from '../common';
	import type {
		ColumnConfig,
		DataCellChangedEvent,
		DataCellEvent,
	} from '../common';
	import { activeTheme } from '../themes/active';

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

	let internalValue = $derived(value);
	const tableTheme = getDataTableContext()?.theme || {};

	const dispatchCellChanged = () => {
		if (value !== internalValue) {			
			oncellchanged?.({
				column,
				item,
				oldValue: value,
				newValue: internalValue,
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
		class={getClass('select')}
		multiple
		onchange={dispatchCellChanged}
		bind:value={internalValue}
		{...inputProps}
	>
		{#each items as selectItem}
			<option
				class={getClass('option')}
				value={selectItem[valueProp]}
			>
				{selectItem[displayProp]}
			</option>
		{/each}
	</select>
</TabWrapper>
