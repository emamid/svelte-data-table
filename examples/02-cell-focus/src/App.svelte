<script lang="ts">
	import DataTable, { InputCell, NumberInputCell, } from '@emamid/svelte-data-table';
	import type { ColumnConfig } from '@emamid/svelte-data-table';
	import { characters } from '../../data.js';

	const columns: ColumnConfig[] = [
		{
			canSort: true,
			key: 'name',
			title: 'Name',
			thClassAppend: 'text-left w-40',
			tdClassAppend: 'w-40',
			tdFocusedClassOverride: 'whitespace-nowrap font-medium w-40 px-4',
			focusComponent: InputCell,
			canFocus: true,
		},
		{
			canSort: true,
			key: 'fingers',
			title: 'Fingers',
			tdClassAppend: 'text-right w-10',
			thClassAppend: 'text-right w-10',
			tdFocusedClassOverride: 'whitespace-nowrap font-medium w-10 px-4',
			focusComponent: NumberInputCell,
			canFocus: true,
		},
		{
			canSort: true,
			key: 'level',
			title: 'Level',
			tdClassAppend: 'text-right w-10',
			thClassAppend: 'text-right w-10',
			tdFocusedClassOverride: 'whitespace-nowrap font-medium w-10 px-4',
			focusComponent: NumberInputCell,
			canFocus: true,
		},
	]

	const cellChanged = (event: CustomEvent) => {
		const { item, column, newValue } = event.detail;
		const { key } = column;
		(characters[characters.indexOf(item)] as any)[key] = newValue;
	}
</script>

<main>	
	<DataTable
		{columns}
		items={characters}
		itemKey="id"
		divClassAppend="h-full"
		sortKey="name"
		on:cellChanged={cellChanged}
	/>
</main>
