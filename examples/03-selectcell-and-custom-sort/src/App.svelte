<script lang="ts">
	import DataTable, { InputCell, SelectCell, } from '@emamid/svelte-data-table';
	import type { ColumnConfig } from '@emamid/svelte-data-table';
	import { characters, classes, races, } from '../../data.js';

	const getClassName = (item: any) => classes.find(characterClass => characterClass.id === item.classID)?.name || '';

	const getRaceName = (item: any) => races.find(race => race.id === item.raceID)?.name || '';

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
			key: 'raceID',
			title: 'Race',
			thClassAppend: 'text-left w-10',
			tdClassAppend: 'w-10',
			tdFocusedClassOverride: 'whitespace-nowrap font-medium w-10 px-4',
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
			thClassAppend: 'text-left w-10',
			tdClassAppend: 'w-10',
			tdFocusedClassOverride: 'whitespace-nowrap font-medium w-10 px-4',
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
		}
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
