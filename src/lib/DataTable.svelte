<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import { Table, TableBody, TableHead } from 'flowbite-svelte';
	import { AngleDownSolid, AngleUpSolid } from 'flowbite-svelte-icons';

	import DataTableHeaderCell from './DataTableHeaderCell.svelte';
	import DataTableRow from './DataTableRow.svelte';

	import type {
		ColumnConfig,
		EnterAction,		
		GetItemKeyFunction,
		GetTDClassFunction,
		GetTRClassFunction,
		InternalColumnConfig,
		RowBoolean,
		RowClassFunction,
		RowDropBoolean,
		SortFunction,
	} from './common.js';

	import {
		getColumnID,
		joinClasses,
		setDataTableContext,
	} from './common.js';

	export let allowRowDrag: RowBoolean = false;
	export let allowRowDrop: RowDropBoolean = !!allowRowDrag;
	export let columns: ColumnConfig[] = [];
	export let items: any[] = [];

	export let sortKey: string = '';
	export let sortFunction: SortFunction | undefined | null = null;
	export let reverseSort: boolean = false;
	export let sortColumnID: string | null = null;
	export let sortAscendingIcon: ConstructorOfATypedSvelteComponent = AngleDownSolid;
	export let sortDescendingIcon: ConstructorOfATypedSvelteComponent = AngleUpSolid;
	export let itemKey: string | null = null;

	export let enterAction: EnterAction = 'next';

	export let divClassAppend: string = '';
	export let divClassOverride: string = '';
	const divClassDefault = 'relative overflow-x-auto overflow-y-auto';

	export let tableClassAppend: string = '';
	export let tableClassOverride: string = '';
	const tableClassDefault = '';

	export let theadClassAppend: string = '';
	export let theadClassOverride: string = '';
	const theadClassDefault = 'text-xs uppercase sticky top-0 z-10';

	export let thClassAppend: string = '';
	export let thClassOverride: string = '';
	const thClassDefault = '';

	export let tableBodyClassAppend: string = '';
	export let tableBodyClassOverride: string = '';
	const tableBodyClassDefault = '';

	export let tdClassAppend: string = '';
	export let tdClassOverride: string = '';
	const tdClassDefault: string = 'px-6 py-4 whitespace-nowrap font-medium';

	export let tdFocusedClassAppend: string = '';
	export let tdFocusedClassOverride: string = '';
	const tdFocusedClassDefault: string = 'px-6 py-4 whitespace-nowrap font-medium';

	export let trClassAppend: string = '';
	export let trClassOverride: string = '';
	const trClassDefault: string = '';
	export let trClassGetter: RowClassFunction | null = null;

	export let striped: boolean = false;
	export let hoverable:	boolean	= false
	export let noborder: boolean = false;
	export let shadow: boolean = false;
	export let color: string | undefined = 'default';
	export let customColor: string = '';

	let sortedItems: any[] = [];

	let focusedColumnKeyID: any = null;
	let focusedItemKey: any = null;

	setDataTableContext({});

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

	$: {
		sortedItems = sortFunction
			? items.toSorted(sortFunction)
			: sortKey
				? items.toSorted(sortBySortKey)
				: [...items];
		if (reverseSort) {
			sortedItems.reverse();
		}
	}

	const dispatch = createEventDispatcher();

	const getItemKey: GetItemKeyFunction = (item?: any) =>
		item ? (itemKey ? item[itemKey] || null : items.indexOf(item).toString()) : null;

	const divClass = joinClasses(divClassOverride || divClassDefault, divClassAppend);
	const tableClass = joinClasses(tableClassOverride || tableClassDefault, tableClassAppend);
	const theadClass = joinClasses(theadClassOverride || theadClassDefault, theadClassAppend);
	const thClass = joinClasses(thClassOverride || thClassDefault, thClassAppend);
	const tableBodyClass = joinClasses(
		tableBodyClassOverride || tableBodyClassDefault,
		tableBodyClassAppend,
	);
	const trClass = joinClasses(trClassOverride || trClassDefault, trClassAppend);
	const tdClass = joinClasses(tdClassOverride || tdClassDefault, tdClassAppend);
	const tdFocusedClass = joinClasses(
		tdFocusedClassOverride || tdFocusedClassDefault,
		tdFocusedClassAppend,
	);

	const getTRClass: GetTRClassFunction = (item: any, isRowFocused: boolean) =>
		trClassGetter
			? trClassGetter(item, isRowFocused, trClass, trClassDefault, trClassAppend, trClassOverride)
			: trClass;

	const internalColumns: InternalColumnConfig[] = columns.map((column) => {
		const columnTDClass = joinClasses(column.tdClassOverride || tdClass, column.tdClassAppend);
		const columnFocusedTDClass = joinClasses(
			column.tdFocusedClassOverride || tdFocusedClass,
			column.tdFocusedClassAppend,
		);
		let getTDClass: GetTDClassFunction;
		const tdClassGetter = column.tdClassGetter;
		if (tdClassGetter) {
			getTDClass = (item: any, value: any, isFocused: boolean) =>
				tdClassGetter(
					item,
					column,
					value,
					isFocused,
					columnTDClass,
					tdClassDefault,
					tdClassAppend,
					tdClassOverride,
				);
		} else {
			getTDClass = (_item: any, _value: any, isFocused: boolean) =>
				isFocused ? columnFocusedTDClass : columnTDClass;
		}
		return {
			...column,
			sortKey: column.sortKey || column.key,
			id: column.id || column.key,
			getTDClass,
		};
	});

	const focusableColumns = internalColumns.filter((column) => column.canFocus);

	const prevTab = (event: CustomEvent) => {
		const { item, column } = event.detail;
		let nextColumn: InternalColumnConfig | null = null;
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
	};

	const nextTab = (event: CustomEvent) => {
		const { item, column } = event.detail;
		let nextColumn: InternalColumnConfig | null = null;
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
	};

	const enterPressed = (event: CustomEvent) => {
		if (enterAction === 'stay') {
			return;
		}
		if (enterAction === 'next') {
			return nextTab(event);
		}
		const { item } = event.detail;
		const itemIndex = sortedItems.indexOf(item);
		if (itemIndex !== sortedItems.length - 1) {
			focusedItemKey = getItemKey(sortedItems[itemIndex + 1]);
		}
	};

	const cellClicked = (event: CustomEvent) => {
		const { column, item } = event.detail;
		focusedColumnKeyID = null;
		focusedItemKey = null;
		if (column.canFocus) {
			focusedColumnKeyID = getColumnID(column);
			focusedItemKey = getItemKey(item);
		}
		dispatch('cellClicked', {
			item,
			column,
		});
		dispatch('rowClicked', {
			item,
		});
	};

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
		}
		dispatch('headerClicked', {
			column,
			sortColumnID,
			sortKey,
			sortFunction,
			reverseSort,
		});
	};
</script>

<Table class={tableClass} {divClass} {striped} {hoverable} {noborder} {shadow} {color} {customColor}>
	<TableHead defaultRow={false} class={theadClass}>
		{#each internalColumns as column}
			<DataTableHeaderCell
				{column}
				isSorted={!!sortColumnID && getColumnID(column) === sortColumnID}
				{reverseSort}
				defaultSortAscendingIcon={sortAscendingIcon}
				defaultSortDescendingIcon={sortDescendingIcon}
				{thClass}
				on:click={() => headerClicked(column)}
			/>
		{/each}
	</TableHead>
	<TableBody {tableBodyClass}>
		{#each sortedItems as item}
			{@const isRowFocused = !!focusedItemKey && focusedItemKey === getItemKey(item)}
			<DataTableRow
				{allowRowDrag}
				{allowRowDrop}
				columns={internalColumns}
				{focusedColumnKeyID}
				{getTRClass}
				{isRowFocused}
				{item}
				on:action
				on:cellChanged
				on:cellClicked={cellClicked}
				on:cellDragStart
				on:cellDropped
				on:enterPressed={enterPressed}
				on:nextTab={nextTab}
				on:prevTab={prevTab}
				on:rowClicked
				on:rowDragStart
				on:rowDropped
			/>
		{/each}
	</TableBody>
</Table>
