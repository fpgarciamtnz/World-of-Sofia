<script setup lang="ts">
import { getFeaturedTags, getPhilosophers, getSkills } from "@world-of-sofia/catalog";

import { getCatalogMetrics } from "../utils/catalog-metrics";

const skills = getSkills();
const philosophers = getPhilosophers();
const featuredTags = getFeaturedTags();
const metrics = getCatalogMetrics(skills, philosophers);

useSeoMeta({
  title: "World of Sofia",
  description: "A showroom for isolated philosopher-derived skills."
});
</script>

<template>
  <section class="hero">
    <div class="hero-copy">
      <p class="eyebrow">Workers-first Nuxt showroom</p>
      <h1>Ideas become skills. Skills stay separable.</h1>
      <p class="hero-text">
        World of Sofia is a catalog for philosopher-derived skills with a hard structural rule:
        each skill remains its own distributable unit, never mixed into another.
      </p>

      <div class="hero-metrics">
        <article>
          <strong>{{ metrics.skills }}</strong>
          <span>skills</span>
        </article>
        <article>
          <strong>{{ metrics.philosophers }}</strong>
          <span>philosophers</span>
        </article>
        <article>
          <strong>{{ metrics.tags }}</strong>
          <span>tags</span>
        </article>
      </div>
    </div>

    <aside class="hero-panel">
      <p>Foundation rules</p>
      <ul>
        <li>One skill folder, one manifest, one distribution boundary.</li>
        <li>The showroom reads only declared metadata, never mixed folders.</li>
        <li>Isolation checks fail builds before cross-skill leakage can merge.</li>
      </ul>
    </aside>
  </section>

  <section class="section-block">
    <div class="section-heading">
      <p class="eyebrow">Featured tags</p>
      <h2>Current vocabulary</h2>
    </div>

    <ul class="tag-grid" aria-label="Featured tags">
      <li v-for="tag in featuredTags" :key="tag">{{ tag }}</li>
    </ul>
  </section>

  <section class="section-block">
    <div class="section-heading">
      <p class="eyebrow">Skill catalog</p>
      <h2>Isolated skill units</h2>
    </div>

    <div class="card-grid">
      <SkillCard v-for="skill in skills" :key="skill.slug" :skill="skill" />
    </div>
  </section>

  <section class="section-block">
    <div class="section-heading">
      <p class="eyebrow">Philosophers</p>
      <h2>Origins of the skill set</h2>
    </div>

    <div class="card-grid">
      <PhilosopherCard
        v-for="philosopher in philosophers"
        :key="philosopher.slug"
        :philosopher="philosopher"
      />
    </div>
  </section>
</template>

