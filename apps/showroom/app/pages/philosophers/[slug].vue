<script setup lang="ts">
import { getPhilosopherBySlug } from "@world-of-sofia/catalog";

const route = useRoute();
const slug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug;

if (!slug) {
  throw createError({
    statusCode: 404,
    statusMessage: "Missing philosopher slug."
  });
}

const philosopher = getPhilosopherBySlug(slug);

if (!philosopher) {
  throw createError({
    statusCode: 404,
    statusMessage: `Unknown philosopher: ${slug}`
  });
}

useSeoMeta({
  title: `${philosopher.name} | World of Sofia`,
  description: philosopher.summary
});
</script>

<template>
  <section class="detail-hero">
    <p class="eyebrow">Philosopher</p>
    <h1>{{ philosopher.name }}</h1>
    <p class="hero-text">{{ philosopher.summary }}</p>
  </section>

  <section class="section-block">
    <div class="section-heading">
      <p class="eyebrow">Available skills</p>
      <h2>{{ philosopher.skills.length }} linked skill<span v-if="philosopher.skills.length !== 1">s</span></h2>
    </div>

    <div class="card-grid">
      <SkillCard v-for="skill in philosopher.skills" :key="skill.slug" :skill="skill" />
    </div>
  </section>
</template>
