<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import { Button } from 'flowbite-svelte';
	import { MinusSolid, PlusSolid } from 'flowbite-svelte-icons';

	import type { ColumnConfig } from '../common.js';


	interface Props {
		item: any;
		column: ColumnConfig;
		value: any;
		decValue?: number;
		incValue?: number;
		minValue?: number | undefined;
		maxValue?: number | undefined;
		minusIcon?: ConstructorOfATypedSvelteComponent;
		minusIconClass?: string;
		plusIcon?: ConstructorOfATypedSvelteComponent;
		plusIconClass?: string;
	}

	let {
		item,
		column,
		value,
		decValue = 1,
		incValue = 1,
		minValue = undefined,
		maxValue = undefined,
		minusIcon = MinusSolid,
		minusIconClass = 'pr-1 w-3 h-3',
		plusIcon = PlusSolid,
		plusIconClass = 'pr-1 w-3 h-3'
	}: Props = $props();

	const dispatch = createEventDispatcher();

	const decrement = () => {
		dispatch('cellChanged', {
			column,
			item,
			oldValue: value,
			newValue: (value || 0) - decValue,
		});
	};

	const increment = () => {
		dispatch('cellChanged', {
			column,
			item,
			oldValue: value,
			newValue: (value || 0) + incValue,
		});
	};
</script>

<div class="spinner">
	<Button
		color="none"
		class="pr-1"
		on:click={decrement}
		disabled={minValue !== undefined && value - decValue < minValue}
		>{@const SvelteComponent = minusIcon}
		><SvelteComponent class={minusIconClass} /></Button
	>
	{value || 0}
	<Button
		color="none"
		class="pl-1"
		on:click={increment}
		disabled={maxValue !== undefined && value + incValue > maxValue}
		>{@const SvelteComponent_1 = plusIcon}
		><SvelteComponent_1 class={plusIconClass} /></Button
	>
</div>

<style>
	.spinner {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
</style>
