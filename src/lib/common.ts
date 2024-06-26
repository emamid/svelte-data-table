import { getContext, setContext } from 'svelte';

/**
 * Values for a given column/row, returned by cellRenderer (or the default renderer).
 * @typedef {object} CellValue
 * @property {any} dataValue The data value for the cell.
 * @property {any} [displayValue] The value to be displayed for the cell. If this is not set, value will be used instead.
 */
export interface CellValue {
	dataValue: any;
	displayValue?: any;
}

/**
 * Returns the value for a given column/row combination.
 * @callback CellRenderer
 * @returns {CellValue}
 */
export type CellRenderer = (
	/** Configuration for the cell's column. */
	column: ColumnConfig,
	/** Data for the cell's row. */
	item: any
) => Promise<CellValue>;

/**
 * Returns the a class string for a data cell.
 * @callback DataCellClassFunction
 * @returns {string}
 */
export type DataCellClassFunction = (
	/** Data for the cell's row. */
	item: any,
	/** Configuration for the cell's column. */
	column: ColumnConfig,
	/** Value for the data cell, after Column.cellRenderer (if any) has been called. */
	value: CellValue,
	/** True if the cell is focused. */
	isFocused: boolean,
	/** Classes as determined by grid and column properties and focus state. */
	calcClass: string,
	/** Default classes for a TableBodyCell component as defined by FlowBite. */
	defaultClass: string,
	/** tdClassAppend from DataTable. */
	appendClass: string,
	/** tdClassOveride from DataTable. */
	overrideClass: string,
) => string;

/**
 * Returns a comparison between two values, used for sorting.
 * @callback SortFunction
 * @returns {number}
 */
export type SortFunction = (
	/** First value to compare. */
	a: any,
	/** Second value to compare. */
	b: any
) => number;

/**
 * Configuration options for a grid column
 * @typedef {object} ColumnConfig
 * @property {string} [id] - Used to distinguish between multiple columns that have the same key.
 * @property {string} [key] - Name of the property in each row item that will be used for this column's value.
 * @property {string} [title] - Text to display in the column's header.
 * @property {RowBoolean} [allowCellDrag] - 
 * @property {CellDropBoolean} [allowCellDrop] - 
 * @property {CellRenderer} [cellRenderer] - Dynamically determines the data value and display value for a cell.
 * @property {ConstructorOfATypedSvelteComponent} [viewComponent] - Svelte component class to be displayed in the cell regardless of focus. If set, focusComponent will be ignored.
 * @property {object} [viewComponentConfig] - Properties to be passed when creating viewComponent.
 * @property {ConstructorOfATypedSvelteComponent} [focusComponent] - Svelte component class to be displayed in the cell when it has focus.
 * @property {object} [focusComponentConfig] - Properties to be passed when creating focusComponent.
 * @property {string} [tdClassAppend] - Classes to append to existing CSS when not focused.
 * @property {string} [tdClassOverride] - Classes to replace existing CSS with when not focused.
 * @property {string} [tdFocusedClassAppend] - Classes to append to existing CSS when focused.
 * @property {string} [tdFocusedClassOverride] - Classes to replace existing CSS with when focused.
 * @property {DataCellClassFunction} [tdClassGetter] - Dynamically determines CSS classes for a cell.
 * @property {string} [thClassAppend] - Classes to append to existing CSS for header cells.
 * @property {string} [thClassOverride] - Class to replace existing CSS for header cells.
 * @property {boolean} [canFocus] - True if cells in this column can be focused.
 * @property {boolean} [canSort] - If true, clicking the column's header will set sorting to sortFunction or sortKey, or reverse it if already set.
 * @property {ConstructorOfATypedSvelteComponent} [sortAscendingIcon] - Svelte component class to be displayed in the column is sorting ascended (overrides table).
 * @property {ConstructorOfATypedSvelteComponent} [sortDescendingIcon] - Svelte component class to be displayed in the column is sorting descended (overrides table).
 * @property {SortFunction} [sortFunction] - Comparison function for complex sorting.
 * @property {string} [sortKey] - Item property to sort by, if sortFunction is not defined.
  */
export interface ColumnConfig {
	allowCellDrag?: RowBoolean;
	allowCellDrop?: CellDropBoolean;
	canFocus?: boolean;
	canSort?: boolean;
	cellRenderer?: CellRenderer;
	focusComponent?: ConstructorOfATypedSvelteComponent;
	focusComponentConfig?: any;
	id?: string;
	key?: string;
	sortAscendingIcon?: ConstructorOfATypedSvelteComponent;
	sortDescendingIcon?: ConstructorOfATypedSvelteComponent;
	sortFunction?: SortFunction;
	sortKey?: string;
	tdClassAppend?: string;
	tdClassOverride?: string;
	tdFocusedClassAppend?: string;
	tdFocusedClassOverride?: string;
	tdClassGetter?: DataCellClassFunction;
	thClassAppend?: string;
	thClassOverride?: string;
	title?: string;
	viewComponent?: ConstructorOfATypedSvelteComponent;
	viewComponentConfig?: any;
}

/**
 * Returns the a class string for a data row.
 * @callback RowClassFunction
 * @returns {string}
 */
export type RowClassFunction = (
	/** Data for the cell's row. */
	item: any,
	/** True if a cell on this row is focused. */
	isFocused: boolean,
	/** Classes as termined by grid properties. */
	calcClass: string,
	/** Default classes for a TableBodyRow component as defined by FlowBite. */
	defaultClass: string,
	/** trClassAppend from DataTable. */
	appendClass: string,
	/** trClassOveride from DataTable. */
	overrideClass: string,
) => string;

/**
 * Joins an array of classes into a string, removing any falsey values.
 * @function joinClasses
 * @param {...string} items - Strings of CSS classes to join.
 * @returns {string}
 */
export const joinClasses = (...classes: (string | false | null | undefined)[]): string =>
	(classes || []).filter((value) => !!value).join(' ');

/**
 * Values for enterAction on DataTable.
 * @enum {string} EnterAction
 */	
export type EnterAction = 'next' | 'down' | 'stay';

export type GetItemKeyFunction = (item?: any) => any;

export type GetTDClassFunction = (item: any, value: any, isFocused: boolean) => string;

export type GetTRClassFunction = (item: any, isRowFocused: boolean) => string;

export interface InternalColumnConfig extends ColumnConfig {
	getTDClass: GetTDClassFunction;
}

type CellDropBooleanFunction = (sourceItem: any, targetItem: any, targetColumn: ColumnConfig) => boolean;

/**
 * @callback CellDropBoolean
 * @returns {boolean}
 */
export type CellDropBoolean = boolean | CellDropBooleanFunction;

type RowBooleanFunction = (item: any) => boolean

/**
 * @callback RowBoolean
 * @returns {boolean}
 */
export type RowBoolean = boolean | RowBooleanFunction;

type RowDropBooleanFunction = (sourceItem: any, targetItem: any) => boolean;

/**
 * @callback RowDropBoolean
 * @returns {boolean}
 */
export type RowDropBoolean = boolean | RowDropBooleanFunction;

export const blankCellValue: CellValue = {
	dataValue: null,
	displayValue: '',
};

export const evalCellDropBoolean = (sourceItem: any, sourceColumn: ColumnConfig | undefined, targetItem: any, cellDropBoolean?: CellDropBoolean) => {
	if (typeof cellDropBoolean === 'boolean') {
		return cellDropBoolean;
	}
	return cellDropBoolean && cellDropBoolean(sourceItem, sourceColumn, targetItem);
}

export const evalRowBoolean = (item: any, rowBoolean?: RowBoolean) => {
	if (typeof rowBoolean === 'boolean') {
		return rowBoolean;
	}
	return rowBoolean && rowBoolean(item);
}

export const evalRowDropBoolean = (sourceItem: any, targetItem: any, rowDropBoolean?: RowDropBoolean) => {
	if (typeof rowDropBoolean == 'boolean') {
		return rowDropBoolean;
	}
	return rowDropBoolean && rowDropBoolean(sourceItem, targetItem);
}

export const defaultCellRenderer: CellRenderer = async (column, item) =>
	column.key
		? { dataValue: item[column.key], displayValue: item[column.key] || '' }
		: blankCellValue;

export const getColumnID = (column?: ColumnConfig | null) => (column ? column.id || null : null);

interface DataTableContext {
	draggedColumn?: InternalColumnConfig;
	draggedItem?: any;
}

const dataTableContextName = 'data-grid';

export const getDataTableContext = () => getContext<DataTableContext>(dataTableContextName);

export const setDataTableContext = (context: DataTableContext) => setContext<DataTableContext>(dataTableContextName, context);
