<template>
  <div>
    <!-- Hero -->
    <section class="hero">
      <div class="container hero-inner">
        <div class="hero-content">
          <span class="hero-eyebrow">Distributeur RIDEX · Madagascar</span>
          <h1 class="hero-title">
            Pièces automobiles <span class="text-accent">fiables</span>,<br />
            au meilleur prix
          </h1>
          <p class="hero-subtitle">
            Freinage, direction, suspension, moteur : trouvez la pièce adaptée à votre véhicule
            parmi notre catalogue RIDEX. Conseil et devis rapides.
          </p>
          <div class="hero-buttons">
            <router-link to="/products" class="btn btn-primary">Voir le catalogue</router-link>
            <a :href="`tel:${contactInfo.phone}`" class="btn btn-outline">Nous appeler</a>
          </div>
        </div>

        <!-- Recherche rapide -->
        <form class="finder" @submit.prevent="searchParts">
          <h2 class="finder-title">Trouvez votre pièce</h2>
          <label class="finder-label" for="finder-brand">Marque du véhicule</label>
          <select id="finder-brand" v-model="finderBrand" class="finder-field">
            <option value="">Toutes les marques</option>
            <option v-for="brand in brands" :key="brand" :value="brand">{{ brand }}</option>
          </select>
          <label class="finder-label" for="finder-query">Nom de la pièce</label>
          <input
            id="finder-query"
            v-model="finderQuery"
            type="text"
            class="finder-field"
            placeholder="Ex : plaquettes de frein"
          />
          <button type="submit" class="btn btn-primary finder-submit">Rechercher</button>
        </form>
      </div>
    </section>

    <!-- Bande de réassurance -->
    <section class="trust">
      <div class="container">
        <div class="trust-grid">
          <div v-for="item in trustItems" :key="item.title" class="trust-item">
            <svg class="trust-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.8"
                :d="item.icon"
              />
            </svg>
            <div>
              <div class="trust-title">{{ item.title }}</div>
              <div class="trust-text">{{ item.text }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Marques -->
    <section id="brands" class="section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Pièces par marque</h2>
          <p class="section-subtitle">
            Sélectionnez la marque de votre véhicule pour afficher les pièces compatibles.
          </p>
        </div>

        <div class="brands-grid">
          <router-link
            v-for="brand in brandLogos"
            :key="brand.name"
            :to="{ path: '/products', query: { brand: brand.filter } }"
            class="brand-item"
          >
            <img
              :src="brand.logo"
              :alt="`Logo ${brand.name}`"
              class="brand-logo-img"
              @error="handleLogoError"
            />
            <span class="brand-name">{{ brand.name }}</span>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Pourquoi nous -->
    <section class="section section-alt">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Pourquoi choisir Mistral Automotive</h2>
        </div>

        <div class="services-grid">
          <div class="service-card">
            <h3 class="service-title">Pièces détachées</h3>
            <p class="service-description">
              Une large gamme de pièces pour toutes les marques, avec une qualité constante et des
              prix compétitifs.
            </p>
          </div>
          <div class="service-card">
            <h3 class="service-title">Livraison rapide</h3>
            <p class="service-description">
              Un service de livraison express pour vos pièces, disponible 6 jours sur 7.
            </p>
          </div>
          <div class="service-card">
            <h3 class="service-title">Conseil personnalisé</h3>
            <p class="service-description">
              Un doute sur la référence ? Notre équipe vous répond et vous établit un devis par
              téléphone ou WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <div class="container cta-inner">
        <div class="cta-text">
          <h2 class="cta-title">Besoin d'une pièce automobile ?</h2>
          <p class="cta-subtitle">
            Parcourez notre catalogue ou contactez-nous pour un devis personnalisé.
          </p>
        </div>
        <router-link to="/products" class="btn btn-primary">Voir le catalogue</router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { contactInfo, getBrands } from '../data/products'

const router = useRouter()

// Recherche rapide
const brands = getBrands()
const finderBrand = ref('')
const finderQuery = ref('')

const searchParts = () => {
  const query: Record<string, string> = {}
  if (finderBrand.value) query.brand = finderBrand.value
  if (finderQuery.value.trim()) query.q = finderQuery.value.trim()
  router.push({ path: '/products', query })
}

// Arguments de réassurance
const trustItems = [
  {
    title: 'Pièces certifiées',
    text: 'Gamme RIDEX de qualité',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  },
  {
    title: 'Livraison rapide',
    text: 'Express, 6 jours sur 7',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
  {
    title: 'Prix compétitifs',
    text: 'Devis gratuit sur demande',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    title: 'Réponse rapide',
    text: 'Par téléphone ou WhatsApp',
    icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
  },
]

// Marques avec logos locaux (filter = nom de la marque dans le catalogue)
const brandLogos = [
  { name: 'AUDI', filter: 'Audi', logo: '/logos/logo_audi.png' },
  { name: 'BMW', filter: 'BMW', logo: '/logos/Logo_BMW.png' },
  { name: 'MERCEDES', filter: 'Mercedes', logo: '/logos/logo_mercedes.png' },
  { name: 'PSA', filter: 'Peugeot', logo: '/logos/logo_PSA.png' },
  { name: 'RENAULT', filter: 'Renault', logo: '/logos/logo_renault.png' },
  { name: 'TOYOTA', filter: 'Toyota', logo: '/logos/logo_toyota.png' },
  { name: 'VW', filter: 'VW', logo: '/logos/Logo_Volkswagen.png' },
  { name: 'HYUNDAI', filter: 'Hyundai', logo: '/logos/Logo_Hyundai.png' },
  { name: 'KIA', filter: 'Kia', logo: '/logos/logo_kia.png' },
  { name: 'JEEP', filter: 'Jeep', logo: '/logos/Logo_Jeep.png' },
]

// Gestion des erreurs de chargement des logos
const handleLogoError = (event: Event) => {
  const target = event.target as HTMLImageElement
  const brandName = target.alt.replace('Logo ', '')
  // Image de fallback avec le nom de la marque
  target.src = `https://via.placeholder.com/120x60/00b894/ffffff?text=${encodeURIComponent(brandName)}`
}
</script>

<style scoped>
/* Hero */
.hero {
  position: relative;
  background-color: var(--ink);
  background-image: repeating-linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.025) 0,
    rgba(255, 255, 255, 0.025) 2px,
    transparent 2px,
    transparent 14px
  );
  color: var(--white);
  text-align: left;
  padding: 88px 0 120px;
}

.hero::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 6px;
  background: var(--primary-green);
}

.hero-inner {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  gap: 64px;
  align-items: center;
}

.hero-eyebrow {
  display: inline-block;
  margin-bottom: 20px;
  color: var(--primary-green);
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.18em;
}

.hero-title {
  font-size: 3.25rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 24px;
}

.text-accent {
  color: var(--primary-green);
}

.hero-subtitle {
  max-width: 560px;
  margin-bottom: 36px;
  color: #b8bec4;
  font-size: 1.1rem;
  line-height: 1.65;
}

.hero-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

/* Recherche rapide */
.finder {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 28px;
  background: var(--white);
  color: var(--ink);
  border-radius: 6px;
  border-top: 4px solid var(--primary-green);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.finder-title {
  margin-bottom: 8px;
  font-size: 1.25rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.finder-label {
  margin-top: 6px;
  color: var(--medium-gray);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.finder-field {
  padding: 0.8rem 0.9rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  background: var(--white);
  font-size: 0.95rem;
}

.finder-submit {
  margin-top: 14px;
  width: 100%;
}

/* Bande de réassurance */
.trust {
  position: relative;
  z-index: 2;
  margin-top: -48px;
}

.trust-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  background: var(--white);
  border: 1px solid var(--line);
  border-radius: 6px;
  box-shadow: 0 10px 30px rgba(22, 25, 28, 0.08);
  padding: 0;
  overflow: hidden;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 24px 22px;
  border-right: 1px solid var(--line);
}

.trust-item:last-child {
  border-right: none;
}

.trust-icon {
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  color: var(--primary-green);
}

.trust-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--ink);
}

.trust-text {
  font-size: 0.8rem;
  color: var(--medium-gray);
}

/* Sections */
.section {
  padding: 88px 0;
  background: var(--white);
}

.section-alt {
  background: var(--light-gray);
}

.section-header {
  margin-bottom: 48px;
}

.section-title {
  position: relative;
  padding-bottom: 16px;
  color: var(--ink);
  font-size: 2rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.01em;
}

.section-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 56px;
  height: 4px;
  background: var(--primary-green);
}

.section-subtitle {
  max-width: 640px;
  margin-top: 16px;
  color: var(--medium-gray);
  font-size: 1.05rem;
}

/* Marques */
.brands-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
}

.brand-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  height: 150px;
  padding: 20px;
  background: var(--white);
  border: 1px solid var(--line);
  border-radius: 6px;
  text-decoration: none;
  transition:
    border-color 0.15s,
    box-shadow 0.15s;
}

.brand-item:hover {
  border-color: var(--primary-green);
  box-shadow: 0 8px 20px rgba(22, 25, 28, 0.08);
}

.brand-logo-img {
  max-width: 110px;
  max-height: 56px;
  width: auto;
  height: auto;
  object-fit: contain;
  filter: grayscale(100%);
  opacity: 0.75;
  transition:
    filter 0.15s,
    opacity 0.15s;
}

.brand-item:hover .brand-logo-img {
  filter: none;
  opacity: 1;
}

.brand-name {
  color: var(--ink);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
}

/* Arguments */
.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.service-card {
  padding: 32px 28px;
  background: var(--white);
  border: 1px solid var(--line);
  border-top: 4px solid var(--primary-green);
  border-radius: 6px;
}

.service-title {
  margin-bottom: 12px;
  color: var(--ink);
  font-size: 1.2rem;
  font-weight: 700;
}

.service-description {
  color: var(--medium-gray);
  line-height: 1.7;
}

/* CTA */
.cta-section {
  padding: 56px 0;
  background: var(--ink);
  color: var(--white);
  border-top: 4px solid var(--primary-green);
}

.cta-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
}

.cta-title {
  margin-bottom: 8px;
  font-size: 1.75rem;
  font-weight: 800;
}

.cta-subtitle {
  color: #b8bec4;
}

/* Responsive */
@media (max-width: 1024px) {
  .hero-inner {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .trust-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .trust-item:nth-child(2) {
    border-right: none;
  }

  .trust-item:nth-child(-n + 2) {
    border-bottom: 1px solid var(--line);
  }

  .brands-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 767px) {
  .hero {
    padding: 56px 0 96px;
  }

  .hero-title {
    font-size: 2.2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .hero-buttons .btn {
    flex: 1;
  }

  .finder {
    padding: 22px;
  }

  .section {
    padding: 56px 0;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }

  .brands-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .brand-item {
    height: 120px;
  }

  .cta-inner .btn {
    width: 100%;
  }
}

@media (max-width: 520px) {
  .trust-grid {
    grid-template-columns: 1fr;
  }

  .trust-item {
    border-right: none;
    border-bottom: 1px solid var(--line);
  }

  .trust-item:last-child {
    border-bottom: none;
  }
}
</style>
