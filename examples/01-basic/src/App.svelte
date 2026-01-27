<script lang="ts">
	import DataTable from '@emamid/svelte-data-table';
	import type { ColumnConfig } from '@emamid/svelte-data-table';
	import { characters } from '../../data.js';

	const columns: ColumnConfig[] = [
		{
			canSort: true,
			key: 'name',
			theme: {
				parts: {
					dataCell: {
						td: {
							append: 'w-40',
						},
					},
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
			key: 'fingers',
			theme: {
				parts: {
					dataCell: {
						td: {
							append: 'text-right w-10',
						},
					},
					headerCell: {
						th: {
							append: 'w-10',
						},						
					},
				},
			},
			title: 'Fingers',
		},
		{
			canSort: true,
			key: 'level',
			theme: {
				parts: {
					dataCell: {
						td: {
							append: 'text-right w-24',
						},
					},
					headerCell: {
						th: {
							append: 'w-24',
						},						
					},
				},
			},
			title: 'Level',
		},
		{
			canSort: true,
			key: 'dead',
			theme: {
				parts: {
					dataCell: {
						td: {
							append: 'text-center w-10',
						},
					},
					headerCell: {
						th: {
							append: 'w-10',
						},						
					},
				},
			},
			title: 'Dead',
		}
	]
</script>

<main>	
	<DataTable
		{columns}
		items={characters}
		sortKey="name"
	/>
</main>
