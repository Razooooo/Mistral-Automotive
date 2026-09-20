<template>
  <!-- Barre d'information -->
  <div class="topbar">
    <div class="container topbar-inner">
      <span class="topbar-tagline">Distributeur de pièces automobiles RIDEX à Madagascar</span>
      <div class="topbar-links">
        <a :href="`tel:${contactInfo.phone}`" class="topbar-link">
          <svg class="topbar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          {{ contactInfo.phone }}
        </a>
        <a :href="whatsappUrl" target="_blank" rel="noopener" class="topbar-link">
          <svg class="topbar-icon" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"
            />
          </svg>
          WhatsApp
        </a>
        <a :href="contactInfo.facebook" target="_blank" rel="noopener" class="topbar-link">
          <svg class="topbar-icon" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
            />
          </svg>
          Facebook
        </a>
      </div>
    </div>
  </div>

  <header class="header" :class="{ scrolled: isScrolled }">
    <div class="container">
      <div class="header-content">
        <!-- Logo -->
        <router-link to="/" class="logo" @click="closeMobileMenu">
          <span class="logo-mark">M</span>
          <span class="logo-text">
            <span class="logo-name">{{ storeName }}</span>
            <span class="logo-slogan">Safety and comfort</span>
          </span>
        </router-link>

        <!-- Navigation desktop -->
        <nav class="nav">
          <router-link to="/" class="nav-link" :class="{ active: $route.path === '/' }">
            Accueil
          </router-link>
          <router-link
            to="/products"
            class="nav-link"
            :class="{ active: $route.path === '/products' }"
          >
            Catalogue
          </router-link>
        </nav>

        <!-- CTA desktop -->
        <a :href="whatsappUrl" target="_blank" rel="noopener" class="header-cta">
          Demander un devis
        </a>

        <!-- Bouton menu mobile -->
        <div class="mobile-toggle">
          <button
            @click="toggleMobileMenu"
            class="mobile-menu-btn"
            aria-label="Ouvrir le menu"
            :aria-expanded="mobileMenuOpen"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                v-if="!mobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Menu mobile -->
    <transition name="mobile-menu">
      <div v-show="mobileMenuOpen" class="mobile-menu">
        <div class="container mobile-menu-content">
          <router-link to="/" @click="closeMobileMenu" class="mobile-nav-link">Accueil</router-link>
          <router-link to="/products" @click="closeMobileMenu" class="mobile-nav-link">
            Catalogue
          </router-link>

          <div class="mobile-contact-section">
            <a
              :href="`tel:${contactInfo.phone}`"
              @click="closeMobileMenu"
              class="mobile-contact-link"
            >
              {{ contactInfo.phone }}
            </a>
            <a
              :href="whatsappUrl"
              target="_blank"
              rel="noopener"
              @click="closeMobileMenu"
              class="mobile-contact-link whatsapp"
            >
              WhatsApp
            </a>
            <a
              :href="contactInfo.facebook"
              target="_blank"
              rel="noopener"
              @click="closeMobileMenu"
              class="mobile-contact-link"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { contactInfo } from '../../data/products'

// Props
interface Props {
  storeName?: string
}

withDefaults(defineProps<Props>(), {
  storeName: 'Mistral Automotive',
})

// État du composant
const mobileMenuOpen = ref(false)
const isScrolled = ref(false)

// URL WhatsApp avec message prérempli
const whatsappUrl = computed(() => {
  const message = `Bonjour ! J'aimerais obtenir un devis pour des pièces automobiles.`
  const phoneNumber = contactInfo.phone.replace(/\s+/g, '').replace('+', '')
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
})

// Gestion du scroll
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

// Gestion du menu mobile
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value

  // Empêcher le scroll du body quand le menu est ouvert
  document.body.style.overflow = mobileMenuOpen.value ? 'hidden' : ''
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
  document.body.style.overflow = ''
}

// Fermer le menu mobile si on clique en dehors
const handleOutsideClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  const mobileMenu = document.querySelector('.mobile-menu')
  const menuButton = document.querySelector('.mobile-menu-btn')

  if (
    mobileMenuOpen.value &&
    mobileMenu &&
    !mobileMenu.contains(target) &&
    !menuButton?.contains(target)
  ) {
    closeMobileMenu()
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('click', handleOutsideClick)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleOutsideClick)
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* Barre d'information */
.topbar {
  background: var(--ink);
  color: #b8bec4;
  font-size: 0.8rem;
}

.topbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 38px;
}

.topbar-links {
  display: flex;
  align-items: center;
  gap: 24px;
}

.topbar-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #b8bec4;
  text-decoration: none;
  transition: color 0.15s;
}

.topbar-link:hover {
  color: var(--primary-green);
}

.topbar-icon {
  width: 14px;
  height: 14px;
}

/* Header principal */
.header {
  background: var(--white);
  border-bottom: 1px solid var(--line);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: box-shadow 0.2s ease;
}

.header.scrolled {
  box-shadow: 0 2px 12px rgba(22, 25, 28, 0.08);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 40px;
  height: 72px;
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  margin-right: auto;
}

.logo-mark {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  background: var(--primary-green);
  color: var(--white);
  font-size: 1.5rem;
  font-weight: 800;
  border-radius: 4px;
}

.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
}

.logo-name {
  color: var(--ink);
  font-size: 1.15rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.logo-slogan {
  color: var(--medium-gray);
  font-size: 0.68rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.18em;
}

/* Navigation */
.nav {
  display: none;
  align-items: stretch;
  gap: 8px;
  height: 100%;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 0 16px;
  color: var(--ink);
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  text-decoration: none;
  border-bottom: 3px solid transparent;
  transition:
    color 0.15s,
    border-color 0.15s;
}

.nav-link:hover,
.nav-link.active {
  color: var(--primary-green);
  border-bottom-color: var(--primary-green);
}

/* CTA */
.header-cta {
  display: none;
  align-items: center;
  padding: 11px 22px;
  background: var(--primary-green);
  color: var(--white);
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-decoration: none;
  border-radius: 4px;
  transition: background 0.15s;
}

.header-cta:hover {
  background: var(--dark-green);
}

/* Bouton menu mobile */
.mobile-menu-btn {
  color: var(--ink);
  padding: 8px;
  border: none;
  background: none;
  cursor: pointer;
}

/* Menu mobile */
.mobile-menu {
  background: var(--white);
  border-top: 1px solid var(--line);
}

.mobile-menu-content {
  display: flex;
  flex-direction: column;
  padding-top: 8px;
  padding-bottom: 20px;
}

.mobile-nav-link {
  padding: 14px 0;
  color: var(--ink);
  font-size: 0.95rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-decoration: none;
  border-bottom: 1px solid var(--line);
}

.mobile-nav-link.router-link-exact-active {
  color: var(--primary-green);
}

.mobile-contact-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

.mobile-contact-link {
  padding: 12px 16px;
  color: var(--ink);
  font-weight: 600;
  text-decoration: none;
  border: 1px solid var(--line);
  border-radius: 4px;
}

.mobile-contact-link.whatsapp {
  background: var(--primary-green);
  border-color: var(--primary-green);
  color: var(--white);
}

/* Transitions pour le menu mobile */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (min-width: 768px) {
  .nav,
  .header-cta {
    display: flex;
  }

  .mobile-toggle,
  .mobile-menu {
    display: none !important;
  }
}

@media (max-width: 767px) {
  .topbar-tagline {
    display: none;
  }

  .topbar-inner {
    justify-content: center;
  }

  .topbar-links {
    gap: 16px;
  }

  .header-content {
    height: 64px;
  }
}
</style>
