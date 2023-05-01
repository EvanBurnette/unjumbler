<script lang="ts">
	export let idx: number;
	export let getWords: Function;

	import Letter from './Letter.svelte';

	let jumbledWord = '';
	let suggestions: string[] = [];

	let selection: string = '';
</script>

<section class="flex">
	<label for="jumbledIn" class="label w-full" aria-label="{idx} scrambled word">
		<input
			bind:value={jumbledWord}
			on:change={async () => {
				suggestions = await getWords(jumbledWord.toLowerCase());
			}}
			id="jumbledIn"
			type="text"
			class="input text-center text-xl uppercase w-full"
		/>
	</label>
	<slot />
</section>
<section>
	<ol>
		{#if selection == ''}
			{#each suggestions as suggestion}
				<li class="flex">
					<button
						class="btn variant-ghost-tertiary uppercase w-full"
						on:click={() => {
							selection = suggestion;
						}}
					>
						{suggestion}
					</button>
				</li>
			{/each}
		{:else}
			<li class="flex justify-evenly w-full">
				{#each selection as letter}
					<Letter {letter} />
				{/each}
				<span class="grow" />
				<button
					aria-controls="deselect word"
					class="btn variant-ringed-primary py-0.5 px-2.5"
					on:click={() => {
						selection = '';
					}}>X</button
				>
			</li>
		{/if}
	</ol>
</section>

<style lang="postcss">
	/* section {
		width: clamp(10ch, 100%, 100ch);
	} */
</style>
