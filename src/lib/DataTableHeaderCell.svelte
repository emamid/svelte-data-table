<script lang="ts">
	import { TableHeadCell } from 'flowbite-svelte';

	import type { InternalColumnConfig } from './common.js';
	import { joinClasses } from './common.js';

	export let column: InternalColumnConfig;
	export let reverseSort: boolean;
	export let isSorted: boolean;
	export let defaultSortAscendingIcon: ConstructorOfATypedSvelteComponent;
	export let defaultSortDescendingIcon: ConstructorOfATypedSvelteComponent;
	export let thClass: string;

	const sortAscendingIcon = column.sortAscendingIcon || defaultSortAscendingIcon;
	const sortDescendingIcon = column.sortDescendingIcon || defaultSortDescendingIcon;
</script>

<TableHeadCell
	class={joinClasses(thClass || column.thClassOverride, column.thClassAppend)}
	on:click
>
	{#if isSorted}
		{#if reverseSort}
			<svelte:component this={sortAscendingIcon} class="inline h-3 w-3" />
		{:else}
			<svelte:component this={sortDescendingIcon} class="inline h-3 w-3" />
		{/if}
	{/if}
	<span>{column.title}</span>
</TableHeadCell>
