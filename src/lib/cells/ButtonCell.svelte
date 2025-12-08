<script lang="ts">
	import { Button } from 'flowbite-svelte';

	import type { ColumnConfig } from '@emamid/svelte-data-table';

	interface Props {
		caption?: string;
		column: ColumnConfig;
		item: any;
		icon?: ConstructorOfATypedSvelteComponent | null;
		iconClass?: string;
		iconPosition?: 'left' | 'right';
	}

	let {
		caption = '',
		column,
		item,
		icon = null,
		iconClass = '',
		iconPosition = 'right'
	}: Props = $props();
</script>

<Button>
{#if icon && iconPosition === 'left'}
{@const SvelteComponent = icon}
<SvelteComponent class={iconClass} />
{/if}
{#if caption}{caption}{/if}
{#if icon && iconPosition === 'right'}
{@const SvelteComponent_1 = icon}
<SvelteComponent_1 class={iconClass} />
{/if}
</Button>
