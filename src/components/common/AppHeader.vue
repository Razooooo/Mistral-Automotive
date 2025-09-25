<template>
  <header class="header" :class="{ scrolled: isScrolled }">
    <div class="container">
      <div class="header-content">
        <!-- Logo/Nom du magasin avec slogan -->
        <div class="logo-section">
          <router-link to="/" class="logo">
            {{ storeName }}
          </router-link>
          <div class="slogan">
            <span class="line"></span>
            SAFETY AND COMFORT
            <span class="line"></span>
          </div>
        </div>

        <!-- Navigation desktop -->
        <nav class="nav hidden md:flex">
          <router-link to="/" class="nav-link" :class="{ active: $route.path === '/' }">
            <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Accueil
          </router-link>
          <router-link
            to="/products"
            class="nav-link"
            :class="{ active: $route.path === '/products' }"
          >
            <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            Produits
          </router-link>
        </nav>

        <!-- Contact rapide desktop -->
        <div class="contact-section hidden md:flex items-center gap-4">
          <a :href="`tel:${contactInfo.phone}`" class="contact-phone">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              ></path>
            </svg>
            {{ contactInfo.phone }}
          </a>

          <!-- Bouton WhatsApp -->
          <a :href="whatsappUrl" target="_blank" class="btn-whatsapp-header">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"
              />
            </svg>
            WhatsApp
          </a>
        </div>

        <!-- Menu mobile button -->
        <div class="md:hidden">
          <button @click="toggleMobileMenu" class="mobile-menu-btn">
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

      <!-- Menu mobile -->
      <transition name="mobile-menu">
        <div v-show="mobileMenuOpen" class="mobile-menu md:hidden">
          <div class="mobile-menu-content">
            <router-link to="/" @click="closeMobileMenu" class="mobile-nav-link">
              <svg class="mobile-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Accueil
            </router-link>
            <router-link to="/products" @click="closeMobileMenu" class="mobile-nav-link">
              <svg class="mobile-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              Produits
            </router-link>

            <!-- Contact mobile -->
            <div class="mobile-contact-section">
              <a
                :href="`tel:${contactInfo.phone}`"
                @click="closeMobileMenu"
                class="mobile-contact-link"
              >
                <svg class="mobile-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                {{ contactInfo.phone }}
              </a>
              <a
                :href="whatsappUrl"
                target="_blank"
                @click="closeMobileMenu"
                class="mobile-contact-link whatsapp"
              >
                <svg class="mobile-nav-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"
                  />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </transition>
    </div>
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
  const message = `Bonjour ! J'aimerais avoir des informations sur vos produits.`
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
  if (mobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
  document.body.style.overflow = ''
}

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll)

  // Fermer le menu mobile si on clique en dehors
  document.addEventListener('click', (event) => {
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
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* Header principal */
.header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 184, 148, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
}

.header.scrolled {
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-bottom-color: rgba(0, 184, 148, 0.2);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
}

/* Logo avec slogan */
.logo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  font-size: 28px;
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary-green), var(--dark-green));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  margin-bottom: 6px;
}

.logo:hover {
  transform: scale(1.05);
  filter: brightness(1.1);
}

.slogan {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 10px;
  font-weight: 600;
  color: #6c757d;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.line {
  width: 30px;
  height: 1px;
  background: var(--primary-green);
}

/* Navigation desktop */
.nav {
  display: flex;
  gap: 20px;
  align-items: center;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #555;
  text-decoration: none;
  font-weight: 500;
  padding: 12px 18px;
  border-radius: 25px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 184, 148, 0.1), transparent);
  transition: left 0.3s ease;
}

.nav-link:hover::before,
.nav-link.active::before {
  left: 100%;
}

.nav-link:hover,
.nav-link.active {
  color: var(--primary-green);
  background: rgba(0, 184, 148, 0.1);
  transform: translateY(-2px);
}

.nav-icon {
  width: 18px;
  height: 18px;
  transition: transform 0.3s ease;
}

.nav-link:hover .nav-icon {
  transform: scale(1.1);
}

/* Section contact */
.contact-section {
  gap: 15px;
}

.contact-phone {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6c757d;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s ease;
  padding: 8px 12px;
  border-radius: 20px;
}

.contact-phone:hover {
  color: var(--primary-green);
  background: rgba(0, 184, 148, 0.1);
  transform: translateY(-1px);
}

.btn-whatsapp-header {
  display: flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #25d366, #128c7e);
  color: white;
  padding: 10px 16px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
}

.btn-whatsapp-header:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4);
  background: linear-gradient(135deg, #128c7e, #25d366);
}

/* Bouton menu mobile */
.mobile-menu-btn {
  color: #6c757d;
  padding: 8px;
  border: none;
  background: none;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
}

.mobile-menu-btn:hover {
  color: var(--primary-green);
  background: rgba(0, 184, 148, 0.1);
  transform: scale(1.1);
}

/* Menu mobile */
.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid rgba(0, 184, 148, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.mobile-menu-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #555;
  text-decoration: none;
  padding: 15px 20px;
  font-weight: 500;
  border-radius: 15px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.mobile-nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 184, 148, 0.1), transparent);
  transition: left 0.3s ease;
}

.mobile-nav-link:hover::before {
  left: 100%;
}

.mobile-nav-link:hover {
  color: var(--primary-green);
  background: rgba(0, 184, 148, 0.1);
  transform: translateX(5px);
}

.mobile-nav-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

/* Section contact mobile */
.mobile-contact-section {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(0, 184, 148, 0.1);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mobile-contact-link {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #555;
  text-decoration: none;
  padding: 15px 20px;
  font-weight: 500;
  border-radius: 15px;
  transition: all 0.3s ease;
  background: rgba(0, 184, 148, 0.05);
}

.mobile-contact-link:hover {
  color: var(--primary-green);
  background: rgba(0, 184, 148, 0.15);
  transform: translateX(5px);
}

.mobile-contact-link.whatsapp {
  background: rgba(37, 211, 102, 0.1);
  color: #25d366;
}

.mobile-contact-link.whatsapp:hover {
  background: rgba(37, 211, 102, 0.2);
  color: #128c7e;
}

/* Transitions pour le menu mobile */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}

.mobile-menu-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Responsive */
@media (max-width: 768px) {
  .header-content {
    height: 60px;
    padding: 0 15px;
  }

  /* Logo section mobile - garder vertical mais plus compact */
  .logo-section {
    flex-direction: column;
    align-items: center;
    gap: 3px;
    flex-shrink: 0;
  }

  .logo {
    font-size: 18px;
    margin-bottom: 0;
    line-height: 1;
  }

  .slogan {
    font-size: 7px;
    gap: 5px;
    letter-spacing: 0.5px;
    line-height: 1;
  }

  .line {
    width: 12px;
  }

  /* Navigation mobile compacte */
  .nav {
    gap: 8px;
  }

  .nav-link {
    padding: 6px 10px;
    font-size: 0.75rem;
    border-radius: 15px;
    gap: 4px;
  }

  .nav-icon {
    width: 14px;
    height: 14px;
  }

  /* Mobile menu adjustments */
  .mobile-menu-content {
    padding: 15px;
  }

  .mobile-nav-link,
  .mobile-contact-link {
    padding: 8px 12px;
    font-size: 0.8rem;
  }

  .mobile-nav-icon {
    width: 16px;
    height: 16px;
  }

  .mobile-menu-btn {
    padding: 6px;
  }
}

@media (max-width: 480px) {
  .header-content {
    height: 55px;
    padding: 0 12px;
  }

  /* Logo encore plus compact */
  .logo-section {
    gap: 2px;
  }

  .logo {
    font-size: 16px;
  }

  .slogan {
    font-size: 6px;
    gap: 4px;
    letter-spacing: 0px;
  }

  .line {
    width: 10px;
  }

  /* Navigation encore plus compacte */
  .nav-link {
    padding: 4px 8px;
    font-size: 0.7rem;
    gap: 3px;
  }

  .nav-icon {
    width: 12px;
    height: 12px;
  }

  /* Menu mobile plus compact */
  .mobile-menu-content {
    padding: 12px;
  }

  .mobile-nav-link,
  .mobile-contact-link {
    padding: 6px 10px;
    font-size: 0.75rem;
  }

  .mobile-nav-icon {
    width: 14px;
    height: 14px;
  }
}

/* Style spécifique pour très petits écrans */
@media (max-width: 360px) {
  .header-content {
    height: 50px;
    padding: 0 10px;
  }

  .logo-section {
    gap: 1px;
  }

  .logo {
    font-size: 14px;
  }

  .slogan {
    font-size: 5px;
    gap: 3px;
  }

  .line {
    width: 8px;
  }

  .nav-link {
    padding: 3px 6px;
    font-size: 0.65rem;
    gap: 2px;
  }

  .nav-icon {
    width: 10px;
    height: 10px;
  }

  .mobile-menu-btn {
    padding: 4px;
  }
}

/* Animation de chargement pour le logo */
@keyframes logoGlow {
  0%,
  100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.2);
  }
}

.logo:hover {
  animation: logoGlow 1.5s ease-in-out infinite;
}
</style>
