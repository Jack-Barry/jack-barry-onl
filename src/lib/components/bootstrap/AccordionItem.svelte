<script lang="ts">
	export let parentId: string;
	export let id: string;
	export let title: string;
</script>

<div class="accordion-item">
	<h2 class="accordion-header">
		<button
			class="accordion-button collapsed"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#{id}"
			aria-expanded="false"
			aria-controls={id}
		>
			{title}
		</button>
	</h2>
	<div {id} class="accordion-collapse collapse" data-bs-parent="#{parentId}">
		<div class="accordion-body">
			<slot />
		</div>
	</div>
</div>
