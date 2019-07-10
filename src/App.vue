<template>
	<div id="app" class="section">
		<nav class="navbar is-warning is-fixed-top" role="navigation" aria-label="main navigation">
			<div class="navbar-brand">
				<div class="navbar-item">
					<p class="title">P-Kan</p>
				</div>
			</div>
			<div class="navbar-menu">
				<div class="navbar-end">
					<div class="navbar-item">
						<div class="buttons">
							<a class="button is-light">Setting</a>
						</div>
					</div>
				</div>
			</div>
		</nav>
		<Draggable />
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';
	import Draggable from './components/Draggable.vue';

	@Component({
		components: {
			Draggable,
		},
	})
	export default class App extends Vue {}
</script>

<style>
</style>
