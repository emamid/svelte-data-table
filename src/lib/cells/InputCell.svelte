<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	// TODO: Find out why this is not importing correctly
	// import type { InputType } from 'flowbite-svelte';

	import { Input } from 'flowbite-svelte';
	import type { ColumnConfig } from '../common.ts';
	import TabWrapper from './TabWrapper.svelte';

	export let inputType: string = 'text';
	export let item: any;
	export let column: ColumnConfig;
	export let value: string;

	let internalValue: string;

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

	const keypress = (event: KeyboardEvent) => {
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
	<Input
		type={inputType}
		bind:value={internalValue}
		{...$$props}
		on:keypress={keypress}
		autofocus
	/>
</TabWrapper>
