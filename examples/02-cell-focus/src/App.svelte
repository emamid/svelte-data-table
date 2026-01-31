<script lang="ts">
	import DataTable, { InputCell, NumberInputCell } from '@emamid/svelte-data-table';
	import type { ColumnConfig, DataCellChangedEvent } from '@emamid/svelte-data-table';
	
	import { find } from 'lodash';

	import { characters } from '../../data.js';

	const columns: ColumnConfig[] = [
		{
			canFocus: true,
			canSort: true,
			focusComponent: InputCell,
			key: 'name',
			theme: {
				inputs: {
					input: {
						input: {
							append: 'w-40',
						},
					},
				},
				parts: {
					dataCell: {
						td: {
							override: 'whitespace-nowrap',
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
			canFocus: true,
			canSort: true,
			focusComponent: NumberInputCell,
			key: 'fingers',
			theme: {
				parts: {
					dataCell: {
						td: {
							append: 'text-right w-10',
						},
						tdFocused: {
							override: 'whitespace-nowrap w-10',
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
			canFocus: true,
			canSort: true,
			focusComponent: NumberInputCell,
			key: 'level',
			title: 'Level',
			theme: {
				parts: {
					dataCell: {
						td: {
							append: 'text-right w-24',
						},
						tdFocused: {
							append: 'whitespace-nowrap w-24',
						},
					},
					headerCell: {
						th: {
							append: 'w-24',
						},						
					},
				},
			},
		},
	]

	const cellChanged = (event: DataCellChangedEvent) => {
		const { column, item, newValue } = event;
		const { key } = column;
		if (typeof key === 'string') {
			const targetItem = find(characters, { id: item.id }) as any;
			if (targetItem) {
				targetItem[key] = newValue;
			}
		}
	};
</script>

<main>	
	<DataTable
		{columns}
		itemKey="id"
		items={characters}
		oncellchanged={cellChanged}
		sortKey="name"
		theme={{ parts: { table: { table: { append: 'font-medium whitespace-nowrap' } } } }}
	/>
</main>
