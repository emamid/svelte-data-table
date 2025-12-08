<script lang="ts">
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';

	import { TableBodyRow } from 'flowbite-svelte';

	import DataTableDataCell from './DataTableDataCell.svelte';
	import {
		evalRowDropBoolean,
		evalRowBoolean,
		getColumnID,
		getDataTableContext,
	} from './common.js';
	import type {
		ColumnConfig,
		RowBoolean,
		RowDropBoolean,
		GetTRClassFunction,
		InternalColumnConfig,
	} from './common.js';

	interface Props {
		allowRowDrag: RowBoolean;
		allowRowDrop: RowDropBoolean;
		columns: InternalColumnConfig[];
		focusedColumnKeyID: any;
		getTRClass: GetTRClassFunction;
		isRowFocused: boolean;
		item: any;
	}

	let {
		allowRowDrag,
		allowRowDrop,
		columns,
		focusedColumnKeyID,
		getTRClass,
		isRowFocused,
		item
	}: Props = $props();

	const context = getDataTableContext();

	let span: HTMLSpanElement = $state();

	const dispatch = createEventDispatcher();

	const cellClicked = (column: ColumnConfig) => dispatch('cellClicked', { column, item });

	const rowClicked = () => dispatch('rowClicked', { item });

	const dragOverHandler = (event: DragEvent) => {
		const { draggedItem } = context;
		const canDrop = evalRowDropBoolean(draggedItem, item, allowRowDrop);
		if (canDrop) {
			event.preventDefault();
			if (event.dataTransfer) {
				event.dataTransfer.dropEffect = 'move';
			}
		}
	}

	const dragStartHandler = (dragEvent: DragEvent) => {
		context.draggedColumn = undefined;
		context.draggedItem = item;
		dispatch('rowDragStart', {
			dragEvent,
			sourceItem: item,
		})
	}

	const dropHandler = (event: DragEvent) => {
		const { draggedItem } = context;
		const canDrop = evalRowDropBoolean(draggedItem, item, allowRowDrop);
		if (canDrop) {
			event.preventDefault();
			dispatch('rowDropped', {
				sourceItem: draggedItem,
				targetItem: item,
			})
		}
	}

	onMount(() => {
		if (span && span.parentElement) {
			span.parentElement.addEventListener('click', rowClicked);
			span.parentElement.addEventListener('dragover', dragOverHandler);
			span.parentElement.addEventListener('dragstart', dragStartHandler);
			span.parentElement.addEventListener('drop', dropHandler);
		}
	})

	onDestroy(() => {
		if (span && span.parentElement) {
			span.parentElement.removeEventListener('click', rowClicked);
			span.parentElement.removeEventListener('dragover', dragOverHandler);
			span.parentElement.removeEventListener('dragstart', dragStartHandler);
			span.parentElement.removeEventListener('drop', dropHandler);
		}
	})
</script>

<TableBodyRow
	class={getTRClass(item, isRowFocused)}
	draggable={evalRowBoolean(item, allowRowDrag)}
>
	{#if !!allowRowDrag || !!allowRowDrop}
		<span style="display:none" bind:this={span}></span>
	{/if}
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
			on:cellDragStart
			on:cellDropped
		/>
	{/each}
</TableBodyRow>
