import { CalculationParams } from '../../entities/core';

/**
 * Маппинг URL параметров на параметры калькулятора
 */
const URL_PARAM_MAPPING = {
  // Основные параметры
  'contribution_amount': 'contributionAmount',
  'creator_amount': 'contributionAmount', // алиас для обратной совместимости
  'invest_amount': 'investorAmount',
  'investor_amount': 'investorAmount', // алиас для обратной совместимости
  
  // Дополнительные параметры
  'withdrawal_rate': 'withdrawalRate',
  'initial_capital': 'initialCapital',
  'membership_fee': 'membershipFee',
  'monthly_contributions': 'monthlyContributions',
  'growth_multiplier': 'growthMultiplier',
  'membership_fee_growth_multiplier': 'membershipFeeGrowthMultiplier',
} as const;

/**
 * Парсит URL параметры и возвращает объект с параметрами калькулятора
 */
export function parseUrlParams(): Partial<CalculationParams> {
  const params = new URLSearchParams(window.location.search);
  const result: Partial<CalculationParams> = {};

  for (const [urlKey, configKey] of Object.entries(URL_PARAM_MAPPING)) {
    const value = params.get(urlKey);
    if (value !== null) {
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue >= 0) {
        (result as any)[configKey] = numValue;
      }
    }
  }

  return result;
}

/**
 * Создает URL с параметрами калькулятора
 */
export function createUrlWithParams(params: Partial<CalculationParams>): string {
  const urlParams = new URLSearchParams();
  
  for (const [urlKey, configKey] of Object.entries(URL_PARAM_MAPPING)) {
    const value = (params as any)[configKey];
    if (value !== undefined && value !== null && value !== 0) {
      urlParams.set(urlKey, value.toString());
    }
  }

  const currentUrl = new URL(window.location.href);
  currentUrl.search = urlParams.toString();
  return currentUrl.toString();
}

/**
 * Обновляет URL с текущими параметрами калькулятора
 */
export function updateUrlParams(params: Partial<CalculationParams>): void {
  const newUrl = createUrlWithParams(params);
  window.history.replaceState({}, '', newUrl);
} 