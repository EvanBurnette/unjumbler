<script>
	let empties = [true, true, true];

	const addLetter = () => {
		empties.push(true);
		empties = empties;
	};

	const addSpace = () => {
		empties.push(false);
		empties = empties;
	};

	const deleteLast = () => {
		empties.pop();
		empties = empties;
	};
</script>

<ul class="h-8 w-full flex flex-auto">
	{#each empties as empty}
		{#if empty}
			<li class="h-full aspect-square border-2 border-primary-900">
				<div class="w-full aspect-square rounded-full border border-dotted border-primary-500" />
			</li>
		{:else}
			<li class="h-full aspect-square" />
		{/if}
	{/each}
	<span class="grow" />
	<button class="xButton" on:click={deleteLast}>X</button>
</ul>
<div class="flex">
	<button class="btn variant-ringed-primary grow" on:click={addLetter}> + Add Letter </button>
	<button class="btn variant-ringed-primary grow" on:click={addSpace}> + Add Space </button>
</div>
