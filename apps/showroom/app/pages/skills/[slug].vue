<script setup lang="ts">
import { getSkillBySlug } from "@world-of-sofia/catalog";

import { renderMarkdown } from "../../utils/render-markdown";

const route = useRoute();
const slug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug;

if (!slug) {
  throw createError({
    statusCode: 404,
    statusMessage: "Missing skill slug."
  });
}

const skill = getSkillBySlug(slug);

if (!skill) {
  throw createError({
    statusCode: 404,
    statusMessage: `Unknown skill: ${slug}`
  });
}

const skillHtml = renderMarkdown(skill.skillMarkdown, { demoteHeadings: true });
const readmeHtml = renderMarkdown(skill.readme, { demoteHeadings: true });

useSeoMeta({
  title: `${skill.title} | World of Sofia`,
  description: skill.summary
});
</script>

<template>
  <section class="detail-hero">
    <p class="eyebrow">{{ skill.philosopher }}</p>
    <h1>{{ skill.title }}</h1>
    <p class="hero-text">{{ skill.summary }}</p>
    <div class="detail-meta">
      <span class="status-pill">{{ skill.status }}</span>
      <code>{{ skill.version }}</code>
    </div>
  </section>

  <section class="detail-grid">
    <article class="panel">
      <p class="eyebrow">Skill definition</p>
      <div class="markdown-body" v-html="skillHtml" />
    </article>

    <aside class="panel">
      <p class="eyebrow">Distribution boundary</p>
      <dl class="meta-list">
        <div>
          <dt>Folder slug</dt>
          <dd>{{ skill.slug }}</dd>
        </div>
        <div>
          <dt>Install command</dt>
          <dd><code>{{ skill.installCommand }}</code></dd>
        </div>
        <div>
          <dt>Source</dt>
          <dd>{{ skill.sourceRepo }}</dd>
        </div>
      </dl>
      <ul class="tag-row" aria-label="Skill tags">
        <li v-for="tag in skill.tags" :key="tag">{{ tag }}</li>
      </ul>
    </aside>
  </section>

  <section class="section-block">
    <div class="section-heading">
      <p class="eyebrow">README</p>
      <h2>Operational notes</h2>
    </div>
    <article class="panel markdown-body" v-html="readmeHtml" />
  </section>

  <section v-if="skill.referencesContent.length" class="section-block">
    <div class="section-heading">
      <p class="eyebrow">References</p>
      <h2>Local support files</h2>
    </div>
    <div class="panel-stack">
      <article v-for="reference in skill.referencesContent" :key="reference.path" class="panel">
        <p class="eyebrow">{{ reference.path }}</p>
        <div class="markdown-body" v-html="renderMarkdown(reference.content, { demoteHeadings: true })" />
      </article>
    </div>
  </section>
</template>
