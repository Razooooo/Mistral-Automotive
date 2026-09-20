<template>
  <div class="legal-page container py-16">
    <h1 class="text-3xl font-bold mb-8 text-dark">Mentions légales</h1>

    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-3 text-green">Éditeur du site</h2>
      <p class="text-gray-600 leading-relaxed">
        {{ contactInfo.name }}<br />
        <span v-if="contactInfo.address">{{ contactInfo.address }}<br /></span>
        Téléphone : <a :href="`tel:${contactInfo.phone}`">{{ contactInfo.phone }}</a>
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-3 text-green">Hébergement</h2>
      <p class="text-gray-600 leading-relaxed">
        Ce site est hébergé par Netlify, Inc.<br />
        512 2nd Street, Suite 200, San Francisco, CA 94107, États-Unis<br />
        <a href="https://www.netlify.com" target="_blank" rel="noopener">www.netlify.com</a>
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-3 text-green">Propriété intellectuelle</h2>
      <p class="text-gray-600 leading-relaxed">
        L'ensemble des contenus présents sur ce site (textes, images, logos) est la propriété de
        {{ contactInfo.name }}, sauf mention contraire. Toute reproduction sans autorisation
        préalable est interdite.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-3 text-green">Responsabilité</h2>
      <p class="text-gray-600 leading-relaxed">
        {{ contactInfo.name }} s'efforce d'assurer l'exactitude des informations diffusées sur ce
        site, mais ne peut être tenue responsable des erreurs, omissions ou de l'indisponibilité
        temporaire du site.
      </p>
    </section>

    <section>
      <h2 class="text-xl font-semibold mb-3 text-green">Contact</h2>
      <p class="text-gray-600 leading-relaxed">
        Pour toute question relative à ce site, vous pouvez nous contacter au
        {{ contactInfo.phone }}.
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { contactInfo } from '../data/products'
</script>

<style scoped>
.legal-page {
  max-width: 800px;
}

.legal-page a {
  color: var(--primary-green);
}
</style>
