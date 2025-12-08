<script lang="ts" module>
	import { Tooltip } from 'flowbite-svelte';
	import Icon from '@iconify/svelte';

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

	type IconifyProps = {
		color?: string;
		flip?: string;
		height?: string | number;
		hFlip?: boolean;
		icon: string;
		inline?: boolean;
		rotate?: number;
		vFlip?: boolean;
		width?: string | number;
	}	

	export type ActionDisablementFunction =	(item: any, column: ColumnConfig, action: Action) => boolean;

	export interface Action {
		buttonClass?: string;
		buttonColor?: ButtonColor;
		caption?: string;
		name: string;
		icon?: ConstructorOfATypedSvelteComponent;
		iconClass?: string;
		iconify?: IconifyProps;	
		isDisabled?: ActionDisablementFunction;
		tooltip?: string;
	}
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import { Button } from 'flowbite-svelte';


	interface Props {
		buttonClass?: string;
		buttonColor?: ButtonColor;
		iconClass?: string;
		column: ColumnConfig;
		item: any;
		actions?: Action[];
	}

	let {
		buttonClass = 'border-0 p-1',
		buttonColor = 'light',
		iconClass = 'w-4 h-4',
		column,
		item,
		actions = []
	}: Props = $props();

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
		{#if action.icon}
			<action.icon class={action.iconClass || iconClass} />
		{/if}
		{#if action.iconify}
			<Icon
				{...action.iconify}
			/>
		{/if}
		{#if action.caption}{action.caption}{/if}
	</Button>
	{#if action.tooltip}
		<Tooltip class="z-10">{action.tooltip}</Tooltip>
	{/if}
{/each}
