import React, { useState, useEffect, useCallback } from 'react'
import './App.css'
import { Button, Input, Slider, Card, Row, Col, Typography, Divider, InputNumber, Space, Table, Switch, Tooltip } from 'antd'

const { Title, Text } = Typography

export default function App() {
  // Начальные параметры из таблицы Excel
  const [initialCapital] = useState(25000000); // Стартовая капитализация (руб)
  const [contributionAmount, setContributionAmount] = useState(1000000); // руб (взнос результатом)
  const [investorAmount, setInvestorAmount] = useState(0); // руб (взнос деньгами)
  const [monthlyContributions, setMonthlyContributions] = useState(1000000); // руб (взносы других в месяц)
  const [membershipFee, setMembershipFee] = useState(5); // % (членские взносы в месяц от складочного капитала)
  const [withdrawalRate, setWithdrawalRate] = useState(100); // % (сколько пайщик забирает из своей себестоимости)
  
  // Результаты расчетов
  const [creatorBaseValue, setCreatorBaseValue] = useState(0); // Себестоимость создателя
  const [creatorBonus, setCreatorBonus] = useState(0); // Премия создателя
  const [authorBaseValue, setAuthorBaseValue] = useState(0); // Себестоимость автора
  const [authorBonus, setAuthorBonus] = useState(0); // Премия автора
  const [totalGenerated, setTotalGenerated] = useState(0); // Общая сумма генерации
  const [totalBaseValue, setTotalBaseValue] = useState(0); // Общая базовая себестоимость
  const [availableRefund, setAvailableRefund] = useState(0); // Доступно к возврату
  const [avgMonthlyYield, setAvgMonthlyYield] = useState(0); // Средняя месячная доходность
  const [membershipFeeYield, setMembershipFeeYield] = useState(0); // Доходность от членских взносов
  const [capitalGrowthYield, setCapitalGrowthYield] = useState(0); // Доходность от роста капитала
  const [additionalCapitalization, setAdditionalCapitalization] = useState(0); // Дополнительная капитализация
  const [calculationResults, setCalculationResults] = useState([]); // Результаты по месяцам
  
  // Настройка видимости столбцов для разработчика
  // Измените true/false для нужных колонок
  const columnVisibility = {
    month: true,               // Месяц
    shareholderCapital: true,  // Складочный капитал
    monthlyGeneration: false,   // Сумма генерации
    investorsBonus: false,      // Премия вкладчиков
    capitalGrowth: false,       // Прирост складочного капитала
    initialInvestment: true,   // Вклад создателя
    creatorShare: true,        // Доля создателя
    monthlyFee: false,          // Членские взносы
    accumulatedFees: true,    // Накопленные взносы (скрыт по умолчанию)
    creatorMembershipFeePayment: true  // Выплата создателю
  };
  
  const calculateBenefits = useCallback(() => {
    // Базовые расчеты по заданным формулам
    const creatorBaseFact = contributionAmount; // Себестоимость создателя теперь из прямого взноса
    const authorBaseFact = 0.618 * creatorBaseFact; // Себестоимость автора (61.8%)
    
    // Премии
    const creatorBonusFact = 1.0 * creatorBaseFact; // Премия создателя (100%)
    const authorBonusFact = 1.0 * authorBaseFact; // Премия автора (100%)
    
    // Суммарная базовая себестоимость (доступна к возврату)
    const totalBase = creatorBaseFact + authorBaseFact;
    
    // Суммарная генерация от первого взноса
    const totalGenerated = creatorBaseFact + authorBaseFact + creatorBonusFact + authorBonusFact;

    // Расчет возвращаемой части себестоимости согласно рубильнику возврата
    const creatorWithdrawalAmount = creatorBaseFact * (withdrawalRate / 100); // Сумма возврата создателя
    const authorWithdrawalAmount = authorBaseFact * (withdrawalRate / 100); // Сумма возврата автора
    
    const creatorInitialWithdrawal = creatorWithdrawalAmount; // Начальный возврат создателя
    const authorInitialWithdrawal = authorWithdrawalAmount; // Начальный возврат автора
    
    const totalWithdrawed = creatorInitialWithdrawal + authorInitialWithdrawal;
    
    // Расчет дополнительной капитализации от генерации
    const firstContributorsBonus = (totalGenerated - totalWithdrawed) * 1.618;
    
    // Обновляем базовые значения
    setCreatorBaseValue(creatorBaseFact);
    setAuthorBaseValue(authorBaseFact);
    setCreatorBonus(creatorBonusFact);
    setAuthorBonus(authorBonusFact);
    setTotalGenerated(totalGenerated);
    setTotalBaseValue(totalBase);
        
    // В первый месяц считаем складочный капитал
    // Добавляем взнос инвестора к складочному капиталу
    let shareholderCapital = initialCapital + totalGenerated - totalWithdrawed + firstContributorsBonus + investorAmount;
    
    // Вклад создателя включает остающуюся часть себестоимости и премию + взнос инвестора
    let initialInvestment = (creatorBaseFact - creatorInitialWithdrawal + creatorBonusFact) + investorAmount;
    
    // Начальная доля создателя с учетом возврата части себестоимости
    let creatorShare = initialInvestment / shareholderCapital * 100;
    
    console.log('-- НАЧАЛЬНАЯ КАПИТАЛИЗАЦИЯ --');
    console.log('initialCapital:', initialCapital);
    console.log('firstContributorsBonus:', firstContributorsBonus);
    console.log('shareholderCapital после первого взноса:', shareholderCapital);
    console.log('creatorInitialWithdrawal (изначальный возврат):', creatorInitialWithdrawal);
    console.log('initialInvestment создателя (с учетом возврата):', initialInvestment);
    console.log('Начальная creatorShare:', creatorShare);
    
    // Массив для хранения результатов по месяцам
    const results = [];
    let totalMembershipFeePayments = 0; // Общие выплаты от членских взносов
    let initialCreatorValue = initialInvestment; // Начальная стоимость доли создателя
    let finalCreatorValue = 0; // Конечная стоимость доли создателя (заполнится в конце расчетов)
    
    // Месяцы, в которые производятся выплаты членских взносов
    const payoutMonths = [6, 12, 15, 18, 21, 24, 27, 30, 33, 36];
    let accumulatedMembershipFees = 0; // Накопленные членские взносы

    // Добавляем начальные параметры (нулевой месяц) явно вне цикла
    results.push({
      month: 0,
      shareholderCapital: Math.round(shareholderCapital),
      monthlyGeneration: Math.round(totalGenerated),
      investorsBonus: Math.round(firstContributorsBonus),
      capitalGrowth: Math.round(totalGenerated + firstContributorsBonus),
      initialInvestment: Math.round(initialInvestment),
      creatorShare: parseFloat(creatorShare.toFixed(2)),
      monthlyFee: 0, // В нулевой месяц нет членских взносов
      creatorMembershipFeePayment: Math.round(creatorInitialWithdrawal), // Возврат создателю в нулевой месяц
      accumulatedFees: 0,
      isPayoutMonth: false // Флаг для различения от обычных выплат членских взносов
    });
    
    // Расчет по месяцам (от 1 до 36 месяцев = 3 года)
    for (let month = 1; month <= 36; month++) {
      // ===== ЧАСТЬ 1: ПРИРОСТ ВКЛАДА И ИЗМЕНЕНИЕ ДОЛИ =====
      
      // Считаем генерацию от нового взноса (руб)
      const othersCreatorBase = monthlyContributions; // Базовая себестоимость создателя
      const othersAuthorBase = othersCreatorBase * 0.618; // Себестоимость автора (61.8%)
      const othersCreatorBonus = 1.0 * othersCreatorBase; // Премия создателя (100%)
      const othersAuthorBonus = 1.0 * othersAuthorBase; // Премия автора (100%)
      
      // Генерация нового взноса (руб)
      const monthlyGeneration = othersCreatorBase + othersAuthorBase + othersCreatorBonus + othersAuthorBonus;
      
      // Расчет возврата себестоимости для новых взносов (руб)
      const othersMonthlyBase = othersCreatorBase + othersAuthorBase; // Общая базовая себестоимость
      const othersWithdrawalAmount = othersMonthlyBase * (withdrawalRate / 100); // Возврат по рубильнику
      
      // Рассчитываем премию вкладчиков (руб)
      const investorsBonus = (monthlyGeneration - othersWithdrawalAmount) * 1.618;
      
      // Прирост складочного капитала за месяц
      const capitalGrowth = monthlyGeneration + investorsBonus;
      
      // Увеличиваем складочный капитал: новый взнос + премия вкладчиков (руб)
      shareholderCapital += capitalGrowth;
      
      // Увеличиваем вклад создателя на его долю в премии вкладчиков (руб)
      const creatorBonusShare = investorsBonus * (creatorShare / 100);
      initialInvestment += creatorBonusShare;
      
      // Пересчет доли создателя после изменения складочного капитала (%)
      creatorShare = (initialInvestment / shareholderCapital) * 100;
      
      // ===== ЧАСТЬ 2: РАСЧЕТ ВЫПЛАТ И ИХ ВЛИЯНИЕ НА КАПИТАЛ =====
      
      // Расчет членских взносов за месяц (5% от прироста капитала)
      const monthlyFee = capitalGrowth * (membershipFee / 100);
      
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
        shareholderCapital -= accumulatedMembershipFees;
        
        // Уменьшаем вклад создателя на его долю от членских взносов
        initialInvestment -= creatorMembershipFeePayment;
        
        // Пересчитываем долю создателя после выплат
        creatorShare = (initialInvestment / shareholderCapital) * 100;
        
        // Суммирование выплат
        totalMembershipFeePayments += creatorMembershipFeePayment;
        
        // Обнуляем накопленные членские взносы после выплаты
        accumulatedMembershipFees = 0;
      }
      
      // Если это последний месяц, запоминаем конечную стоимость доли
      if (month === 36) {
        finalCreatorValue = shareholderCapital * creatorShare / 100;
      }
      
      // Сохранение результатов текущего месяца
      results.push({
        month,
        shareholderCapital: Math.round(shareholderCapital),
        monthlyGeneration: Math.round(monthlyGeneration),
        investorsBonus: Math.round(investorsBonus),
        capitalGrowth: Math.round(capitalGrowth),
        initialInvestment: Math.round(initialInvestment),
        creatorShare: parseFloat(creatorShare.toFixed(2)),
        monthlyFee: Math.round(monthlyFee),
        creatorMembershipFeePayment: Math.round(creatorMembershipFeePayment),
        isPayoutMonth: isPayoutMonth,
        accumulatedFees: Math.round(accumulatedMembershipFees),
        totalMembershipFeePayments: Math.round(totalMembershipFeePayments)
      });
    }
    
    // Расчет доходностей
    const averageMonthlyMembershipFeeYield = (totalMembershipFeePayments / initialCreatorValue / 36) * 100;
    
    // Исправленный расчет доходности от роста капитала
    // Учитываем как финальную стоимость доли, так и полученные выплаты
    const totalReturn = finalCreatorValue + totalMembershipFeePayments;
    const capitalGrowthTotal = ((totalReturn / initialCreatorValue) ** (1/3) - 1) * 100;
    const capitalGrowthMonthly = capitalGrowthTotal / 12;
    
    console.log('-- ИТОГОВЫЕ РЕЗУЛЬТАТЫ --');
    console.log('Начальная стоимость доли:', Math.round(initialCreatorValue));
    console.log('Конечная стоимость доли:', Math.round(finalCreatorValue));
    console.log('Всего получено от членских взносов:', Math.round(totalMembershipFeePayments));
    console.log('Суммарный возврат (доля + выплаты):', Math.round(totalReturn));
    console.log('Доходность от роста капитала (годовая):', capitalGrowthTotal.toFixed(2) + '%');
    console.log('Доходность от роста капитала (месячная):', capitalGrowthMonthly.toFixed(2) + '%');
    
    // Обновление состояний компонента
    setAvailableRefund(Math.round(totalMembershipFeePayments));
    setMembershipFeeYield(parseFloat(averageMonthlyMembershipFeeYield.toFixed(2)));
    setCapitalGrowthYield(parseFloat(capitalGrowthMonthly.toFixed(2)));
    setAvgMonthlyYield(parseFloat((averageMonthlyMembershipFeeYield + capitalGrowthMonthly).toFixed(2)));
    setAdditionalCapitalization(Math.round(firstContributorsBonus));
    setCalculationResults(results);
  }, [contributionAmount, investorAmount, withdrawalRate, initialCapital, membershipFee, monthlyContributions]);
  
  useEffect(() => {
    calculateBenefits();
  }, [calculateBenefits]);
  
  // Колонки для таблицы результатов
  const allColumns = [
    {
      title: 'Месяц',
      dataIndex: 'month',
      key: 'month',
      render: value => value === 0 ? 'Начальный' : value
    },
    {
      title: 'Складочный капитал (руб)',
      dataIndex: 'shareholderCapital',
      key: 'shareholderCapital',
      render: value => value.toLocaleString('ru-RU')
    },
    {
      title: 'Сумма генерации (руб)',
      dataIndex: 'monthlyGeneration',
      key: 'monthlyGeneration',
      render: value => value.toLocaleString('ru-RU')
    },
    {
      title: 'Премия вкладчиков (руб)',
      dataIndex: 'investorsBonus',
      key: 'investorsBonus',
      render: value => value.toLocaleString('ru-RU')
    },
    {
      title: 'Прирост складочного капитала (руб)',
      dataIndex: 'capitalGrowth',
      key: 'capitalGrowth',
      render: value => value.toLocaleString('ru-RU')
    },
    {
      title: 'Ваш вклад (руб)',
      dataIndex: 'initialInvestment',
      key: 'initialInvestment',
      render: value => value.toLocaleString('ru-RU')
    },
    {
      title: 'Ваша доля (%)',
      dataIndex: 'creatorShare',
      key: 'creatorShare',
    },
    {
      title: 'Членские взносы (руб)',
      dataIndex: 'monthlyFee',
      key: 'monthlyFee',
      render: value => value.toLocaleString('ru-RU')
    },
    {
      title: 'Накопленные взносы (руб)',
      dataIndex: 'accumulatedFees',
      key: 'accumulatedFees',
      render: value => value.toLocaleString('ru-RU')
    },
    {
      title: 'Прогнозируемая выплата вам (руб)',
      dataIndex: 'creatorMembershipFeePayment',
      key: 'creatorMembershipFeePayment',
      render: value => value.toLocaleString('ru-RU')
    }
  ];

  // Фильтруем видимые колонки по настройке
  const columns = allColumns.filter(column => columnVisibility[column.key]);

  return (
    <div className="calculator-container" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <Title level={2}>Калькулятор выгоды</Title>
      <Text>Данный калькулятор демонстрирует выгоду от участия в кооперативной экономике</Text>
      
      <Card title="Параметры взноса" style={{ marginTop: '20px' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Text strong>Взнос результатом (руб)</Text>
            <InputNumber 
              style={{ width: '100%' }} 
              value={contributionAmount} 
              onChange={value => setContributionAmount(value || 0)} 
              min={0} 
              max={10000000}
              step={10000} 
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
              parser={value => value.replace(/\s/g, '')}
            />
            <Text type="secondary">
              Это стоимость вашего результата труда, который вы вносите в систему
            </Text>
          </Col>
          <Col xs={24} md={12}>
            <Text strong>Взнос деньгами (руб)</Text>
            <InputNumber 
              style={{ width: '100%' }} 
              value={investorAmount} 
              onChange={value => setInvestorAmount(value || 0)} 
              min={0} 
              max={10000000}
              step={10000} 
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
              parser={value => value.replace(/\s/g, '')}
            />
            <Text type="secondary">
              Это сумма денежных средств, которые вы вносите как инвестор (не создаёт премий)
            </Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
          <Col xs={24} md={12}>
            <Text strong>Процент возврата себестоимости (%)</Text>
            <Slider 
              value={withdrawalRate} 
              onChange={value => setWithdrawalRate(value)} 
              min={0} 
              max={100} 
              step={5} 
              marks={{ 0: '0%', 50: '50%', 100: '100%' }} 
            />
            <Text type="secondary">
              {withdrawalRate === 0 
                ? "Вся себестоимость остается внутри системы (максимальная капитализация)" 
                : withdrawalRate === 100 
                  ? "Вся себестоимость возвращается пайщику (минимальная капитализация)" 
                  : "Часть себестоимости возвращается, часть капитализируется"}
            </Text>
          </Col>
        </Row>
      </Card>
      
      <Card title="Параметры системы" style={{ marginTop: '20px' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Text strong>Взносы других создателей (руб в месяц)</Text>
            <InputNumber 
              style={{ width: '100%' }} 
              value={monthlyContributions} 
              onChange={value => setMonthlyContributions(value || 0)} 
              min={100000} 
              max={10000000}
              step={100000} 
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
              parser={value => value.replace(/\s/g, '')}
            />
          </Col>
          <Col xs={24} md={12}>
            <Text strong>Эффективность капитала (%)</Text>
            <Slider 
              value={membershipFee} 
              onChange={value => setMembershipFee(value)} 
              min={0} 
              max={100} 
              step={1} 
              marks={{ 0: '0%', 5: '5%', 25: '25%', 50: '50%', 75: '75%', 100: '100%' }} 
            />
            <Text type="secondary">
              Эффективность показывает, сколько членских взносов приходит за электронный документооборот на каждый новый рубль складочного капитала. 
            </Text>
          </Col>
        </Row>
      </Card>
      
      <Card title="Результаты расчета" style={{ marginTop: '20px' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card title="Вклад и премии" variant="outlined">
              <div style={{ marginBottom: '10px' }}>
                <Text>Стартовая капитализация системы: </Text>
                <Text strong>{initialCapital.toLocaleString('ru-RU')} руб</Text>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <Text>Базовая себестоимость создателя: </Text>
                <Text strong>{creatorBaseValue.toLocaleString('ru-RU')} руб</Text>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <Text>Премия создателя (капитализация): </Text>
                <Text strong>{creatorBonus.toLocaleString('ru-RU')} руб</Text>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <Text>Базовая себестоимость автора: </Text>
                <Text strong>{authorBaseValue.toLocaleString('ru-RU')} руб</Text>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <Text>Премия автора (капитализация): </Text>
                <Text strong>{authorBonus.toLocaleString('ru-RU')} руб</Text>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <Text>Общая базовая себестоимость: </Text>
                <Text strong>{totalBaseValue.toLocaleString('ru-RU')} руб</Text>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <Text>Общая генерация: </Text>
                <Text strong>{totalGenerated.toLocaleString('ru-RU')} руб</Text>
              </div>
              <div>
                <Text>Взнос деньгами (инвестор): </Text>
                <Text strong>{investorAmount.toLocaleString('ru-RU')} руб</Text>
              </div>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card title="Доходность" variant="outlined">
              <div style={{ marginBottom: '10px' }}>
                <Text>Дополнительная капитализация при первом взносе: </Text>
                <Text strong>{additionalCapitalization.toLocaleString('ru-RU')} руб</Text>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <Text>Общая сумма выплат: </Text>
                <Text strong>{availableRefund.toLocaleString('ru-RU')} руб</Text>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <Text>Доходность от членских взносов: </Text>
                <Text strong>{membershipFeeYield.toFixed(2)}% в месяц</Text>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <Text>Доходность от роста капитала: </Text>
                <Text strong>{capitalGrowthYield.toFixed(2)}% в месяц</Text>
              </div>
              <div>
                <Text>Общая месячная доходность: </Text>
                <Text strong>{avgMonthlyYield.toFixed(2)}% в месяц</Text>
              </div>
            </Card>
          </Col>
        </Row>
      </Card>
      
      <Card title="Расчеты по месяцам" style={{ marginTop: '20px' }}>
        <Table 
          dataSource={calculationResults} 
          columns={columns} 
          pagination={false} 
          rowKey="month" 
          scroll={{ x: 'max-content' }}
          size="small"
        />
      </Card>
      
      <div style={{ marginTop: '20px', padding: '10px', background: '#f5f5f5', borderRadius: '4px' }}>
        <Text type="secondary">
          Модель демонстрирует рост вашей доли от вкладов других участников при взносе результатом и/или деньгами.
          Капитализация распределяется пропорционально долям, что увеличивает ваш вклад с каждым месяцем. 
          Членские взносы кооперативов за электронный документооборот обеспечивают возврат. 
        </Text>
      </div>
    </div>
  )
} 