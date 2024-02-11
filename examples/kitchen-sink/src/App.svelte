<script lang="ts">
	import {
		Button,
		Modal,
		Textarea,
	} from 'flowbite-svelte';
	import {
		ArrowDownSolid,
		ArrowUpSolid,
		MinusSolid,
		PlusSolid,
	} from 'flowbite-svelte-icons';

	import DataTable, {
		ActionsCell,
		ButtonCell,
		deleteAction,
		infoAction,
		InputCell,
		MultiSelectCell,
		SelectCell,
		SpinCell,
		ToggleCell,
	} from '@emamid/svelte-data-table';
	import type {
		ColumnConfig,
		DataCellClassFunction,
		RowClassFunction,
	} from '@emamid/svelte-data-table';
	import {
		books,
		characters as defaultCharacters,
		classes,
		races,
	} from '../../data.js';
	import type { Character } from '../../data.js';
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

	const getClassName = (character: Character | null) => character ? classes.find(characterClass => characterClass.id === character.classID)?.name || '' : '';

	const getRaceName = (character: Character | null) => character ? races.find(race => race.id === character.raceID)?.name || '' : '';

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
						isDisabled: (character: Character) => !character.dead,
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
			sortFunction: (a: Character, b: Character) => getRaceName(a).localeCompare(getRaceName(b)),
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
			sortFunction: (a: Character, b: Character) => getClassName(a).localeCompare(getClassName(b)),
			canFocus: true,
			canSort: true,
		},
		{
			canSort: true,
			key: 'dead',
			title: 'Dead',
			thClassAppend: 'text-left w-2',
			tdClassAppend: 'w-2',
			viewComponent: ToggleCell,
		},
		{
			canSort: true,
			key: 'fingers',
			title: 'Fingers',
			thClassAppend: 'text-center w-4',
			tdClassAppend: 'w-4',
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
		{
			canFocus: true,
			canSort: true,
			key: 'seenIn',
			title: 'Seen In',
			thClassAppend: 'text-left w-10',
			tdClassAppend: 'w-10 py-0',
			focusComponent: MultiSelectCell,
			focusComponentConfig: {
				items: books,
			},
			cellRenderer: async(_column, item) => {
				return {					
					dataValue: item.seenIn,
					displayValue: item.seenIn.map((id: number) => books.find(book => book.id === id)?.shortName || '').join(', '),
				}
			},
			sortFunction: (a: Character, b: Character) => a.seenIn.length - b.seenIn.length,
		},
		{
			key: 'notes',
			title: 'Notes',
			thClassAppend: 'text-left w-5',
			tdClassAppend: 'w-5 py-0',
			viewComponent: ButtonCell,
			viewComponentConfig: {
				caption: 'Edit',
			}
		}
	]

	let infoModalVisible: boolean = false;
	let infoItem: Character | null = null;
	let noteModalVisible: boolean = false;
	let noteItem: Character | null = null;

	const deleteItem = (itemToDelete: Character) => {
		characters = characters.filter(item => item !== itemToDelete);
	}

	const showInfo = (item: Character) => {
		infoItem = item;
		infoModalVisible = true;
	}

	const showNotes = (item: Character) => {
		noteItem = item;
		noteModalVisible = true;
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

	const cellClicked = (event: CustomEvent) => {
		const { item, column } = event.detail;
		const { key } = column;
		if (key === 'notes') {
			showNotes(item);
		}
	}
</script>

<main>	
	<Modal title="Information about {infoItem?.name}" bind:open={infoModalVisible} autoclose outsideclose>
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">{infoItem?.name} {infoItem?.dead ? 'was' : 'is'} a level {infoItem?.level}
			 {getRaceName(infoItem)} {getClassName(infoItem)}</p>
	</Modal>		
	<Modal title="Notes for {noteItem?.name}" bind:open={noteModalVisible} autoclose outsideclose>
		{#if noteItem}
		<Textarea bind:value={noteItem.notes} rows={10}/>
		{/if}
		<Button on:click={() => noteModalVisible = false}>Close</Button>
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
		on:cellClicked={cellClicked}
	/>
</main>
