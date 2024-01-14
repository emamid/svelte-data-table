<script lang="ts">
	import { TableHeadCell } from 'flowbite-svelte';
	import { ArrowDownSolid, ArrowUpSolid } from 'flowbite-svelte-icons';

	import type { InternalColumnConfig } from './common.ts'
	import { joinClasses} from './common.ts'

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
		<ArrowUpSolid class="inline"/>
		{:else}
		<ArrowDownSolid class="inline"/>
		{/if}
	{/if}
	<span>{column.title}</span>
</TableHeadCell>
