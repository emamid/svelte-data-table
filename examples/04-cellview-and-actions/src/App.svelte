<script lang="ts">
	import { Modal } from 'flowbite-svelte';
	import DataTable, { ActionsCell, deleteAction, infoAction, InputCell, SpinCell, ToggleCell } from '@emamid/svelte-data-table';
	import type { ColumnConfig } from '@emamid/svelte-data-table';
	import { characters as defaultCharacters, classes, races, } from '../../data.js';

	const getClassName = (item: any) => classes.find(characterClass => characterClass.id === item.classID)?.name || '';

	const getRaceName = (item: any) => races.find(race => race.id === item.raceID)?.name || '';

	const columns: ColumnConfig[] = [
		{
			title: 'Actions',
			thClassAppend: 'text-left w-10',
			tdClassAppend: 'w-10',
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
		},
		{
			key: 'dead',
			title: 'Dead',
			thClassAppend: 'text-left w-10',
			tdClassAppend: 'w-10',
			viewComponent: ToggleCell,
		},
		{
			canSort: true,
			key: 'fingers',
			title: 'Fingers',
			thClassAppend: 'text-center w-20',
			tdClassAppend: 'w-20',
			viewComponent: SpinCell,
			viewComponentConfig: {
				minValue: 0,
				maxValue: 10,
			}
		}
	]

	let characters = [...defaultCharacters];

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
		items={characters}
		itemKey="id"
		divClassAppend="h-full"
		sortKey="name"
		on:action={action}
		on:cellChanged={cellChanged}
	/>
</main>
