<script lang="ts">
	import DataTable, { InputCell, SelectCell } from '@emamid/svelte-data-table';
	import type { ColumnConfig, DataCellChangedEvent } from '@emamid/svelte-data-table';

	import { find } from 'lodash';

	import { characters, classes, races, } from '../../data.js';

	const getClassName = (item: any) => classes.find(characterClass => characterClass.id === item.classID)?.name || '';

	const getRaceName = (item: any) => races.find(race => race.id === item.raceID)?.name || '';

	const columns: ColumnConfig[] = [
		{
			canFocus: true,
			canSort: true,
			focusComponent: InputCell,
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
			key: 'raceID',
			title: 'Race',
			theme: {
				parts: {
					headerCell: {
						th: {
							append: 'min-w-[8em]',
						},
					},
				},
			},
			focusComponent: SelectCell,
			focusComponentConfig: {
				items: races,
			},
			cellRenderer: async(_column, item) => {
				return {					
					dataValue: item.raceID,
					displayValue: getRaceName(item),
				}
			},
			sortFunction: (a: any, b: any) => getRaceName(a).localeCompare(getRaceName(b)),
			canFocus: true,
			canSort: true,
		},
		{
			key: 'classID',
			title: 'Class',
			theme: {
				parts: {
					headerCell: {
						th: {
							append: 'min-w-[8em]',
						},
					},
				},
			},
			focusComponent: SelectCell,
			focusComponentConfig: {
				items: classes,
			},
			cellRenderer: async(_column, item) => {
				return {					
					dataValue: item.classID,
					displayValue: getClassName(item),
				}
			},
			sortFunction: (a: any, b: any) => getClassName(a).localeCompare(getClassName(b)),
			canFocus: true,
			canSort: true,
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
		items={characters}
		itemKey="id"
		sortKey="name"
		oncellchanged={cellChanged}
	/>
</main>
