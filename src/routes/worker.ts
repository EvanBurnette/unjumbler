import type { Remote } from 'comlink';
import { _getPhrases } from './subWorker';

export function getSubworkersAllowed(): boolean {
	if (Worker == undefined) {
		return false;
	}
	return true;
}

const fallback = !getSubworkersAllowed();
// console.debug(_getPhrases, fallback);

const isEqual = (counts1: Counts, counts2: Counts): boolean => {
	for (const key in counts1) {
		if (!(key in counts2)) {
			return false;
		}
		if (counts1[key] !== counts2[key]) {
			return false;
		}
	}
	// in case we encounter the shorter word first, make sure there are no uncounted letters
	if (Object.keys(counts1).length != Object.keys(counts2).length) {
		return false;
	}
	return true;
};

const isSubset = (wordCounts: Counts, phraseCounts: Counts): boolean => {
	// we know the empty phrase has all letters so skip that step
	for (const key in wordCounts) {
		if (wordCounts[key] > phraseCounts[key]) {
			return false;
		}
	}
	return true;
};

let dictionary: string[] = [];
let dictionaryMap: { word: string; counts: Counts }[] = [];

export const setDictionary = (dictionary_raw: string) => {
	dictionary = dictionary_raw.split('\n');
	createDictionaryMap();
	// console.debug(dictionaryMap.slice(0, 10));
};

const countLetters = (word: string) => {
	const counts: Counts = {};
	for (const letter of word) {
		counts[letter] ? counts[letter]++ : (counts[letter] = 1);
	}
	return counts;
};

const createDictionaryMap = () => {
	dictionaryMap = dictionary.map((word) => ({ word: word, counts: countLetters(word) }));
};

export const getWords = (jumbledWord: string) => {
	const jWordCounts = countLetters(jumbledWord);
	return dictionaryMap
		.filter((wordAndCounts) => {
			return isEqual(wordAndCounts.counts, jWordCounts);
		})
		.map((word) => word.word);
};

const numCpus = navigator.hardwareConcurrency;
const isMobile = navigator.maxTouchPoints > 0;
let concurrency = isMobile ? 2 : Math.max(2, Math.floor(numCpus / 2));

export const setConcurrency = (userNum: number) => {
	concurrency = userNum;
};

export const getNumSubworkers = (): number => {
	return concurrency;
};

const subWorkers:
	| Remote<typeof import('./subWorker')>[]
	| {
			_getPhrases: (arg0: Counts, arg1: never[], arg2: Function, arg3: WordAndCounts[][]) => void;
	  }[] = [];
for (let i = 0; i < concurrency; i++) {
	try {
		const subWorker = new ComlinkWorker<typeof import('./subWorker')>(
			new URL('/subWorker', import.meta.url)
		);
		// console.debug(e);
		subWorker.setWorkerId(i);
		subWorkers.push(subWorker);
	} catch (error) {
		console.error(error);
	}
}

// console.debug('noSubworkers', noSubworkers);
// console.debug('subWorkers.length', subWorkers.length);
// console.debug('subWorkers', subWorkers);
// console.debug('hello from main worker');
// console.debug('concurrency', concurrency);

let subDictionaries: WordAndCounts[][];
let jPhrase: Counts;
export const getPhrases = (addSolutionProxy: Function) => {
	if (concurrency > subDictionaries[0].length || fallback) {
		_getPhrases(jPhrase, [], addSolutionProxy, subDictionaries);
		console.debug('fallback');
	} else {
		subWorkers.forEach((subWorker, i) => {
			const subRange = {
				start: i * Math.floor(subDictionaries[0].length / concurrency),
				end: (i + 1) * Math.floor(subDictionaries[0].length / concurrency)
			};
			if (i === subWorkers.length - 1) {
				subRange.end = subDictionaries[0].length + 1;
			}
			const subSubDictionaries = structuredClone(subDictionaries);
			subSubDictionaries[0] = subSubDictionaries[0].slice(subRange.start, subRange.end);
			subWorker._getPhrases(jPhrase, [], addSolutionProxy, subSubDictionaries);
		});
	}
};

export let setupData = (jumbledPhrase: Counts, emptyWords: number[]) => {
	jPhrase = jumbledPhrase;
	const lettersInPhrase = new Set(
		Object.entries(jumbledPhrase)
			.filter(([k, v]) => {
				return v > 0;
			})
			.map(([k, v]) => k)
	);
	subDictionaries = emptyWords.map((numLetters) => {
		return dictionaryMap.filter(({ word: word, counts: counts }) => {
			if (!(numLetters === word.length)) return false;
			return isSubset(counts, jumbledPhrase);
		});
	});

	return;
};
