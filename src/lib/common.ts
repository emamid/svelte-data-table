export interface ColumnConfig {
	id?: string;
	key?: string;
	title?: string;
	cellRenderer?: CellRenderer;
	viewComponent?: ConstructorOfATypedSvelteComponent;
	viewComponentConfig?: any;
	focusComponent?: ConstructorOfATypedSvelteComponent;
	focusComponentConfig?: any;
	tdClassAppend?: string;
	tdClassOverride?: string;
	tdFocusedClassAppend?: string;
	tdFocusedClassOverride?: string;
	tdClassGetter?: DataCellClassFunction;
	thClassAppend?: string;
	thClassOverride?: string;
	canFocus?: boolean;
	canSort?: boolean;
	sortFunction?: SortFunction;
	sortKey?: string;
}

export type CellRenderer = (columnConfig: ColumnConfig, item: any) => Promise<any>;

export type SortFunction = (a: any, b: any) => number;

export type RowClassFunction = (
	item: any,
	isFocused: boolean,
	calcClass: string,
	defaultClass: string,
	appendClass: string,
	overrideClass: string,
) => string;

export type DataCellClassFunction = (
	item: any,
	column: ColumnConfig,
	value: any,
	isFocused: boolean,
	calcClass: string,
	defaultClass: string,
	appendClass: string,
	overrideClass: string,
) => string;

export const joinClasses = (...classes: (string | false | null | undefined)[]): string =>
	(classes || []).filter((value) => !!value).join(' ');

export type GetTDClassFunction = (item: any, value: any, isFocused: boolean) => string;

export interface InternalColumnConfig extends ColumnConfig {
	getTDClass: GetTDClassFunction;
}

export const blankCellValues = {
	dataValue: null,
	displayValue: '',
};

export const defaultCellRenderer: CellRenderer = async (column, item) =>
	column.key
		? { dataValue: item[column.key], displayValue: item[column.key] || '' }
		: blankCellValues;

export type EnterAction = 'next' | 'down' | 'stay';
