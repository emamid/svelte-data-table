import type { Action } from '../common.ts';

/**
 * @constant bookmarkAction
 * @type {Action}
 * @property {string} name - bookmark
 * @property {ConstructorOfATypedSvelteComponent} icon - BookmarkOutline
*/
export const bookmarkAction: Action = {
	icon: '🔖',
	name: 'bookmark',
};

/**
 * @constant deleteAction
 * @type {Action}
 * @property {string} name - delete
 * @property {ConstructorOfATypedSvelteComponent} icon - TrashBinOutline
*/
export const deleteAction: Action = {
	icon: '🗑',
	name: 'delete',
};

/**
 * @constant downAction
 * @type {Action}
 * @property {string} name - down
 * @property {ConstructorOfATypedSvelteComponent} icon - ArrowDownSolid
*/
export const downAction: Action = {
	icon: '▼',
	name: 'down',
};

/**
 * @constant editAction
 * @type {Action}
 * @property {string} name - edit
 * @property {ConstructorOfATypedSvelteComponent} icon - EditOutline
*/
export const editAction: Action = {
	icon: '✎',
	name: 'edit',
};

/**
 * @constant favoriteAction
 * @type {Action}
 * @property {string} name - favorite
 * @property {ConstructorOfATypedSvelteComponent} icon - HeartSolid
*/
export const favoriteAction: Action = {
	icon: '♥',
	name: 'favorite',
};

/**
 * @constant infoAction
 * @type {Action}
 * @property {string} name - info
 * @property {ConstructorOfATypedSvelteComponent} icon - InfoCircleOutline
*/
export const infoAction: Action = {
	icon: 'ℹ',
	name: 'info',
};

/**
 * @constant notificationAction
 * @type {Action}
 * @property {string} name - notification
 * @property {ConstructorOfATypedSvelteComponent} icon - BellActiveOutline
*/
export const notificationAction: Action = {
	icon: '🔔',
	name: 'notification',
};

/**
 * @constant settingsAction
 * @type {Action}
 * @property {string} name - settings
 * @property {ConstructorOfATypedSvelteComponent} icon - CogOutline
*/
export const settingsAction: Action = {
	icon: '⚙',
	name: 'settings',
};

/**
 * @constant shareAction
 * @type {Action}
 * @property {string} name - share
 * @property {ConstructorOfATypedSvelteComponent} icon - ShareNodesOutline
*/
export const shareAction: Action = {
	icon: '<',
	name: 'share',
};

/**
 * @constant upAction
 * @type {Action}
 * @property {string} name - up
 * @property {ConstructorOfATypedSvelteComponent} icon - UpArrowSolid
*/
export const upAction: Action = {
	icon: '▲',
	name: 'up',
};
