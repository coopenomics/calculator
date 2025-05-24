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
  membershipFeeGrowthMultiplier?: number; // Множитель роста членских взносов (%)
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
  currentMonthlyContributions: number; // Взносы других создателей (без инвесторов)
  monthlyInvestorAmount?: number; // Ежемесячный вклад инвестора
  totalInvestorsAmount?: number; // Накопительный итог вкладов инвесторов
  investorsShare?: number; // Доля инвесторов в процентах
  
  // Данные о других создателях по месяцам
  othersCreatorBase?: number; // Базовая стоимость других создателей
  othersAuthorBase?: number; // Стоимость авторов других создателей
  othersCreatorBonus?: number; // Премия других создателей
  othersAuthorBonus?: number; // Премия авторов других создателей
  othersWithdrawalAmount?: number; // Возврат другим создателям
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
  
  // Данные о других создателях в первом месяце
  firstMonthOthersCreatorBase: number;
  firstMonthOthersAuthorBase: number;
  firstMonthOthersCreatorBonus: number;
  firstMonthOthersAuthorBonus: number;
  
  // Доходность и капитализация
  additionalCapitalization: number;
  availableRefund: number;
  membershipFeeYield: number;
  capitalGrowthYield: number;
  avgMonthlyYield: number;
  annualYield: number; // Годовая доходность с учетом сложного процента
  roi: number; // Общая рентабельность инвестиций (ROI)
  
  // Результаты по месяцам
  results: MonthlyResult[];
  
  // Показатели для отладки
  initialCreatorValue: number;
  finalCreatorValue: number;
  totalMembershipFeePayments: number;
  totalReturn: number;
  
  // Показатели инвесторов
  totalInvestorsAmount: number; // Общая сумма вкладов инвесторов
  investorsShare: number; // Доля инвесторов в процентах
  initialMonthlyInvestorAmount: number; // Сумма вклада инвестора в нулевом месяце
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
  monthlyInvestorAmount?: boolean; // Ежемесячный вклад инвестора
  totalInvestorsAmount?: boolean; // Накопительный итог вкладов инвесторов
  investorsShare?: boolean; // Доля инвесторов в процентах
  
  // Колонки для других создателей
  othersCreatorBase?: boolean; // Базовая стоимость других создателей
  othersAuthorBase?: boolean; // Стоимость авторов других создателей
  othersCreatorBonus?: boolean; // Премия других создателей
  othersAuthorBonus?: boolean; // Премия авторов других создателей
  othersWithdrawalAmount?: boolean; // Возврат другим создателям
} 