<!-- @migration-task Error while migrating Svelte code: $$props is used together with named props in a way that cannot be automatically migrated. -->
<script lang="ts">
	import type { ComponentType } from 'svelte';
	import { Rating } from 'flowbite-svelte';

	import type { ColumnConfig } from '../common.ts';

	export let column: ColumnConfig;
	export let item: any;
	export let value: any;
	export let icon: ComponentType | null = null;

	let localValue: any = value;
</script>

{#if icon}
<Rating {...$$props} bind:rating={localValue} {icon}/>
{:else}
<Rating {...$$props} bind:rating={localValue}/>
{/if}
