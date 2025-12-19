import { Button } from 'antd';
import { useState, useEffect, FC } from 'react';
import { calculateBenefits, CALCULATOR_CONSTANTS, ColumnVisibility, CalculationParams } from '../../entities/core';
import { 
  ContributionFormSection, 
  InvestmentFormSection, 
  ContributionResultsSection, 
  ProfitabilityResultsSection, 
  MonthlyResultsTable, 
} from '../../widgets';
import { CalculatorPage } from './CalculatorPage';
import './styles/calculator.css';

interface WizardCalculatorPageProps {
  initialParams?: Partial<CalculationParams>;
}

export const WizardCalculatorPage: FC<WizardCalculatorPageProps> = ({ initialParams }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  // Параметры калькулятора
  const [initialCapital] = useState<number>(initialParams?.initialCapital ?? CALCULATOR_CONSTANTS.DEFAULT_INITIAL_CAPITAL);
  const [contributionAmount, setContributionAmount] = useState<number>(initialParams?.contributionAmount ?? 0);
  const [investorAmount, setInvestorAmount] = useState<number>(initialParams?.investorAmount ?? 0);
  const [monthlyContributions, setMonthlyContributions] = useState<number>(() => {
    const contributionValue = initialParams?.contributionAmount ?? 0;
    return initialParams?.monthlyContributions ?? (contributionValue < 1000000 ? 1000000 : contributionValue);
  });
  const [growthMultiplier] = useState<number>(initialParams?.growthMultiplier ?? 0);
  const [membershipFee] = useState<number>(initialParams?.membershipFee ?? 5);
  const [withdrawalRate] = useState<number>(initialParams?.withdrawalRate ?? 100);
  const [membershipFeeGrowthMultiplier] = useState<number>(initialParams?.membershipFeeGrowthMultiplier ?? 0);
  
  // Результаты расчетов
  const [creatorBaseValue, setCreatorBaseValue] = useState<number>(0);
  const [creatorBonus, setCreatorBonus] = useState<number>(0);
  const [authorBaseValue, setAuthorBaseValue] = useState<number>(0);
  const [authorBonus, setAuthorBonus] = useState<number>(0);
  const [totalGenerated, setTotalGenerated] = useState<number>(0);
  const [totalBaseValue, setTotalBaseValue] = useState<number>(0);
  const [availableRefund, setAvailableRefund] = useState<number>(0);
  const [avgMonthlyYield, setAvgMonthlyYield] = useState<number>(0);
  const [annualYield, setAnnualYield] = useState<number>(0);
  const [membershipFeeYield, setMembershipFeeYield] = useState<number>(0);
  const [capitalGrowthYield, setCapitalGrowthYield] = useState<number>(0);
  const [additionalCapitalization, setAdditionalCapitalization] = useState<number>(0);
  const [calculationResults, setCalculationResults] = useState<any[]>([]);
  const [roi, setRoi] = useState<number>(0);
  const [totalInvestorsAmount, setTotalInvestorsAmount] = useState<number>(0);
  const [investorsShare, setInvestorsShare] = useState<number>(0);
  const [initialMonthlyInvestorAmount, setInitialMonthlyInvestorAmount] = useState<number>(0);
  
  // Данные о других создателях в первом месяце
  const [firstMonthOthersCreatorBase, setFirstMonthOthersCreatorBase] = useState<number>(0);
  const [firstMonthOthersAuthorBase, setFirstMonthOthersAuthorBase] = useState<number>(0);
  const [firstMonthOthersCreatorBonus, setFirstMonthOthersCreatorBonus] = useState<number>(0);
  const [firstMonthOthersAuthorBonus, setFirstMonthOthersAuthorBonus] = useState<number>(0);
  
  // Настройка видимости столбцов
  const columnVisibility: ColumnVisibility = {
    month: true,
    shareholderCapital: true,
    monthlyGeneration: true,
    contributorsBonus: true,
    capitalGrowth: true,
    initialContribution: true,
    creatorShare: true,
    monthlyFee: true,
    accumulatedFees: true,
    creatorMembershipFeePayment: true,
    currentMonthlyContributions: true,
    monthlyInvestorAmount: true,
    totalInvestorsAmount: true,
    investorsShare: true,
    
    // Колонки для других исполнителей
    othersCreatorBase: true,
    othersAuthorBase: true,
    othersCreatorBonus: true,
    othersAuthorBonus: true,
    othersWithdrawalAmount: true
  };
  
  // Пересчет при изменении параметров
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
    setTotalInvestorsAmount(results.totalInvestorsAmount);
    setInvestorsShare(results.investorsShare);
    setInitialMonthlyInvestorAmount(results.initialMonthlyInvestorAmount);
    
    // Обновление данных о других создателях в первом месяце
    setFirstMonthOthersCreatorBase(results.firstMonthOthersCreatorBase);
    setFirstMonthOthersAuthorBase(results.firstMonthOthersAuthorBase);
    setFirstMonthOthersCreatorBonus(results.firstMonthOthersCreatorBonus);
    setFirstMonthOthersAuthorBonus(results.firstMonthOthersAuthorBonus);
  }, [contributionAmount, investorAmount, withdrawalRate, initialCapital, membershipFee, monthlyContributions, growthMultiplier, membershipFeeGrowthMultiplier]);

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div>
            <ContributionFormSection 
              contributionAmount={contributionAmount}
              onContributionAmountChange={(value) => {
                const amount = value || 0;
                setContributionAmount(amount);
                setMonthlyContributions(amount < 1000000 ? 1000000 : amount);
              }}
            />
            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <Button type="primary" size="large" onClick={next}>
                Продолжить
              </Button>
            </div>
          </div>
        );
      
      case 1:
        return (
          <div>
            <InvestmentFormSection 
              investorAmount={investorAmount}
              onInvestorAmountChange={setInvestorAmount}
            />
            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <Button size="large" onClick={prev} style={{ marginRight: 16 }}>
                Назад
              </Button>
              <Button type="primary" size="large" onClick={next}>
                Продолжить
              </Button>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div>
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
            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <Button size="large" onClick={prev} style={{ marginRight: 16 }}>
                Назад
              </Button>
              <Button type="primary" size="large" onClick={next}>
                Подробнее
              </Button>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div>
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
            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <Button size="large" onClick={prev} style={{ marginRight: 16 }}>
                Назад
              </Button>
              <Button type="primary" size="large" onClick={next}>
                Еще подробнее
              </Button>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div style={{ marginTop: 24 }}>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <Button size="large" onClick={prev} style={{ marginRight: 16 }}>
                Назад
              </Button>
              <Button type="primary" size="large" onClick={next}>
                Перейти к полному калькулятору
              </Button>
            </div>
            <MonthlyResultsTable 
              results={calculationResults}
              columnVisibility={columnVisibility}
            />
          </div>
        );
      
      case 5:
        return (
          <CalculatorPage 
            initialParams={{
              contributionAmount,
              investorAmount,
              withdrawalRate,
              initialCapital,
              membershipFee,
              monthlyContributions,
              growthMultiplier,
              membershipFeeGrowthMultiplier
            }}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="calculator-container">
      {renderStepContent()}
    </div>
  );
}; 