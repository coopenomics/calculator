/**
 * Интерфейс для параметров расчета
 */
export interface CalculationParams {
  contributionAmount: number; // Взнос результатом (руб)
  investorAmount: number; // Взнос деньгами (руб)
  withdrawalRate: number; // Процент возврата стоимости (%)
  initialCapital?: number; // Стартовая капитализация (руб)
  membershipFee?: number; // Эффективность капитала (%)
  monthlyContributions?: number; // Взносы других исполнителей (руб/мес)
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
  currentMonthlyContributions: number; // Взносы других исполнителей (без инвесторов)
  monthlyInvestorAmount?: number; // Ежемесячный взнос инвестора
  totalInvestorsAmount?: number; // Накопительный итог взносов инвесторов
  investorsShare?: number; // Доля инвесторов в процентах
  
  // Данные о других исполнителях по месяцам
  othersCreatorBase?: number; // Базовая стоимость других исполнителей
  othersAuthorBase?: number; // Стоимость авторов других исполнителей
  othersCreatorBonus?: number; // Прибавка других исполнителей
  othersAuthorBonus?: number; // Прибавка авторов других исполнителей
  othersWithdrawalAmount?: number; // Возврат другим исполнителям
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
  
  // Данные о других исполнителях в первом месяце
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
  totalInvestorsAmount: number; // Общая сумма взносов инвесторов
  investorsShare: number; // Доля инвесторов в процентах
  initialMonthlyInvestorAmount: number; // Сумма взноса инвестора в нулевом месяце
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
  monthlyInvestorAmount?: boolean; // Ежемесячный взнос инвестора
  totalInvestorsAmount?: boolean; // Накопительный итог взносов инвесторов
  investorsShare?: boolean; // Доля инвесторов в процентах
  
  // Колонки для других исполнителей
  othersCreatorBase?: boolean; // Базовая стоимость других исполнителей
  othersAuthorBase?: boolean; // Стоимость авторов других исполнителей
  othersCreatorBonus?: boolean; // Прибавка других исполнителей
  othersAuthorBonus?: boolean; // Прибавка авторов других исполнителей
  othersWithdrawalAmount?: boolean; // Возврат другим исполнителям
} 