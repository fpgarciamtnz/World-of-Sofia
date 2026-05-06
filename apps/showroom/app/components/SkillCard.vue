<script setup lang="ts">
import type { CatalogSkill } from "@world-of-sofia/catalog";

defineProps<{
  skill: CatalogSkill;
}>();
</script>

<template>
  <article class="card skill-card">
    <div class="card-kicker">
      <span>{{ skill.philosopher }}</span>
      <span class="status-pill">{{ skill.status }}</span>
    </div>

    <div class="card-body">
      <h3>
        <NuxtLink :to="`/skills/${skill.slug}`">{{ skill.title }}</NuxtLink>
      </h3>
      <p>{{ skill.summary }}</p>
    </div>

    <ul class="tag-row" aria-label="Skill tags">
      <li v-for="tag in skill.tags" :key="tag">{{ tag }}</li>
    </ul>
  </article>
</template>

