<script lang="ts">
	import type {
		ActionEvent,
		ColumnConfig,
		DataCellChangedEvent,
		DataCellDragEvent,
		DataCellDropEvent,
		DataCellEvent,
		DataCellMouseEvent,
	} from './common.js';
	import {
		defaultCellRenderer,
		evalCellDropBoolean,
		evalRowBoolean,
		getDataTableContext,
		joinPartClasses,
	} from './common.js';
	import { activeTheme } from './themes/active.js';
	
	interface Props {
		column: ColumnConfig;
		item: any;
		isCellFocused: boolean;
		onaction?: (event: ActionEvent) => void;
		onbutton?: (event: DataCellEvent) => void;
		oncellchanged?: (event: DataCellChangedEvent) => void;
		oncelldragend?: (event: DataCellDragEvent) => void;
		oncelldragstart?: (event: DataCellDragEvent) => void;
		oncelldropped?: (event: DataCellDropEvent) => void;
		onclick?: (event: DataCellMouseEvent) => void;
		onenterpressed?: (event: DataCellEvent) => void;
		onnexttab?: (event: DataCellEvent) => void;
		onprevtab?: (event: DataCellEvent) => void;
	}

	let {
		column,
		item,
		isCellFocused,
		onaction,
		onbutton,
		oncellchanged,
		oncelldragend,
		oncelldragstart,
		oncelldropped,
		onclick,
		onenterpressed,
		onnexttab,
		onprevtab,
	}: Props = $props();

	const context = getDataTableContext();
	const tableTheme = context.theme || {};

	const baseTDClass = $derived(joinPartClasses(
		'dataCell',
		'td', [
			activeTheme,
			tableTheme,
			column.theme,
		],
		isCellFocused,
	));

	const click = (event: MouseEvent) => {
		onclick?.({
			...event,
			column,
			item,
		});
	}

	const dragEnd = (event: DragEvent) => {
		oncelldragend?.({
			...event,
			sourceColumn: column,
			sourceItem: item,
		})
	}

	const dragOver = (event: DragEvent) => {
		const { draggedColumn, draggedItem} = context;
		event.preventDefault();
		const canDrop = evalCellDropBoolean(draggedItem, draggedColumn, item, column.allowCellDrop);

		if (!canDrop) {
			return;
		}

		event.preventDefault();
		if (event.dataTransfer) {
			event.dataTransfer.dropEffect = 'move';
		}
	}

	const dragStart = (dragEvent: DragEvent) => {
		oncelldragstart?.({
			...dragEvent,
			sourceColumn: column,
			sourceItem: item,
		});
	}

	const drop = (event: DragEvent) => {
		const { draggedColumn, draggedItem} = context;
		if (!draggedItem || !draggedColumn) {
			return;		
		}

		const canDrop = evalCellDropBoolean(draggedItem, draggedColumn, item, column.allowCellDrop);
		if (!canDrop) {
			return;
		}

		event.preventDefault();

		oncelldropped?.({
			...event,
			sourceColumn: draggedColumn,
			sourceItem: draggedItem,
			targetColumn: column,
			targetItem: item,
		});
	}

	// const getClass = $derived((value: any) => column.tdClassGetter ? column.tdClassGetter(item, column, value, isCellFocused, baseTDClass) : baseTDClass);

</script>

{#await (column.cellRenderer || defaultCellRenderer)(column, item, isCellFocused, baseTDClass)}
	<td class={baseTDClass}></td>
{:then { dataValue, displayValue, focusComponentConfig, tdClass, viewComponentConfig }}
	<td
		draggable={evalRowBoolean(item, column.allowCellDrag)}
		class={tdClass || baseTDClass}
		onclick={click}
		ondragend={dragEnd}
		ondragover={dragOver}
		ondragstart={dragStart}
		ondrop={drop}
	>
		{#if column.viewComponent}
			<column.viewComponent
				{column}
				{item}
				value={dataValue}
				{onaction}
				{onbutton}
				{oncellchanged}
				onclick={click}
				{onenterpressed}
				{onprevtab}
				{onnexttab}
				{...(viewComponentConfig || column.viewComponentConfig)}
			/>
		{:else if column.focusComponent && isCellFocused}
			<column.focusComponent
				{column}
				{item}
				value={dataValue}
				{onaction}
				{onbutton}
				{oncellchanged}
				onclick={click}
				{onenterpressed}
				{onprevtab}
				{onnexttab}
				{...(focusComponentConfig || column.focusComponentConfig)}
			/>
		{:else}
			{displayValue}
		{/if}
	</td>
{:catch}
	<td class={baseTDClass}></td>
{/await}
