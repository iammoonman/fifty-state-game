<script>
	import { page } from "$app/state";
</script>

<section>
	<h3 style:margin-top=0>Auth</h3>
	{#if page.data.session}
		<div>
			{#if page.data.session.user?.image}
				<img src={page.data.session.user.image} alt="avatar" style:filter="url(#pixelate)" />
			{/if}
			<h6>{page.data.session.user?.name}</h6>
			<form method="POST" action="/signout">
				<input type="hidden" name="providerId" value="discord" />
				<button type="submit">Sign out</button>
			</form>
		</div>
	{:else}
		<form method="POST" action="/signin">
			<input type="hidden" name="providerId" value="discord" />
			<button type="submit">Sign in</button>
		</form>
	{/if}
</section>