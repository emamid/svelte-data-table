<script lang="ts">
	import { run } from 'svelte/legacy';

	import { createEventDispatcher, onDestroy } from 'svelte';

	import { TableBodyCell } from 'flowbite-svelte';

	import type {	InternalColumnConfig	} from './common.js';
	import {
		defaultCellRenderer,
		evalCellDropBoolean,
		evalRowBoolean,
		getDataTableContext,
	} from './common.js';

	interface Props {
		column: InternalColumnConfig;
		item: any;
		isCellFocused: boolean;
	}

	let { column, item, isCellFocused }: Props = $props();

	const context = getDataTableContext();

	let span: HTMLSpanElement = $state();

	const dispatch = createEventDispatcher();

	const dragOverHandler = (event: DragEvent) => {
		const { draggedColumn, draggedItem} = context;
		event.preventDefault();
		const canDrop = evalCellDropBoolean(draggedItem, draggedColumn, item, column.allowCellDrop);
		if (canDrop) {
			event.preventDefault();
			if (event.dataTransfer) {
				event.dataTransfer.dropEffect = 'move';
			}
		}
	}

	const dragStartHandler = (dragEvent: DragEvent) => {
		context.draggedColumn = column;	
		context.draggedItem = item;	
		dispatch('cellDragStart', {
			dragEvent,
			sourceColumn: column,
			sourceItem: item,
		})
	}

	const dropHandler = (event: DragEvent) => {
		const { draggedColumn, draggedItem} = context;
		const canDrop = evalCellDropBoolean(draggedItem, draggedColumn, item, column.allowCellDrop);
		if (canDrop) {
			event.preventDefault();
			dispatch('cellDropped', {
				sourceColumn: draggedColumn,
				sourceItem: draggedItem,
				targetColumn: column,
				targetItem: item,
			})
		}
	}

	run(() => {
		if (span && span.parentElement) {
			span.parentElement.addEventListener('dragover', dragOverHandler);
			span.parentElement.addEventListener('dragstart', dragStartHandler);
			span.parentElement.addEventListener('drop', dropHandler);
		}
	});

	onDestroy(() => {
		if (span && span.parentElement) {
			span.parentElement.removeEventListener('dragover', dragOverHandler);
			span.parentElement.removeEventListener('dragstart', dragStartHandler);
			span.parentElement.removeEventListener('drop', dropHandler);
		}
	})
</script>

{#await (column.cellRenderer || defaultCellRenderer)(column, item)}
	<TableBodyCell tdClass={column.getTDClass(item, '', isCellFocused)} />
{:then {dataValue, displayValue }}
	<TableBodyCell
		draggable={evalRowBoolean(item, column.allowCellDrag)}
		tdClass={column.getTDClass(item, dataValue, isCellFocused)}
		on:click
	>
		{#if !!column.allowCellDrag || !!column.allowCellDrop}
			<span style="display:none" bind:this={span}></span>
		{/if}
		{#if column.viewComponent}
			<column.viewComponent
				{column}
				{item}
				value={dataValue}
				on:action
				on:cellChanged
				on:click
				on:enterPressed
				on:prevTab
				on:nextTab
				{...column.viewComponentConfig}
			/>
		{:else if column.focusComponent && isCellFocused}
			<column.focusComponent
				{column}
				{item}
				value={dataValue}
				on:action
				on:cellChanged
				on:click
				on:enterPressed
				on:prevTab
				on:nextTab
				{...column.focusComponentConfig}
			/>
		{:else}
			{displayValue}
		{/if}
	</TableBodyCell>
{:catch}
	<TableBodyCell tdClass={column.getTDClass(item, '', isCellFocused)} />
{/await}
