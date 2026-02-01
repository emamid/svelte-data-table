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
			theme: {
				parts: {
					headerCell: {
						th: {
							append: 'w-40',
						},						
					},
				},
			},
			title: 'Name',
		},
		{
			canSort: true,
			key: 'level',
			title: 'Level',
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
		sortKey="name"
	/>
</main>
