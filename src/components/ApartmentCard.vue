<template>
  <v-card class="apartment-card d-flex flex-column h-100" rounded="lg" elevation="8">
    <div class="position-relative">
      <v-carousel
        v-if="apartment.images.length > 0"
        height="250"
        hide-delimiters
        show-arrows="hover"
      >
        <v-carousel-item
          v-for="(image, index) in apartment.images"
          :key="index"
          :src="image"
          cover
        />
      </v-carousel>
    </div>

    <v-card-title class="d-flex align-start pb-0" style="white-space: normal;">
      <div class="flex-grow-1" style="min-width: 0;">
        <h3 class="text-h6 font-weight-bold">
          {{ apartment.title }}
        </h3>
        <div class="d-flex align-center mt-1 text-body-2 text-medium-emphasis">
          <v-icon size="16" class="mr-1">mdi-map-marker-outline</v-icon>
          {{ apartment.address }}
        </div>
      </div>
      <div class="d-flex flex-column align-end ml-2 flex-shrink-0">
        <v-chip color="success" variant="elevated" class="mb-1">
          {{ formatPrice(apartment.price) }}
        </v-chip>
        <v-chip
          :color="conditionColors[apartment.condition]"
          variant="elevated"
          size="x-small"
        >
          {{ apartment.condition }}
        </v-chip>
      </div>
    </v-card-title>

    <v-card-text class="pt-2 pb-3">
      <div class="d-flex align-center my-3 text-body-2 text-medium-emphasis">
        <div class="d-flex align-center mr-4">
          <v-icon size="18" class="mr-1">mdi-floor-plan</v-icon>
          {{ apartment.rooms }} комн.
        </div>
        <div class="d-flex align-center mr-4">
          <v-icon size="18" class="mr-1">mdi-texture-box</v-icon>
          {{ apartment.area }} м²
        </div>
        <div class="d-flex align-center">
          <v-icon size="18" class="mr-1">mdi-office-building-marker-outline</v-icon>
          {{ apartment.floor }}/{{ apartment.totalFloors }}
        </div>
      </div>

      <p class="text-body-2 text-medium-emphasis mb-3 description-text">
        {{ apartment.description }}
      </p>

      <div class="d-flex flex-wrap gap-1 mb-3">
        <v-chip
          v-for="feature in apartment.features.slice(0, 3)"
          :key="feature"
          size="x-small"
          variant="outlined"
          color="primary"
        >
          {{ feature }}
        </v-chip>
        <v-chip
          v-if="apartment.features.length > 3"
          size="x-small"
          variant="outlined"
        >
          +{{ apartment.features.length - 3 }}
        </v-chip>
      </div>
    </v-card-text>

    <v-spacer />

    <v-divider />

    <v-card-actions class="px-4 py-3">
      <div class="d-flex align-center">
        <v-avatar color="primary" size="32" class="mr-2">
          <span class="text-white text-caption">{{ apartment.seller.name.charAt(0) }}</span>
        </v-avatar>
        <div>
          <div class="font-weight-medium">{{ apartment.seller.name }}</div>
          <div class="text-medium-emphasis text-caption">Продавец</div>
        </div>
      </div>
      
      <v-spacer />
      
      <div class="d-flex gap-2">
        <v-tooltip text="Добавить в избранное" location="top">
          <template #activator="{ props }">
            <v-btn
              v-bind="props"
              icon
              variant="text"
              size="small"
              color="medium-emphasis"
            >
              <v-icon>mdi-heart-outline</v-icon>
            </v-btn>
          </template>
        </v-tooltip>

        <v-btn
          variant="flat"
          size="small"
          color="primary"
        >
          Подробнее
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import type { Apartment } from '../types'

/**
 * Интерфейс пропсов компонента карточки квартиры
 */
interface Props {
  apartment: Apartment
}

defineProps<Props>()

/**
 * Маппинг состояний квартир на цвета для отображения
 */
const conditionColors = {
  'новое': 'success',
  'хорошее': 'info',
  'требует ремонта': 'warning',
  'под снос': 'error'
}

/**
 * Форматирование цены для отображения в миллионах рублей
 * @param {number} price - Цена в рублях
 * @returns {string} Отформатированная строка с ценой
 */
const formatPrice = (price: number) => {
  return (price / 1000000).toFixed(1) + ' млн ₽'
}
</script>

<style scoped>
.apartment-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.description-text {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}
.apartment-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
}

.gap-1 {
  gap: 0.25rem;
}

.gap-2 {
  gap: 0.5rem;
}
</style>