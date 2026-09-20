<template>
  <div v-if="showBanner" class="cookie-banner">
    <div class="cookie-banner-inner">
      <p class="cookie-text">
        Nous utilisons des cookies pour mesurer l'audience du site (Google Analytics) et améliorer
        votre expérience. Vous pouvez accepter ou refuser ces cookies non essentiels à tout moment.
        <router-link to="/politique-de-confidentialite" class="cookie-link">
          En savoir plus
        </router-link>
      </p>
      <div class="cookie-actions">
        <button class="btn btn-outline-dark" type="button" @click="decline">Refuser</button>
        <button class="btn btn-primary" type="button" @click="accept">Accepter</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { loadGoogleAnalytics } from '../../utils/analytics'

const CONSENT_KEY = 'mistral_cookie_consent'
const showBanner = ref(false)

onMounted(() => {
  const stored = localStorage.getItem(CONSENT_KEY)
  if (stored === 'accepted') {
    loadGoogleAnalytics()
    showBanner.value = false
  } else if (stored === 'declined') {
    showBanner.value = false
  } else {
    // Aucun choix enregistré : on affiche le bandeau
    showBanner.value = true
  }
})

function accept() {
  localStorage.setItem(CONSENT_KEY, 'accepted')
  loadGoogleAnalytics()
  showBanner.value = false
}

function decline() {
  localStorage.setItem(CONSENT_KEY, 'declined')
  showBanner.value = false
}
</script>

<style scoped>
.cookie-banner {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: var(--ink, #16191c);
  color: var(--white, #fff);
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.25);
  padding: 1.25rem 1rem;
  animation: slideUp 0.4s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.cookie-banner-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.cookie-text {
  flex: 1 1 320px;
  font-size: 0.9rem;
  line-height: 1.5;
  color: #dee2e6;
  margin: 0;
}

.cookie-link {
  color: var(--primary-green, #00b894);
  text-decoration: underline;
  white-space: nowrap;
}

.cookie-actions {
  display: flex;
  gap: 0.75rem;
  flex-shrink: 0;
}

.btn-outline-dark {
  background: transparent;
  border: 1px solid #6c757d;
  color: #dee2e6;
  padding: 0.6rem 1.25rem;
  border-radius: 4px;
  font-weight: 700;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-outline-dark:hover {
  border-color: #fff;
  color: #fff;
}

@media (max-width: 640px) {
  .cookie-banner-inner {
    flex-direction: column;
    align-items: stretch;
  }
  .cookie-text {
    flex: none;
  }
  .cookie-actions {
    justify-content: stretch;
  }
  .cookie-actions .btn {
    flex: 1;
  }
}
</style>
