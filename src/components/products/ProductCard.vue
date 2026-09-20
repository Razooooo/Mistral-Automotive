<template>
  <div class="product-card">
    <!-- Image de la pièce avec gestion d'erreur améliorée et hauteur augmentée -->
    <div class="relative">
      <div v-if="imageLoading" class="image-placeholder">
        <div class="loading-spinner"></div>
      </div>
      <img
        v-show="!imageLoading && !imageError"
        :src="product.image"
        :alt="product.name"
        @load="handleImageLoad"
        @error="handleImageError"
      />
      <div v-if="imageError" class="image-fallback">
        <svg class="fallback-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          ></path>
        </svg>
        <span class="fallback-name">{{ product.name }}</span>
      </div>
    </div>

    <!-- Contenu de la carte -->
    <div class="product-body">
      <!-- Nom de la pièce -->
      <h3 class="product-name">
        {{ product.name }}
      </h3>

      <!-- Description -->
      <p class="product-description">
        {{ product.description }}
      </p>

      <!-- Tags marques de voiture avec limitation d'affichage -->
      <div class="brand-row">
        <div class="brand-row-inner">
          <span v-for="brandName in product.brand.slice(0, 2)" :key="brandName" class="brand-tag">
            {{ brandName }}
          </span>
          <button
            v-if="product.brand.length > 2"
            @click="showModal = true"
            class="brand-tag brand-tag-more"
          >
            +{{ product.brand.length - 2 }}
          </button>
        </div>
      </div>
    </div>

    <!-- Modal pour afficher toutes les marques -->
    <div v-if="showModal" class="modal-overlay" @click="showModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h4 class="modal-title">Marques compatibles</h4>
          <button @click="showModal = false" class="modal-close">×</button>
        </div>
        <div class="modal-body">
          <div class="brand-grid">
            <span
              v-for="brandName in product.brand"
              :key="brandName"
              class="brand-tag brand-tag-modal"
            >
              {{ brandName }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Product } from '../../types'

// Interface Props
interface Props {
  product: Product
}

const props = defineProps<Props>()

// État réactif pour la gestion des images
const imageLoading = ref(true)
const imageError = ref(false)

// État pour le modal
const showModal = ref(false)

// Gestion du chargement réussi
const handleImageLoad = () => {
  imageLoading.value = false
  imageError.value = false
}

// Gestion des erreurs d'image - SANS appel externe
const handleImageError = () => {
  console.warn(`Image non trouvée: ${props.product.image}`)
  imageLoading.value = false
  imageError.value = true
  // Plus d'appel à via.placeholder.com - on utilise le fallback CSS
}
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  overflow: hidden;
  background: var(--white);
  border: 1px solid var(--line);
  border-radius: 6px;
  transition:
    border-color 0.15s,
    box-shadow 0.15s;
}

.product-card:hover {
  border-color: var(--primary-green);
  box-shadow: 0 8px 20px rgba(22, 25, 28, 0.08);
}

/* Image */
.product-card .relative {
  position: relative;
  width: 100%;
  height: 220px;
  background: var(--light-gray);
}

.product-card img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.image-placeholder,
.image-fallback {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--light-gray);
}

.image-placeholder {
  z-index: 1;
}

.fallback-icon {
  width: 40px;
  height: 40px;
  margin-bottom: 8px;
  color: #adb5bd;
}

.fallback-name {
  color: var(--medium-gray);
  font-size: 0.85rem;
  font-weight: 600;
}

.image-fallback {
  flex-direction: column;
  padding: 20px;
  text-align: center;
}

.loading-spinner {
  width: 36px;
  height: 36px;
  border: 3px solid var(--line);
  border-top-color: var(--primary-green);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Contenu */
.product-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 16px 18px 18px;
  border-top: 3px solid var(--primary-green);
}

.product-name {
  margin-bottom: 8px;
  color: var(--ink);
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.3;
}

.product-description {
  display: -webkit-box;
  flex: 1;
  margin-bottom: 12px;
  overflow: hidden;
  color: var(--medium-gray);
  font-size: 0.85rem;
  line-height: 1.55;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.product-description:empty {
  display: none;
}

/* Marques compatibles */
.brand-row {
  display: flex;
  flex-wrap: nowrap;
  gap: 6px;
  width: 100%;
  margin-top: auto;
  overflow-x: auto;
  scrollbar-width: none;
}

.brand-row-inner {
  display: flex;
  gap: 6px;
}

.brand-row::-webkit-scrollbar {
  display: none;
}

.brand-tag {
  display: inline-block;
  flex-shrink: 0;
  padding: 4px 10px;
  background: var(--light-gray);
  border: 1px solid var(--line);
  border-radius: 3px;
  color: var(--ink);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  white-space: nowrap;
}

.brand-tag-more {
  background: var(--primary-green);
  border-color: var(--primary-green);
  color: var(--white);
  cursor: pointer;
  user-select: none;
  transition: background 0.15s;
}

.brand-tag-more:hover {
  background: var(--dark-green);
}

/* Fenêtre des marques compatibles */
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(22, 25, 28, 0.6);
}

.modal-content {
  width: 100%;
  max-width: 420px;
  max-height: 80vh;
  overflow: hidden;
  background: var(--white);
  border-radius: 6px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  animation: modalShow 0.2s ease;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: var(--ink);
  border-bottom: 3px solid var(--primary-green);
  color: var(--white);
}

.modal-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.modal-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background: none;
  border: none;
  border-radius: 4px;
  color: var(--white);
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.15);
}

.modal-body {
  max-height: 60vh;
  padding: 20px;
  overflow-y: auto;
}

.brand-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.brand-tag-modal {
  padding: 6px 12px;
  font-size: 0.8rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes modalShow {
  from {
    opacity: 0;
    transform: translateY(-12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 767px) {
  .product-card .relative {
    height: 150px;
  }

  .product-body {
    padding: 12px;
  }

  .product-name {
    font-size: 0.9rem;
  }

  .product-description {
    font-size: 0.78rem;
  }

  .brand-tag {
    padding: 3px 8px;
    font-size: 0.65rem;
  }
}
</style>
