<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import { Button } from 'flowbite-svelte';
	import { MinusSolid, PlusSolid } from 'flowbite-svelte-icons';

	import type { ColumnConfig } from '../common.ts';

	export let item: any;
	export let column: ColumnConfig;
	export let value: any;
	export let decValue: number = 1;
	export let incValue: number = 1;
	export let minValue: number | undefined = undefined;
	export let maxValue: number | undefined = undefined;

	export let minusIcon: ConstructorOfATypedSvelteComponent = MinusSolid;
	export let minusIconClass: string = 'pr-1 w-3 h-3';
	export let plusIcon: ConstructorOfATypedSvelteComponent = PlusSolid;
	export let plusIconClass: string = 'pr-1 w-3 h-3';

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
		><svelte:component this={minusIcon} class={minusIconClass} /></Button
	>
	{value || 0}
	<Button
		color="none"
		class="pl-1"
		on:click={increment}
		disabled={maxValue !== undefined && value + incValue > maxValue}
		><svelte:component this={plusIcon} class={plusIconClass} /></Button
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
