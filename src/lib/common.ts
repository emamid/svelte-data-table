import { getContext } from 'svelte';
import type { Component } from 'svelte';

import { get } from 'lodash';

export type IconifyProps = {
	color?: string;
	flip?: string;
	height?: string | number;
	hFlip?: boolean;
	icon: string;
	inline?: boolean;
	rotate?: number;
	vFlip?: boolean;
	width?: string | number;
}	

export type IconProp = Component<any, any, any> | string | IconifyProps;

/**
 * Values for a given column/row
 * @typedef {object} CellValue
 * @property {any} dataValue The data value for the cell.
 * @property {any} [displayValue] The value to be displayed for the cell. If this is not set, value will be used instead.
 */
export interface CellValue {
	dataValue: any;
	displayValue?: any;
}

/**
 * Return result of a cell renderer
 * @typedef {object} CellValue
 * @property {any} dataValue The data value for the cell.
 * @property {any} [displayValue] The value to be displayed for the cell. If this is not set, value will be used instead.
 * @property {ComponentProps} [focusComponentConfig]
 * @property {string} [tdClass]
 * @property {ComponentProps} [viewComponentConfig]
 */
export interface CellRendererResult extends CellValue {
	focusComponentConfig?: Record<string, any>;
	tdClass?: string;
	viewComponentConfig?: Record<string, any>;
}

/**
 * Returns the value for a given column/row combination.
 * @callback CellRenderer
 * @returns {CellRendererResult}
 */
export type CellRenderer = (
	/** Configuration for the cell's column. */
	column: ColumnConfig,
	/** Data for the cell's row. */
	item: any,
	isFocused: boolean,
	baseClass: string,
) => Promise<CellRendererResult>;

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
	/** Default classes for a TableBodyCell component as defined by FlowBite. */
	baseClass: string,
) => string;

export interface DataCellDragEvent extends DragEvent {
	sourceColumn: ColumnConfig;
	sourceItem: any;
}

export interface DataCellDropEvent extends DragEvent {
	sourceColumn: ColumnConfig;
	sourceItem: any;
	targetColumn: ColumnConfig;
	targetItem: any;
}

export interface DataCellEvent {
	column: ColumnConfig;
	item: any;
}

export interface DataCellChangedEvent extends DataCellEvent {
	oldValue: any;
	newValue: any;
}

export interface DataCellMouseEvent extends MouseEvent {
	column: ColumnConfig;
	item: any;
}

export type ActionDisablementFunction =	(item: any, column: ColumnConfig, action: Action) => boolean;

export interface Action {
	buttonClass?: string;
	caption?: string;
	name: string;
	icon?: IconProp;
	iconClass?: string;
	iconify?: IconifyProps;	
	isDisabled?: ActionDisablementFunction;
	theme?: ActionTheme;
	tooltip?: string;
}

export interface ActionEvent extends DataCellEvent {
	action: Action;
}

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

// Theme
type ThemeValue = {
	append?: string;
	override?: string;
}

type DataCell = {
	td?: ThemeValue;
	tdFocused?: ThemeValue;
}

type HeaderCell = {
	sortAscending?: IconProp;
	sortDescending?: IconProp;
	span?: ThemeValue;
	th?: ThemeValue;
	titleSpan?: ThemeValue;
}

type Row = {
	tr?: ThemeValue;
	trFocused?: ThemeValue;
}

type Table = {
	table?: ThemeValue;
	tbody?: ThemeValue;
	thead?: ThemeValue;
	theadTR?: ThemeValue;
}

interface ColumnParts {
	dataCell?: DataCell;
	headerCell?: HeaderCell;
}

interface TableParts extends ColumnParts {
	row?: Row;
	table?: Table;
}

export type ActionTheme = {
	button?: ThemeValue;
	icon?: ThemeValue;
}

type Button = {
	button?: ThemeValue;
	icon?: ThemeValue;
}

type Checkbox = {
	input?: ThemeValue;
	label?: ThemeValue;
}

type Input = {
	input?: ThemeValue;
}

type MultiSelect = {
	option?: ThemeValue;
	select?: ThemeValue;
}

type NumberInput = {
	input?: ThemeValue;
}

type Radio = {
	span?: ThemeValue;
	input?: ThemeValue;
}

type Range = {
	input?: ThemeValue;
}

type Select = {
	option?: ThemeValue;
	select?: ThemeValue;
}

type Spinner = {
	div?: ThemeValue;
	minusButton?: ThemeValue;
	minusIcon?: IconProp;
	plusButton?: ThemeValue;
	plusIcon?: IconProp;
}

type Inputs = {
	action?: ActionTheme;
	button?: Button;
	checkbox?: Checkbox;
	input?: Input;
	multiSelect?: MultiSelect;
	numberInput?: NumberInput;
	radio?: Radio;
	range?: Range;
	select?: Select;
	spinner?: Spinner;
}

export type DataTableColumnTheme = {
	inputs?: Inputs;
	parts?: ColumnParts;
}

export type DataTableTheme = {
	inputs?: Inputs;
	parts?: TableParts;
}

type Theme = DataTableColumnTheme & DataTableTheme;

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
 * @property {DataCellClassFunction} [tdClassGetter] - Dynamically determines CSS classes for a cell.
 * @property {boolean} [canFocus] - True if cells in this column can be focused.
 * @property {boolean} [canSort] - If true, clicking the column's header will set sorting to sortFunction or sortKey, or reverse it if already set.
 * @property {SortFunction} [sortFunction] - Comparison function for complex sorting.
 * @property {string} [sortKey] - Item property to sort by, if sortFunction is not defined.
  */
export interface ColumnConfig {
	allowCellDrag?: RowBoolean;
	allowCellDrop?: CellDropBoolean;
	canFocus?: boolean;
	canSort?: boolean;
	cellRenderer?: CellRenderer;
	focusComponent?: Component<any, any, any>;
	focusComponentConfig?: Record<string, any>;
	id?: string;
	key?: string;
	sortFunction?: SortFunction;
	sortKey?: string;
	// tdClassGetter?: DataCellClassFunction;
	theme?: DataTableColumnTheme;
	title?: string;
	viewComponent?: Component<any, any, any>;
	viewComponentConfig?: Record<string, any>;
}

interface ColumnEvent {
	column: ColumnConfig;
}

export interface HeaderEvent extends ColumnEvent {
	reverseSort?: boolean;
	sortColumnID?: string;
	sortFunction?: SortFunction;
	sortKey?: string;
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
	/** Classes as determined by grid properties. */
	baseClass: string,
) => string;

export interface RowDragEvent extends DragEvent {
	sourceItem: any;
}

export interface RowDropEvent extends DragEvent {
	sourceItem: any;
	targetItem: any;
}

export type RowEvent = {
	item: any;
}

const joinThemeClasses = (path: string, themes: (Theme | undefined)[], isFocused?: boolean): string => {
	const result = (themes || []).reduce((classValue: string, theme: Theme | undefined) => {
		const themeValue = get(theme, path) as ThemeValue;
		const focusedValue = isFocused ? get(theme, `${path}Focused`) as unknown as ThemeValue : null;
		return (focusedValue?.override || themeValue?.override || classValue) + ' ' + (themeValue?.append || '') + ' ' + (focusedValue?.append || '');
	}, '');
	return result?.trim();
}

export const joinInputClasses = (input: string, element: string, themes: (Theme | undefined)[], isFocused?: boolean): string => {
	return joinThemeClasses(`inputs.${input}.${element}`, themes, isFocused);
}

export const joinPartClasses = (part: string, element: string, themes: (Theme | undefined)[], isFocused?: boolean): string => {
	return joinThemeClasses(`parts.${part}.${element}`, themes, isFocused);
}

const getThemeIcon = (path: string, themes: (Theme | undefined)[]): IconProp => {
	const result = (themes || []).reduce((currentValue: IconProp, theme: Theme | undefined) => {
		return (get(theme, path) as IconProp) || currentValue;
	}, '' as IconProp);
	return result;
}

export const getInputIcon = (part: string, propName: string, themes: (Theme | undefined)[]): IconProp => {
	return getThemeIcon(`inputs.${part}.${propName}`, themes);
}

export const getPartIcon = (part: string, propName: string, themes: (Theme | undefined)[]): IconProp => {
	return getThemeIcon(`parts.${part}.${propName}`, themes);
}

/**
 * Values for enterAction on DataTable.
 * @enum {string} EnterAction
 */	
export type EnterAction = 'next' | 'down' | 'stay';

export type GetItemKeyFunction = (item?: any) => any;

export type GetTDClassFunction = (item: any, value: any, isFocused: boolean) => string;

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

export const defaultCellRenderer: CellRenderer = async (column, item, _isFocused, _baseClass) =>
	column.key
		? { dataValue: item[column.key], displayValue: item[column.key] || '' }
		: blankCellValue;

export const getColumnID = (column?: ColumnConfig | null) => (column ? column.id || null : null);

export type DragType = 'cell' |
	'column' | // Not yet implemented
	'row';

// Context
export interface DataTableContext {
	draggedColumn?: ColumnConfig;
	draggedItem?: any;
	dragType?: DragType;
	items: any[];
	theme?: DataTableTheme;
}

export const dataTableContextName = 'data-grid';

export const getDataTableContext = () => getContext<DataTableContext>(dataTableContextName);
