<template>
  <div class="valuation-page">
    <v-container class="py-8">
      <div class="text-center mb-8">
        <h1 class="text-h3 font-weight-bold text-white mb-4">
          ИИ Оценка недвижимости
        </h1>
        <p class="text-h6 text-white opacity-90">
          Получите точную оценку стоимости вашей квартиры за несколько секунд
        </p>
      </div>

      <v-row justify="center">
        <v-col cols="12" md="8" lg="6">
          <v-card rounded="lg" elevation="12">
            <v-card-title class="pa-6">
              <v-icon color="primary" class="mr-3">mdi-calculator</v-icon>
              <span class="text-h5">Параметры квартиры</span>
            </v-card-title>

            <v-card-text class="pa-6">
              <v-form ref="form" @submit.prevent="handleValuation">
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model.number="formData.area"
                      label="Площадь (м²)"
                      type="number"
                      prepend-inner-icon="mdi-ruler-square"
                      variant="outlined"
                      :rules="areaRules"
                      suffix="м²"
                    />
                  </v-col>
                  
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model.number="formData.rooms"
                      label="Количество комнат"
                      type="number"
                      prepend-inner-icon="mdi-home"
                      variant="outlined"
                      :rules="roomsRules"
                    />
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-select
                      v-model="formData.city"
                      :items="cities"
                      label="Город"
                      prepend-inner-icon="mdi-city"
                      variant="outlined"
                      :rules="requiredRules"
                    />
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-select
                      v-model="formData.district"
                      :items="districts"
                      label="Район"
                      prepend-inner-icon="mdi-map-marker"
                      variant="outlined"
                      :rules="requiredRules"
                    />
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model.number="formData.floor"
                      label="Этаж"
                      type="number"
                      prepend-inner-icon="mdi-stairs"
                      variant="outlined"
                      :rules="floorRules"
                    />
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model.number="formData.totalFloors"
                      label="Всего этажей"
                      type="number"
                      prepend-inner-icon="mdi-office-building"
                      variant="outlined"
                      :rules="totalFloorsRules"
                    />
                  </v-col>

                  <v-col cols="12">
                    <v-select
                      v-model="formData.condition"
                      :items="conditions"
                      label="Состояние квартиры"
                      prepend-inner-icon="mdi-hammer-wrench"
                      variant="outlined"
                      :rules="requiredRules"
                    />
                  </v-col>
                </v-row>

                <v-btn
                  type="submit"
                  color="primary"
                  size="x-large"
                  block
                  :loading="loading"
                  prepend-icon="mdi-brain"
                  class="mt-4"
                >
                  Получить оценку ИИ
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>

          <!-- Results -->
          <v-card
            v-if="result"
            class="mt-6"
            rounded="lg"
            elevation="12"
            color="success"
          >
            <v-card-title class="pa-6 text-white">
              <v-icon color="white" class="mr-3">mdi-trending-up</v-icon>
              <span class="text-h5">Результат оценки</span>
            </v-card-title>

            <v-card-text class="pa-6 text-white">
              <div class="text-center mb-6">
                <h2 class="text-h2 font-weight-bold mb-2">
                  {{ formatPrice(result.estimatedPrice) }}
                </h2>
                <p class="text-h6 opacity-90">
                  Рекомендуемая цена продажи
                </p>
                <v-chip
                  color="white"
                  text-color="success"
                  class="mt-2"
                >
                  Точность: {{ result.confidence }}%
                </v-chip>
              </div>

              <v-divider color="white" class="mb-6" />

              <div class="mb-6">
                <h3 class="text-h6 mb-4">Факторы оценки:</h3>
                <v-row>
                  <v-col cols="6" sm="3" class="text-center">
                    <v-progress-circular
                      :model-value="result.factors.location"
                      :size="60"
                      :width="6"
                      color="white"
                    >
                      {{ result.factors.location }}%
                    </v-progress-circular>
                    <p class="mt-2 text-body-2">Местоположение</p>
                  </v-col>
                  <v-col cols="6" sm="3" class="text-center">
                    <v-progress-circular
                      :model-value="result.factors.area"
                      :size="60"
                      :width="6"
                      color="white"
                    >
                      {{ result.factors.area }}%
                    </v-progress-circular>
                    <p class="mt-2 text-body-2">Площадь</p>
                  </v-col>
                  <v-col cols="6" sm="3" class="text-center">
                    <v-progress-circular
                      :model-value="result.factors.condition"
                      :size="60"
                      :width="6"
                      color="white"
                    >
                      {{ result.factors.condition }}%
                    </v-progress-circular>
                    <p class="mt-2 text-body-2">Состояние</p>
                  </v-col>
                  <v-col cols="6" sm="3" class="text-center">
                    <v-progress-circular
                      :model-value="result.factors.floor"
                      :size="60"
                      :width="6"
                      color="white"
                    >
                      {{ result.factors.floor }}%
                    </v-progress-circular>
                    <p class="mt-2 text-body-2">Этаж</p>
                  </v-col>
                </v-row>
              </div>

              <v-alert
                color="white"
                text-color="success"
                variant="outlined"
                icon="mdi-information"
              >
                <strong>Анализ рынка:</strong> {{ result.marketTrends }}
              </v-alert>

              <div class="d-flex justify-center mt-6">
                <v-btn
                  v-if="userStore.isAuthenticated && userStore.user?.userType === 'seller'"
                  color="white"
                  variant="flat"
                  prepend-icon="mdi-plus"
                  @click="createListing"
                >
                  Создать объявление
                </v-btn>
                <v-btn
                  v-else
                  color="white"
                  variant="outlined"
                  prepend-icon="mdi-login"
                  @click="$router.push('/login')"
                >
                  Войти для создания объявления
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { useApartmentsStore } from '../stores/apartments'
import type { ValuationResult } from '../types'

const router = useRouter()
const userStore = useUserStore()
const apartmentsStore = useApartmentsStore()

// Реактивные переменные состояния
const form = ref()
const loading = ref(false)
const result = ref<ValuationResult | null>(null)

// Реактивный объект с данными формы оценки
const formData = reactive({
  area: 65,
  rooms: 2,
  city: 'Москва',
  district: '',
  floor: 5,
  totalFloors: 16,
  condition: ''
})

// Справочные данные для селектов
const cities = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург']

const districts = [
  'Тверской',
  'Мещанский', 
  'Хамовники',
  'Арбат',
  'Таганский',
  'Замоскворечье'
]

const conditions = [
  { title: 'Новое', value: 'новое' },
  { title: 'Хорошее', value: 'хорошее' },
  { title: 'Требует ремонта', value: 'требует ремонта' },
  { title: 'Под снос', value: 'под снос' }
]

// Правила валидации для полей формы
const areaRules = [
  (v: number) => !!v || 'Площадь обязательна',
  (v: number) => (v >= 15 && v <= 500) || 'Площадь должна быть от 15 до 500 м²'
]

const roomsRules = [
  (v: number) => !!v || 'Количество комнат обязательно',
  (v: number) => (v >= 1 && v <= 10) || 'Количество комнат должно быть от 1 до 10'
]

const floorRules = [
  (v: number) => !!v || 'Этаж обязателен',
  (v: number) => v >= 1 || 'Этаж должен быть больше 0',
  // Динамическая валидация - этаж не может быть больше общего количества этажей
  (v: number) => v <= formData.totalFloors || 'Этаж не может быть больше общего количества этажей'
]

const totalFloorsRules = [
  (v: number) => !!v || 'Количество этажей обязательно',
  (v: number) => v >= 1 || 'Количество этажей должно быть больше 0',
  (v: number) => v >= formData.floor || 'Общее количество этажей не может быть меньше текущего этажа'
]

const requiredRules = [
  (v: any) => !!v || 'Поле обязательно для заполнения'
]

/**
 * Форматирование цены для отображения
 * @param {number} price - Цена в рублях
 * @returns {string} Отформатированная строка с ценой
 */
const formatPrice = (price: number) => {
  return (price / 1000000).toFixed(1) + ' млн ₽'
}

/**
 * Обработчик запроса ИИ-оценки
 * Валидирует форму и отправляет запрос на оценку
 */
const handleValuation = async () => {
  // Валидация формы
  const { valid } = await form.value.validate()
  if (!valid) return

  loading.value = true
  
  try {
    // Вызов ИИ-алгоритма оценки
    result.value = await apartmentsStore.getValuation(formData)
  } catch (error) {
    console.error('Ошибка оценки:', error)
    // В реальном приложении здесь должно быть отображение ошибки пользователю
  } finally {
    loading.value = false
  }
}

/**
 * Переход к созданию объявления с предзаполненными данными
 * Передает результаты оценки в форму создания объявления
 */
const createListing = () => {
  router.push({
    name: 'create',
    query: {
      ...formData,
      estimatedPrice: result.value?.estimatedPrice
    }
  })
}
</script>

<style scoped>
.valuation-page {
  min-height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')
      no-repeat center center;
  background-size: cover;
  background-attachment: fixed;
}
</style>