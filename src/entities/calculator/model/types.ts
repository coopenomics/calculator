/**
 * Интерфейс для параметров расчета
 */
export interface CalculationParams {
  contributionAmount: number; // Взнос результатом (руб)
  investorAmount: number; // Взнос деньгами (руб)
  withdrawalRate: number; // Процент возврата стоимости (%)
  initialCapital?: number; // Стартовая капитализация (руб)
  membershipFee?: number; // Эффективность капитала (%)
  monthlyContributions?: number; // Взносы других создателей (руб/мес)
  growthMultiplier?: number; // Множитель роста взносов (%)
}

/**
 * Интерфейс для результатов по месяцам
 */
export interface MonthlyResult {
  month: number;
  shareholderCapital: number;
  monthlyGeneration: number;
  contributorsBonus: number;
  capitalGrowth: number;
  initialContribution: number;
  creatorShare: number;
  monthlyFee: number;
  creatorMembershipFeePayment: number;
  isPayoutMonth: boolean;
  accumulatedFees: number;
  totalMembershipFeePayments?: number;
  currentMonthlyContributions: number;
}

/**
 * Интерфейс для результатов расчетов
 */
export interface CalculationResults {
  // Базовые значения
  creatorBaseValue: number;
  authorBaseValue: number;
  creatorBonus: number;
  authorBonus: number;
  totalBaseValue: number;
  totalGenerated: number;
  
  // Доходность и капитализация
  additionalCapitalization: number;
  availableRefund: number;
  membershipFeeYield: number;
  capitalGrowthYield: number;
  avgMonthlyYield: number;
  
  // Результаты по месяцам
  results: MonthlyResult[];
  
  // Показатели для отладки
  initialCreatorValue: number;
  finalCreatorValue: number;
  totalMembershipFeePayments: number;
  totalReturn: number;
}

/**
 * Интерфейс для настроек видимости столбцов
 */
export interface ColumnVisibility {
  month: boolean;
  shareholderCapital: boolean;
  monthlyGeneration: boolean;
  contributorsBonus: boolean;
  capitalGrowth: boolean;
  initialContribution: boolean;
  creatorShare: boolean;
  monthlyFee: boolean;
  accumulatedFees: boolean;
  creatorMembershipFeePayment: boolean;
  currentMonthlyContributions: boolean;
} 