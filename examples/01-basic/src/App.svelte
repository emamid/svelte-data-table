<script lang="ts">
	import DataTable from '@emamid/svelte-data-table';
	import type { ColumnConfig } from '@emamid/svelte-data-table';
	import { characters } from '../../data.js';

	const columns: ColumnConfig[] = [
		{
			canSort: true,
			key: 'name',
			title: 'Name',
			thClassAppend: 'text-left w-40',
			tdClassAppend: 'w-40',
		},
		{
			canSort: true,
			key: 'fingers',
			title: 'Fingers',
			tdClassAppend: 'text-right w-10',
			thClassAppend: 'text-right w-10',
		},
		{
			canSort: true,
			key: 'level',
			title: 'Level',
			tdClassAppend: 'text-right w-10',
			thClassAppend: 'text-right w-10',
		},
		{
			key: 'dead',
			title: 'Dead',
			tdClassAppend: 'text-center w-10',
			thClassAppend: 'text-center w-10',
		}
	]
</script>

<main>	
	<DataTable
		{columns}
		items={characters}
		divClassAppend="h-full"
		sortKey="name"
	/>
</main>
