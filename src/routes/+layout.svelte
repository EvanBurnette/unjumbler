<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	// import '@skeletonlabs/skeleton/themes/theme-gold-nouveau.css';
	// import '@skeletonlabs/skeleton/themes/theme-rocket.css';
	// import '@skeletonlabs/skeleton/themes/theme-hamlindigo.css';
	// import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import './theme2.postcss';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';

	import { LightSwitch } from '@skeletonlabs/skeleton';

	import { Modal, modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
	const modalDemo = () => {
		const alert: ModalSettings = {
			type: 'alert',
			// Data
			title: 'About Unjumbler',
			body: 'Ruin the fun of the popular newspaper word game Jumble™️'
			// image: 'https://i.imgur.com/WOgTG96.gif',
		};
		modalStore.trigger(alert);
	};
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">unjumbler</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<LightSwitch />
				<button class="btn btn-sm variant-ghost-surface" on:click={modalDemo}> About </button>
				<button
					class="btn btn-sm variant-ghost-surface"
					on:click={() => (location.href = '/?testWords=sevlo+teh+lebmuj')}
				>
					Demo
				</button>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://github.com/EvanBurnette/unjumbler"
					target="_blank"
					rel="noreferrer"
				>
					GitHub
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
	<Modal />
</AppShell>
