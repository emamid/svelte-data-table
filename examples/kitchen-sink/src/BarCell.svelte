<script lang="ts">
	import type { ColumnConfig } from '@emamid/svelte-data-table'

	interface Props {
		column: ColumnConfig;
		item: any;
		value: number;
		maxValue?: number;
		backgroundClass?: string;
		barClass?: string;
		[key: string]: any;
	};

	let {
		column,
		item,
		value,
		maxValue = 100,
		backgroundClass = 'bg-green-900 w-24 h-4 margin-8',
		barClass = 'bg-green-400 h-full',
		...inputProps
	}: Props = $props();

	// export let column: ColumnConfig;
	// export let item: any;
	// export let value: number;
	// export let maxValue: number = 100;
	// export let backgroundClass: string = 'bg-green-900 w-full h-full margin-8';
	// export let barClass: string = 'bg-green-400 h-full';

	let percent = $derived(maxValue ? Math.max(Math.min(value/maxValue, 1), 0) * 100 : 100);

	let domNode: Element;
	let parentHeight: number = 1;

	// $: {
	// 	if (domNode) {
	// 		parentHeight = ((domNode.parentElement?.clientHeight || 0) - 16)|| 1;
	// 	}
	// }

</script>

<!-- <div class={backgroundClass} bind:this={domNode} style:height='{parentHeight}px'>
	<div class={barClass} style:width='{percent}%'></div>
</div> -->

<div class={backgroundClass} bind:this={domNode}>
	<div class={barClass} style:width='{percent}%'></div>
</div>
