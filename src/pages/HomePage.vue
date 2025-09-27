<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero">
      <v-container>
        <v-row align="center" justify="center" class="min-height-screen">
          <v-col cols="12" md="6" class="text-center text-md-left">
            <v-fade-transition appear>
              <div>
                <h1 class="display-1 font-weight-bold text-white mb-4">
                  Продавайте и покупайте недвижимость
                  <span class="text-accent">с помощью ИИ</span>
                </h1>
                <p class="text-h6 text-white mb-6 opacity-90">
                  Быстрая и точная оценка квартир с использованием искусственного интеллекта. 
                  Найдите идеальную недвижимость или продайте по лучшей цене.
                </p>
                <div class="d-flex flex-column flex-sm-row gap-4">
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
          <v-col cols="12" md="6" class="text-center">
            <v-slide-x-transition appear>
              <v-img
                src="https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg"
                alt="Modern apartment"
                class="rounded-lg elevation-12"
                height="400"
                cover
              />
            </v-slide-x-transition>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Features Section -->
    <section class="py-16">
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
            <v-slide-y-transition appear :delay="index * 200">
              <v-card
                class="feature-card h-100"
                color="surface"
                elevation="8"
              >
                <v-card-text class="text-center pa-8">
                  <v-avatar
                    color="primary"
                    size="80"
                    class="mb-4"
                  >
                    <v-icon color="white" size="40">{{ feature.icon }}</v-icon>
                  </v-avatar>
                  <h3 class="text-h5 font-weight-bold mb-3">{{ feature.title }}</h3>
                  <p class="text-body-1 text-medium-emphasis">{{ feature.description }}</p>
                </v-card-text>
              </v-card>
            </v-slide-y-transition>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Stats Section -->
    <section class="py-16">
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
                <h3 class="text-h3 font-weight-bold text-accent mb-2">{{ stat.value }}</h3>
                <p class="text-h6 text-white">{{ stat.label }}</p>
              </div>
            </v-slide-y-transition>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- CTA Section -->
    <section class="py-16">
      <v-container>
        <v-card
          color="white"
          elevation="12"
          class="text-center pa-8"
        >
          <h2 class="text-h4 font-weight-bold mb-4">
            Готовы начать?
          </h2>
          <p class="text-h6 text-medium-emphasis mb-6">
            Присоединяйтесь к тысячам пользователей, которые уже используют наш сервис
          </p>
          <div class="d-flex flex-column flex-sm-row justify-center gap-4">
            <v-btn
              color="primary"
              size="x-large"
              variant="flat"
              prepend-icon="mdi-account-plus"
              @click="$router.push('/login')"
            >
              Зарегистрироваться
            </v-btn>
            <v-btn
              color="primary"
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
</script>

<style scoped>
.home-page {
  min-height: 100vh;
}

.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.min-height-screen {
  min-height: 100vh;
}

.feature-card {
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-8px);
}

.gap-4 {
  gap: 1rem;
}
</style>