<script lang="ts">
	import { setContext } from 'svelte';

	import type {
		ActionEvent,
		ColumnConfig,
		DataCellChangedEvent,
		DataCellDragEvent,
		DataCellDropEvent,
		DataCellEvent,
		DataTableContext,
		DataTableTheme,
		EnterAction,		
		GetItemKeyFunction,
		HeaderEvent,
		RowBoolean,
		RowClassFunction,
		RowDragEvent,
		RowDropBoolean,
		RowDropEvent,
		RowEvent,
		SortFunction,
	} from './common.js';

	import {
		dataTableContextName,
		getColumnID,
		joinPartClasses,
	} from './common.js';

	import { activeTheme } from './themes/active.js';
	
	import DataTableHeaderCell from './DataTableHeaderCell.svelte';
	import DataTableRow from './DataTableRow.svelte';
	
	interface Props {
		allowRowDrag?: RowBoolean;
		allowRowDrop?: RowDropBoolean;
		columns?: ColumnConfig[];
		enterAction?: EnterAction;
		itemKey?: string | null;
		items?: any[];
		onaction?: (event: ActionEvent) => void;
		onbutton?: (event: DataCellEvent) => void;
		oncellchanged?: (event: DataCellChangedEvent) => void;
		oncellclick?: (event: DataCellEvent) => void;
		oncelldragstart?: (event: DataCellDragEvent) => void;
		oncelldropped?: (event: DataCellDropEvent) => void;
		onenterpressed?: (event: DataCellEvent) => void;
		onheaderclick?: (event: HeaderEvent) => void;
		onnexttab?: (event: DataCellEvent) => void;
		onprevtab?: (event: DataCellEvent) => void;
		onrowclick?: (event: RowEvent) => void;
		onrowdragstart?: (event: RowDragEvent) => void;
		onrowdropped?: (event: RowDropEvent) => void;
		reverseSort?: boolean;
		sortColumnID?: string | null;
		sortFunction?: SortFunction;
		sortKey?: string;
		theme?: DataTableTheme;
		trClassGetter?: RowClassFunction;
	}

	let {
		allowRowDrag = false,
		allowRowDrop = !!allowRowDrag,
		columns = [],
		enterAction = 'next',
		itemKey = null,
		items = [],
		onaction,
		onbutton,
		oncellchanged,
		oncellclick,
		oncelldragstart,
		oncelldropped,
		onenterpressed,
		onheaderclick,
		onnexttab,
		onprevtab,
		onrowclick,
		onrowdragstart,
		onrowdropped,
		reverseSort = $bindable(false),
		sortColumnID = $bindable(null),
		sortFunction = $bindable(undefined),
		sortKey = $bindable(''),
		theme,
		trClassGetter,
	}: Props = $props();

	let sortedItems = $derived.by(() => {
		let tempItems = sortFunction
			? items.toSorted(sortFunction)
			: sortKey
				? items.toSorted(sortBySortKey)
				: [...items];
		if (reverseSort) {
			return tempItems.toReversed();
		}
		return tempItems;
	})

	let focusedColumnKeyID: any = $state(null);
	let focusedItemKey: any = $state(null);

	let context = $state<DataTableContext>({
		// svelte-ignore state_referenced_locally
		items,
		// svelte-ignore state_referenced_locally
		theme,
	})

	setContext(dataTableContextName, context);

	const sortBySortKey: SortFunction = (a: any, b: any) => {
		let aValue = a[sortKey];
		let bValue = b[sortKey];

		if (aValue === bValue) {
			return 0;
		}

		if (typeof aValue === 'string' && typeof bValue === 'string') {
			return aValue.localeCompare(bValue);
		}

		if (typeof aValue === 'number' && typeof bValue === 'number') {
			return aValue - bValue;
		}

		if (typeof aValue === 'number' || typeof bValue === 'number') {
			return (aValue || 0) - (bValue || 0);
		}

		if (typeof aValue === 'string' || typeof bValue === 'string') {
			return (aValue || '').localeCompare(bValue || '');
		}

		return JSON.stringify(aValue).localeCompare(JSON.stringify(bValue));
	};

	const getItemKey: GetItemKeyFunction = (item?: any) =>
		item ? (itemKey ? item[itemKey] || null : items.indexOf(item).toString()) : null;

	const getClasses = (element: string) => joinPartClasses(
		'table',
		element, [
			activeTheme,
			theme,
		],
	)	

	const internalColumns: ColumnConfig[] = $derived(columns.map((column) => {
		return {
			...column,
			sortKey: column.sortKey || column.key,
			id: column.id || column.key,
		};
	}));

	const focusableColumns = $derived(internalColumns.filter((column) => column.canFocus));

	const prevTab = (event: DataCellEvent) => {
		const { item, column } = event;
		let nextColumn: ColumnConfig | null = null;
		let nextItem: any | null = null;
		if (column === focusableColumns[0]) {
			if (item !== sortedItems[0]) {
				nextColumn = focusableColumns[focusableColumns.length - 1];
				nextItem = sortedItems[sortedItems.indexOf(item) - 1];
			}
		} else {
			nextColumn = focusableColumns[focusableColumns.indexOf(column) - 1];
			nextItem = item;
		}
		focusedColumnKeyID = getColumnID(nextColumn);
		focusedItemKey = getItemKey(nextItem);
		onprevtab?.(event);
	};

	const nextTab = (event: DataCellEvent) => {
		const { item, column } = event;
		let nextColumn: ColumnConfig | null = null;
		let nextItem: any | null = null;
		if (column === focusableColumns.at(-1)) {
			if (item !== sortedItems.at(-1)) {
				nextColumn = focusableColumns[0];
				nextItem = sortedItems[sortedItems.indexOf(item) + 1];
			}
		} else {
			nextColumn = focusableColumns[focusableColumns.indexOf(column) + 1];
			nextItem = item;
		}
		focusedColumnKeyID = getColumnID(nextColumn);
		focusedItemKey = getItemKey(nextItem);
		onnexttab?.(event);
	};

	const enterPressed = (event: DataCellEvent) => {
		if (enterAction === 'stay') {
			return;
		}
		if (enterAction === 'next') {
			return nextTab(event);
		}
		const { item } = event;
		const itemIndex = sortedItems.indexOf(item);
		if (itemIndex !== sortedItems.length - 1) {
			focusedItemKey = getItemKey(sortedItems[itemIndex + 1]);
		}
		onenterpressed?.(event);
	};

	const cellClicked = (event: DataCellEvent) => {
		const { column, item } = event;
		focusedColumnKeyID = null;
		focusedItemKey = null;
		if (column.canFocus) {
			focusedColumnKeyID = getColumnID(column);
			focusedItemKey = getItemKey(item);
		}
		oncellclick?.({ column, item });
		onrowclick?.({ item });
	};

	const cellDragEnd = (_event: DataCellDragEvent) => {
		context.draggedColumn = undefined;
		context.draggedItem = undefined;
		context.dragType = undefined;
	}

	const cellDragStart = (event: DataCellDragEvent) => {
		context.draggedColumn = event.sourceColumn;
		context.draggedItem = event.sourceItem;
		context.dragType = 'cell';
		oncelldragstart?.(event);
	}

	const headerClicked = (column: ColumnConfig) => {
		if (column.id && column.canSort) {
			if (sortColumnID === column.id) {
				reverseSort = !reverseSort;
			} else {
				reverseSort = false;
				sortColumnID = column.id;
				sortKey = column.sortKey || '';
				sortFunction = column.sortFunction;
			}

			onheaderclick?.({ column, sortColumnID, sortKey, sortFunction, reverseSort });
		} else {
			onheaderclick?.({ column });
		}		
	};

	const rowDragEnd = (_event: RowDragEvent) => {
		context.dragType = undefined;
		context.draggedItem = undefined;
	}

	const rowDragStart = (event: RowDragEvent) => {
		context.draggedColumn = undefined;
		context.draggedItem = event.sourceItem;
		context.dragType = 'row';
		onrowdragstart?.(event);
	}

	let tableClass = $derived(getClasses('table'));
	let theadClass = $derived(getClasses('thead'));
	let theadTRClass = $derived(getClasses('theadTR'));
	let tbodyClass = $derived(getClasses('tbody'));
</script>

<table class={tableClass}>
	<thead class={theadClass}>
		<tr class={theadTRClass}>
			{#each internalColumns as column}
				<DataTableHeaderCell
					{column}
					isSorted={!!sortColumnID && getColumnID(column) === sortColumnID}
					{reverseSort}
					onclick={() => headerClicked(column)}
				/>
			{/each}
		</tr>
	</thead>
	<tbody class={tbodyClass}>
		{#each sortedItems as item}
			{@const isRowFocused = !!focusedItemKey && focusedItemKey === getItemKey(item)}
			<DataTableRow
				{allowRowDrag}
				{allowRowDrop}
				columns={internalColumns}
				{focusedColumnKeyID}
				{isRowFocused}
				{item}
				{onaction}
				{onbutton}
				{oncellchanged}
				oncellclick={cellClicked}
				oncelldragend={cellDragEnd}
				oncelldragstart={cellDragStart}
				{oncelldropped}
				onenterpressed={enterPressed}
				onnexttab={nextTab}
				onprevtab={prevTab}
				{onrowclick}
				ondragend={rowDragEnd}
				ondragstart={rowDragStart}
				ondropped={onrowdropped}
				{trClassGetter}
			/>
		{/each}
	</tbody>
</table>
