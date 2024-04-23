/**
 * The DataTable component based on {@link https://flowbite-svelte.com/docs/components/table}
 * @typedef {object} DataTable
 * @property {ColumnConfig[]} columns - Configuration for each column to be displayed in the table.
 * @property {any[]} items - Data for the rows in the table.
 * @property {RowBoolean} [allowRowDrag] -
 * @property {RowDropBoolean} [allowRowDrop] - 
 * @property {string} [sortKey] - Data property to sort by.
 * @property {SortFunction} [sortFunction] - Function for more complex-sorting.
 * @property {boolean} [reverseSort] - True when sorting is reversed.
 * @property {string} [sortColumnID] - The id (or key) property of the column being sorted by.
 * @property {ConstructorOfATypedSvelteComponent} [sortAscendingIcon] - Svelte component class to be displayed in columns that are sorting ascended. Defaults to AngleDownSolid from {@link https://flowbite.com/icons/}
 * @property {ConstructorOfATypedSvelteComponent} [sortDescendingIcon] - Svelte component class to be displayed in columns that are sorting descended. Defaults to AngleUpSolid from {@link https://flowbite.com/icons/}
 * @property {string} [itemKey] - Property to use when distinguish between rows. If not populated, the array index is used.
 * @property {EnterAction} [enterAction] - Determines what pressing the enter key in a focused cell does. Can be 'next', 'down', or 'stay'. Default is 'next'. If 'next', enter will act the same as tab. If 'down', focus will move down to the row below the current one. If 'stay', the enter key will not cause movement.
 * @property {string} [divClassAppend] - Classes to be appended to Table.divClass .
 * @property {string} [divClassOverride] - Classes to replace Table.divClass with.
 * @property {string} [tableClassAppend] - Classes to be appended to Table.class .
 * @property {string} [tableClassOverride] - Classes to replace Table.class with.
 * @property {string} [theadClassAppend] - Classes to be appended to TableHead.theadClass .
 * @property {string} [theadClassOverride] - Classes to replace TableHead.theadClass with.
 * @property {string} [thClassAppend] - Classes to be appended to TableHeadCell.class .
 * @property {string} [thClassOverride] - Classes to replace TableHeadCell.class with.
 * @property {string} [tableBodyClassAppend] - Classes to be appended to TableBody.tableBodyClass .
 * @property {string} [tableBodyClassOverride] - Classes to replace TableBody.tableBodyClass with.
 * @property {string} [tdClassAppend] - Classes to be appended to TableBodyCell.tdClass . Column configs can further modify this.
 * @property {string} [tdClassOverride] - Classes to replace TableBodyCell.tdClass with. Column configs can further modify this.
 * @property {string} [tdFocusedClassAppend] - Classes to be appended to TableBodyCell.tdClass when a cell is focused. Column configs can further modify this.
 * @property {string} [tdFocusedClassOverride] - Classes to replace TableBodyCell.tdClass with with a cell is focused. Column configs can further modify this.
 * @property {string} [trClassAppend] - Classes to be appended to TableBodyRow.class . trClassGetter can further modify this.
 * @property {string} [trClassOverride] - Classes to replace TableBodyRow.class with. trClassGetter can further modify this.
 * @property {RowClassFunction} [trClassGetter] - Calculates the CSS classes for a TableBodyRow .
 * @property {boolean} [striped] - Passes through to on {@link https://flowbite-svelte.com/docs/components/table}
 * @property {boolean} [hoverable] - Passes through to on {@link https://flowbite-svelte.com/docs/components/table}
 * @property {boolean} [noborder] - Passes through to on {@link https://flowbite-svelte.com/docs/components/table}
 * @property {boolean} [shadow] - Passes through to on {@link https://flowbite-svelte.com/docs/components/table}
 * @property {string} [color] - Passes through to on {@link https://flowbite-svelte.com/docs/components/table}
 * @property {string} [customColor] - Passes through to on {@link https://flowbite-svelte.com/docs/components/table}

 * @fires action
 * @fires cellChanged
 * @fires cellClicked
 * @fires headerClicked
 * @fires rowClicked
 */

import type { RowBoolean, RowDropBoolean } from './common';

/**
 * @event cellClicked
 * @type {object}
 * @property {any} detail.item - Data for the cell's row.
 * @property {ColumnConfig} detail.column - Configuration for the cell's column.
 */

/**
 * @event headerClicked
 * @type {object}
 * @property {ColumnConfig} detail.column - Configuration for the header's column.
 * @property {string} detail.sortColumnID - The current sortColumnID.
 * @property {string} detail.sortKey - The current sortKey.
 * @property {SortFunction} detail.sortFunction The current sortFunction.
 * @property {boolean} detail.reverseSort - True if the grid is currently sorting in reverse.
 */

/**
 * @event rowClicked
 * @type {object}
 * @property {any} detail.item - Data for the row.
 */

/**
 * @event action
 * @type {object}
 * @property {string} detail.action - The name property of the action whose button was clicked.
 * @property {any} detail.item - Data for the action cell's row.
 * @property {ColumnConfig} detail.column - Configuration for the action cell's column.
 */

/**
 * @event cellChanged
 * @type {object}
 * @property {any} detail.item - Data for the cell's row, prior to the change.
 * @property {ColumnConfig} detail.column - Configuration for the cell's column.
 * @property {any} detail.oldValue - The data value of the cell before the change.
 * @property {any} detail.newValue - The new value that needs to be applied to the cell.
 */
