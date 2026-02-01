<script lang="ts">
	import DataTable, { SelectCell } from '@emamid/svelte-data-table';
	import type { CellRenderer, ColumnConfig, DataCellChangedEvent, RowClassFunction } from '@emamid/svelte-data-table';

	import { find } from 'lodash';

	import { characters, classes, races, } from '../../data.js';

	const getClassName = (item: any) => classes.find(characterClass => characterClass.id === item.classID)?.name || '';

	const getRaceName = (item: any) => races.find(race => race.id === item.raceID)?.name || '';

	const crossOutIfDead: CellRenderer = async(_column, item, _isFocused, calcClass) => {
		return {					
			dataValue: item.name,
			displayValue: item.name,
			tdClass: calcClass + (item.dead ? ' line-through decoration-wavy' : ''),
		}
	}

	const redIfEvil: RowClassFunction = (item, _isFocused, calcClass) => {
		return calcClass + (item.alignment === 'evil' ? ' bg-red-500' : '');
	}

	const columns: ColumnConfig[] = [
		{
			canSort: true,
			cellRenderer: crossOutIfDead,
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
			theme: {
				parts: {
					headerCell: {
						th: {
							append: 'text-center w-10',
						},						
					},
				},
			},
			title: 'Level',
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
		trClassGetter={redIfEvil}
		oncellchanged={cellChanged}
	/>
</main>
