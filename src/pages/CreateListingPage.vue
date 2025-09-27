<template>
  <div class="create-listing-page">
    <v-container class="py-8">
      <div class="text-center mb-8">
        <h1 class="text-h3 font-weight-bold text-white mb-4">
          Создать объявление
        </h1>
        <p class="text-h6 text-white opacity-90">
          Разместите информацию о вашей недвижимости
        </p>
      </div>

      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card rounded="lg" elevation="12">
            <v-card-title class="pa-6">
              <v-icon color="primary" class="mr-3">mdi-plus</v-icon>
              <span class="text-h5">Информация о квартире</span>
            </v-card-title>

            <v-card-text class="pa-6">
              <v-form ref="form" @submit.prevent="handleSubmit">
                <v-row>
                  <!-- Basic Info -->
                  <v-col cols="12">
                    <h3 class="text-h6 mb-4">Основная информация</h3>
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.title"
                      label="Заголовок объявления"
                      prepend-inner-icon="mdi-format-title"
                      variant="outlined"
                      :rules="[v => !!v || 'Заголовок обязателен']"
                    />
                  </v-col>

                  <v-col cols="12">
                    <v-textarea
                      v-model="formData.description"
                      label="Описание"
                      prepend-inner-icon="mdi-text"
                      variant="outlined"
                      rows="3"
                      :rules="[v => !!v || 'Описание обязательно']"
                    />
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model.number="formData.price"
                      label="Цена"
                      type="number"
                      prepend-inner-icon="mdi-currency-rub"
                      variant="outlined"
                      suffix="₽"
                      :rules="[v => !!v || 'Цена обязательна']"
                    />
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model.number="formData.area"
                      label="Площадь"
                      type="number"
                      prepend-inner-icon="mdi-ruler-square"
                      variant="outlined"
                      suffix="м²"
                      :rules="[v => !!v || 'Площадь обязательна']"
                    />
                  </v-col>

                  <!-- Room Details -->
                  <v-col cols="12">
                    <h3 class="text-h6 mb-4 mt-4">Планировка</h3>
                  </v-col>

                  <v-col cols="12" sm="4">
                    <v-text-field
                      v-model.number="formData.rooms"
                      label="Комнаты"
                      type="number"
                      prepend-inner-icon="mdi-home"
                      variant="outlined"
                      :rules="[v => !!v || 'Количество комнат обязательно']"
                    />
                  </v-col>

                  <v-col cols="12" sm="4">
                    <v-text-field
                      v-model.number="formData.bathrooms"
                      label="Санузлы"
                      type="number"
                      prepend-inner-icon="mdi-shower"
                      variant="outlined"
                      :rules="[v => !!v || 'Количество санузлов обязательно']"
                    />
                  </v-col>

                  <v-col cols="12" sm="4">
                    <v-select
                      v-model="formData.condition"
                      :items="conditions"
                      label="Состояние"
                      prepend-inner-icon="mdi-hammer-wrench"
                      variant="outlined"
                      :rules="[v => !!v || 'Состояние обязательно']"
                    />
                  </v-col>

                  <!-- Location -->
                  <v-col cols="12">
                    <h3 class="text-h6 mb-4 mt-4">Местоположение</h3>
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.address"
                      label="Адрес"
                      prepend-inner-icon="mdi-map-marker"
                      variant="outlined"
                      :rules="[v => !!v || 'Адрес обязателен']"
                    />
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-select
                      v-model="formData.city"
                      :items="cities"
                      label="Город"
                      prepend-inner-icon="mdi-city"
                      variant="outlined"
                      :rules="[v => !!v || 'Город обязателен']"
                    />
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-select
                      v-model="formData.district"
                      :items="districts"
                      label="Район"
                      prepend-inner-icon="mdi-map"
                      variant="outlined"
                      :rules="[v => !!v || 'Район обязателен']"
                    />
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model.number="formData.floor"
                      label="Этаж"
                      type="number"
                      prepend-inner-icon="mdi-stairs"
                      variant="outlined"
                      :rules="[v => !!v || 'Этаж обязателен']"
                    />
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model.number="formData.totalFloors"
                      label="Всего этажей"
                      type="number"
                      prepend-inner-icon="mdi-office-building"
                      variant="outlined"
                      :rules="[v => !!v || 'Количество этажей обязательно']"
                    />
                  </v-col>

                  <!-- Features -->
                  <v-col cols="12">
                    <h3 class="text-h6 mb-4 mt-4">Особенности</h3>
                  </v-col>

                  <v-col cols="12">
                    <v-combobox
                      v-model="formData.features"
                      :items="availableFeatures"
                      label="Особенности и удобства"
                      prepend-inner-icon="mdi-star"
                      variant="outlined"
                      multiple
                      chips
                      clearable
                    />
                  </v-col>

                  <!-- Images -->
                  <v-col cols="12">
                    <h3 class="text-h6 mb-4 mt-4">Фотографии</h3>
                  </v-col>

                  <v-col cols="12">
                    <v-textarea
                      v-model="imageUrls"
                      label="URL фотографий (по одному на строку)"
                      prepend-inner-icon="mdi-image"
                      variant="outlined"
                      rows="3"
                      hint="Вставьте ссылки на фотографии квартиры"
                      persistent-hint
                    />
                  </v-col>

                  <!-- Preview Images -->
                  <v-col v-if="formData.images.length > 0" cols="12">
                    <div class="d-flex flex-wrap gap-2">
                      <v-img
                        v-for="(image, index) in formData.images"
                        :key="index"
                        :src="image"
                        width="100"
                        height="80"
                        class="rounded"
                        cover
                      />
                    </div>
                  </v-col>
                </v-row>

                <div class="d-flex justify-end gap-4 mt-6">
                  <v-btn
                    color="grey"
                    variant="outlined"
                    @click="$router.back()"
                  >
                    Отмена
                  </v-btn>
                  <v-btn
                    type="submit"
                    color="primary"
                    :loading="loading"
                    prepend-icon="mdi-check"
                  >
                    Создать объявление
                  </v-btn>
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '../stores/user'
import { useApartmentsStore } from '../stores/apartments'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const apartmentsStore = useApartmentsStore()

// Реактивные переменные состояния
const form = ref()
const loading = ref(false)
const imageUrls = ref('')

// Реактивный объект с данными формы создания объявления
const formData = reactive({
  title: '',
  description: '',
  price: 0,
  area: 0,
  rooms: 2,
  bathrooms: 1,
  floor: 1,
  totalFloors: 16,
  address: '',
  district: '',
  city: 'Москва',
  condition: '',
  features: [] as string[],
  images: [] as string[]
})

// Справочные данные
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

const availableFeatures = [
  'Балкон',
  'Лоджия', 
  'Лифт',
  'Консьерж',
  'Паркинг',
  'Кондиционер',
  'Интернет',
  'Кабельное ТВ',
  'Охрана',
  'Детская площадка',
  'Спортзал',
  'Бассейн'
]

/**
 * Реактивная обработка URL изображений
 * Парсит многострочный текст с URL и обновляет массив изображений
 */
watch(imageUrls, (newValue) => {
  formData.images = newValue
    .split('\n')
    .map(url => url.trim())
    .filter(url => url.length > 0 && isValidUrl(url))
})

/**
 * Валидация URL
 * @param {string} string - Строка для проверки
 * @returns {boolean} true если строка является валидным URL
 */
const isValidUrl = (string: string): boolean => {
  try {
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}

/**
 * Предзаполнение формы данными из оценки
 * Выполняется при монтировании компонента если есть query параметры
 */
onMounted(() => {
  if (route.query.area) {
    Object.assign(formData, {
      area: Number(route.query.area) || 0,
      rooms: Number(route.query.rooms) || 2,
      city: route.query.city || 'Москва',
      district: route.query.district || '',
      floor: Number(route.query.floor) || 1,
      totalFloors: Number(route.query.totalFloors) || 16,
      condition: route.query.condition || '',
      price: Number(route.query.estimatedPrice) || 0
    })
  }
})

/**
 * Обработчик отправки формы создания объявления
 * Валидирует данные и создает новое объявление
 */
const handleSubmit = async () => {
  // Валидация формы
  const { valid } = await form.value.validate()
  if (!valid) return

  // Проверка аутентификации
  if (!userStore.isAuthenticated || !userStore.user) {
    router.push('/login')
    return
  }

  loading.value = true

  try {
    // Создание объявления через store
    await apartmentsStore.addApartment({
      ...formData,
      sellerId: userStore.user.id,
      seller: userStore.user
    })
    
    // Перенаправление на страницу объявлений после успешного создания
    router.push('/listings')
  } catch (error) {
    console.error('Ошибка создания объявления:', error)
    // В реальном приложении здесь должно быть отображение ошибки пользователю
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.create-listing-page {
  min-height: 100vh;
}

.gap-2 {
  gap: 0.5rem;
}

.gap-4 {
  gap: 1rem;
}
</style>