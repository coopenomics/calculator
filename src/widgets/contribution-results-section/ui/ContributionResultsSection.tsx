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
  initialMonthlyInvestorAmount
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
    'Себестоимость Вашего результата',
    'Ваш взнос деньгами',
    'Себестоимость труда авторов результата',
    'Ваша премия как создателя',
    'Премия авторов',
    'Премия вкладчиков',
    'Вклад других инвесторов',
    
  ];

  // Цвета для графика
  const pieColors = ['#1890ff', '#52c41a', '#faad14', '#eb2f96', '#722ed1', '#f5222d', '#13c2c2'];

  // Обновляем данные и опции графика при изменении props
  useEffect(() => {
    // Обновляем данные
    // Принудительно конвертируем в числа, чтобы избежать проблем с отображением
    const newChartData = [
      Number(creatorBaseValue) || 0,
      Number(investorAmount) || 0,
      Number(authorBaseValue) || 0,
      Number(creatorBonus) || 0,
      Number(authorBonus) || 0,
      Number(additionalCapitalization) || 0,
      Number(initialMonthlyInvestorAmount) || 0,

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
  }, [creatorBaseValue, authorBaseValue, creatorBonus, authorBonus, additionalCapitalization, initialMonthlyInvestorAmount, investorAmount]);

  return (
    <BaseCard title="Вклады и премии в первый месяц">
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={24}>
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
        <Col xs={24} lg={24} className='mt-lg'>
          <div className="result-item">
            <Text>
              Себестоимость Вашего результата:
              <SharedTooltip text="Стоимость вашего результата труда, который вы внесли в систему. Это то, за что вы можете получить возврат, в зависимости от процента возврата себестоимости." />
            </Text>
            <Text strong>{creatorBaseValue.toLocaleString('ru-RU')} ₽</Text>
          </div>
          <div className="result-item">
            <Text>
              Ваш взнос деньгами в результат:
              <SharedTooltip text="Сумма денежных средств, которые вы внесли как инвестор. Этот взнос не создаёт премий, но увеличивает вашу долю в складочном капитале." />
            </Text>
            <Text strong>{investorAmount.toLocaleString('ru-RU')} ₽</Text>
          </div>
          
          <div className="result-item">
            <Text>
              Ваша премия как создателя в результате:
              <SharedTooltip text="Дополнительная сумма, которую система начисляет Вам как создателю результата (100% от себестоимости Вашего результата). Премия всегда капитализируется и увеличивает вашу долю в складочном капитале." />
            </Text>
            <Text strong>{creatorBonus.toLocaleString('ru-RU')} ₽</Text>
          </div>
          <div className="result-item">
            <Text>
              Себестоимость труда авторов в результате:
              <SharedTooltip text="Себестоимость труда автора или соавторов, которые внесли вклад в создание Вашего результата (61.8% от себестоимости Вашего результата). Авторы также могут получить возврат части своей себестоимости труда при внесении Вами результата." />
            </Text>
            <Text strong>{authorBaseValue.toLocaleString('ru-RU')} ₽</Text>
          </div>
          <div className="result-item">
            <Text>
              Премия авторов в результате:
              <SharedTooltip text="Дополнительная сумма, начисляемая авторам (100% от себестоимости их труда в результате). Как и все премии, она капитализируется в складочном капитале." />
            </Text>
            <Text strong>{authorBonus.toLocaleString('ru-RU')} ₽</Text>
          </div>
          <div className="result-item">
            <Text>
              Премия вкладчиков в результате:
              <SharedTooltip text="Дополнительная капитализация для ранних вкладчиков (авторов, создателей и инвесторов), рассчитанная по коэффициенту золотого сечения (161.8% от суммы себестоимости и премий авторой и создателей за вычетом их возвратов). Эта премия увеличивает общий складочный капитал и распределяется между всеми участниками согласно доле." />
            </Text>
            <Text strong>{additionalCapitalization.toLocaleString('ru-RU')} ₽</Text>
          </div>
          <div className="result-item">
            <Text>
              Вклад инвесторов в результате:
              <SharedTooltip text="Суммарный вклад других инвесторов в первом месяце. Этот вклад влияет на общий складочный капитал и обеспечивает возврат себестоимости вкладов авторов и создателей." />
            </Text>
            <Text strong>{initialMonthlyInvestorAmount.toLocaleString('ru-RU')} ₽</Text>
          </div>
        </Col>
      </Row>
    </BaseCard>
  );
}; 