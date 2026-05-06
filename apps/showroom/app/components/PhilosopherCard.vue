<script setup lang="ts">
import type { CatalogPhilosopher } from "@world-of-sofia/catalog";

defineProps<{
  philosopher: CatalogPhilosopher;
}>();
</script>

<template>
  <article class="card philosopher-card">
    <div class="card-kicker">
      <span>Philosopher</span>
      <span>{{ philosopher.skills.length }} skill<span v-if="philosopher.skills.length !== 1">s</span></span>
    </div>
    <div class="card-body">
      <h3>
        <NuxtLink :to="`/philosophers/${philosopher.slug}`">{{ philosopher.name }}</NuxtLink>
      </h3>
      <p>{{ philosopher.summary }}</p>
    </div>
  </article>
</template>

