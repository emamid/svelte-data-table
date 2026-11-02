<script lang="ts">
	import { activeTheme } from './themes/active';
	import DataTableDataCell from './DataTableDataCell.svelte';
	import {
		evalRowDropBoolean,
		evalRowBoolean,
		getColumnID,
		getDataTableContext,
		joinPartClasses,
	} from './common';
	import type {
		ActionEvent,
		ColumnConfig,
		DataCellChangedEvent,
		DataCellDragEvent,
		DataCellDropEvent,
		DataCellEvent,
		DataCellMouseEvent,
		RowBoolean,
		RowClassFunction,
		RowDragEvent,
		RowDropBoolean,
		RowDropEvent,
		RowEvent,
	} from './common';

	interface Props {
		allowRowDrag: RowBoolean;
		allowRowDrop: RowDropBoolean;
		columns: ColumnConfig[];
		focusedColumnKeyID: any;
		isRowFocused: boolean;
		item: any;
		onaction?: (event: ActionEvent) => void;
		onbutton?: (event: DataCellEvent) => void;
		oncellchanged?: (event: DataCellChangedEvent) => void;
		oncellclick?: (event: DataCellMouseEvent) => void;
		oncelldragend?: (event: DataCellDragEvent) => void;
		oncelldragstart?: (event: DataCellDragEvent) => void;
		oncelldropped?: (event: DataCellDropEvent) => void;
		ondragend?: (event: RowDragEvent) => void;
		ondragstart?: (event: RowDragEvent) => void;
		ondropped?: (event: RowDropEvent) => void;
		onenterpressed?: (event: DataCellEvent) => void;
		onnexttab?: (event: DataCellEvent) => void;
		onprevtab?: (event: DataCellEvent) => void;
		onrowclick?: (event: RowEvent) => void;
		trClassGetter?: RowClassFunction;
	}

	let {
		allowRowDrag,
		allowRowDrop,
		columns,
		focusedColumnKeyID,
		isRowFocused,
		item,
		onaction,
		onbutton,
		oncellchanged,
		oncellclick,
		oncelldragend,
		oncelldragstart,
		oncelldropped,
		ondragend,
		ondragstart,
		ondropped,
		onenterpressed,
		onnexttab,
		onprevtab,
		onrowclick,
		trClassGetter,
	}: Props = $props();

	const context = getDataTableContext();
	const tableTheme = context.theme || {};

	const rowClicked = () => onrowclick?.({ item });

	const dragEnd = (event: DragEvent) => {
		ondragend?.({
			...event,
			sourceItem: item,
		})
	}

	const dragOver = (event: DragEvent) => {
		const { draggedItem } = context;
		const canDrop = evalRowDropBoolean(draggedItem, item, allowRowDrop);
		if (canDrop) {
			event.preventDefault();
			if (event.dataTransfer) {
				event.dataTransfer.dropEffect = 'move';
			}
		}
	}

	const dragStart = (dragEvent: DragEvent) => {
		if (context.dragType) {
			return;
		}
		ondragstart?.({
			...dragEvent,
			sourceItem: item,
		});
	}

	const drop = (event: DragEvent) => {
		const { draggedItem } = context;
		const canDrop = evalRowDropBoolean(draggedItem, item, allowRowDrop);
		if (!canDrop) {
			return;
		}

		event.preventDefault();
		ondropped?.({
			...event,
			sourceItem: draggedItem,
			targetItem: item,
		});
	}

	const baseTRClass = $derived(joinPartClasses(
		'row',
		'tr', [
			activeTheme,
			tableTheme,
		],
		isRowFocused,
	));

	const trClass = $derived(trClassGetter ? trClassGetter(item, isRowFocused, baseTRClass) : baseTRClass);
</script>

<tr
	class={trClass}
	draggable={evalRowBoolean(item, allowRowDrag)}
	onclick={rowClicked}
	ondragend={dragEnd}
	ondragover={dragOver}
	ondragstart={dragStart}
	ondrop={drop}
>
	{#each columns as column}
		{@const isCellFocused =
			isRowFocused && focusedColumnKeyID && focusedColumnKeyID === getColumnID(column)}
		<DataTableDataCell
			{column}
			{isCellFocused}
			{item}
			{onaction}
			{onbutton}
			{oncellchanged}
			{oncelldragend}
			{oncelldragstart}
			{oncelldropped}
			onclick={oncellclick}
			{onenterpressed}
			{onnexttab}
			{onprevtab}
		/>
	{/each}
</tr>
