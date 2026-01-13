<template>
  <div id="app">
    <NewYearPopup />
    <AppHeader store-name="Mistral Automotive" />
    <main class="main-content">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import AppHeader from './components/common/AppHeader.vue'
import AppFooter from './components/common/AppFooter.vue'
import NewYearPopup from './components/common/NewYearPopup.vue'

// Effets de scroll (version simplifiée sans erreurs)
const initScrollEffects = () => {
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.header') as HTMLElement
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled')
      } else {
        header.classList.remove('scrolled')
      }
    }

    // Parallax pour le hero (optionnel)
    const hero = document.querySelector('.hero-background') as HTMLElement
    if (hero) {
      const scrolled = window.pageYOffset
      hero.style.transform = `translateY(${scrolled * 0.3}px)`
    }
  })
}

// Animations d'apparition simplifiées (sans AOS)
const initAnimations = () => {
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

  // Observer les éléments animables après un délai
  setTimeout(() => {
    const animatableElements = document.querySelectorAll(
      '.service-card, .brand-item, .product-card',
    )
    animatableElements.forEach((el) => observer.observe(el))
  }, 100)
}

// Initialisation au montage
onMounted(() => {
  initScrollEffects()
  initAnimations()
})
</script>

<style>
/* Reset global */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f8f9fa;
  overflow-x: hidden;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}

/* Variables CSS pour les couleurs Mistral */
:root {
  --primary-green: #00b894;
  --dark-green: #00a085;
  --accent-yellow: #fdcb6e;
  --dark-yellow: #e17055;
  --dark-bg: #2d3436;
  --light-gray: #f8f9fa;
  --medium-gray: #6c757d;
  --white: #ffffff;
  --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.15);
}

/* Effets de fond sophistiqués */
.hero-background {
  background: linear-gradient(135deg, var(--primary-green) 0%, var(--dark-green) 100%);
  position: relative;
  overflow: hidden;
}

.hero-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
    linear-gradient(45deg, transparent 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%);
  animation: shimmer 8s ease-in-out infinite;
}

@keyframes shimmer {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

/* Fond blanc avec effet glassmorphism */
.glass-section {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
}

.glass-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    rgba(0, 184, 148, 0.03) 0%,
    rgba(253, 203, 110, 0.03) 50%,
    rgba(0, 184, 148, 0.03) 100%
  );
  pointer-events: none;
}

/* Pattern de fond subtil */
.pattern-background {
  background-color: #fafbfc;
  background-image:
    radial-gradient(circle at 25px 25px, rgba(0, 184, 148, 0.1) 2px, transparent 2px),
    radial-gradient(circle at 75px 75px, rgba(253, 203, 110, 0.1) 2px, transparent 2px);
  background-size: 100px 100px;
  position: relative;
}

.pattern-background::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 249, 250, 0.9) 100%);
  pointer-events: none;
  z-index: 1;
}

.pattern-background > * {
  position: relative;
  z-index: 2;
}

/* Classes utilitaires de base */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.items-center {
  align-items: center;
}

.justify-between {
  justify-content: space-between;
}

.justify-center {
  justify-content: center;
}

.gap-2 {
  gap: 0.5rem;
}

.gap-4 {
  gap: 1rem;
}

.gap-8 {
  gap: 2rem;
}

.grid {
  display: grid;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, 1fr);
}

.grid-cols-3 {
  grid-template-columns: repeat(3, 1fr);
}

@media (min-width: 768px) {
  .md\:grid-cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }
  .md\:grid-cols-3 {
    grid-template-columns: repeat(3, 1fr);
  }
  .md\:flex {
    display: flex;
  }
  .md\:hidden {
    display: none;
  }
  .md\:block {
    display: block;
  }
}

@media (min-width: 1024px) {
  .lg\:grid-cols-3 {
    grid-template-columns: repeat(3, 1fr);
  }
  .lg\:grid-cols-4 {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Couleurs */
.bg-white {
  background-color: var(--white);
}

.bg-green {
  background-color: var(--primary-green);
}

.bg-green-dark {
  background-color: var(--dark-green);
}

.bg-yellow {
  background-color: var(--accent-yellow);
}

.bg-dark {
  background-color: var(--dark-bg);
}

.bg-light {
  background-color: var(--light-gray);
}

.bg-gray-200 {
  background-color: #e9ecef;
}

.text-white {
  color: var(--white);
}

.text-green {
  color: var(--primary-green);
}

.text-yellow {
  color: var(--accent-yellow);
}

.text-dark {
  color: var(--dark-bg);
}

.text-gray {
  color: var(--medium-gray);
}

.text-gray-600 {
  color: #6c757d;
}

.text-gray-900 {
  color: #212529;
}

/* Typographie */
.text-xs {
  font-size: 0.75rem;
}

.text-sm {
  font-size: 0.875rem;
}

.text-lg {
  font-size: 1.125rem;
}

.text-xl {
  font-size: 1.25rem;
}

.text-2xl {
  font-size: 1.5rem;
}

.text-3xl {
  font-size: 1.875rem;
}

.text-4xl {
  font-size: 2.25rem;
}

.text-5xl {
  font-size: 3rem;
}

.text-6xl {
  font-size: 3.75rem;
}

.font-medium {
  font-weight: 500;
}

.font-semibold {
  font-weight: 600;
}

.font-bold {
  font-weight: 700;
}

.leading-tight {
  line-height: 1.25;
}

.leading-relaxed {
  line-height: 1.625;
}

/* Espacement */
.p-2 {
  padding: 0.5rem;
}

.p-4 {
  padding: 1rem;
}

.p-6 {
  padding: 1.5rem;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.py-3 {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

.py-4 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.py-12 {
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.py-16 {
  padding-top: 4rem;
  padding-bottom: 4rem;
}

.py-20 {
  padding-top: 5rem;
  padding-bottom: 5rem;
}

.px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.px-8 {
  padding-left: 2rem;
  padding-right: 2rem;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.mb-3 {
  margin-bottom: 0.75rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mb-6 {
  margin-bottom: 1.5rem;
}

.mb-8 {
  margin-bottom: 2rem;
}

.mb-12 {
  margin-bottom: 3rem;
}

.mb-16 {
  margin-bottom: 4rem;
}

.mr-2 {
  margin-right: 0.5rem;
}

.mr-3 {
  margin-right: 0.75rem;
}

.ml-2 {
  margin-left: 0.5rem;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

/* Dimensions */
.w-2 {
  width: 0.5rem;
}

.w-4 {
  width: 1rem;
}

.w-5 {
  width: 1.25rem;
}

.w-6 {
  width: 1.5rem;
}

.w-full {
  width: 100%;
}

.h-2 {
  height: 0.5rem;
}

.h-4 {
  height: 1rem;
}

.h-5 {
  height: 1.25rem;
}

.h-6 {
  height: 1.5rem;
}

.h-16 {
  height: 4rem;
}

.h-48 {
  height: 12rem;
}

.h-64 {
  height: 16rem;
}

.max-w-2xl {
  max-width: 42rem;
}

.max-w-3xl {
  max-width: 48rem;
}

.max-w-6xl {
  max-width: 72rem;
}

/* Bordures et arrondis */
.rounded {
  border-radius: 0.375rem;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.rounded-full {
  border-radius: 9999px;
}

.border {
  border: 1px solid #dee2e6;
}

.border-b {
  border-bottom: 1px solid #dee2e6;
}

.border-2 {
  border: 2px solid;
}

.border-white {
  border-color: var(--white);
}

/* Ombres */
.shadow-sm {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.shadow-md {
  box-shadow: var(--shadow);
}

.shadow-lg {
  box-shadow: var(--shadow-lg);
}

.shadow-xl {
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
}

/* Positionnement */
.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

.sticky {
  position: sticky;
}

.top-0 {
  top: 0;
}

.top-3 {
  top: 0.75rem;
}

.right-3 {
  right: 0.75rem;
}

.left-3 {
  left: 0.75rem;
}

.bottom-0 {
  bottom: 0;
}

.z-50 {
  z-index: 50;
}

/* Débordement */
.overflow-hidden {
  overflow: hidden;
}

.object-cover {
  object-fit: cover;
}

/* Transitions */
.transition-colors {
  transition-property: color, background-color, border-color;
  transition-duration: 0.15s;
  transition-timing-function: ease-in-out;
}

.transition-all {
  transition: all 0.3s ease;
}

.duration-200 {
  transition-duration: 0.2s;
}

.duration-300 {
  transition-duration: 0.3s;
}

/* Transform */
.transform {
  transform: translateZ(0);
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

.hover\:-translate-y-1:hover {
  transform: translateY(-0.25rem);
}

/* Boutons avec effets améliorés */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  border-radius: 50px;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.btn:hover::before {
  left: 100%;
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary-green), var(--dark-green));
  color: var(--white);
  box-shadow: 0 8px 25px rgba(0, 184, 148, 0.3);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(0, 184, 148, 0.4);
}

.btn-secondary {
  background: linear-gradient(135deg, var(--accent-yellow), var(--dark-yellow));
  color: var(--dark-bg);
  box-shadow: 0 8px 25px rgba(253, 203, 110, 0.3);
}

.btn-secondary:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(253, 203, 110, 0.4);
}

.btn-outline {
  background-color: transparent;
  color: var(--white);
  border: 2px solid var(--white);
}

.btn-outline:hover {
  background-color: var(--white);
  color: var(--primary-green);
  transform: translateY(-3px);
}

.btn-whatsapp {
  background: linear-gradient(135deg, #25d366, #128c7e);
  color: var(--white);
  box-shadow: 0 8px 25px rgba(37, 211, 102, 0.3);
}

.btn-whatsapp:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(37, 211, 102, 0.4);
}

.btn:disabled {
  background-color: #adb5bd;
  cursor: not-allowed;
  transform: none;
}

/* Cards avec effets 3D */
.card {
  background-color: var(--white);
  border-radius: 20px;
  box-shadow: var(--shadow);
  overflow: hidden;
  transition: all 0.4s ease;
  transform-style: preserve-3d;
  perspective: 1000px;
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-8px) rotateY(2deg) rotateX(2deg);
}

.card-image {
  width: 100%;
  height: 12rem;
  object-fit: cover;
  background-color: #e9ecef;
  transition: transform 0.3s ease;
}

.card:hover .card-image {
  transform: scale(1.05);
}

/* Badges */
.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 9999px;
}

.badge-featured {
  background: linear-gradient(45deg, var(--accent-yellow), var(--dark-yellow));
  color: var(--white);
}

.badge-stock {
  background-color: #dc3545;
  color: var(--white);
}

.badge-category {
  background-color: rgba(0, 184, 148, 0.1);
  color: var(--primary-green);
}

/* Status indicators */
.status-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  margin-right: 0.5rem;
}

.status-available {
  background-color: #28a745;
}

.status-unavailable {
  background-color: #dc3545;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeInUp 0.6s ease-out;
}

.animate-in {
  animation: fadeInUp 0.8s ease-out;
}

/* Elements animables par défaut */
.service-card,
.brand-item,
.product-card {
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
}

.service-card.animate-in,
.brand-item.animate-in,
.product-card.animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* Responsive utilities */
.hidden {
  display: none;
}

@media (max-width: 767px) {
  .md\:hidden {
    display: none;
  }
  .mobile-only {
    display: block;
  }
}

@media (min-width: 768px) {
  .mobile-only {
    display: none;
  }
}

/* Formulaires */
input,
select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.15s;
}

input:focus,
select:focus {
  outline: none;
  border-color: var(--primary-green);
  box-shadow: 0 0 0 2px rgba(0, 184, 148, 0.2);
}

/* Scrollbar personnalisée */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--light-gray);
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, var(--primary-green), var(--dark-green));
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, var(--dark-green), var(--primary-green));
}

/* Responsive amélioré */
@media (max-width: 480px) {
  .container {
    padding: 0 15px;
  }

  .btn {
    padding: 12px 24px;
    font-size: 0.9rem;
  }

  .text-4xl {
    font-size: 2rem;
  }

  .text-3xl {
    font-size: 1.75rem;
  }
}
</style>
