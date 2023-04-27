<script lang="ts">
	export let idx: number;
	export let getWords: Function;

	let jumbledWord = '';
	let suggestions: string[] = [];

	let selection: string = '';
</script>

<section>
	<label for="jumbledIn" class="label flex" aria-label="{idx} scrambled word">
		<input
			bind:value={jumbledWord}
			on:change={async () => {
				suggestions = await getWords(jumbledWord.toLowerCase());
			}}
			id="jumbledIn"
			type="text"
			class="input text-center text-xl uppercase"
		/>
	</label>

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
			<li class="flex">
				{#each selection as letter}
					<button class="btn uppercase w-full">
						{letter}
					</button>
				{/each}
				<button
					aria-controls="deselect word"
					class="btn variant-filled-tertiary py-0.5 px-2.5 aspect-square self-start"
					on:click={() => {
						selection = '';
					}}>X</button
				>
			</li>
		{/if}
	</ol>
</section>

<style>
	ol > li > button {
		margin-right: -0.5rem;
	}
	section {
		width: clamp(10ch, 100%, 100ch);
	}
</style>
