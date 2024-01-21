import {
	ArrowDownSolid,
	ArrowUpSolid,
	BellActiveOutline,
	BookmarkOutline,
	CogOutline,
	EditOutline,
	HeartSolid,
	InfoCircleOutline,
	ShareNodesOutline,
	TrashBinOutline,
} from 'flowbite-svelte-icons';

import type { Action } from './ActionsCell.svelte';

/**
 * @constant bookmarkAction
 * @type {Action}
 * @property {string} name - bookmark
 * @property {ConstructorOfATypedSvelteComponent} icon - BookmarkOutline
*/
export const bookmarkAction: Action = {
	icon: BookmarkOutline,
	name: 'bookmark',
};

/**
 * @constant deleteAction
 * @type {Action}
 * @property {string} name - delete
 * @property {ConstructorOfATypedSvelteComponent} icon - TrashBinOutline
*/
export const deleteAction: Action = {
	icon: TrashBinOutline,
	name: 'delete',
};

/**
 * @constant downAction
 * @type {Action}
 * @property {string} name - down
 * @property {ConstructorOfATypedSvelteComponent} icon - ArrowDownSolid
*/
export const downAction: Action = {
	icon: ArrowDownSolid,
	name: 'down',
};

/**
 * @constant editAction
 * @type {Action}
 * @property {string} name - edit
 * @property {ConstructorOfATypedSvelteComponent} icon - EditOutline
*/
export const editAction: Action = {
	icon: EditOutline,
	name: 'edit',
};

/**
 * @constant favoriteAction
 * @type {Action}
 * @property {string} name - favorite
 * @property {ConstructorOfATypedSvelteComponent} icon - HeartSolid
*/
export const favoriteAction: Action = {
	icon: HeartSolid,
	name: 'favorite',
};

/**
 * @constant infoAction
 * @type {Action}
 * @property {string} name - info
 * @property {ConstructorOfATypedSvelteComponent} icon - InfoCircleOutline
*/
export const infoAction: Action = {
	icon: InfoCircleOutline,
	name: 'info',
};

/**
 * @constant notificationAction
 * @type {Action}
 * @property {string} name - notification
 * @property {ConstructorOfATypedSvelteComponent} icon - BellActiveOutline
*/
export const notificationAction: Action = {
	icon: BellActiveOutline,
	name: 'notification',
};

/**
 * @constant settingsAction
 * @type {Action}
 * @property {string} name - settings
 * @property {ConstructorOfATypedSvelteComponent} icon - CogOutline
*/
export const settingsAction: Action = {
	icon: CogOutline,
	name: 'settings',
};

/**
 * @constant shareAction
 * @type {Action}
 * @property {string} name - share
 * @property {ConstructorOfATypedSvelteComponent} icon - ShareNodesOutline
*/
export const shareAction: Action = {
	icon: ShareNodesOutline,
	name: 'share',
};

/**
 * @constant upAction
 * @type {Action}
 * @property {string} name - up
 * @property {ConstructorOfATypedSvelteComponent} icon - UpArrowSolid
*/
export const upAction: Action = {
	icon: ArrowUpSolid,
	name: 'up',
};
