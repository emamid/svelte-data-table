<script lang="ts">
	import DataTable from '@emamid/svelte-data-table';
	import type { ColumnConfig } from '@emamid/svelte-data-table';
	import { characters } from '../../data.js';
	import BarCell from './BarCell.svelte';

	let maxLevel = characters.reduce((previousMax: number, character) => Math.max(previousMax, character.level || 1), 1);

	let columns: ColumnConfig[] = [
		{
			canSort: true,
			key: 'name',
			title: 'Name',
			thClassAppend: 'text-left w-40',
			tdClassAppend: 'w-40',
		},
		{
			canSort: true,
			key: 'level',
			title: 'Level',
			thClassAppend: 'text-left w-20',
			tdClassAppend: 'w-20 py-0',
			viewComponent: BarCell,
			viewComponentConfig: {
				maxValue: maxLevel,
			}
		},
	]
</script>

<main>
	<DataTable
		{columns}
		items={characters}
		itemKey="id"
		divClassAppend="h-full"
		sortKey="name"
	/>
</main>
