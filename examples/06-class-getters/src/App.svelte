<script lang="ts">
	import DataTable from '@emamid/svelte-data-table';
	import type { ColumnConfig, DataCellClassFunction, RowClassFunction } from '@emamid/svelte-data-table';
	import { characters, classes, races, } from '../../data.js';

	const getClassName = (item: any) => classes.find(characterClass => characterClass.id === item.classID)?.name || '';

	const getRaceName = (item: any) => races.find(race => race.id === item.raceID)?.name || '';

	const crossOutIfDead: DataCellClassFunction = (item, _column, _value, _isFocused, calcClass) => {
		if (item.dead) {
			return calcClass + ' line-through decoration-wavy';
		}
		return calcClass;
	}

	const redIfEvil: RowClassFunction = (item, _isFocused, calcClass) => {
		if (item.alignment === 'evil') {
			return calcClass + ' bg-red-500';
		}
		return calcClass;
	}

	const columns: ColumnConfig[] = [
		{
			canSort: true,
			key: 'name',
			title: 'Name',
			thClassAppend: 'text-left w-40',
			tdClassAppend: 'w-40',
			tdClassGetter: crossOutIfDead,
		},
		{
			key: 'level',
			title: 'Level',
			thClassAppend: 'text-center w-10',
			tdClassAppend: 'text-center w-10',
			canSort: true,
		},
		{
			key: 'raceID',
			title: 'Race',
			thClassAppend: 'text-left w-40',
			tdClassAppend: 'w-40',
			cellRenderer: async(_column, item) => {
				return {					
					dataValue: item.raceID,
					displayValue: getRaceName(item),
				}
			},
			sortFunction: (a: any, b: any) => getRaceName(a).localeCompare(getRaceName(b)),
			canSort: true,
		},
		{
			key: 'classID',
			title: 'Class',
			thClassAppend: 'text-left w-40',
			tdClassAppend: 'w-40',
			cellRenderer: async(_column, item) => {
				return {					
					dataValue: item.classID,
					displayValue: getClassName(item),
				}
			},
			sortFunction: (a: any, b: any) => getClassName(a).localeCompare(getClassName(b)),
			canSort: true,
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
		trClassGetter={redIfEvil}
		on:cellChanged={cellChanged}
	/>
</main>
