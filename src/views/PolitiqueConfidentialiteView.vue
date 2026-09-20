<template>
  <div class="legal-page container py-16">
    <h1 class="text-3xl font-bold mb-8 text-dark">Politique de confidentialité</h1>

    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-3 text-green">Cookies utilisés</h2>
      <p class="text-gray-600 leading-relaxed mb-4">
        Ce site utilise uniquement des cookies de mesure d'audience (Google Analytics), déposés
        seulement si vous donnez votre accord via le bandeau affiché en bas de page. Aucun cookie
        publicitaire n'est utilisé.
      </p>
      <table class="cookie-table">
        <thead>
          <tr>
            <th>Cookie</th>
            <th>Finalité</th>
            <th>Durée</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>_ga, _ga_*</td>
            <td>Mesure d'audience (Google Analytics)</td>
            <td>13 mois maximum</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-3 text-green">Gérer votre choix</h2>
      <p class="text-gray-600 leading-relaxed">
        Vous pouvez accepter ou refuser les cookies de mesure d'audience à tout moment via le
        bandeau proposé lors de votre première visite. Vous pouvez également effacer les cookies
        déjà déposés dans les paramètres de votre navigateur.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-3 text-green">Données collectées</h2>
      <p class="text-gray-600 leading-relaxed">
        {{ contactInfo.name }} ne collecte aucune donnée personnelle via un formulaire sur ce
        site. Les échanges par téléphone ou WhatsApp initiés depuis le site restent soumis aux
        conditions de ces services respectifs.
      </p>
    </section>

    <section>
      <h2 class="text-xl font-semibold mb-3 text-green">Contact</h2>
      <p class="text-gray-600 leading-relaxed">
        Pour toute question relative à cette politique, contactez-nous au
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

.cookie-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 0.5rem;
}

.cookie-table th,
.cookie-table td {
  border: 1px solid #dee2e6;
  padding: 0.6rem 0.75rem;
  text-align: left;
  font-size: 0.9rem;
  color: #495057;
}

.cookie-table th {
  background-color: var(--light-gray);
  font-weight: 600;
}
</style>
