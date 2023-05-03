/// <reference types="vite-plugin-comlink/client" />

type Counts = { [key: string]: number };
type WordAndCounts = {
	word: string;
	counts: Counts;
};

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}
