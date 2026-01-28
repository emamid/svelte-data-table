<script lang="ts">
	import type { Component } from 'svelte';
	import Icon from '@iconify/svelte';

	import type { IconifyProps, IconProp } from './common.ts';

	interface Props {
		classes?: string;
		icon: IconProp;
	}

	const { classes, icon }: Props = $props();
	
	const iconType = $derived(typeof icon);
</script>

{#if iconType === 'string'}
	<span class={classes}>{icon}</span>
{:else if iconType === 'object'}
	<Icon class={classes} {...(icon as IconifyProps)} />
{:else}
	<!-- Assuming icon is a Svelte component -->
	{@const SvelteComponent = icon as Component<any, any, any>}
	<SvelteComponent class={classes}/>
{/if}