<script lang="ts">
	import {
		getDataTableContext,
		joinInputClasses,
	} from '../common.js';
	import type {
		Action,
		ActionEvent,
		ColumnConfig,
	} from '../common.ts';
	import { activeTheme } from '../themes/active.js';

	import DataTableIcon from '../DataTableIcon.svelte';

	interface Props {
		actions?: Action[];
		column: ColumnConfig;
		item: any;
		onaction?: (event: ActionEvent) => void;
	}

	let {
		actions = [],
		column,
		item,
		onaction,
	}: Props = $props();

	const tableTheme = getDataTableContext()?.theme || {};

	const actionClicked = (action: Action) => {
		onaction?.({
			action,
			column,
			item,
		});
	};

	const getClass = (element: string, action: Action) => joinInputClasses(
		'action',
		element, [
			activeTheme,
			tableTheme,
			column.theme,
			{
				inputs: {
					action: action?.theme,
				}
			}
		],
	)
</script>

{#each actions as action}
	<button
		class={getClass('button', action)}
		disabled={action.isDisabled?.(item, column, action)}
		onclick={() => actionClicked(action)}
		title={action.tooltip}
	>
		{#if action.icon}
			<DataTableIcon classes={getClass('icon', action)} icon={action.icon}/>
		{/if}
		{#if action.caption}{action.caption}{/if}
	</button>
{/each}
