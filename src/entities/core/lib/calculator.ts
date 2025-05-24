import { CALCULATOR_CONSTANTS } from '../model/constants';
import { CalculationParams, CalculationResults } from '../model/types';

/**
 * Основная функция расчета для калькулятора выгоды
 * @param {CalculationParams} params - Параметры для расчета
 * @returns {CalculationResults} Результаты расчетов
 */
export function calculateBenefits({
  contributionAmount, // Взнос результатом (руб)
  investorAmount = 0, // Взнос деньгами (руб)
  withdrawalRate, // Процент возврата стоимости (%)
  initialCapital = CALCULATOR_CONSTANTS.DEFAULT_INITIAL_CAPITAL, // Стартовая капитализация (руб)
  membershipFee = 5, // Эффективность капитала (%)
  monthlyContributions = 1000000, // Взносы других создателей (руб/мес)
  growthMultiplier = 0, // Множитель роста взносов (%)
  membershipFeeGrowthMultiplier = 0 // Множитель роста членских взносов (%)
}: CalculationParams): CalculationResults {
  // Проверяем, является ли пользователь только инвестором (не вносит труд)
  const isUserInvestorOnly = contributionAmount === 0;
  
  // Базовые расчеты по заданным формулам (для UI и возврата пользователю)
  const creatorBaseFact = contributionAmount; // Стоимость создателя из прямого взноса
  const authorBaseFact = CALCULATOR_CONSTANTS.AUTHOR_RATIO * creatorBaseFact; // Стоимость автора (61.8%)
  
  // Премии пользователя
  const creatorBonusFact = CALCULATOR_CONSTANTS.CREATOR_BONUS_RATIO * creatorBaseFact; // Премия создателя (100%)
  const authorBonusFact = CALCULATOR_CONSTANTS.AUTHOR_BONUS_RATIO * authorBaseFact; // Премия автора (100%)
  
  // Если пользователь только инвестор, учитываем взносы других создателей в первом месяце
  const firstMonthOthersCreatorBase = isUserInvestorOnly ? monthlyContributions : 0;
  const firstMonthOthersAuthorBase = isUserInvestorOnly ? CALCULATOR_CONSTANTS.AUTHOR_RATIO * firstMonthOthersCreatorBase : 0;
  const firstMonthOthersCreatorBonus = isUserInvestorOnly ? CALCULATOR_CONSTANTS.CREATOR_BONUS_RATIO * firstMonthOthersCreatorBase : 0;
  const firstMonthOthersAuthorBonus = isUserInvestorOnly ? CALCULATOR_CONSTANTS.AUTHOR_BONUS_RATIO * firstMonthOthersAuthorBase : 0;
  
  // Суммарная базовая стоимость (доступна к возврату только для пользователя)
  const totalBase = creatorBaseFact + authorBaseFact;
  
  // Суммарная генерация от первого взноса (включая других создателей если пользователь только инвестор)
  const totalGenerated = creatorBaseFact + authorBaseFact + creatorBonusFact + authorBonusFact +
                         firstMonthOthersCreatorBase + firstMonthOthersAuthorBase + firstMonthOthersCreatorBonus + firstMonthOthersAuthorBonus;

  // Расчет возвращаемой части стоимости согласно рубильнику возврата (только для пользователя)
  const creatorWithdrawalAmount = creatorBaseFact * (withdrawalRate / 100); // Сумма возврата создателя
  const authorWithdrawalAmount = authorBaseFact * (withdrawalRate / 100); // Сумма возврата автора
  
  // Расчет возврата для других создателей в первом месяце (если пользователь только инвестор)
  const firstMonthOthersWithdrawal = (firstMonthOthersCreatorBase + firstMonthOthersAuthorBase) * (withdrawalRate / 100);
  
  const creatorInitialWithdrawal = creatorWithdrawalAmount; // Начальный возврат создателя
  const authorInitialWithdrawal = authorWithdrawalAmount; // Начальный возврат автора
  
  const totalWithdrawed = creatorInitialWithdrawal + authorInitialWithdrawal + firstMonthOthersWithdrawal;
  
  // Расчет дополнительной капитализации от генерации
  const firstContributorsBonus = (totalGenerated - totalWithdrawed) * CALCULATOR_CONSTANTS.GOLDEN_RATIO;
  
  // Учитываем инвестора в нулевой месяц (компенсирует возврат как пользователю, так и другим создателям)
  const initialMonthlyInvestorAmount = creatorBaseFact + authorBaseFact + firstMonthOthersCreatorBase + firstMonthOthersAuthorBase;
  
  // В первый месяц считаем складочный капитал
  // Добавляем взнос инвестора к складочному капиталу
  // Не вычитаем totalWithdrawed из складочного капитала, так как его покрывает инвестор
  let shareholderCapital = initialCapital + totalGenerated + firstContributorsBonus + investorAmount - totalWithdrawed + initialMonthlyInvestorAmount;
  
  // Вклад создателя включает остающуюся часть стоимости и премию + взнос инвестора
  let initialContribution = (creatorBaseFact - creatorInitialWithdrawal + creatorBonusFact) + investorAmount;
  
  // Начальная доля создателя с учетом возврата части стоимости
  let creatorShare = initialContribution / shareholderCapital * 100;
  
  // Массив для хранения результатов по месяцам
  const results = [];
  let totalMembershipFeePayments = 0; // Общие выплаты от членских взносов
  let initialCreatorValue = initialContribution; // Начальная стоимость доли создателя
  let finalCreatorValue = 0; // Конечная стоимость доли создателя (заполнится в конце расчетов)
  
  // Переменные для учета накопительного итога вкладов инвесторов
  let totalInvestorsAmount = initialMonthlyInvestorAmount + investorAmount; // Общая сумма вкладов инвесторов
  let investorsShare = totalInvestorsAmount / shareholderCapital * 100; // Доля инвесторов в процентах
  
  // Месяцы, в которые производятся выплаты членских взносов
  const payoutMonths = CALCULATOR_CONSTANTS.PAYOUT_MONTHS;
  let accumulatedMembershipFees = 0;

  // Добавляем начальные параметры (нулевой месяц) явно вне цикла
  results.push({
    month: 0,
    shareholderCapital: Math.round(shareholderCapital),
    monthlyGeneration: Math.round(totalGenerated),
    contributorsBonus: Math.round(firstContributorsBonus),
    capitalGrowth: Math.round(totalGenerated + firstContributorsBonus + investorAmount - totalWithdrawed + initialMonthlyInvestorAmount),
    initialContribution: Math.round(initialContribution),
    creatorShare: parseFloat(creatorShare.toFixed(2)),
    monthlyFee: 0, // В нулевой месяц нет членских взносов
    creatorMembershipFeePayment: Math.round(creatorInitialWithdrawal), // Возврат создателю в нулевой месяц
    accumulatedFees: 0,
    isPayoutMonth: false, // Флаг для различения от обычных выплат членских взносов
    // Если пользователь только инвестор, показываем взносы других создателей + инвестора
    // Иначе показываем только инвестора (как раньше)
    currentMonthlyContributions: Math.round(isUserInvestorOnly ? 
      (firstMonthOthersCreatorBase + firstMonthOthersAuthorBase + initialMonthlyInvestorAmount) :
      initialMonthlyInvestorAmount
    ),
    monthlyInvestorAmount: Math.round(initialMonthlyInvestorAmount), // Добавляем информацию о ежемесячном инвесторе
    totalInvestorsAmount: Math.round(totalInvestorsAmount), // Накопительный итог вкладов инвесторов
    investorsShare: parseFloat(investorsShare.toFixed(2)), // Доля инвесторов
    
    // Данные о других создателях в нулевом месяце
    othersCreatorBase: Math.round(firstMonthOthersCreatorBase),
    othersAuthorBase: Math.round(firstMonthOthersAuthorBase),
    othersCreatorBonus: Math.round(firstMonthOthersCreatorBonus),
    othersAuthorBonus: Math.round(firstMonthOthersAuthorBonus),
    othersWithdrawalAmount: Math.round(firstMonthOthersWithdrawal)
  });
  
  // Текущее значение взносов других создателей (без учета инвесторов)
  // Если пользователь только инвестор, то взносы других уже учтены в нулевом месяце,
  // поэтому в первом месяце применяем рост к базовому значению
  let currentMonthlyContributions = monthlyContributions;
  
  // Расчет по месяцам (от 1 до 36 месяцев = 3 года)
  for (let month = 1; month <= 35; month++) {
    // ===== ЧАСТЬ 1: ПРИРОСТ ВКЛАДА И ИЗМЕНЕНИЕ ДОЛИ =====
    
    // Считаем генерацию от нового взноса (руб)
    const othersCreatorBase = currentMonthlyContributions; // Базовая стоимость создателя с учетом роста
    const othersAuthorBase = othersCreatorBase * CALCULATOR_CONSTANTS.AUTHOR_RATIO; // Стоимость автора (61.8%)
    const othersCreatorBonus = CALCULATOR_CONSTANTS.CREATOR_BONUS_RATIO * othersCreatorBase; // Премия создателя (100%)
    const othersAuthorBonus = CALCULATOR_CONSTANTS.AUTHOR_BONUS_RATIO * othersAuthorBase; // Премия автора (100%)
    
    // Генерация нового взноса (руб)
    const monthlyGeneration = othersCreatorBase + othersAuthorBase + othersCreatorBonus + othersAuthorBonus;
    
    // Расчет возврата стоимости для новых взносов (руб)
    const othersMonthlyBase = othersCreatorBase + othersAuthorBase; // Общая базовая стоимость
    const othersWithdrawalAmount = othersMonthlyBase * (withdrawalRate / 100); // Возврат по рубильнику
    
    // Рассчитываем премию вкладчиков (руб)
    const contributorsBonus = (monthlyGeneration - othersWithdrawalAmount) * CALCULATOR_CONSTANTS.GOLDEN_RATIO;
    
    // Прирост складочного капитала за месяц от созданных ценностей
    const capitalGrowth = monthlyGeneration + contributorsBonus - othersWithdrawalAmount;
    
    // Учитываем дополнительного инвестора начиная со второго месяца (month >= 2)
    let monthlyInvestorAmount = 0;
    
    // Инвестор вносит сумму, равную стоимости труда авторов и создателей
    monthlyInvestorAmount = othersCreatorBase + othersAuthorBase
    
    // Увеличиваем накопительную сумму вкладов инвесторов
    totalInvestorsAmount += monthlyInvestorAmount;
  
    
    // Общий прирост капитала (включая инвестора)
    const totalCapitalGrowth = capitalGrowth + monthlyInvestorAmount;
    
    // Увеличиваем складочный капитал: новый взнос + премия вкладчиков + инвестор - возврат (руб)
    shareholderCapital += totalCapitalGrowth;
    
    // Пересчитываем долю инвесторов после изменения складочного капитала
    investorsShare = totalInvestorsAmount / shareholderCapital * 100;
    
    // Увеличиваем вклад создателя на его долю в премии вкладчиков (руб)
    const creatorBonusShare = contributorsBonus * (creatorShare / 100);
    initialContribution += creatorBonusShare;
    
    // Пересчет доли создателя после изменения складочного капитала (%)
    creatorShare = (initialContribution / shareholderCapital) * 100;
    
    // ===== ЧАСТЬ 2: РАСЧЕТ ВЫПЛАТ И ИХ ВЛИЯНИЕ НА КАПИТАЛ =====
    
    // Рассчитываем текущий множитель членских взносов со сложным процентом
    // Множитель применяется ежемесячно
    const currentMembershipFeeMultiplier = Math.pow(1 + membershipFeeGrowthMultiplier / 100, month);
    
    // Расчет членских взносов за месяц с учетом множителя роста
    // Если месяц меньше отложенного периода, то накопление не происходит
    const monthlyFee = month >= CALCULATOR_CONSTANTS.DELAYED_FIRST_PAYMENTS 
      ? totalCapitalGrowth * (membershipFee / 100) * currentMembershipFeeMultiplier
      : 0;
    
    // Накапливаем членские взносы
    accumulatedMembershipFees += monthlyFee;
    
    // Доля создателя от членских взносов (руб)
    let creatorMembershipFeePayment = 0;
    
    // Проверяем, является ли текущий месяц месяцем выплаты
    const isPayoutMonth = payoutMonths.includes(month);
    
    if (isPayoutMonth) {
      // В месяц выплаты выплачиваем всю накопленную сумму
      creatorMembershipFeePayment = accumulatedMembershipFees * (creatorShare / 100);
      
      // Уменьшаем складочный капитал на сумму всех накопленных членских взносов
      // Но не позволяем капиталу стать отрицательным
      shareholderCapital = Math.max(0, shareholderCapital - accumulatedMembershipFees);
      
      // Уменьшаем вклад создателя на его долю от членских взносов
      // Но не позволяем вкладу стать отрицательным
      initialContribution = Math.max(0, initialContribution - creatorMembershipFeePayment);
      
      // Пересчитываем долю создателя после выплат
      // Если капитал стал нулевым, доля будет нулевой
      creatorShare = shareholderCapital > 0 ? (initialContribution / shareholderCapital) * 100 : 0;
      
      // Пересчитываем долю инвесторов после выплат
      // Если капитал стал нулевым, доля будет нулевой
      investorsShare = shareholderCapital > 0 ? totalInvestorsAmount / shareholderCapital * 100 : 0;
      
      // Суммирование выплат
      totalMembershipFeePayments += creatorMembershipFeePayment;
      
      // Обнуляем накопленные членские взносы после выплаты
      accumulatedMembershipFees = 0;
    }
    
    // Если это последний месяц, запоминаем конечную стоимость доли
    if (month === 35) {
      finalCreatorValue = shareholderCapital * creatorShare / 100;
    }
    
    // Увеличиваем взносы других создателей для следующего месяца на указанный процент
    currentMonthlyContributions *= (1 + growthMultiplier / 100);
    
    // Сохранение результатов текущего месяца
    results.push({
      month,
      shareholderCapital: Math.round(shareholderCapital),
      monthlyGeneration: Math.round(monthlyGeneration),
      contributorsBonus: Math.round(contributorsBonus),
      capitalGrowth: Math.round(totalCapitalGrowth), // Обновляем с учетом инвестора
      initialContribution: Math.round(initialContribution),
      creatorShare: parseFloat(creatorShare.toFixed(2)),
      monthlyFee: Math.round(monthlyFee),
      creatorMembershipFeePayment: Math.round(creatorMembershipFeePayment),
      isPayoutMonth,
      accumulatedFees: Math.round(accumulatedMembershipFees),
      totalMembershipFeePayments: Math.round(totalMembershipFeePayments),
      // Отдельно учитываем вклады создателей, авторов и инвесторов
      currentMonthlyContributions: Math.round(currentMonthlyContributions + monthlyInvestorAmount),
      monthlyInvestorAmount: Math.round(monthlyInvestorAmount),
      totalInvestorsAmount: Math.round(totalInvestorsAmount),
      investorsShare: parseFloat(investorsShare.toFixed(2)),
      
      // Данные о других создателях в текущем месяце
      othersCreatorBase: Math.round(othersCreatorBase),
      othersAuthorBase: Math.round(othersAuthorBase),
      othersCreatorBonus: Math.round(othersCreatorBonus),
      othersAuthorBonus: Math.round(othersAuthorBonus),
      othersWithdrawalAmount: Math.round(othersWithdrawalAmount)
    });
  }
  
  // Расчет доходностей
  const averageMonthlyMembershipFeeYield = initialCreatorValue > 0 
    ? (totalMembershipFeePayments / initialCreatorValue / 36) * 100
    : 0;
  
  // Исправленный расчет доходности от роста капитала
  // Учитываем как финальную стоимость доли, так и полученные выплаты
  const totalReturn = finalCreatorValue + totalMembershipFeePayments;
  
  // Если начальный вклад был нулевым или отрицательным, доходность считаем нулевой
  let capitalGrowthTotal = 0;
  if (initialCreatorValue > 0 && totalReturn > 0) {
    capitalGrowthTotal = ((totalReturn / initialCreatorValue) ** (1/3) - 1) * 100;
  }
  
  const capitalGrowthMonthly = capitalGrowthTotal / 12;
  
  // Месячная доходность (сумма доходностей от членских взносов и роста капитала)
  const avgMonthlyYield = averageMonthlyMembershipFeeYield + capitalGrowthMonthly;
  
  // Годовая доходность - просто умножаем месячную на 12, т.к. эффекты капитализации уже учтены в модели
  const annualYield = avgMonthlyYield * 12;
  
  // Расчет ROI (Return on Investment) без учета первого месяца (тела инвестиции)
  // ROI = (Прибыль / Начальные инвестиции) * 100%
  // Прибыль включает как выплаты от членских взносов, так и прирост стоимости доли
  const totalProfit = totalMembershipFeePayments + (finalCreatorValue - initialCreatorValue);
  const roi = initialCreatorValue > 0 ? (totalProfit / initialCreatorValue) * 100 : 0;
  
  return {
    // Базовые значения
    creatorBaseValue: creatorBaseFact,
    authorBaseValue: authorBaseFact,
    creatorBonus: creatorBonusFact,
    authorBonus: authorBonusFact,
    totalBaseValue: totalBase,
    totalGenerated,
    
    // Данные о других создателях в первом месяце
    firstMonthOthersCreatorBase: Math.round(firstMonthOthersCreatorBase),
    firstMonthOthersAuthorBase: Math.round(firstMonthOthersAuthorBase),
    firstMonthOthersCreatorBonus: Math.round(firstMonthOthersCreatorBonus),
    firstMonthOthersAuthorBonus: Math.round(firstMonthOthersAuthorBonus),
    
    // Доходность и капитализация
    additionalCapitalization: Math.round(firstContributorsBonus),
    availableRefund: Math.round(totalMembershipFeePayments),
    membershipFeeYield: parseFloat(averageMonthlyMembershipFeeYield.toFixed(2)),
    capitalGrowthYield: parseFloat(capitalGrowthMonthly.toFixed(2)),
    avgMonthlyYield: parseFloat(avgMonthlyYield.toFixed(2)),
    annualYield: parseFloat(annualYield.toFixed(2)),
    roi: parseFloat(roi.toFixed(2)), // Добавляем ROI в возвращаемый объект
    
    // Результаты по месяцам
    results,
    
    // Показатели для отладки
    initialCreatorValue: Math.round(initialCreatorValue),
    finalCreatorValue: Math.round(finalCreatorValue),
    totalMembershipFeePayments: Math.round(totalMembershipFeePayments),
    totalReturn: Math.round(totalReturn),
    
    // Показатели инвесторов
    totalInvestorsAmount: Math.round(totalInvestorsAmount),
    investorsShare: parseFloat(investorsShare.toFixed(2)),
    initialMonthlyInvestorAmount: Math.round(initialMonthlyInvestorAmount)
  };
}

/**
 * Расчет выгоды с параметрами по умолчанию
 * @returns {CalculationResults} Результаты расчетов с параметрами по умолчанию
 */
export function calculateDefaultBenefits(): CalculationResults {
  return calculateBenefits({
    contributionAmount: 1000000,
    investorAmount: 0,
    withdrawalRate: 100,
    initialCapital: CALCULATOR_CONSTANTS.DEFAULT_INITIAL_CAPITAL,
    membershipFee: 5,
    monthlyContributions: 1000000,
    growthMultiplier: 0,
    membershipFeeGrowthMultiplier: 0
  });
} 