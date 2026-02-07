<script lang="ts">
	import DataTable, { ActionsCell, deleteAction, infoAction, CheckboxCell, InputCell, SpinCell } from '@emamid/svelte-data-table';
	import type { ActionEvent, ColumnConfig, DataCellChangedEvent } from '@emamid/svelte-data-table';

	import { find } from 'lodash';
	
	import { characters as defaultCharacters, classes, races, } from '../../data.js';

	const getClassName = (item: any) => classes.find(characterClass => characterClass.id === item.classID)?.name || '';

	const getRaceName = (item: any) => races.find(race => race.id === item.raceID)?.name || '';

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
	]

	let characters = [...defaultCharacters];

	let infoModal: HTMLDialogElement;
	let infoItem: any = null;

	const action = (event: ActionEvent) => {
		const { action, item } = event;
		if (action.name === 'info') {
			showInfo(item);
		}
		if (action.name === 'delete') {
			deleteItem(item);
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

	const deleteItem = (itemToDelete: any) => {
		characters = characters.filter(item => item !== itemToDelete);
	}

	const hideInfo = () => {
		infoModal.close();
	}		

	const infoModalClosed = () => {
		infoItem = null;
	}

	const showInfo = (item: any) => {
		infoItem = item;
		infoModal.showModal();
	}
</script>

<dialog
	bind:this={infoModal}
	class="flex flex-col items-center p-4"
	class:hidden={!infoItem}
	closedby="any"
	onclose={infoModalClosed}
>
	{#if infoItem}
		<h2>Information about {infoItem?.name}</h2>
		<p>{infoItem.name} {infoItem.dead ? 'was' : 'is'} a level {infoItem.level}
			{getRaceName(infoItem)} {getClassName(infoItem)}</p>
		<button autofocus onclick={hideInfo}>Close</button>
	{/if}
</dialog>
<main>
	<DataTable
		{columns}
		items={characters}
		itemKey="id"
		sortKey="name"
		onaction={action}
		oncellchanged={cellChanged}
	/>
</main>
