import { Typography, Row, Col } from 'antd';
import { FC, useEffect, useState } from 'react';
import { BaseCard, LabelText, SharedTooltip } from '../../../shared';
import ReactApexChart from 'react-apexcharts';

const { Text } = Typography;

interface ContributionResultsSectionProps {
  initialCapital: number;
  creatorBaseValue: number;
  creatorBonus: number;
  authorBaseValue: number;
  authorBonus: number;
  totalBaseValue: number;
  totalGenerated: number;
  investorAmount: number;
  additionalCapitalization: number;
  totalInvestorsAmount: number;
  investorsShare: number;
  initialMonthlyInvestorAmount: number;
  firstMonthOthersCreatorBase: number;
  firstMonthOthersAuthorBase: number;
  firstMonthOthersCreatorBonus: number;
  firstMonthOthersAuthorBonus: number;
}

export const ContributionResultsSection: FC<ContributionResultsSectionProps> = ({
  initialCapital,
  creatorBaseValue,
  creatorBonus,
  authorBaseValue,
  authorBonus,
  totalBaseValue,
  totalGenerated,
  investorAmount,
  additionalCapitalization,
  totalInvestorsAmount,
  investorsShare,
  initialMonthlyInvestorAmount,
  firstMonthOthersCreatorBase,
  firstMonthOthersAuthorBase,
  firstMonthOthersCreatorBonus,
  firstMonthOthersAuthorBonus
}) => {
  // Состояние для предотвращения ошибок SSR
  const [isClient, setIsClient] = useState(false);
  const [chartData, setChartData] = useState<number[]>([]);
  const [chartOptions, setChartOptions] = useState<any>({});

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Метки для графика
  const pieLabels = [
    'Ваш взнос «Создателя»',
    'Ваш взнос «Инвестора»',
    'Взнос «Авторов»',
    'Ваша премия «Создателя»',
    'Премия «Авторов»',
    'Премия «Вкладчиков»',
    'Вклад других «Инвесторов»',
    'Взнос других «Создателей»',
    'Премия других «Создателей»'
  ];

  // Цвета для графика
  const pieColors = ['#1890ff', '#52c41a', '#faad14', '#eb2f96', '#722ed1', '#f5222d', '#13c2c2', '#2f54eb', '#fa8c16'];

  // Обновляем данные и опции графика при изменении props
  useEffect(() => {
    // Объединяем данные авторов
    const totalAuthorBaseValue = (Number(authorBaseValue) || 0) + (Number(firstMonthOthersAuthorBase) || 0);
    const totalAuthorBonus = (Number(authorBonus) || 0) + (Number(firstMonthOthersAuthorBonus) || 0);
    
    // Обновляем данные
    // Принудительно конвертируем в числа, чтобы избежать проблем с отображением
    const newChartData = [
      Number(creatorBaseValue) || 0,
      Number(investorAmount) || 0,
      totalAuthorBaseValue,
      Number(creatorBonus) || 0,
      totalAuthorBonus,
      Number(additionalCapitalization) || 0,
      Number(initialMonthlyInvestorAmount) || 0,
      Number(firstMonthOthersCreatorBase) || 0,
      Number(firstMonthOthersCreatorBonus) || 0,
    ];
    
    // Проверяем, что данные действительно изменились
    const dataChanged = newChartData.some((value, index) => 
      !chartData[index] || chartData[index] !== value
    );
    
    if (dataChanged || chartData.length === 0) {
      console.log("Updating chart data:", newChartData);
      setChartData(newChartData);
    }

    // Обновляем опции
    setChartOptions({
      chart: {
        type: 'pie',
        fontFamily: 'Inter, sans-serif',
      },
      labels: pieLabels,
      colors: pieColors,
      legend: {
        position: 'bottom',
        fontSize: '14px',
      },
      dataLabels: {
        enabled: true,
        formatter: function(val: number) {
          return val.toFixed(1) + '%';
        },
      },
      tooltip: {
        y: {
          formatter: function(val: number) {
            return val.toLocaleString('ru-RU') + ' ₽';
          }
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            height: 300
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    });
  }, [creatorBaseValue, authorBaseValue, creatorBonus, authorBonus, additionalCapitalization, initialMonthlyInvestorAmount, investorAmount, firstMonthOthersCreatorBase, firstMonthOthersAuthorBase, firstMonthOthersCreatorBonus, firstMonthOthersAuthorBonus]);

  return (
    <BaseCard title="Складочный капитал в первый месяц">
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12} className='mt-md'>
          <div className="result-item">
            <Text>
              Ваш вклад «Создателя»:
              <SharedTooltip text="Стоимость вашего «Результата» труда, который вы внесли в систему. Это то, за что вы можете получить возврат, в зависимости от процента возврата стоимости." />
            </Text>
            <Text strong>{creatorBaseValue.toLocaleString('ru-RU')} ₽</Text>
          </div>
          <div className="result-item">
            <Text>
              Ваш вклад «Инвестора»:
              <SharedTooltip text="Сумма денежных средств, которые вы внесли как «Инвестор». Этот взнос не создаёт премий, но увеличивает вашу долю в складочном капитале." />
            </Text>
            <Text strong>{investorAmount.toLocaleString('ru-RU')} ₽</Text>
          </div>
          
          <div className="result-item">
            <Text>
              Ваша премия «Создателя»:
              <SharedTooltip text="Дополнительная сумма, которую система начисляет Вам как «Создателю» «Результата» (100% от стоимости вашего «Результата» за вычетом выплаченной компенсации стоимости труда). Премия всегда капитализируется и увеличивает вашу долю в складочном капитале." />
            </Text>
            <Text strong>{creatorBonus.toLocaleString('ru-RU')} ₽</Text>
          </div>
          <div className="result-item">
            <Text>
              Вклад «Авторов»:
              <SharedTooltip text="Общая стоимость труда всех «Авторов» в первом месяце (61.8% от стоимости всех «Результатов»). Включает как ваших «Авторов», так и «Авторов» других «Создателей»." />
            </Text>
            <Text strong>{((authorBaseValue || 0) + (firstMonthOthersAuthorBase || 0)).toLocaleString('ru-RU')} ₽</Text>
          </div>
          <div className="result-item">
            <Text>
              Премия «Авторов»:
              <SharedTooltip text="Общая сумма премий всех «Авторов» (100% от стоимости их труда). Включает премии как ваших «Авторов», так и «Авторов» других «Создателей». Премии капитализируются в складочном капитале." />
            </Text>
            <Text strong>{((authorBonus || 0) + (firstMonthOthersAuthorBonus || 0)).toLocaleString('ru-RU')} ₽</Text>
          </div>
          <div className="result-item">
            <Text>
              Премия «Вкладчиков»:
              <SharedTooltip text="Дополнительная капитализация для ранних «Вкладчиков» («Авторов», «Создателей» и «Инвесторов»), рассчитанная по коэффициенту золотого сечения (161.8% от суммы стоимости и премий «Авторов» и «Создателей» за вычетом их возвратов). Эта премия увеличивает общий складочный капитал и распределяется между всеми участниками согласно доле." />
            </Text>
            <Text strong>{additionalCapitalization.toLocaleString('ru-RU')} ₽</Text>
          </div>
          <div className="result-item">
            <Text>
              Вклад других «Инвесторов»:
              <SharedTooltip text="Суммарный вклад других «Инвесторов» в первом месяце, т.е. не Ваш. Этот вклад влияет на общий складочный капитал и обеспечивает возврат стоимости вкладов «Авторов» и «Создателей»." />
            </Text>
            <Text strong>{initialMonthlyInvestorAmount.toLocaleString('ru-RU')} ₽</Text>
          </div>
          <div className="result-item">
            <Text>
              Взнос других «Создателей»:
              <SharedTooltip text="Стоимость «Результатов» труда других «Создателей» в первом месяце (если вы действуете только как инвестор). Эти взносы учитываются в общей генерации и влияют на распределение капитала." />
            </Text>
            <Text strong>{firstMonthOthersCreatorBase.toLocaleString('ru-RU')} ₽</Text>
          </div>
          <div className="result-item">
            <Text>
              Премия других «Создателей»:
              <SharedTooltip text="Дополнительная сумма, начисляемая другим «Создателям» (100% от стоимости их «Результатов»). Эта премия капитализируется в складочном капитале." />
            </Text>
            <Text strong>{firstMonthOthersCreatorBonus.toLocaleString('ru-RU')} ₽</Text>
          </div>
        </Col>
        <Col xs={24} lg={12}>
          {isClient && chartData.length > 0 && (
            <ReactApexChart 
              key={`chart-${JSON.stringify(chartData)}`}
              options={chartOptions} 
              series={chartData} 
              type="pie" 
              height={350} 
            />
          )}
        </Col>
      </Row>
    </BaseCard>
  );
}; 