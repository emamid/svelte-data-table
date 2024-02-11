<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import { Button } from 'flowbite-svelte';

	import type { ColumnConfig } from '../common.js';

	export let caption: string = '';
	export let column: ColumnConfig;
	export let item: any;
	export let icon: ConstructorOfATypedSvelteComponent | null = null;
	export let iconClass: string = '';
	export let iconPosition: 'left' | 'right' = 'right';

	const dispatch = createEventDispatcher();

	const buttonClicked = () => {
		dispatch('click', {
			column,
			item,
		});
	};
</script>

<Button {...$$props} on:click={buttonClicked}>
{#if icon && iconPosition === 'left'}
<svelte:component this={icon} class={iconClass} />
{/if}
{#if caption}{caption}{/if}
{#if icon && iconPosition === 'right'}
<svelte:component this={icon} class={iconClass} />
{/if}
</Button>
