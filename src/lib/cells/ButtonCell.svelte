<script lang="ts">
	import { createEventDispatcher } from 'svelte';	

	import { Button } from 'flowbite-svelte';	

	import type { ColumnConfig } from '../common.ts';

	export let caption: string = '';
	export let column: ColumnConfig;
	export let item: any;

	const dispatch = createEventDispatcher();

	const buttonClicked = () => {
		dispatch('click', {
			column,
			item,
		})
	}
</script>

<Button {...$$props} on:click={buttonClicked}>{#if caption}{caption}{/if}</Button>
