<script lang="ts">
	import {
		getDataTableContext,
		joinInputClasses,
	} from '../common.js';
	import type { ColumnConfig, DataCellChangedEvent, DataCellEvent } from '../common.ts';
	import { activeTheme } from '../themes/active.js';

	import TabWrapper from './TabWrapper.svelte';

	interface Props {
		column: ColumnConfig;
		item: any;
		oncellchanged?: (event: DataCellChangedEvent) => void;		
		onenterpressed?: (event: DataCellEvent) => void;
		onnexttab?: (event: DataCellEvent) => void;
		onprevtab?: (event: DataCellEvent) => void;
		value: number;
		[key: string]: any;
	}

	let {
		column,
		item,
		oncellchanged,
		onenterpressed,
		onnexttab,
		onprevtab,
		value,
		...inputProps
	}: Props = $props();

	let internalValue: number = $derived(value);
	const tableTheme = getDataTableContext()?.theme || {};
	
	const dispatchCellChanged = () => {
		if (value !== internalValue) {
			oncellchanged?.({
				column,
				item,
				oldValue: value,
				newValue: internalValue,
			});
		}
	};

	const keypress = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			onenterpressed?.({
				column,
				item,
			});
			dispatchCellChanged();
		}
	};

	const prevTab = (_event: any) => {
		onprevtab?.({
			column,
			item,
		});
		dispatchCellChanged();
	};

	const nextTab = (_event: any) => {
		onnexttab?.({
			column,
			item,
		});
		dispatchCellChanged();
	};

	const inputClass = $derived(joinInputClasses(
		'numberInput',
		'input', [
			activeTheme,
			tableTheme,
			column.theme,
		],
	));
</script>

<TabWrapper column={column} item={item} onprevtab={prevTab} onnexttab={nextTab}>
	<!-- svelte-ignore a11y_autofocus -->
	<input
		autofocus
		class={inputClass}
		onkeypress={keypress}
		type="number"
		bind:value={internalValue}
		{...inputProps}
	/>
</TabWrapper>
