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
			tdClassAppend: 'text-right w-32',
			thClassAppend: 'text-left w-32',
		},
		{
			canSort: true,
			key: 'level',
			title: 'Level',
			tdClassAppend: 'text-right w-28',
			thClassAppend: 'text-left w-28',
		},
		{
			key: 'dead',
			title: 'Dead',
			tdClassAppend: 'text-right w-10',
			thClassAppend: 'text-left w-10',
		}
	]
</script>

<main>	
	<DataTable
		{columns}
		items={characters}
	/>
</main>
