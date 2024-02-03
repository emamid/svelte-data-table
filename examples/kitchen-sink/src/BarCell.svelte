<script lang="ts">
	import type { ColumnConfig } from '@emamid/svelte-data-table';
	export let column: ColumnConfig;
	export let item: any;
	export let value: number;
	export let maxValue: number = 100;
	export let backgroundClass: string = 'bg-green-900 w-full h-full margin-8';
	export let barClass: string = 'bg-green-400 h-full';

	const percent = maxValue ? Math.max(Math.min(value/maxValue, 1), 0) * 100 : 100;

	let domNode: Element;
	let parentHeight: number = 1;

	$: {
		if (domNode) {
			parentHeight = ((domNode.parentElement?.clientHeight || 0) - 16)|| 1;
		}
	}

</script>

<div class={backgroundClass} bind:this={domNode} style:height='{parentHeight}px'>
	<div class={barClass} style:width='{percent}%'/>
</div>
