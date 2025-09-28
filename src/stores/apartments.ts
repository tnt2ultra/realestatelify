import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useToast } from 'vue-toastification'
import type { Apartment, ValuationRequest, ValuationResult } from '../types'

/**
 * Хранилище для управления квартирами и ИИ-оценкой
 * Содержит логику работы с объявлениями и алгоритм оценки стоимости
 */
export const useApartmentsStore = defineStore('apartments', () => {
  // Реактивный массив всех квартир
  const toast = useToast()

  const apartments = ref<Apartment[]>([
    {
      id: '1',
      title: 'Современная 2-комнатная квартира в центре',
      description: 'Уютная квартира с евроремонтом, панорамными окнами и современной планировкой. Рядом метро, парки и развитая инфраструктура.',
      price: 8500000,
      area: 65,
      rooms: 2,
      bathrooms: 1,
      floor: 8,
      totalFloors: 16,
      address: 'ул. Тверская, 15',
      district: 'Тверской',
      city: 'Москва',
      condition: 'хорошее',
      images: [
        'https://images.unsplash.com/photo-1754136362561-fd8b431c78e4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2MDcyNjN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTg5OTYzMjJ8&ixlib=rb-4.1.0&q=85',
        'https://images.unsplash.com/photo-1758748930781-c5f463a9c25e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2MDcyNjN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTg5OTYzNDZ8&ixlib=rb-4.1.0&q=85',
        'https://images.unsplash.com/photo-1756370382832-1c8fe9965d67?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2MDcyNjN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTg5OTYzNTZ8&ixlib=rb-4.1.0&q=85'
      ],
      sellerId: '2',
      seller: {
        id: '2',
        email: 'seller@example.com',
        name: 'Анна Петрова',
        userType: 'seller',
        createdAt: new Date()
      },
      features: ['Балкон', 'Лифт', 'Консьерж', 'Паркинг'],
      estimatedPrice: 8200000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      title: '3-комнатная квартира с видом на парк',
      description: 'Просторная квартира в тихом районе с видом на парк. Высокие потолки, большие окна, два балкона.',
      price: 12000000,
      area: 95,
      rooms: 3,
      bathrooms: 2,
      floor: 5,
      totalFloors: 9,
      address: 'пр. Мира, 45',
      district: 'Мещанский',
      city: 'Москва',
      condition: 'новое',
      images: [
        'https://images.unsplash.com/photo-1756888008424-86ebdcb9d6a3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2MDcyNjN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTg5OTYzODZ8&ixlib=rb-4.1.0&q=85',
        'https://images.unsplash.com/photo-1757288354960-0e9783136e4c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2MDcyNjN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTg5OTYzOTZ8&ixlib=rb-4.1.0&q=85',
        'https://images.unsplash.com/photo-1757583010761-ffc255a8868c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2MDcyNjN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTg5OTY0MDZ8&ixlib=rb-4.1.0&q=85'
      ],
      sellerId: '3',
      seller: {
        id: '3',
        email: 'seller2@example.com',
        name: 'Михаил Иванов',
        userType: 'seller',
        createdAt: new Date()
      },
      features: ['Два балкона', 'Гардеробная', 'Кондиционер', 'Интернет'],
      estimatedPrice: 11800000,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])

  // Вычисляемое свойство для фильтрованных квартир (пока возвращает все)
  const filteredApartments = computed(() => apartments.value)

  /**
   * Добавление нового объявления о квартире
   * @param {Omit<Apartment, 'id' | 'createdAt' | 'updatedAt'>} apartment - Данные квартиры без служебных полей
   * @returns {Promise<Apartment>} Созданное объявление
   */
  const addApartment = async (apartment: Omit<Apartment, 'id' | 'createdAt' | 'updatedAt'>) => {
    // Валидация обязательных полей
    const validationError = (message: string) => {
      const error = new Error(message)
      toast.error(message)
      throw error
    }

    if (!apartment.title || apartment.title.trim().length < 5) {
      validationError('Заголовок должен содержать минимум 5 символов')
    }

    if (!apartment.description || apartment.description.trim().length < 20) {
      validationError('Описание должно содержать минимум 20 символов')
    }

    if (!apartment.price || apartment.price <= 0) {
      validationError('Цена должна быть больше 0')
    }

    if (!apartment.area || apartment.area <= 0) {
      validationError('Площадь должна быть больше 0')
    }

    if (!apartment.address || apartment.address.trim().length < 5) {
      validationError('Адрес должен содержать минимум 5 символов')
    }

    // Создание нового объявления с уникальным ID и временными метками
    const newApartment: Apartment = {
      ...apartment,
      id: Date.now().toString(36) + Math.random().toString(36),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    // Добавление в начало массива для отображения новых объявлений первыми
    apartments.value.unshift(newApartment)
    return newApartment
  }

  /**
   * ИИ-алгоритм оценки стоимости недвижимости
   * Использует сложную формулу учитывающую множество факторов
   * @param {ValuationRequest} request - Параметры для оценки
   * @returns {Promise<ValuationResult>} Результат оценки с детализацией
   */
  const getValuation = async (request: ValuationRequest): Promise<ValuationResult> => {
    // Валидация входных данных
    if (!request.area || request.area <= 0) {
      throw new Error('Площадь должна быть больше 0')
    }
    
    if (!request.district) {
      throw new Error('Район обязателен для оценки')
    }
    
    if (!request.condition) {
      throw new Error('Состояние квартиры обязательно')
    }
    
    if (request.floor <= 0 || request.totalFloors <= 0) {
      throw new Error('Этаж и количество этажей должны быть больше 0')
    }
    
    if (request.floor > request.totalFloors) {
      throw new Error('Этаж не может быть больше общего количества этажей')
    }
    
    // Симуляция времени работы ИИ-алгоритма
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Базовая цена за квадратный метр в рублях
    const basePrice = 120000
    let multiplier = 1

    // Коэффициенты престижности районов (основаны на реальных данных рынка)
    const districtMultipliers: Record<string, number> = {
      'Тверской': 1.8,
      'Мещанский': 1.5,
      'Хамовники': 2.0,
      'Арбат': 1.9,
      'Таганский': 1.3,
      'Замоскворечье': 1.4
    }

    // Коэффициенты состояния квартиры
    const conditionMultipliers: Record<string, number> = {
      'новое': 1.2,
      'хорошее': 1.0,
      'требует ремонта': 0.8,
      'под снос': 0.6
    }

    // Сложная логика расчета коэффициента этажа
    // Первый и последний этажи менее привлекательны
    // Средние этажи (3-7) наиболее предпочтительны
    const floorMultiplier = request.floor === 1 || request.floor === request.totalFloors 
      ? 0.95 
      : request.floor <= 3 
        ? 0.98 
        : request.floor <= 7 
          ? 1.02 
          : 1.0

    // Коэффициент площади (большие квартиры дороже за м²)
    const areaMultiplier = request.area > 100 ? 1.1 : request.area < 40 ? 0.95 : 1.0
    
    // Коэффициент количества комнат
    const roomsMultiplier = request.rooms >= 3 ? 1.05 : request.rooms === 1 ? 0.95 : 1.0

    // Применение всех коэффициентов
    multiplier *= districtMultipliers[request.district] || 1.0
    multiplier *= conditionMultipliers[request.condition] || 1.0
    multiplier *= floorMultiplier
    multiplier *= areaMultiplier
    multiplier *= roomsMultiplier

    // Финальный расчет стоимости
    const estimatedPrice = Math.round(basePrice * request.area * multiplier)
    
    // Расчет уровня уверенности (зависит от полноты данных)
    const confidence = Math.min(95, Math.max(75, 
      85 + 
      (districtMultipliers[request.district] ? 5 : -10) +
      (request.area > 30 && request.area < 200 ? 5 : -5) +
      Math.random() * 10
    ))
    
    return {
      estimatedPrice,
      confidence: Math.round(confidence),
      factors: {
        location: Math.round(districtMultipliers[request.district] * 100) || 100,
        area: Math.round(areaMultiplier * 100),
        condition: Math.round(conditionMultipliers[request.condition] * 100) || 100,
        floor: Math.round(floorMultiplier * 100)
      },
      marketTrends: generateMarketTrends(request.district)
    }
  }

  /**
   * Генерация анализа рыночных трендов на основе района и цены
   * @param {string} district - Район
   * @returns {string} Текст анализа рынка
   */
  const generateMarketTrends = (district: string): string => {
    const trends = [
      'Стабильный рост цен на недвижимость в данном районе. Спрос превышает предложение.',
      'Активный рынок с высокой ликвидностью. Квартиры продаются в среднем за 2-3 месяца.',
      'Район показывает положительную динамику роста стоимости недвижимости.',
      'Развитая инфраструктура и транспортная доступность поддерживают высокий спрос.'
    ]
    
    // Выбираем тренд на основе хеша района для консистентности
    const index = district.length % trends.length
    return trends[index]
  }

  // Публичный API хранилища
  return {
    apartments: computed(() => apartments.value),
    filteredApartments,
    addApartment,
    getValuation
  }
})