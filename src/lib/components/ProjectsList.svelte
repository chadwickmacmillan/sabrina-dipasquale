<script>
	// @ts-nocheck
	import { page } from "$app/stores";
	import { getContext, onMount } from "svelte";
	import { bgcolor, percentage, direction } from "$stores/stores";
	import { checkScroll } from "$utils/checkScroll";
	import Slider from "./Slider.svelte";
	import ArrowLink from "./ArrowLink.svelte";

	const projects = getContext("projects");
	let visible = false;
	onMount(() => {
		visible = true;
	});
</script>

<div class="projects-list">
	<section class="title">
		<h1>
			<span>
				Sabrina DiPasquale_<br />
				<span>Art Director</span>
				and Designer
			</span>
			<ArrowLink>About</ArrowLink>
		</h1>
	</section>
	<section class="projects-wrapper" class:visible>
		<div class="projects scrollbar" use:checkScroll={$percentage}>
			{#each projects as project, i}
				<section>
					{#if i === 0}
						<a
							on:click={() =>
								direction.set(
									1,
								)}
							class="project-link"
							href="/{project.slug
								.current}"
							aria-current={$page.url
								.pathname ===
								`/${project.slug.current}` ||
							$page.url.pathname ===
								"/"
								? "page"
								: false}
						>
							<h2>
								<span>
									{project?.company}
								</span><span>
									{#if project?.title}
										_{project.title}
									{/if}
								</span>
							</h2>
							<h3>
								{#if project?.roles}
									<ul
										class="project-roles"
									>
										{#each project?.roles as role}
											<li
											>
												{role}
											</li>
										{/each}
									</ul>
								{/if}
							</h3>
						</a>
					{:else}
						<a
							on:click={() =>
								direction.set(
									1,
								)}
							class="project-link"
							href="/{project.slug
								.current}"
							aria-current={$page.url
								.pathname ===
							`/${project.slug.current}`
								? "page"
								: false}
						>
							<h2>
								<span
									>{project?.company}</span
								><span
									>{#if project?.title}_{project.title}{/if}</span
								>
							</h2>
							<h3>
								<ul
									class="project-roles"
								>
									{#if project?.roles}
										{#each project?.roles as role}
											<li
											>
												{role}
											</li>
										{/each}
									{/if}
								</ul>
							</h3>
						</a>
					{/if}
				</section>
			{/each}
		</div>
	</section>
	<Slider></Slider>
</div>

<style lang="postcss">
	h1 {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		column-gap: 32px;
	}
	h1 > span {
		font-size: var(--font-size-title);
		line-height: 1.1;
		font-family: "PSFournier Std Petit", serif;
		font-weight: 300;
	}
	h1 > span > span {
		font-weight: 600;
	}
	.projects-list {
		position: relative;
		padding: var(--padding);
		height: 100%;
		display: grid;
		grid-template: auto 1fr / 1fr;
		padding-bottom: 64px;
	}
	@media (min-width: 768px) {
		.projects-list {
			gap: 64px;
		}
	}
	.projects-wrapper {
		position: relative;
		overflow: hidden;
		&::before,
		&::after {
			content: "";
			display: block;
			position: absolute;
			width: 100%;
			height: 64px;
			left: 0;
			z-index: 1000;
			pointer-events: none;
		}
		&.visible::before {
			opacity: 1;
		}
		&.visible::after {
			opacity: 1;
		}
		&::before {
			opacity: 0;
			top: 0;
			background-image: linear-gradient(
				to top,
				transparent,
				var(--bg-color)
			);
			transition: var(--bgcolor-transition);
		}
		&::after {
			opacity: 1;
			bottom: 0;
			background-image: linear-gradient(
				to bottom,
				transparent,
				var(--bg-color)
			);
			transition: var(--bgcolor-transition);
		}
		&:has(> .projects.scroll-top)::before {
			opacity: 0;
		}
		&:has(> .projects.scroll-bottom)::after {
			opacity: 0;
		}
	}
	.projects {
		display: grid;
		overflow: auto;
		height: 100%;
		margin-top: var(--projects-margin-top);
		column-gap: var(--padding);
		grid-auto-rows: min-content;
		grid-template-columns: 1fr;
		padding-right: var(--padding);
		position: relative;
	}
	.title {
		display: none;
	}
	@media (min-width: 768px) {
		.title {
			display: block;
		}
	}
	.project-link > h2 {
		& > span:first-child {
			font-weight: 500;
		}
		& > span:last-child {
			font-weight: 300;
		}
	}
	.project-link {
		display: block;
		position: relative;
		padding-block: 2px;
		overflow: hidden;
		& > * {
			line-height: 1.3;
		}
		& > h2 {
			padding-top: 6px;
			font-size: var(--font-size-body);
			font-weight: 500;
		}
		& > h3 {
			padding-bottom: 6px;
			font-size: var(--font-size-role);
		}
		&::before,
		&::after {
			content: "";
			display: block;
			position: absolute;
			width: 0;
			height: 1px;
			background-color: var(--color);
			opacity: 0.3;
		}
		&::before {
			left: 0;
		}
		&::after {
			left: 0;
		}
		&[aria-current="page"] {
			&::before,
			&::after {
				width: 100%;
			}
			& > h2,
			& > h3 {
				color: var(--color);
				opacity: 0.6;
				font-style: italic;
			}
		}
	}
	.project-roles {
		display: flex;
		gap: 0.5em;
		padding-top: 0.25em;
		& > li {
			padding: 0.25em 0.5em;
			background-color: rgb(255 255 255 / 0.2);
			border-radius: 16px;
		}
	}
</style>
