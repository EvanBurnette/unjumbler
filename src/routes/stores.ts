import { derived, writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

type Counts = { [key: string]: number };

let emptyCounts: Counts = {};
for (const letter of 'abcdefghijklmnopqrstuvwxyz') {
	emptyCounts[letter] = 0;
}

export const jumbledPhraseStore: Writable<Counts> = writable(emptyCounts);

export const readyToSolve = writable(false);

export const jumber = derived(jumbledPhraseStore, ($jumbledPhraseStore) => {
	return Object.entries($jumbledPhraseStore).reduce((acc, [k, v]) => {
		return v + acc;
	}, 0);
});

const emptyWords: number[] = [];
export const emptyWordsStore = writable(emptyWords);
