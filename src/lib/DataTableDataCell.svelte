<script lang="ts">
	import { TableBodyCell } from 'flowbite-svelte';

	import type { InternalColumnConfig } from './common.ts';
	import { defaultCellRenderer } from './common.ts';

	export let column: InternalColumnConfig;
	export let item: any;
	export let isCellFocused: boolean;
</script>

{#await (column.cellRenderer || defaultCellRenderer)(column, item)}
<TableBodyCell tdClass={column.getTDClass(item, '', isCellFocused)}/>
{:then {dataValue, displayValue}}
<TableBodyCell tdClass={column.getTDClass(item, dataValue, isCellFocused)} on:click>
	{#if column.viewComponent}
	<svelte:component
		this={column.viewComponent}
		{column}
		{item}
		value={dataValue}
		on:action
		on:cellChanged
		on:cellInput 
		on:click
		on:enterPressed
		on:prevTab
		on:nextTab
		{...column.viewComponentConfig}
	/>
	{:else}
		{#if column.focusComponent && isCellFocused}
		<svelte:component
			this={column.focusComponent}
			{column}
			{item}
			value={dataValue}
			on:action
			on:cellChanged
			on:cellInput
			on:click
			on:enterPressed
			on:prevTab
			on:nextTab
			{...column.focusComponentConfig}
		/>
		{:else}
		{displayValue}
		{/if}
	{/if}	
</TableBodyCell>
{:catch}
<TableBodyCell tdClass={column.getTDClass(item, '', isCellFocused)} />
{/await}
