<script lang="ts">
	import { jumbledPhraseStore, jumber } from './stores';
	let jumbledPhrase = '';
	$: jumbledPhrase = Object.entries($jumbledPhraseStore)
		.filter(([k, v]) => v !== 0)
		.map(([k, v]) => {
			return new Array(v).fill(k).join('');
		})
		.join('');
</script>

<label class="label" for="phrase">
	<span> {$jumber} Jumbled Letters </span>
	<input bind:value={jumbledPhrase} id="phrase" type="text" class="input text-center uppercase" />
</label>
