<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import { Toggle } from 'flowbite-svelte';

	import type { ColumnConfig } from '../common.js';

	export let caption: string = '';
	export let column: ColumnConfig;
	export let item: any;
	export let value: any;

	let localValue: any = value;

	const dispatch = createEventDispatcher();

	const toggleChanged = () => {
		dispatch('cellChanged', {
			column,
			item,
			oldValue: value,
			newValue: localValue,
		});
	};
</script>

<Toggle {...$$props} bind:checked={localValue} on:change={toggleChanged}
	>{#if caption}{caption}{/if}</Toggle
>
