<script lang="ts">
	import { Button } from 'flowbite-svelte';

	import type { ColumnConfig } from '@emamid/svelte-data-table';

	export let caption: string = '';
	export let column: ColumnConfig;
	export let item: any;
	export let icon: ConstructorOfATypedSvelteComponent | null = null;
	export let iconClass: string = '';
	export let iconPosition: 'left' | 'right' = 'right';
</script>

<Button>
{#if icon && iconPosition === 'left'}
<svelte:component this={icon} class={iconClass} />
{/if}
{#if caption}{caption}{/if}
{#if icon && iconPosition === 'right'}
<svelte:component this={icon} class={iconClass} />
{/if}
</Button>
