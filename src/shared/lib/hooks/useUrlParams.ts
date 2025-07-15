import { useState } from 'react';
import { CalculationParams } from '../../../entities/core';
import { parseUrlParams } from '../urlParams';

/**
 * Хук для работы с URL параметрами калькулятора
 * Возвращает параметры из URL при инициализации
 */
export function useUrlParams(): Partial<CalculationParams> {
  const [urlParams] = useState(() => parseUrlParams());
  
  return urlParams;
} 