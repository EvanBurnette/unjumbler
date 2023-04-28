import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

type Counts = { [key: string]: number };

let emptyCounts: Counts = {};
for (const letter of 'abcdefghijklmnopqrstuvwxyz') {
	emptyCounts[letter] = 0;
}

export const jumbledPhraseStore: Writable<Counts> = writable(emptyCounts);
