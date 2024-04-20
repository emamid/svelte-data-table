<script lang="ts">
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';

	import { TableBodyRow } from 'flowbite-svelte';

	import DataTableDataCell from './DataTableDataCell.svelte';
	import {
		evalDropBoolean,
		evalRowBoolean,
		getColumnID,
	} from './common.js';
	import type {
		ColumnConfig,
		DropBoolean,
		GetTRClassFunction,
		InternalColumnConfig,
		RowBoolean,
	} from './common.js';

	export let allowRowDrag: RowBoolean;
	export let allowRowDrop: DropBoolean;
	export let columns: InternalColumnConfig[];
	export let focusedColumnKeyID: any;
	export let getTRClass: GetTRClassFunction;
	export let isRowFocused: boolean;
	export let item: any;

	let span: HTMLSpanElement;

	const dispatch = createEventDispatcher();

	const cellClicked = (column: ColumnConfig) => dispatch('cellClicked', { column, item });

	const rowClicked = () => dispatch('rowClicked', { item });

	const getSourceItem = (event: DragEvent): any => {
		const itemJSON = event.dataTransfer?.getData('application/json');
		return itemJSON && JSON.parse(itemJSON);
	}

	const dragOverHandler = (event: DragEvent) => {
		const sourceItem = getSourceItem(event);
		const canDrop = evalDropBoolean(sourceItem, item, allowRowDrop);
		if (canDrop) {
			event.preventDefault();
			if (event.dataTransfer) {
				event.dataTransfer.dropEffect = 'move';
			}
		}
	}

	const dragStartHandler = (dragEvent: DragEvent) => {
		dragEvent.dataTransfer?.setData('application/json', JSON.stringify(item));
		dispatch('rowDragStart', {
			dragEvent,
			sourceItem: item,
		})
	}

	const dropHandler = (event: DragEvent) => {
		const sourceItem = getSourceItem(event);
		const canDrop = evalDropBoolean(sourceItem, item, allowRowDrop);
		if (canDrop) {
			event.preventDefault();
			dispatch('rowDropped', {
				sourceItem,
				targetItem: item,
			})
		}
	}

	onMount(() => {
		span?.parentElement?.addEventListener('click', rowClicked);
		span?.parentElement?.addEventListener('dragover', dragOverHandler);
		span?.parentElement?.addEventListener('dragstart', dragStartHandler);
		span?.parentElement?.addEventListener('drop', dropHandler);
	})

	onDestroy(() => {
		span?.parentElement?.removeEventListener('click', rowClicked);
		span?.parentElement?.removeEventListener('dragover', dragOverHandler);
		span?.parentElement?.removeEventListener('dragstart', dragStartHandler);
		span?.parentElement?.removeEventListener('drop', dropHandler);
	})

</script>

<TableBodyRow
	class={getTRClass(item, isRowFocused)}
	draggable={evalRowBoolean(item, allowRowDrag)}
>
	<span style="display:none" bind:this={span}></span>
	{#each columns as column}
		{@const isCellFocused =
			isRowFocused && focusedColumnKeyID && focusedColumnKeyID === getColumnID(column)}
		<DataTableDataCell
			{column}
			{isCellFocused}
			{item}
			on:click={() => cellClicked(column)}
			on:enterPressed
			on:prevTab
			on:nextTab
			on:action
			on:cellChanged
		/>
	{/each}
</TableBodyRow>
