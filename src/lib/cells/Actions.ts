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

export const bookmarkAction: Action = {
	icon: BookmarkOutline,
	name: 'bookmark',
}

export const deleteAction: Action = {
	icon: TrashBinOutline,
	name: 'delete',
}

export const downAction: Action = {
	icon: ArrowDownSolid,
	name: 'down',
}

export const editAction: Action = {
	icon: EditOutline,
	name: 'edit',
}

export const favoriteAction: Action = {
	icon: HeartSolid,
	name: 'favorite',
}

export const infoAction: Action = {
	icon: InfoCircleOutline,
	name: 'info',
}

export const notificationAction: Action = {
	icon: BellActiveOutline,
	name: 'notification',
}

export const settingsAction: Action = {
	icon: CogOutline,
	name: 'settings',
}

export const shareAction: Action = {
	icon: ShareNodesOutline,
	name: 'share',
}

export const upAction: Action = {
	icon: ArrowUpSolid,
	name: 'up',
}
