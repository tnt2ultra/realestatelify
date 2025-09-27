/**
 * Интерфейс пользователя системы
 */
export interface User {
  /** Уникальный идентификатор пользователя */
  id: string
  /** Email адрес пользователя */
  email: string
  /** Полное имя пользователя */
  name: string
  /** Номер телефона (опционально) */
  phone?: string
  /** Тип пользователя - покупатель или продавец */
  userType: 'buyer' | 'seller'
  /** URL аватара пользователя (опционально) */
  avatar?: string
  /** Дата создания аккаунта */
  createdAt: Date
}

/**
 * Интерфейс квартиры/объявления
 */
export interface Apartment {
  /** Уникальный идентификатор квартиры */
  id: string
  /** Заголовок объявления */
  title: string
  /** Подробное описание квартиры */
  description: string
  /** Цена в рублях */
  price: number
  /** Площадь в квадратных метрах */
  area: number
  /** Количество комнат */
  rooms: number
  /** Количество санузлов */
  bathrooms: number
  /** Этаж расположения */
  floor: number
  /** Общее количество этажей в доме */
  totalFloors: number
  /** Полный адрес */
  address: string
  /** Район города */
  district: string
  /** Город */
  city: string
  /** Состояние квартиры */
  condition: 'новое' | 'хорошее' | 'требует ремонта' | 'под снос'
  /** Массив URL изображений */
  images: string[]
  /** ID продавца */
  sellerId: string
  /** Объект продавца */
  seller: User
  /** Список особенностей и удобств */
  features: string[]
  /** Оценочная стоимость от ИИ (опционально) */
  estimatedPrice?: number
  /** Дата создания объявления */
  createdAt: Date
  /** Дата последнего обновления */
  updatedAt: Date
}

/**
 * Интерфейс запроса на оценку недвижимости
 */
export interface ValuationRequest {
  /** Площадь квартиры в м² */
  area: number
  /** Район города */
  district: string
  /** Город */
  city: string
  /** Состояние квартиры */
  condition: string
  /** Этаж */
  floor: number
  /** Общее количество этажей */
  totalFloors: number
  /** Количество комнат */
  rooms: number
}

/**
 * Интерфейс результата ИИ-оценки
 */
export interface ValuationResult {
  /** Оценочная стоимость в рублях */
  estimatedPrice: number
  /** Уровень уверенности в оценке (0-100%) */
  confidence: number
  /** Детализация факторов влияющих на цену */
  factors: {
    /** Влияние местоположения (0-200%) */
    location: number
    /** Влияние площади (0-200%) */
    area: number
    /** Влияние состояния (0-200%) */
    condition: number
    /** Влияние этажа (0-200%) */
    floor: number
  }
  /** Анализ рыночных трендов */
  marketTrends: string
}