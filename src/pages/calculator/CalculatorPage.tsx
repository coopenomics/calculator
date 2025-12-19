import { Row, Col, Typography } from 'antd';
import { useState, useEffect, FC } from 'react';
import { calculateBenefits, CALCULATOR_CONSTANTS, ColumnVisibility } from '../../entities/core';

// Виджеты
import { 
  ContributionFormSection, 
  InvestmentFormSection, 
  SystemParamsSection,
  ContributionResultsSection, 
  ProfitabilityResultsSection, 
  MonthlyResultsTable, 
  FooterNote,
  WithdrawalRateSection,
  MonthlyContributionsSection,
  LegendSection
} from '../../widgets';

// Стили
import './styles/calculator.css';

const { Title, Text } = Typography;

interface CalculatorPageProps {
  initialParams?: {
    contributionAmount?: number;
    investorAmount?: number;
    withdrawalRate?: number;
    initialCapital?: number;
    membershipFee?: number;
    monthlyContributions?: number;
    growthMultiplier?: number;
    membershipFeeGrowthMultiplier?: number;
  };
}

export const CalculatorPage: FC<CalculatorPageProps> = ({ initialParams }) => {
  // Начальные параметры из таблицы Excel или переданные через props
  const [initialCapital, setInitialCapital] = useState<number>(initialParams?.initialCapital ?? CALCULATOR_CONSTANTS.DEFAULT_INITIAL_CAPITAL); // Стартовая капитализация (руб)
  const [contributionAmount, setContributionAmount] = useState<number>(initialParams?.contributionAmount ?? 0); // руб (взнос результатом)
  const [investorAmount, setInvestorAmount] = useState<number>(initialParams?.investorAmount ?? 0); // руб (взнос деньгами)
  const [monthlyContributions, setMonthlyContributions] = useState<number>(() => {
    const contributionValue = initialParams?.contributionAmount ?? 0;
    return initialParams?.monthlyContributions ?? (contributionValue < 1000000 ? 1000000 : contributionValue);
  }); // руб (взносы других в месяц - синхронизируется с contributionAmount)
  const [growthMultiplier, setGrowthMultiplier] = useState<number>(initialParams?.growthMultiplier ?? 0); // % (множитель роста ежемесячных взносов)
  const [membershipFee, setMembershipFee] = useState<number>(initialParams?.membershipFee ?? 5); // % (членские взносы в месяц от складочного капитала)
  const [withdrawalRate, setWithdrawalRate] = useState<number>(initialParams?.withdrawalRate ?? 100); // % (сколько пайщик забирает из своей стоимости)
  const [membershipFeeGrowthMultiplier, setMembershipFeeGrowthMultiplier] = useState<number>(initialParams?.membershipFeeGrowthMultiplier ?? 0); // % (множитель роста членских взносов)
  
  // Результаты расчетов
  const [creatorBaseValue, setCreatorBaseValue] = useState<number>(0); // Стоимость создателя
  const [creatorBonus, setCreatorBonus] = useState<number>(0); // Премия создателя
  const [authorBaseValue, setAuthorBaseValue] = useState<number>(0); // Стоимость автора
  const [authorBonus, setAuthorBonus] = useState<number>(0); // Премия автора
  const [totalGenerated, setTotalGenerated] = useState<number>(0); // Общая сумма генерации
  const [totalBaseValue, setTotalBaseValue] = useState<number>(0); // Общая базовая стоимость
  const [availableRefund, setAvailableRefund] = useState<number>(0); // Доступно к возврату
  const [avgMonthlyYield, setAvgMonthlyYield] = useState<number>(0); // Средняя месячная доходность
  const [annualYield, setAnnualYield] = useState<number>(0); // Годовая доходность
  const [membershipFeeYield, setMembershipFeeYield] = useState<number>(0); // Доходность от членских взносов
  const [capitalGrowthYield, setCapitalGrowthYield] = useState<number>(0); // Доходность от роста капитала
  const [additionalCapitalization, setAdditionalCapitalization] = useState<number>(0); // Дополнительная капитализация
  const [calculationResults, setCalculationResults] = useState<any[]>([]); // Результаты по месяцам
  const [roi, setRoi] = useState<number>(0); // Return on Investment
  
  // Данные об инвесторах
  const [totalInvestorsAmount, setTotalInvestorsAmount] = useState<number>(0); // Общая сумма взносов инвесторов
  const [investorsShare, setInvestorsShare] = useState<number>(0); // Доля инвесторов в процентах
  const [initialMonthlyInvestorAmount, setInitialMonthlyInvestorAmount] = useState<number>(0); // Взнос инвестора в нулевом месяце
  
  // Данные о других создателях в первом месяце
  const [firstMonthOthersCreatorBase, setFirstMonthOthersCreatorBase] = useState<number>(0);
  const [firstMonthOthersAuthorBase, setFirstMonthOthersAuthorBase] = useState<number>(0);
  const [firstMonthOthersCreatorBonus, setFirstMonthOthersCreatorBonus] = useState<number>(0);
  const [firstMonthOthersAuthorBonus, setFirstMonthOthersAuthorBonus] = useState<number>(0);
  
  // Настройка видимости столбцов для разработчика
  // Измените true/false для нужных колонок
  const columnVisibility: ColumnVisibility = {
    month: true,               // Месяц
    shareholderCapital: true,  // Складочный капитал
    monthlyGeneration: true,   // Сумма генерации
    contributorsBonus: true,      // Премия вкладчиков
    capitalGrowth: true,       // Прирост складочного капитала
    initialContribution: true,   // Вклад создателя
    creatorShare: true,        // Доля создателя
    monthlyFee: true,          // Членские взносы
    accumulatedFees: true,    // Накопленные взносы (скрыт по умолчанию)
    creatorMembershipFeePayment: true,  // Выплата создателю
    currentMonthlyContributions: true,  // Взносы других исполнителей
    monthlyInvestorAmount: true,       // Ежемесячный взнос инвестора
    totalInvestorsAmount: true,        // Накопительный итог взносов инвесторов
    investorsShare: true,               // Доля инвесторов в процентах
    
    // Колонки для других исполнителей (показываем только если пользователь инвестор)
    othersCreatorBase: true,           // Базовая стоимость других исполнителей
    othersAuthorBase: true,            // Стоимость авторов других исполнителей
    othersCreatorBonus: true,          // Премия других исполнителей
    othersAuthorBonus: true,           // Премия авторов других исполнителей
    othersWithdrawalAmount: true       // Возврат другим исполнителям
  };
  
  useEffect(() => {
    const results = calculateBenefits({
      contributionAmount,
      investorAmount,
      withdrawalRate,
      initialCapital,
      membershipFee,
      monthlyContributions,
      growthMultiplier,
      membershipFeeGrowthMultiplier
    });
    
    // Обновление состояний из результатов расчета
    setCreatorBaseValue(results.creatorBaseValue);
    setAuthorBaseValue(results.authorBaseValue);
    setCreatorBonus(results.creatorBonus);
    setAuthorBonus(results.authorBonus);
    setTotalGenerated(results.totalGenerated);
    setTotalBaseValue(results.totalBaseValue);
    setAvailableRefund(results.availableRefund);
    setMembershipFeeYield(results.membershipFeeYield);
    setCapitalGrowthYield(results.capitalGrowthYield);
    setAvgMonthlyYield(results.avgMonthlyYield);
    setAnnualYield(results.annualYield);
    setAdditionalCapitalization(results.additionalCapitalization);
    setCalculationResults(results.results);
    setRoi(results.roi);
    
    // Обновление данных об инвесторах
    setTotalInvestorsAmount(results.totalInvestorsAmount);
    setInvestorsShare(results.investorsShare);
    setInitialMonthlyInvestorAmount(results.initialMonthlyInvestorAmount);
    
    // Обновление данных о других создателях в первом месяце
    setFirstMonthOthersCreatorBase(results.firstMonthOthersCreatorBase);
    setFirstMonthOthersAuthorBase(results.firstMonthOthersAuthorBase);
    setFirstMonthOthersCreatorBonus(results.firstMonthOthersCreatorBonus);
    setFirstMonthOthersAuthorBonus(results.firstMonthOthersAuthorBonus);
    
  }, [contributionAmount, investorAmount, withdrawalRate, initialCapital, membershipFee, monthlyContributions, growthMultiplier, membershipFeeGrowthMultiplier]);
  
  return (
    <div className="calculator-container">
      <Title level={2} className="mb-sm">Калькулятор выгоды</Title>
      <Text className="mb-md" style={{ display: 'block' }}>от участия в создании платформы и приложений "Кооперативной Экономики"</Text>
      
      <LegendSection />
      
      <Row gutter={[16, 16]} align="stretch">
        <Col xs={24} md={12} style={{ display: 'flex', flexDirection: 'column' }}>
          <ContributionFormSection 
            contributionAmount={contributionAmount}
            onContributionAmountChange={(value) => {
              const amount = value || 0;
              setContributionAmount(amount);
              setMonthlyContributions(amount < 1000000 ? 1000000 : amount);
            }}
          />
          
        </Col>
        
        <Col xs={24} md={12} style={{ display: 'flex', flexDirection: 'column' }}>
          
          <WithdrawalRateSection 
            withdrawalRate={withdrawalRate}
            onWithdrawalRateChange={setWithdrawalRate}
          />
        </Col>
        
        <Col xs={24} md={12} style={{ display: 'flex', flexDirection: 'column' }}>
          <InvestmentFormSection 
            investorAmount={investorAmount}
            onInvestorAmountChange={(value) => setInvestorAmount(value || 0)}
          />
        </Col>
        
        <Col xs={24} md={12} className='mb-md'>
          <ProfitabilityResultsSection 
            additionalCapitalization={additionalCapitalization}
            availableRefund={availableRefund}
            membershipFeeYield={membershipFeeYield}
            capitalGrowthYield={capitalGrowthYield}
            avgMonthlyYield={avgMonthlyYield}
            annualYield={annualYield}
            roi={roi}
            creatorBonus={creatorBonus}
          />
        </Col>
      </Row>
      
      
      
      <Row gutter={[16, 16]}>
        <Col xs={24} md={24}>
          <ContributionResultsSection 
            initialCapital={initialCapital}
            creatorBaseValue={creatorBaseValue}
            creatorBonus={creatorBonus}
            authorBaseValue={authorBaseValue}
            authorBonus={authorBonus}
            totalBaseValue={totalBaseValue}
            totalGenerated={totalGenerated}
            investorAmount={investorAmount}
            additionalCapitalization={additionalCapitalization}
            totalInvestorsAmount={totalInvestorsAmount}
            investorsShare={investorsShare}
            initialMonthlyInvestorAmount={initialMonthlyInvestorAmount}
            firstMonthOthersCreatorBase={firstMonthOthersCreatorBase}
            firstMonthOthersAuthorBase={firstMonthOthersAuthorBase}
            firstMonthOthersCreatorBonus={firstMonthOthersCreatorBonus}
            firstMonthOthersAuthorBonus={firstMonthOthersAuthorBonus}
          />
        </Col>
      </Row>
      <MonthlyResultsTable 
        results={calculationResults}
        columnVisibility={columnVisibility}
      />
      <Row gutter={[16, 16]} className="mt-lg">
        <Col xs={24}>
          <SystemParamsSection 
            initialCapital={initialCapital}
            membershipFee={membershipFee}
            growthMultiplier={growthMultiplier}
            membershipFeeGrowthMultiplier={membershipFeeGrowthMultiplier}
            monthlyContributions={monthlyContributions}
            onInitialCapitalChange={setInitialCapital}
            onMembershipFeeChange={setMembershipFee}
            onGrowthMultiplierChange={setGrowthMultiplier}
            onMembershipFeeGrowthMultiplierChange={setMembershipFeeGrowthMultiplier}
            onMonthlyContributionsChange={(value) => setMonthlyContributions(value || 0)}
          />
        </Col>
      </Row>
      
      {/* <FooterNote /> */}
    </div>
  );
}; 