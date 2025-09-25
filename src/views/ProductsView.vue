<template>
  <div class="min-h-screen bg-light">
    <!-- Header Hero avec le même design vert que la page d'accueil -->
    <section class="hero hero-background">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title fade-in-up">
            Nos <span class="text-yellow">Pièces Automobiles</span>
          </h1>
          <p class="hero-subtitle fade-in-up" style="animation-delay: 0.2s">
            Découvrez notre gamme complète de pièces détachées RIDEX<br />
            pour toutes marques de véhicules - Qualité certifiée et prix compétitifs
          </p>
        </div>
      </div>

      <!-- Éléments décoratifs flottants -->
      <div class="floating-elements">
        <div class="floating-circle circle-1"></div>
        <div class="floating-circle circle-2"></div>
        <div class="floating-circle circle-3"></div>
      </div>
    </section>

    <!-- Section de recherche et filtres avec effet glassmorphism -->
    <section class="filters-section glass-section">
      <div class="container">
        <div class="filters-content fade-in-up" style="animation-delay: 0.4s">
          <!-- Barre de recherche principale -->
          <div class="search-container">
            <div class="search-box">
              <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Rechercher une pièce (ex: plaquettes de frein, filtre à huile...)"
                class="search-input"
              />
            </div>
          </div>

          <!-- Filtres avec menu déroulant -->
          <div class="brand-filters">
            <h3 class="filter-title">Filtrer par marque :</h3>
            <div class="dropdown-container">
              <!-- Menu déroulant des marques -->
              <div class="dropdown-wrapper">
                <button
                  @click="toggleDropdown"
                  class="dropdown-button"
                  :class="{ active: isDropdownOpen }"
                >
                  <span class="dropdown-text">
                    {{ selectedBrand || 'Toutes les marques' }}
                  </span>
                  <svg
                    class="dropdown-arrow"
                    :class="{ rotate: isDropdownOpen }"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>

                <!-- Liste déroulante -->
                <div v-if="isDropdownOpen" class="dropdown-menu">
                  <div class="dropdown-search">
                    <svg
                      class="dropdown-search-icon"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                    <input
                      v-model="brandSearchQuery"
                      type="text"
                      placeholder="Rechercher une marque..."
                      class="dropdown-search-input"
                    />
                  </div>

                  <div class="dropdown-options">
                    <button
                      @click="selectBrand('')"
                      :class="['dropdown-option', { selected: selectedBrand === '' }]"
                    >
                      <svg
                        v-if="selectedBrand === ''"
                        class="check-icon"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      Toutes les marques
                      <span class="brand-count">({{ products.length }})</span>
                    </button>

                    <button
                      v-for="brand in filteredBrands"
                      :key="brand"
                      @click="selectBrand(brand)"
                      :class="['dropdown-option', { selected: selectedBrand === brand }]"
                    >
                      <svg
                        v-if="selectedBrand === brand"
                        class="check-icon"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      {{ brand }}
                      <span class="brand-count">({{ getBrandCount(brand) }})</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Résultats -->
          <div class="results-info">
            <p class="results-text">
              {{ filteredProducts.length }} pièce{{
                filteredProducts.length > 1 ? 's' : ''
              }}
              trouvée{{ filteredProducts.length > 1 ? 's' : '' }}
              <span v-if="searchQuery || selectedBrand">
                <button @click="clearFilters" class="clear-btn">Réinitialiser</button>
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Grille des produits avec effet pattern background -->
    <section class="products-section pattern-background">
      <div class="container">
        <!-- Produits trouvés -->
        <div v-if="filteredProducts.length > 0" class="products-grid" ref="productsGrid">
          <ProductCard
            v-for="(product, index) in filteredProducts"
            :key="product.id"
            :product="product"
            :style="{ animationDelay: `${index * 0.1}s` }"
            class="product-card-animated"
          />
        </div>

        <!-- Message si aucun produit -->
        <div v-else class="no-products fade-in-up">
          <div class="no-products-icon">🔧</div>
          <h3 class="no-products-title">Aucune pièce trouvée</h3>
          <p class="no-products-text">
            Essayez de modifier votre recherche ou sélectionnez une autre marque
          </p>
          <button @click="clearFilters" class="btn btn-primary">Voir toutes les pièces</button>
        </div>
      </div>
    </section>

    <!-- Section contact pour devis avec fond sombre -->
    <section class="contact-section bg-dark">
      <div class="container">
        <div class="contact-content fade-in-up">
          <h2 class="contact-title">Besoin d'un devis personnalisé ?</h2>
          <p class="contact-subtitle">
            Notre équipe vous accompagne pour trouver la pièce dont vous avez besoin
          </p>
          <div class="contact-buttons">
            <a :href="whatsappUrl" target="_blank" class="btn btn-whatsapp">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"
                />
              </svg>
              Devis WhatsApp
            </a>
            <a :href="`tel:${contactInfo.phone}`" class="btn btn-primary">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                ></path>
              </svg>
              Appel direct
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, onUnmounted } from 'vue'
import ProductCard from '../components/products/ProductCard.vue'
import { products, contactInfo } from '../data/products'

// État des filtres
const searchQuery = ref('')
const selectedBrand = ref('')
const brandSearchQuery = ref('')
const isDropdownOpen = ref(false)
const productsGrid = ref<HTMLElement | null>(null)

// Marques disponibles (extraites des produits)
const brands = computed(() => {
  const allBrands = products.flatMap((product) => product.brand)
  return [...new Set(allBrands)].sort()
})

// Marques filtrées par la recherche dans le dropdown
const filteredBrands = computed(() => {
  if (!brandSearchQuery.value) return brands.value
  return brands.value.filter((brand) =>
    brand.toLowerCase().includes(brandSearchQuery.value.toLowerCase()),
  )
})

// URL WhatsApp pour devis général
const whatsappUrl = computed(() => {
  const message = `Bonjour ! J'aimerais obtenir un devis pour des pièces automobiles.`
  const phoneNumber = contactInfo.phone.replace(/\s+/g, '').replace('+', '')
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
})

// Produits filtrés
const filteredProducts = computed(() => {
  let filtered = products

  // Filtre par recherche (nom de la pièce)
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.brand.some((brand) => brand.toLowerCase().includes(query)),
    )
  }

  // Filtre par marque
  if (selectedBrand.value) {
    filtered = filtered.filter((product) => product.brand.includes(selectedBrand.value))
  }

  return filtered
})

// Fonctions pour le dropdown
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
  if (isDropdownOpen.value) {
    brandSearchQuery.value = ''
  }
}

const selectBrand = (brand: string) => {
  selectedBrand.value = brand
  isDropdownOpen.value = false
  brandSearchQuery.value = ''
}

const getBrandCount = (brand: string) => {
  return products.filter((product) => product.brand.includes(brand)).length
}

// Fermer le dropdown si on clique ailleurs
const handleClickOutside = (event: Event) => {
  const dropdown = document.querySelector('.dropdown-wrapper')
  if (dropdown && !dropdown.contains(event.target as Node)) {
    isDropdownOpen.value = false
  }
}

// Animation des cartes produits
const animateProductCards = () => {
  nextTick(() => {
    const cards = document.querySelectorAll('.product-card-animated')

    // Reset de toutes les cartes
    cards.forEach((card) => {
      const element = card as HTMLElement
      element.style.opacity = '0'
      element.style.transform = 'translateY(30px)'
    })

    // Animation séquentielle
    cards.forEach((card, index) => {
      const element = card as HTMLElement
      setTimeout(() => {
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
        element.style.opacity = '1'
        element.style.transform = 'translateY(0)'
      }, index * 100)
    })
  })
}

// Fonctions
const clearFilters = () => {
  searchQuery.value = ''
  selectedBrand.value = ''
  isDropdownOpen.value = false
}

// Watcher pour animer les cartes quand les produits changent
import { watch } from 'vue'
watch(
  filteredProducts,
  () => {
    animateProductCards()
  },
  { flush: 'post' },
)

// Lifecycle hooks
onMounted(() => {
  // Animation initiale des cartes
  animateProductCards()

  // Event listener pour fermer le dropdown
  document.addEventListener('click', handleClickOutside)

  // Animation des éléments de la page
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in')
      }
    })
  }, observerOptions)

  // Observer les éléments après un délai
  setTimeout(() => {
    const animatableElements = document.querySelectorAll('.fade-in-up')
    animatableElements.forEach((el) => observer.observe(el))
  }, 100)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* Hero Section - Même style que la page d'accueil */
.hero {
  padding: 120px 0;
  text-align: center;
  position: relative;
  color: white;
  overflow: hidden;
  min-height: 80vh;
  display: flex;
  align-items: center;
}

.hero::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(to bottom, transparent, rgba(248, 249, 250, 0.3));
}

.hero-content {
  position: relative;
  z-index: 10;
}

.hero-title {
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 30px;
  line-height: 1.1;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: 1.4rem;
  margin-bottom: 50px;
  opacity: 0.95;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

/* Éléments décoratifs flottants */
.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.floating-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 6s ease-in-out infinite;
}

.circle-1 {
  width: 100px;
  height: 100px;
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.circle-2 {
  width: 150px;
  height: 150px;
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.circle-3 {
  width: 80px;
  height: 80px;
  bottom: 30%;
  left: 20%;
  animation-delay: 4s;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.7;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 1;
  }
}

/* Section filtres avec glassmorphism */
.filters-section {
  padding: 60px 0;
  position: relative;
  margin-top: -50px;
  z-index: 10;
}

.filters-content {
  max-width: 1000px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 25px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.search-container {
  margin-bottom: 40px;
}

.search-box {
  position: relative;
  max-width: 600px;
  margin: 0 auto;
}

.search-input {
  width: 100%;
  padding: 18px 20px 18px 55px;
  border: 2px solid rgba(0, 184, 148, 0.2);
  border-radius: 50px;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-green);
  background: white;
  box-shadow: 0 0 0 4px rgba(0, 184, 148, 0.1);
}

.search-icon {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: var(--primary-green);
}

.brand-filters {
  margin-bottom: 30px;
}

.filter-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--dark-bg);
  margin-bottom: 25px;
  text-align: center;
  position: relative;
}

.filter-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(135deg, var(--primary-green), var(--accent-yellow));
  border-radius: 2px;
}

/* Styles du dropdown */
.dropdown-container {
  display: flex;
  justify-content: center;
}

.dropdown-wrapper {
  position: relative;
  min-width: 300px;
  max-width: 400px;
}

.dropdown-button {
  width: 100%;
  padding: 15px 20px;
  border: 2px solid rgba(0, 184, 148, 0.2);
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.9);
  color: var(--primary-green);
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.dropdown-button:hover {
  border-color: var(--primary-green);
  background: white;
  box-shadow: 0 4px 15px rgba(0, 184, 148, 0.15);
}

.dropdown-button.active {
  border-color: var(--primary-green);
  background: white;
  box-shadow: 0 4px 15px rgba(0, 184, 148, 0.2);
}

.dropdown-text {
  flex: 1;
  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.dropdown-arrow {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.dropdown-arrow.rotate {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid rgba(0, 184, 148, 0.2);
  border-radius: 15px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  margin-top: 5px;
  overflow: hidden;
  animation: dropdownOpen 0.3s ease;
}

@keyframes dropdownOpen {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-search {
  position: relative;
  padding: 15px;
  border-bottom: 1px solid rgba(0, 184, 148, 0.1);
}

.dropdown-search-input {
  width: 100%;
  padding: 10px 15px 10px 40px;
  border: 1px solid rgba(0, 184, 148, 0.2);
  border-radius: 10px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.dropdown-search-input:focus {
  outline: none;
  border-color: var(--primary-green);
  box-shadow: 0 0 0 3px rgba(0, 184, 148, 0.1);
}

.dropdown-search-icon {
  position: absolute;
  left: 25px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: rgba(0, 184, 148, 0.6);
}

.dropdown-options {
  max-height: 250px;
  overflow-y: auto;
}

.dropdown-option {
  width: 100%;
  padding: 12px 20px;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.95rem;
  color: #333;
}

.dropdown-option:hover {
  background: rgba(0, 184, 148, 0.05);
}

.dropdown-option.selected {
  background: rgba(0, 184, 148, 0.1);
  color: var(--primary-green);
  font-weight: 600;
}

.check-icon {
  width: 16px;
  height: 16px;
  color: var(--primary-green);
}

.brand-count {
  margin-left: auto;
  font-size: 0.8rem;
  color: rgba(0, 184, 148, 0.7);
  font-weight: 500;
}

.results-info {
  text-align: center;
}

.results-text {
  color: var(--medium-gray);
  font-size: 1rem;
  font-weight: 500;
}

.clear-btn {
  margin-left: 8px;
  color: var(--primary-green);
  text-decoration: underline;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: color 0.3s ease;
}

.clear-btn:hover {
  color: var(--dark-green);
}

/* Section produits */
.products-section {
  padding: 80px 0;
  position: relative;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
}

/* Animation spéciale pour les cartes produits */
.product-card-animated {
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
}

/* Message aucun produit */
.no-products {
  text-align: center;
  padding: 80px 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 25px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin: 0 auto;
  max-width: 600px;
}

.no-products-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.no-products-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--dark-bg);
  margin-bottom: 15px;
}

.no-products-text {
  color: var(--medium-gray);
  margin-bottom: 30px;
  font-size: 1.1rem;
  line-height: 1.6;
}

/* Section contact */
.contact-section {
  padding: 100px 0;
  position: relative;
  overflow: hidden;
}

.contact-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 30% 20%, rgba(0, 184, 148, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 70% 80%, rgba(253, 203, 110, 0.3) 0%, transparent 50%);
}

.contact-content {
  text-align: center;
  position: relative;
  z-index: 2;
  max-width: 700px;
  margin: 0 auto;
}

.contact-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 25px;
  color: white;
  line-height: 1.2;
}

.contact-subtitle {
  font-size: 1.3rem;
  opacity: 0.9;
  margin-bottom: 50px;
  line-height: 1.6;
  color: white;
}

.contact-buttons {
  display: flex;
  gap: 25px;
  justify-content: center;
  flex-wrap: wrap;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}

.animate-in {
  animation: fadeInUp 0.8s ease-out forwards;
}

/* Responsive */
@media (max-width: 768px) {
  .hero {
    padding: 80px 0;
    min-height: 70vh;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .filters-content {
    padding: 30px 20px;
    margin: 0 20px;
  }

  .dropdown-wrapper {
    min-width: 100%;
  }

  .dropdown-button {
    padding: 12px 16px;
    font-size: 0.9rem;
  }

  .dropdown-menu {
    margin-top: 3px;
  }

  .dropdown-search {
    padding: 12px;
  }

  .dropdown-search-input {
    padding: 8px 12px 8px 35px;
    font-size: 0.85rem;
  }

  .dropdown-search-icon {
    left: 22px;
    width: 14px;
    height: 14px;
  }

  .dropdown-option {
    padding: 10px 16px;
    font-size: 0.9rem;
  }

  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }

  .contact-buttons {
    flex-direction: column;
    align-items: center;
  }

  .contact-title {
    font-size: 2.2rem;
  }

  .floating-circle {
    display: none;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .search-input {
    padding: 15px 18px 15px 50px;
    font-size: 1rem;
  }

  .search-icon {
    width: 18px;
    height: 18px;
    left: 16px;
  }

  .filters-content {
    padding: 25px 15px;
  }

  .dropdown-button {
    padding: 10px 14px;
    font-size: 0.85rem;
  }

  .dropdown-options {
    max-height: 200px;
  }

  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .brand-count {
    font-size: 0.75rem;
  }
}

/* Scrollbar personnalisée pour le dropdown */
.dropdown-options::-webkit-scrollbar {
  width: 6px;
}

.dropdown-options::-webkit-scrollbar-track {
  background: rgba(0, 184, 148, 0.05);
  border-radius: 3px;
}

.dropdown-options::-webkit-scrollbar-thumb {
  background: rgba(0, 184, 148, 0.3);
  border-radius: 3px;
}

.dropdown-options::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 184, 148, 0.5);
}
</style>
