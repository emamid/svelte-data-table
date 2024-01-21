/**
 * Returns true if the action should be disabled for the row.
 * @callback ActionDisablementFunction
 * @param {any} item - The row of data
 * @param {ColumnConfig} column - The configuration for the ActionCell's column
 * @param {Action} action - The action to disable or enable
 * @returns {boolean}
 */

/**
 * An action to be displayed inside an ActionCell
 * @interface Action
 * @property {string} [buttonClass] - Class for the button. If not populated, the cell's buttonClass will be used.
 * @property {ButtonColor} [buttonColor] - See {@link https://flowbite-svelte.com/docs/pages/typescript}. If not populated, the cell's buttonColor will be used.
 * @property {string} [caption] - Text displayed with the icon.
 * @property {string} name - Name of the action. Returned as part of the action event on DataGrid when the button is clicked.
 * @property {ConstructorOfATypedSvelteComponent} icon - Icon to be displayed in the button.
 * @property {string} [iconClass] - Class for the icon to be displayed in the button. If not populated, the cell's iconClass will be used.
 * @property {ActionDisablementFunction} [isDisabled] - If populated, will be called to check whether the button should be enabled or disabled for each row.
 */

/**
 * Cell containing an array of Button ({@link https://flowbite-svelte.com/docs/components/buttons}) components which fire the action event on the grid when clicked.
 * @typedef {object} ActionsCell
 * @property [Action[]] actions - The actions to be displayed inside the cell.
 * @property {string} [buttonClass] - Class for the cell's buttons. Defaults to 'border-0 p-1'.
 * @property {ButtonColor} [buttonColor] - See {@link https://flowbite-svelte.com/docs/pages/typescript}. Defaults to 'light'.
 * @property {string} [iconClass] - Class for the icon to be displayed in the button. Defaults to 'w-4 h-4'.
 */
