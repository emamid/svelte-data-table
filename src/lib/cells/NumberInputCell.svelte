<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import { NumberInput } from 'flowbite-svelte';
	import type { ColumnConfig } from '../common.js';
	import TabWrapper from './TabWrapper.svelte';

	export let item: any;
	export let column: ColumnConfig;
	export let value: number;

	let internalValue: number;

	$: internalValue = value;

	const dispatch = createEventDispatcher();

	const dispatchCellChanged = () => {
		if (value !== internalValue) {
			dispatch('cellChanged', {
				column,
				item,
				oldValue: value,
				newValue: internalValue,
			});
		}
	};

	const keypress = async (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			dispatch('enterPressed', {
				column,
				item,
			});
			dispatchCellChanged();
		}
	};

	const prevTab = (_event: any) => {
		dispatch('prevTab', {
			column,
			item,
		});
		dispatchCellChanged();
	};

	const nextTab = (_event: any) => {
		dispatch('nextTab', {
			column,
			item,
		});
		dispatchCellChanged();
	};
</script>

<TabWrapper on:prevTab={prevTab} on:nextTab={nextTab}>
	<NumberInput bind:value={internalValue} {...$$props} on:keypress={keypress} autofocus />
</TabWrapper>
