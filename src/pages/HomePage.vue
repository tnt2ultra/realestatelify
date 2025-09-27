<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <v-container class="fill-height">
        <v-row align="center" justify="center" class="text-center">
          <v-col cols="12" md="10" lg="8">
            <v-fade-transition appear>
              <div>
                <h1
                  class="text-h3 text-md-h2 font-weight-bold text-white mb-4"
                  style="text-shadow: 2px 2px 8px rgba(0,0,0,0.5);"
                >
                  Продавайте и покупайте недвижимость
                  <span class="text-accent">с помощью ИИ</span>
                </h1>
                <p class="text-h6 text-white mb-6 opacity-90">
                  Быстрая и точная оценка квартир с использованием искусственного интеллекта. 
                  Найдите идеальную недвижимость или продайте по лучшей цене.
                </p>
                <div class="d-flex flex-column flex-sm-row justify-center gap-4 mt-8">
                  <v-btn
                    color="accent"
                    size="x-large"
                    variant="flat"
                    prepend-icon="mdi-calculator"
                    @click="$router.push('/valuation')"
                    class="text-white"
                  >
                    Оценить квартиру
                  </v-btn>
                  <v-btn
                    color="white"
                    size="x-large"
                    variant="outlined"
                    prepend-icon="mdi-view-list"
                    @click="$router.push('/listings')"
                  >
                    Смотреть объявления
                  </v-btn>
                </div>
              </div>
            </v-fade-transition>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Recent Listings Section -->
    <section class="py-12 recent-listings-section">
      <v-container>
        <div class="text-center mb-10">
          <h2 class="text-h4 font-weight-bold text-white mb-2">
            Новые объявления на рынке
          </h2>
          <p class="text-body-1 text-white opacity-90">
            Ознакомьтесь с последними предложениями от наших продавцов
          </p>
        </div>
        <v-row>
          <v-col
            v-for="apartment in recentApartments"
            :key="apartment.id"
            cols="12"
            md="6"
            lg="4"
          >
            <ApartmentCard :apartment="apartment" />
          </v-col>
        </v-row>
        <div class="text-center mt-8">
          <v-btn size="large" variant="outlined" color="white" to="/listings">
            Смотреть все объявления
          </v-btn>
        </div>
      </v-container>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-gradient">
      <v-container>
        <div class="text-center mb-12">
          <h2 class="text-h3 font-weight-bold text-white mb-4">
            Почему выбирают нас?
          </h2>
          <p class="text-h6 text-white opacity-90">
            Современные технологии для умных решений в недвижимости
          </p>
        </div>

        <v-row>
          <v-col
            v-for="(feature, index) in features"
            :key="index"
            cols="12"
            md="4"
            class="mb-4"
          >
            <v-slide-y-transition appear :delay="index * 150">
              <v-card
                class="feature-card h-100"
                color="rgba(255, 255, 255, 0.1)"
                variant="outlined"
                elevation="8"
              >
                <v-card-text class="text-center pa-8">
                  <v-avatar
                    color="primary"
                    size="80"
                    class="mb-4"
                    variant="tonal"
                  >
                    <v-icon color="white" size="40">{{ feature.icon }}</v-icon>
                  </v-avatar>
                  <h3 class="text-h5 font-weight-bold text-white mb-3">{{ feature.title }}</h3>
                  <p class="text-body-1 text-medium-emphasis">{{ feature.description }}</p>
                </v-card-text>
              </v-card>
            </v-slide-y-transition>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Stats Section -->
    <section class="py-16 stats-section">
      <v-container>
        <v-row>
          <v-col
            v-for="(stat, index) in stats"
            :key="index"
            cols="6"
            md="3"
            class="text-center"
          >
            <v-slide-y-transition appear :delay="index * 150">
              <div>
                <h3 class="text-h3 font-weight-bold text-white mb-2">{{ stat.value }}</h3>
                <p class="text-h6 text-white opacity-90">{{ stat.label }}</p>
              </div>
            </v-slide-y-transition>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Final CTA Section -->
    <section class="py-16 bg-gradient">
      <v-container>
        <v-card
          color="rgba(255, 255, 255, 0.1)"
          variant="outlined"
          elevation="12"
          class="text-center pa-8"
        >
          <h2 class="text-h4 font-weight-bold text-white mb-4">
            Готовы начать?
          </h2>
          <p class="text-h6 text-medium-emphasis mb-6">
            Присоединяйтесь к тысячам пользователей, которые доверяют нашей платформе
          </p>
          <div class="d-flex flex-column flex-sm-row justify-center gap-4">
            <v-btn
              color="accent"
              size="x-large"
              variant="flat"
              prepend-icon="mdi-account-plus"
              @click="$router.push('/login')"
              class="text-white"
            >
              Зарегистрироваться
            </v-btn>
            <v-btn
              color="white"
              size="x-large"
              variant="outlined"
              prepend-icon="mdi-information"
            >
              Узнать больше
            </v-btn>
          </div>
        </v-card>
      </v-container>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useApartmentsStore } from '../stores/apartments'
import ApartmentCard from '../components/ApartmentCard.vue'

const apartmentsStore = useApartmentsStore()

const features = [
  {
    icon: 'mdi-brain',
    title: 'ИИ Оценка',
    description: 'Точная оценка стоимости недвижимости с использованием машинного обучения и анализа рыночных данных.'
  },
  {
    icon: 'mdi-flash',
    title: 'Быстрые сделки',
    description: 'Ускоренный процесс покупки и продажи благодаря автоматизации и умному подбору.'
  },
  {
    icon: 'mdi-shield-check',
    title: 'Безопасность',
    description: 'Проверенные продавцы, юридическая чистота сделок и защита персональных данных.'
  }
]

const stats = [
  { value: '5000+', label: 'Квартир продано' },
  { value: '98%', label: 'Довольных клиентов' },
  { value: '24/7', label: 'Поддержка' },
  { value: '±5%', label: 'Точность оценки' }
]

const recentApartments = computed(() => apartmentsStore.apartments.slice(0, 3))
</script>

<style scoped>
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url('https://images.unsplash.com/photo-1757532128043-5f52ebb172db?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2MDcyNjN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTkwMDgxMTN8&ixlib=rb-4.1.0&q=85') no-repeat center center;
  background-size: cover;
}

.recent-listings-section {
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url('https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80') no-repeat center center;
  background-size: cover;
  background-attachment: fixed;
}

.stats-section {
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80') no-repeat center center;
  background-size: cover;
  background-attachment: fixed;
}

.bg-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.feature-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.2) !important;
}

.gap-4 {
  gap: 1rem;
}

.opacity-90 {
  opacity: 0.9;
}
</style>