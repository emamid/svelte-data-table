<script lang="ts">
	import DataTable, {
		ActionsCell,
		ButtonCell,
		CheckboxCell,
		deleteAction,
		infoAction,
		InputCell,
		MultiSelectCell,
		SelectCell,
		SpinCell,
	} from '@emamid/svelte-data-table';
	import type {
		ActionEvent,
		CellRenderer,
		ColumnConfig,
		DataCellChangedEvent,
		DataCellEvent,
		RowClassFunction,
	} from '@emamid/svelte-data-table';

	import { find } from 'lodash';

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
			title: 'Actions',
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
			canFocus: true,
			canSort: true,
			cellRenderer: crossOutIfDead,
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
		{
			canSort: true,
			key: 'dead',
			theme: {
				parts: {
					headerCell: {
						th: {
							append: 'w-10',
						},						
					},
				},
			},
			title: 'Dead',
			viewComponent: CheckboxCell,
		},
		{
			canSort: true,
			key: 'fingers',
			title: 'Fingers',
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
			viewComponent: BarCell,
			viewComponentConfig: {
				maxValue: maxLevel,
			}
		},
		{
			canFocus: true,
			canSort: true,
			key: 'seenIn',
			title: 'Seen In',
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
			viewComponent: ButtonCell,
			viewComponentConfig: {
				caption: 'Edit',
			},
		},
	]

	let infoItem: Character | null = null;
	let infoModal: HTMLDialogElement;
	let notesItem: Character | null = null;
	let notesModal: HTMLDialogElement;

	const deleteItem = (itemToDelete: Character) => {
		characters = characters.filter(item => item !== itemToDelete);
	}

	const hideInfo = () => {
		infoModal.close();
	}		

	const hideNotes = () => {
		notesModal.close();
	}		

	const infoModalClosed = () => {
		infoItem = null;
	}

	const notesModalClosed = () => {
		notesItem = null;
	}

	const showInfo = (item: Character) => {
		infoItem = item;
		infoModal.showModal();
	}

	const showNotes = (item: Character) => {
		notesItem = item;
		notesModal.showModal();
	}

	const action = (event: ActionEvent) => {
		const { action, item } = event;
		if (action.name === 'info') {
			showInfo(item);
		}
		if (action.name === 'delete') {
			deleteItem(item);
		}
	};

	const buttonClicked = (event: DataCellEvent) => {
		const { column: { key }, item } = event;
		if (key === 'notes') {
			showNotes(item);
		}
	};

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

<dialog
	bind:this={infoModal}
	class="flex flex-col items-center p-4"
	class:hidden={!infoItem}
	closedby="any"
	onclose={infoModalClosed}
>
	{#if infoItem}
		<div class="text-xl">Information about {infoItem?.name}</div>
		<p>{infoItem.name} {infoItem.dead ? 'was' : 'is'} a level {infoItem.level}
			{getRaceName(infoItem)} {getClassName(infoItem)}</p>
		<button class="btn btn-primary" autofocus onclick={hideInfo}>Close</button>
	{/if}
</dialog>
<dialog
	bind:this={notesModal}
	class="flex flex-col items-center p-4"
	class:hidden={!notesItem}
	closedby="any"
	onclose={notesModalClosed}
>
	{#if notesItem}
		<div class="text-xl">Notes for {notesItem?.name}</div>
		<textarea class="textarea textarea-ghost" bind:value={notesItem.notes} autofocus rows={10}></textarea>
		<button class="btn btn-primary" onclick={hideNotes}>Close</button>
	{/if}
</dialog>
<main>	
	<DataTable
		{columns}
		items={characters}
		itemKey="id"
		trClassGetter={redIfEvil}
		sortKey="name"
		onaction={action}
		onbutton={buttonClicked}
		oncellchanged={cellChanged}
	/>
</main>
