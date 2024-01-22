<script lang="ts">
	import { TableHeadCell } from 'flowbite-svelte';
	import { AngleDownSolid, AngleUpSolid } from 'flowbite-svelte-icons';

	import type { InternalColumnConfig } from './common.js';
	import { joinClasses } from './common.js';

	export let column: InternalColumnConfig;
	export let reverseSort: boolean;
	export let isSorted: boolean;
	export let thClass: string;
</script>

<TableHeadCell
	class={joinClasses(thClass || column.thClassOverride, column.thClassAppend)}
	on:click
>
	{#if isSorted}
		{#if reverseSort}
			<AngleUpSolid class="inline h-3 w-3" />
		{:else}
			<AngleDownSolid class="inline h-3 w-3" />
		{/if}
	{/if}
	<span>{column.title}</span>
</TableHeadCell>
