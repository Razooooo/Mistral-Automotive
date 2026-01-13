<template>
  <Transition name="popup-fade">
    <div v-if="isVisible" class="popup-overlay" @click.self="closePopup">
      <div class="popup-container">
        <button class="close-button" @click="closePopup" aria-label="Fermer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div class="popup-content">
          <div class="fireworks">
            <div class="firework"></div>
            <div class="firework"></div>
            <div class="firework"></div>
          </div>

          <h2 class="popup-title">🎉 Bonne Année 2026 ! 🎊</h2>

          <p class="popup-message">
            Toute l'équipe de <strong>Mistral Automotive</strong> vous souhaite une excellente
            année 2026 remplie de succès, de bonheur et de belles routes à parcourir !
          </p>

          <div class="popup-emoji">✨🚗💨</div>

          <button class="popup-button" @click="closePopup">Merci !</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isVisible = ref(false)

const closePopup = () => {
  isVisible.value = false
  // Sauvegarder dans localStorage pour ne pas afficher à nouveau pendant cette session
  localStorage.setItem('newYearPopupShown2026', 'true')
}

onMounted(() => {
  // Vérifier si le popup a déjà été affiché
  const hasSeenPopup = localStorage.getItem('newYearPopupShown2026')

  if (!hasSeenPopup) {
    // Afficher le popup après un petit délai pour une meilleure expérience
    setTimeout(() => {
      isVisible.value = true
    }, 500)
  }
})
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  padding: 20px;
}

.popup-container {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 24px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  animation: popupBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes popupBounce {
  0% {
    transform: scale(0.3) rotate(-5deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.05) rotate(2deg);
  }
  100% {
    transform: scale(1) rotate(0);
    opacity: 1;
  }
}

.close-button {
  position: absolute;
  top: 16px;
  right: 16px;
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  color: #6c757d;
}

.close-button:hover {
  background-color: #ffffff;
  transform: rotate(90deg);
  color: #00b894;
}

.popup-content {
  padding: 48px 32px 32px;
  text-align: center;
  position: relative;
}

.fireworks {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
}

.firework {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  animation: fireworkAnim 2s ease-out infinite;
}

.firework:nth-child(1) {
  top: 20%;
  left: 20%;
  background: linear-gradient(45deg, #fdcb6e, #e17055);
  animation-delay: 0s;
}

.firework:nth-child(2) {
  top: 30%;
  right: 25%;
  background: linear-gradient(45deg, #00b894, #00a085);
  animation-delay: 0.7s;
}

.firework:nth-child(3) {
  top: 15%;
  left: 50%;
  background: linear-gradient(45deg, #6c5ce7, #a29bfe);
  animation-delay: 1.4s;
}

@keyframes fireworkAnim {
  0% {
    transform: scale(0) translateY(0);
    opacity: 1;
  }
  50% {
    transform: scale(3) translateY(-20px);
    opacity: 0.8;
  }
  100% {
    transform: scale(5) translateY(-40px);
    opacity: 0;
  }
}

.popup-title {
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #00b894, #fdcb6e, #e17055);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 24px;
  animation: titleShine 3s ease-in-out infinite;
  line-height: 1.2;
}

@keyframes titleShine {
  0%,
  100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.3);
  }
}

.popup-message {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #2d3436;
  margin-bottom: 24px;
}

.popup-message strong {
  color: #00b894;
  font-weight: 700;
}

.popup-emoji {
  font-size: 2.5rem;
  margin-bottom: 28px;
  animation: emojiFloat 2s ease-in-out infinite;
}

@keyframes emojiFloat {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.popup-button {
  background: linear-gradient(135deg, #00b894, #00a085);
  color: white;
  border: none;
  padding: 14px 40px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(0, 184, 148, 0.3);
  position: relative;
  overflow: hidden;
}

.popup-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s;
}

.popup-button:hover::before {
  left: 100%;
}

.popup-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(0, 184, 148, 0.4);
}

.popup-button:active {
  transform: translateY(-1px);
}

/* Transitions */
.popup-fade-enter-active,
.popup-fade-leave-active {
  transition: opacity 0.3s ease;
}

.popup-fade-enter-from,
.popup-fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 480px) {
  .popup-container {
    margin: 20px;
    max-width: calc(100% - 40px);
  }

  .popup-content {
    padding: 40px 24px 24px;
  }

  .popup-title {
    font-size: 1.5rem;
  }

  .popup-message {
    font-size: 1rem;
  }

  .popup-emoji {
    font-size: 2rem;
  }

  .popup-button {
    padding: 12px 32px;
    font-size: 1rem;
  }
}
</style>
