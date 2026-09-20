<template>
  <div class="min-h-screen bg-light">
    <!-- En-tête de page -->
    <section class="page-header">
      <div class="container">
        <div class="breadcrumb"><router-link to="/">Accueil</router-link> / Catalogue</div>
        <h1 class="page-title">Catalogue de <span class="text-accent">pièces automobiles</span></h1>
        <p class="page-subtitle">
          Découvrez notre gamme de pièces détachées RIDEX pour toutes marques de véhicules : qualité
          certifiée et prix compétitifs.
        </p>
      </div>
    </section>

    <!-- Recherche et filtres -->
    <section class="filters-section">
      <div class="container">
        <div class="filters-content">
          <div class="filters-row">
            <!-- Recherche -->
            <div class="search-container">
              <label class="filter-label" for="parts-search">Rechercher une pièce</label>
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
                  id="parts-search"
                  v-model="searchQuery"
                  type="text"
                  placeholder="Ex : plaquettes de frein, filtre à huile..."
                  class="search-input"
                />
              </div>
            </div>

            <!-- Filtres avec menu déroulant -->
            <div class="brand-filters">
              <span class="filter-label">Marque du véhicule</span>
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
    <section class="products-section">
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
        <div v-else class="no-products">
          <div class="no-products-icon">🔧</div>
          <h3 class="no-products-title">Aucune pièce trouvée</h3>
          <p class="no-products-text">
            Essayez de modifier votre recherche ou sélectionnez une autre marque
          </p>
          <button @click="clearFilters" class="btn btn-primary">Voir toutes les pièces</button>
        </div>
      </div>
    </section>

    <!-- Bandeau devis -->
    <section class="contact-section">
      <div class="container contact-inner">
        <div>
          <h2 class="contact-title">Besoin d'un devis personnalisé ?</h2>
          <p class="contact-subtitle">
            Notre équipe vous accompagne pour trouver la pièce dont vous avez besoin.
          </p>
        </div>
        <a :href="whatsappUrl" target="_blank" rel="noopener" class="btn btn-whatsapp">
          Devis WhatsApp
        </a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import ProductCard from '../components/products/ProductCard.vue'
import { products, contactInfo } from '../data/products'

// État des filtres
const route = useRoute()
const searchQuery = ref(typeof route.query.q === 'string' ? route.query.q : '')
const selectedBrand = ref(typeof route.query.brand === 'string' ? route.query.brand : '')
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
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* En-tête de page */
.page-header {
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
  padding: 56px 0 96px;
}

.page-header::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 6px;
  background: var(--primary-green);
}

.breadcrumb {
  margin-bottom: 14px;
  color: #b8bec4;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.breadcrumb a {
  color: var(--primary-green);
  text-decoration: none;
}

.page-title {
  margin-bottom: 14px;
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.15;
}

.text-accent {
  color: var(--primary-green);
}

.page-subtitle {
  max-width: 640px;
  color: #b8bec4;
  font-size: 1.05rem;
  line-height: 1.65;
}

/* Barre de filtres */
.filters-section {
  position: relative;
  z-index: 10;
  margin-top: -48px;
}

.filters-content {
  padding: 24px;
  background: var(--white);
  border: 1px solid var(--line);
  border-top: 4px solid var(--primary-green);
  border-radius: 6px;
  box-shadow: 0 10px 30px rgba(22, 25, 28, 0.08);
}

.filters-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 16px;
}

.filter-label {
  display: block;
  margin-bottom: 6px;
  color: var(--medium-gray);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.search-box {
  position: relative;
}

.search-input {
  width: 100%;
  padding: 0.85rem 1rem 0.85rem 2.9rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 0.95rem;
  background: var(--white);
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  width: 20px;
  height: 20px;
  transform: translateY(-50%);
  color: var(--medium-gray);
}

/* Menu déroulant des marques */
.dropdown-wrapper {
  position: relative;
}

.dropdown-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  padding: 0.85rem 1rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  background: var(--white);
  color: var(--ink);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.15s;
}

.dropdown-button:hover,
.dropdown-button.active {
  border-color: var(--primary-green);
}

.dropdown-text {
  flex: 1;
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dropdown-arrow {
  width: 18px;
  height: 18px;
  transition: transform 0.2s ease;
}

.dropdown-arrow.rotate {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
  margin-top: 4px;
  overflow: hidden;
  background: var(--white);
  border: 1px solid var(--line);
  border-radius: 4px;
  box-shadow: 0 10px 30px rgba(22, 25, 28, 0.15);
}

.dropdown-search {
  position: relative;
  padding: 12px;
  border-bottom: 1px solid var(--line);
}

.dropdown-search-input {
  width: 100%;
  padding: 9px 12px 9px 36px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 0.9rem;
}

.dropdown-search-icon {
  position: absolute;
  left: 24px;
  top: 50%;
  width: 16px;
  height: 16px;
  transform: translateY(-50%);
  color: var(--medium-gray);
}

.dropdown-options {
  max-height: 250px;
  overflow-y: auto;
}

.dropdown-option {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 11px 16px;
  border: none;
  background: none;
  color: var(--ink);
  font-size: 0.92rem;
  text-align: left;
  cursor: pointer;
}

.dropdown-option:hover {
  background: var(--light-gray);
}

.dropdown-option.selected {
  background: rgba(0, 184, 148, 0.1);
  color: var(--dark-green);
  font-weight: 700;
}

.check-icon {
  width: 16px;
  height: 16px;
  color: var(--primary-green);
}

.brand-count {
  margin-left: auto;
  color: var(--medium-gray);
  font-size: 0.8rem;
}

.results-info {
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid var(--line);
}

.results-text {
  color: var(--medium-gray);
  font-size: 0.95rem;
  font-weight: 500;
}

.clear-btn {
  margin-left: 8px;
  padding: 0;
  border: none;
  background: none;
  color: var(--primary-green);
  font-weight: 700;
  text-decoration: underline;
  cursor: pointer;
}

.clear-btn:hover {
  color: var(--dark-green);
}

/* Grille des produits */
.products-section {
  padding: 48px 0 88px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

/* Apparition des cartes produits (pilotée par le script) */
.product-card-animated {
  opacity: 0;
  transform: translateY(20px);
}

/* Aucun résultat */
.no-products {
  max-width: 560px;
  margin: 0 auto;
  padding: 64px 24px;
  background: var(--white);
  border: 1px solid var(--line);
  border-radius: 6px;
  text-align: center;
}

.no-products-icon {
  margin-bottom: 16px;
  font-size: 3rem;
}

.no-products-title {
  margin-bottom: 10px;
  color: var(--ink);
  font-size: 1.4rem;
  font-weight: 800;
}

.no-products-text {
  margin-bottom: 24px;
  color: var(--medium-gray);
}

/* Bandeau devis */
.contact-section {
  padding: 56px 0;
  background: var(--ink);
  color: var(--white);
  border-top: 4px solid var(--primary-green);
}

.contact-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
}

.contact-title {
  margin-bottom: 8px;
  font-size: 1.75rem;
  font-weight: 800;
}

.contact-subtitle {
  color: #b8bec4;
}

/* Responsive */
@media (max-width: 767px) {
  .page-header {
    padding: 40px 0 80px;
  }

  .page-title {
    font-size: 1.8rem;
  }

  .filters-content {
    padding: 18px;
  }

  .filters-row {
    grid-template-columns: 1fr;
  }

  .products-section {
    padding: 32px 0 56px;
  }

  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .contact-inner .btn {
    width: 100%;
  }
}

/* Scrollbar du menu déroulant */
.dropdown-options::-webkit-scrollbar {
  width: 6px;
}

.dropdown-options::-webkit-scrollbar-thumb {
  background: #ced4da;
  border-radius: 3px;
}
</style>
