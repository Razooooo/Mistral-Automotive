<template>
  <div>
    <!-- Section Hero avec fond dégradé amélioré -->
    <section class="hero hero-background">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title fade-in-up">
            Bienvenue chez <span class="text-yellow">Mistral Automotive</span>
          </h1>
          <p class="hero-subtitle fade-in-up" style="animation-delay: 0.2s">
            Votre distributeur officiel de pièces automobile de la marque RIDEX<br />
            AUDI - BMW - MERCEDES - PSA - RENAULT - TOYOTA - VW - HYUNDAI - KIA - JEEP
          </p>
          <div class="hero-buttons fade-in-up" style="animation-delay: 0.4s">
            <router-link to="/products" class="btn btn-secondary">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                ></path>
              </svg>
              Voir nos produits
            </router-link>
            <a :href="`tel:${contactInfo.phone}`" class="btn btn-outline">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                ></path>
              </svg>
              Nous contacter
            </a>
          </div>
        </div>
      </div>

      <!-- Éléments décoratifs flottants -->
      <div class="floating-elements">
        <div class="floating-circle circle-1"></div>
        <div class="floating-circle circle-2"></div>
        <div class="floating-circle circle-3"></div>
      </div>
    </section>

    <!-- Section Services avec effet glassmorphism -->
    <section id="services" class="services-section glass-section">
      <div class="container">
        <div class="section-header fade-in-up">
          <h2 class="section-title">Nos Services</h2>
          <p class="section-subtitle">Solutions complètes pour tous vos besoins automobiles</p>
        </div>

        <div class="services-grid">
          <div class="service-card">
            <div class="service-icon">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                ></path>
              </svg>
            </div>
            <h3 class="service-title">Pièces détachées</h3>
            <p class="service-description">
              Large gamme de pièces automobiles pour toutes marques. Qualité garantie et prix
              compétitifs.
            </p>
            <div class="service-features">
              <span class="feature-tag">✓ Garantie qualité</span>
              <span class="feature-tag">✓ Prix compétitifs</span>
            </div>
          </div>

          <div class="service-card">
            <div class="service-icon">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <h3 class="service-title">Livraison rapide</h3>
            <p class="service-description">
              Service de livraison express pour vos pièces. Disponible 6j/7.
            </p>
            <div class="service-features">
              <span class="feature-tag">⚡ Express 24h</span>
              <span class="feature-tag">🚚 Livraison 6j/7</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Marques avec logos -->
    <section id="brands" class="brands-section glass-section">
      <div class="container">
        <div class="section-header fade-in-up">
          <h2 class="section-title">Marques disponibles</h2>
          <p class="section-subtitle">
            Nous commercialisons les pièces des marques automobiles les plus renommées.
          </p>
        </div>

        <div class="brands-grid">
          <div class="brand-item" v-for="brand in brandLogos" :key="brand.name">
            <div class="brand-logo-container">
              <img
                :src="brand.logo"
                :alt="`Logo ${brand.name}`"
                class="brand-logo-img"
                @error="handleLogoError"
              />
            </div>
            <div class="brand-description">Pièces certifiées</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section CTA avec fond sombre -->
    <section class="cta-section bg-dark">
      <div class="container">
        <div class="cta-content fade-in-up">
          <h2 class="cta-title">Besoin d'une pièce automobile ?</h2>
          <p class="cta-subtitle">
            Contactez-nous pour un devis personnalisé ou pour plus d'informations
          </p>
          <div class="cta-buttons">
            <a :href="whatsappUrl" target="_blank" class="btn btn-whatsapp">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"
                />
              </svg>
              WhatsApp
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
              Appeler maintenant
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { contactInfo } from '../data/products'

// Données des marques avec logos locaux
const brandLogos = [
  {
    name: 'AUDI',
    logo: '/logos/logo_audi.png',
  },
  {
    name: 'BMW',
    logo: '/logos/Logo_BMW.png',
  },
  {
    name: 'MERCEDES',
    logo: '/logos/logo_mercedes.png',
  },
  {
    name: 'PSA',
    logo: '/logos/logo_PSA.png',
  },
  {
    name: 'RENAULT',
    logo: '/logos/logo_renault.png',
  },
  {
    name: 'TOYOTA',
    logo: '/logos/logo_toyota.png',
  },
  {
    name: 'VW',
    logo: '/logos/Logo_Volkswagen.png',
  },
  {
    name: 'HYUNDAI',
    logo: '/logos/Logo_Hyundai.png',
  },
  {
    name: 'KIA',
    logo: '/logos/logo_kia.png',
  },
  {
    name: 'JEEP',
    logo: '/logos/Logo_Jeep.png',
  },
]

// URL WhatsApp
const whatsappUrl = computed(() => {
  const message = `Bonjour ! J'aimerais avoir des informations sur vos pièces automobiles.`
  const phoneNumber = contactInfo.phone.replace(/\s+/g, '').replace('+', '')
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
})

// Gestion des erreurs de chargement des logos
const handleLogoError = (event: Event) => {
  const target = event.target as HTMLImageElement
  const brandName = target.alt.replace('Logo ', '')
  // Image de fallback avec le nom de la marque
  target.src = `https://via.placeholder.com/120x60/00b894/ffffff?text=${encodeURIComponent(brandName)}`
}
</script>

<style scoped>
/* Section Hero améliorée */
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

.hero-buttons {
  display: flex;
  gap: 25px;
  justify-content: center;
  flex-wrap: wrap;
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

/* Sections générales */
.services-section,
.brands-section {
  padding: 100px 0;
}

.cta-section {
  padding: 100px 0;
}

.section-header {
  text-align: center;
  margin-bottom: 80px;
}

.section-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: var(--dark-bg);
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(135deg, var(--primary-green), var(--accent-yellow));
  border-radius: 2px;
}

.section-subtitle {
  font-size: 1.3rem;
  color: var(--medium-gray);
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Services Grid améliorée */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
  margin-top: 60px;
}

.service-card {
  background: white;
  padding: 50px 40px;
  border-radius: 25px;
  text-align: center;
  transition: all 0.4s ease;
  border: 1px solid rgba(0, 184, 148, 0.1);
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  opacity: 1;
  transform: translateY(0);
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 184, 148, 0.05), rgba(253, 203, 110, 0.05));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.service-card:hover::before {
  opacity: 1;
}

.service-card:hover {
  transform: translateY(-20px) rotateX(5deg);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
}

.service-icon {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, var(--primary-green), var(--dark-green));
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 30px;
  color: white;
  position: relative;
  z-index: 2;
  box-shadow: 0 15px 30px rgba(0, 184, 148, 0.3);
}

.service-title {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: var(--dark-bg);
  position: relative;
  z-index: 2;
}

.service-description {
  color: var(--medium-gray);
  line-height: 1.7;
  margin-bottom: 25px;
  position: relative;
  z-index: 2;
}

.service-features {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  position: relative;
  z-index: 2;
}

.feature-tag {
  background: rgba(0, 184, 148, 0.1);
  color: var(--primary-green);
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 0.85rem;
  font-weight: 500;
  border: 1px solid rgba(0, 184, 148, 0.2);
  display: inline-block;
}

/* Grille des marques avec logos */
.brands-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  margin-top: 60px;
}

.brand-item {
  background: white;
  padding: 30px 20px;
  border-radius: 20px;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 184, 148, 0.1);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  opacity: 1;
  transform: translateY(0);
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.brand-item:hover {
  transform: translateY(-10px) scale(1.05);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  border-color: rgba(0, 184, 148, 0.3);
}

.brand-logo-container {
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
}

.brand-logo-img {
  max-height: 60px;
  max-width: 120px;
  width: auto;
  height: auto;
  object-fit: contain;
  filter: grayscale(20%) brightness(1.1);
  transition: all 0.3s ease;
}

.brand-item:hover .brand-logo-img {
  filter: grayscale(0%) brightness(1.2);
  transform: scale(1.05);
}

.brand-description {
  font-size: 0.9rem;
  color: var(--medium-gray);
  font-weight: 500;
  margin-top: auto;
}

/* Section CTA améliorée */
.cta-section {
  background: var(--dark-bg);
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.cta-section::before {
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

.cta-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
}

.cta-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 25px;
  line-height: 1.2;
}

.cta-subtitle {
  font-size: 1.3rem;
  margin-bottom: 50px;
  opacity: 0.9;
  line-height: 1.6;
}

.cta-buttons {
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

  .hero-buttons {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .section-title {
    font-size: 2.2rem;
  }

  .services-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .brands-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .brand-item {
    padding: 20px 15px;
    height: 120px;
  }

  .brand-logo-container {
    height: 50px;
    margin-bottom: 10px;
  }

  .brand-logo-img {
    max-height: 50px;
    max-width: 100px;
  }

  .cta-title {
    font-size: 2rem;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .floating-circle {
    display: none;
  }

  .service-features {
    justify-content: center;
  }

  .feature-tag {
    font-size: 0.8rem;
    padding: 5px 10px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .service-card {
    padding: 30px 20px;
  }

  .brand-item {
    padding: 15px 10px;
    height: 100px;
  }

  .brand-logo-container {
    height: 40px;
    margin-bottom: 8px;
  }

  .brand-logo-img {
    max-height: 40px;
    max-width: 80px;
  }

  .brand-description {
    font-size: 0.8rem;
  }
}
</style>
