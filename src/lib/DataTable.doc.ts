/**
 * The DataTable component
 * @typedef {object} DataTable
 * @property {ColumnConfig[]} columns
 * @property {any[]} items
 * @property {string} [sortKey]
 * @property {SortFunction} [sortFunction]
 * @property {boolean} [reverseSort]
 * @property {string} [sortColumnID]
 * @property {string} [itemKey]
 * @property {EnterAction} [enterAction]
 * @property {string} [divClassAppend]
 * @property {string} [divClassOverride]
 * @property {string} [tableClassAppend]
 * @property {string} [tableClassOverride]
 * @property {string} [theadClassAppend]
 * @property {string} [theadClassOverride]
 * @property {string} [thClassAppend]
 * @property {string} [thClassOverride]
 * @property {string} [tableBodyClassAppend]
 * @property {string} [tableBodyClassOverride]
 * @property {string} [tdClassAppend]
 * @property {string} [tdClassOverride]
 * @property {string} [tdFocusedClassAppend]
 * @property {string} [tdFocusedClassOverride]
 * @property {string} [trClassAppend]
 * @property {string} [trClassOverride]
 * @property {RowClassFunction} [trClassGetter]
 * @fires action
 * @fires cellChanged
 * @fires cellClicked
 * @fires headerClicked
 * @fires rowClicked
 */

/**
 * @event cellClicked
 * @type {object}
 * @property {any} detail.item
 * @property {ColumnConfig} detail.column
 */

/**
 * @event headerClicked
 * @type {object}
 * @property {ColumnConfig} detail.column
 * @property {string} detail.sortColumnID
 * @property {string} detail.sortKey
 * @property {SortFunction} detail.sortFunction
 * @property {boolean} detail.reverseSort
 */

/**
 * @event rowClicked
 * @type {object}
 * @property {any} detail.item
 */

/**
 * @event action
 * @type {object}
 * @property {string} detail.action
 * @property {any} detail.item
 * @property {ColumnConfig} detail.column
 */

/**
 * @event cellChanged
 * @type {object}
 * @property {any} detail.item
 * @property {ColumnConfig} detail.column
 * @property {any} detail.oldValue
 * @property {any} detail.newValue
 */
