<script lang="ts" context="module">
	// TODO: Find out why this is not importing correctly
	// import type { ButtonColor } from 'flowbite-svelte';
	import type { ColumnConfig } from '../common.js';

	type ButtonColor =
		| 'red'
		| 'yellow'
		| 'green'
		| 'purple'
		| 'blue'
		| 'light'
		| 'dark'
		| 'primary'
		| 'none'
		| 'alternative'
		| undefined;

	export type ActionDisablementFunction =	(item: any, column: ColumnConfig, action: Action) => boolean;

	export interface Action {
		buttonClass?: string;
		buttonColor?: ButtonColor;
		caption?: string;
		name: string;
		icon: ConstructorOfATypedSvelteComponent;
		iconClass?: string;
		isDisabled?: ActionDisablementFunction;
	}
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import { Button } from 'flowbite-svelte';

	export let buttonClass: string = 'border-0 p-1';
	export let buttonColor: ButtonColor = 'light';
	export let iconClass: string = 'w-4 h-4';

	export let column: ColumnConfig;
	export let item: any;
	export let actions: Action[] = [];

	const dispatch = createEventDispatcher();

	const actionClicked = (action: Action) => {
		dispatch('action', {
			action: action.name,
			column,
			item,
		});
	};
</script>

{#each actions as action}
	<Button
		class={action.buttonClass || buttonClass}
		color={action.buttonColor || buttonColor}
		disabled={action.isDisabled?.(item, column, action)}
		on:click={() => actionClicked(action)}
	>
		<svelte:component this={action.icon} class={action.iconClass || iconClass} />
		{#if action.caption}{action.caption}{/if}
	</Button>
{/each}
