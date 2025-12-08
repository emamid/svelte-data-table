<script lang="ts">
	import { TableHeadCell } from 'flowbite-svelte';

	import type { InternalColumnConfig } from './common.js';
	import { joinClasses } from './common.js';

	interface Props {
		column: InternalColumnConfig;
		reverseSort: boolean;
		isSorted: boolean;
		defaultSortAscendingIcon: ConstructorOfATypedSvelteComponent;
		defaultSortDescendingIcon: ConstructorOfATypedSvelteComponent;
		thClass: string;
	}

	let {
		column,
		reverseSort,
		isSorted,
		defaultSortAscendingIcon,
		defaultSortDescendingIcon,
		thClass
	}: Props = $props();

	const sortAscendingIcon = column.sortAscendingIcon || defaultSortAscendingIcon;
	const sortDescendingIcon = column.sortDescendingIcon || defaultSortDescendingIcon;
</script>

<TableHeadCell
	class={joinClasses(thClass || column.thClassOverride, column.thClassAppend)}
	on:click
>
	{#if isSorted}
		{#if reverseSort}
			{@const SvelteComponent = sortAscendingIcon}
			<SvelteComponent class="inline h-3 w-3" />
		{:else}
			{@const SvelteComponent_1 = sortDescendingIcon}
			<SvelteComponent_1 class="inline h-3 w-3" />
		{/if}
	{/if}
	<span>{column.title}</span>
</TableHeadCell>
