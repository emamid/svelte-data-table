<script lang="ts">
	import {
		getDataTableContext,
		getPartIcon,
		joinPartClasses,
	} from './common';
	import type {	ColumnConfig } from './common';
	import { activeTheme } from './themes/active';
	
	import DataTableIcon from './DataTableIcon.svelte';

	interface Props {
		column: ColumnConfig;
		isSorted?: boolean;
		onclick?: (event: MouseEvent) => void;
		reverseSort: boolean;
	}

	let {
		column,
		isSorted,
		onclick,
		reverseSort,
	}: Props = $props();

	const tableTheme = getDataTableContext()?.theme || {};

	const getClasses = (element: string) => joinPartClasses(
		'headerCell',
		element, [
			activeTheme,
			tableTheme,
			column.theme,
		],
	)	

	const getIcon = (propName: string) => getPartIcon(
		'headerCell',
		propName, [
			activeTheme,
			tableTheme,
			column.theme,
		],
	)

	const thClass = $derived(getClasses('th'))
	const spanClass = $derived(getClasses('span'));
	const titleSpanClass = $derived(getClasses('titleSpan'))
	const sortAscendingIcon = $derived(getIcon('sortAscending'));
	const sortDescendingIcon = $derived(getIcon('sortDescending'));
</script>

<th
	class={thClass}
	{onclick}
>
	<span class={spanClass}>
		{#if isSorted}
			{#if reverseSort}
				<DataTableIcon icon={sortDescendingIcon}/>
			{:else}
				<DataTableIcon icon={sortAscendingIcon}/>
			{/if}
		{/if}
		<span class={titleSpanClass}>{column.title}</span>
	</span>
</th>
