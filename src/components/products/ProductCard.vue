<template>
  <div class="product-card">
    <!-- Image de la pièce avec gestion d'erreur améliorée et hauteur augmentée -->
    <div class="relative h-80 bg-gray-100 overflow-hidden rounded-t-xl">
      <div v-if="imageLoading" class="image-placeholder">
        <div class="loading-spinner"></div>
      </div>
      <img
        v-show="!imageLoading && !imageError"
        :src="product.image"
        :alt="product.name"
        class="w-full h-full object-cover object-center transition-opacity duration-300"
        @load="handleImageLoad"
        @error="handleImageError"
      />
      <div v-if="imageError" class="image-fallback">
        <svg
          class="w-12 h-12 text-gray-400 mb-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          ></path>
        </svg>
        <span class="text-sm text-gray-500 font-medium text-center">{{ product.name }}</span>
      </div>
    </div>

    <!-- Contenu de la carte -->
    <div class="p-6 flex-1 flex flex-direction-column border-t-2 border-gray-400">
      <!-- Nom de la pièce -->
      <h3 class="text-xl font-semibold text-dark mb-3 leading-tight">
        {{ product.name }}
      </h3>

      <!-- Description -->
      <p class="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3 flex-1">
        {{ product.description }}
      </p>

      <!-- Tags marques de voiture avec limitation d'affichage -->
      <div class="flex items-center w-full">
        <div class="flex gap-2 flex-nowrap overflow-x-auto scrollbar-hide w-full">
          <span
            v-for="brandName in product.brand.slice(0, 2)"
            :key="brandName"
            class="brand-tag flex-shrink-0"
          >
            {{ brandName }}
          </span>
          <button
            v-if="product.brand.length > 2"
            @click="showModal = true"
            class="brand-tag brand-tag-more flex-shrink-0"
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
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid #e5e7eb;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
  border-color: rgba(0, 184, 148, 0.3);
}

/* CORRECTION: Container d'image avec dimensions fixes et object-fit */
.product-card .relative {
  position: relative;
  width: 100%;
  min-height: 320px; /* hauteur fixe */
  max-height: 320px; /* hauteur fixe */
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.product-card img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Force l'image à couvrir tout le conteneur */
  object-position: center; /* Centre l'image */
  display: block;
}

.image-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  z-index: 1;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e9ecef;
  border-top: 4px solid #00b894;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.image-fallback {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  text-align: center;
  padding: 20px;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.brand-tag {
  background: rgba(0, 184, 148, 0.1);
  color: #00b894;
  padding: 4px 10px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  border: 1px solid rgba(0, 184, 148, 0.2);
  display: inline-block;
  letter-spacing: 0.3px;
  white-space: nowrap;
}

/* Classe pour cacher les barres de défilement */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.brand-tag-more {
  background: rgba(0, 184, 148, 0.2);
  color: #00a085;
  font-weight: 700;
  font-size: 0.8rem;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
  user-select: none;
  min-width: 32px;
  text-align: center;
}

.brand-tag-more:hover {
  background: rgba(0, 184, 148, 0.3);
  transform: scale(1.05);
}

.brand-tag-more:active {
  transform: scale(0.95);
  background: rgba(0, 184, 148, 0.4);
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 15px;
  max-width: 400px;
  width: 100%;
  max-height: 80vh;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  animation: modalShow 0.3s ease;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
  background: linear-gradient(135deg, #00b894, #00a085);
  color: white;
}

.modal-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.3s ease;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.2);
}

.modal-body {
  padding: 20px;
  overflow-y: auto;
  max-height: 60vh;
}

.brand-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.brand-tag-modal {
  background: rgba(0, 184, 148, 0.1);
  color: #00b894;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  border: 1px solid rgba(0, 184, 148, 0.2);
  display: inline-block;
  letter-spacing: 0.5px;
}

.flex-direction-column {
  flex-direction: column;
}

/* Animations */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes modalShow {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .product-card {
    border-radius: 12px;
  }

  .product-card .relative {
    min-height: 200px;
    max-height: 200px;
  }

  .p-6 {
    padding: 1rem;
  }

  .text-xl {
    font-size: 1rem;
  }

  .text-sm {
    font-size: 0.8rem;
  }

  .brand-tag {
    font-size: 0.7rem;
    padding: 3px 8px;
    border-radius: 12px;
  }

  .brand-tag-more {
    font-size: 0.65rem;
    min-width: 28px;
  }

  .modal-content {
    margin: 10px;
    max-width: none;
  }

  .modal-header {
    padding: 15px;
  }

  .modal-body {
    padding: 15px;
  }
}
</style>
