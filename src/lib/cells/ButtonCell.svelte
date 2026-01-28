<script lang="ts">
	import {
		getDataTableContext,
		joinInputClasses,
	} from '../common.js';
	import type {
		ColumnConfig,
		DataCellEvent,
		IconProp,
	} from '../common.js';
	import { activeTheme } from '../themes/active.js';

	import DataTableIcon from '../DataTableIcon.svelte';

	interface Props {
		caption?: string;
		column: ColumnConfig;
		item: any;
		icon?: IconProp;
		iconPosition?: 'left' | 'right';
		onbutton?: (event: DataCellEvent) => void;
	}

	let {
		caption = '',
		column,
		item,
		icon,
		iconPosition = 'right',
		onbutton,
	}: Props = $props();

	const tableTheme = getDataTableContext()?.theme || {};

	const getClass = (element: string) => joinInputClasses(
		'button',
		element, [
			activeTheme,
			tableTheme,
			column.theme,
		],
	)

	const buttonClass = $derived(getClass('button'));
	const iconClass = $derived(getClass('icon'));

</script>

<button
	class={buttonClass}
	onclick={() => onbutton?.({ column, item })}
>
	{#if icon && iconPosition === 'left'}
		<DataTableIcon classes={iconClass} {icon}/>
	{/if}
	{#if caption}{caption}{/if}
	{#if icon && iconPosition === 'right'}
		<DataTableIcon classes={iconClass} {icon}/>
	{/if}
</button>
