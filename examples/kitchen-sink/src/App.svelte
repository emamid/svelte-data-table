<script lang="ts">
	import { Modal } from 'flowbite-svelte';
	import { ArrowDownSolid, ArrowUpSolid, MinusSolid, PlusSolid } from 'flowbite-svelte-icons';

	import DataTable, { ActionsCell, deleteAction, infoAction, InputCell, SelectCell, SpinCell, ToggleCell, } from '@emamid/svelte-data-table';
	import type { ColumnConfig, DataCellClassFunction, RowClassFunction } from '@emamid/svelte-data-table';
	import { characters as defaultCharacters, classes, races, } from '../../data.js';
	import BarCell from './BarCell.svelte';

	let characters = [...defaultCharacters];

	const maxLevel = characters.reduce((previousMax: number, character) => Math.max(previousMax, character.level || 1), 1);

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

	const getClassName = (item: any) => classes.find(characterClass => characterClass.id === item.classID)?.name || '';

	const getRaceName = (item: any) => races.find(race => race.id === item.raceID)?.name || '';

	const columns: ColumnConfig[] = [
		{
			title: 'Actions',
			thClassAppend: 'text-left w-5',
			tdClassAppend: 'w-5',
			viewComponent: ActionsCell,
			viewComponentConfig: {
				actions: [
					{
						...deleteAction,
						isDisabled: (item: any) => !item.dead,
					},
					infoAction,
				]
			},
		},
		{
			canSort: true,
			key: 'name',
			title: 'Name',
			thClassAppend: 'text-left w-40',
			tdClassAppend: 'w-40',
			tdFocusedClassOverride: 'whitespace-nowrap font-medium w-40 px-4',
			focusComponent: InputCell,
			canFocus: true,
			tdClassGetter: crossOutIfDead,
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
		},
		{
			canSort: true,
			key: 'dead',
			title: 'Dead',
			thClassAppend: 'text-left w-5',
			tdClassAppend: 'w-5',
			viewComponent: ToggleCell,
		},
		{
			canSort: true,
			key: 'fingers',
			title: 'Fingers',
			thClassAppend: 'text-center w-5',
			tdClassAppend: 'w-5',
			viewComponent: SpinCell,
			viewComponentConfig: {
				minValue: 0,
				maxValue: 10,
			}
		},
		{
			canSort: true,
			key: 'level',
			title: 'Level',
			thClassAppend: 'text-left w-10',
			tdClassAppend: 'w-10 py-0',
			viewComponent: BarCell,
			viewComponentConfig: {
				maxValue: maxLevel,
			},
			sortAscendingIcon: PlusSolid,
			sortDescendingIcon: MinusSolid,
		},
	]

	let infoModalVisible: boolean = false;
	let infoItem: any = null;

	const deleteItem = (itemToDelete: any) => {
		characters = characters.filter(item => item !== itemToDelete);
	}

	const showInfo = (item: any) => {
		infoItem = item;
		infoModalVisible = true;
	}

	const action = (event: CustomEvent) => {
		const { action, item } = event.detail;
		if (action === 'info') {
			showInfo(item);
		}
		if (action === 'delete') {
			deleteItem(item);
		}
	}

	const cellChanged = (event: CustomEvent) => {
		const { item, column, newValue } = event.detail;
		const { key } = column;
		(characters[characters.indexOf(item)] as any)[key] = newValue;
	}
</script>

<main>	
	<Modal title="Information about {infoItem?.name}" bind:open={infoModalVisible} autoclose outsideclose>
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">{infoItem.name} {infoItem.dead ? 'was' : 'is'} a level {infoItem.level}
			 {getRaceName(infoItem)} {getClassName(infoItem)}</p>
	</Modal>		
	<DataTable
		{columns}
		divClassAppend="h-full"
		items={characters}
		itemKey="id"
		trClassGetter={redIfEvil}
		sortKey="name"
		sortAscendingIcon={ArrowDownSolid}
		sortDescendingIcon={ArrowUpSolid}
		on:action={action}
		on:cellChanged={cellChanged}
	/>
</main>
