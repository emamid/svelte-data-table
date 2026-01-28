<script lang="ts">
	import {
		getDataTableContext,
		getInputIcon,
		joinInputClasses,
	} from '../common.js';
	import type {
		ColumnConfig,
		DataCellChangedEvent,
	} from '../common.ts';
	import { activeTheme } from '../themes/active.js';

	import DataTableIcon from '../DataTableIcon.svelte';

	interface Props {
		column: ColumnConfig;
		decValue?: number;
		incValue?: number;
		item: any;
		maxValue?: number | undefined;
		minValue?: number | undefined;
		oncellchanged?: (event: DataCellChangedEvent) => void;
		value: any;
	}

	let {
		column,
		decValue = 1,
		incValue = 1,
		item,
		maxValue = undefined,
		minValue = undefined,
		oncellchanged,
		value,
	}: Props = $props();

	const tableTheme = getDataTableContext()?.theme || {};

	const decrement = () => {
		oncellchanged?.({
			column,
			item,
			oldValue: value,
			newValue: (value || 0) - decValue,
		});
	};

	const increment = () => {
		oncellchanged?.({
			column,
			item,
			oldValue: value,
			newValue: (value || 0) + incValue,
		});
	};

	const getClass = (element: string) => joinInputClasses(
		'spinner',
		element, [
			activeTheme,
			tableTheme,
			column.theme,
		],
	)

	const getIcon = (propName: string) => getInputIcon(
		'spinner',
		propName, [
			activeTheme,
			tableTheme,
			column.theme,
		],
	)

	let divClass = $derived(getClass('div'));
	let minusButtonClass = $derived(getClass('minusButton'));
	let plusButtonClass = $derived(getClass('plusButton'));

	let minusIcon = $derived(getIcon('minusIcon'));
	let plusIcon =$derived(getIcon('plusIcon'));
</script>

<div class={divClass}>
	<button
		disabled={minValue !== undefined && value - decValue < minValue}
		class={minusButtonClass}
		onclick={decrement}
	>
		<DataTableIcon icon={minusIcon}/>
	</button>
	{value || 0}
	<button
		disabled={maxValue !== undefined && value + incValue > maxValue}
		class={plusButtonClass}
		onclick={increment}
	>
		<DataTableIcon icon={plusIcon}/>
	</button>
</div>

<style>
	.spinner {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
</style>
