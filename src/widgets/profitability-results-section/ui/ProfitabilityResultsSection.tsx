import { Typography } from 'antd';
import { FC } from 'react';
import { BaseCard, SharedTooltip } from '../../../shared';

const { Text } = Typography;

interface ProfitabilityResultsSectionProps {
  additionalCapitalization: number;
  availableRefund: number;
  membershipFeeYield: number;
  capitalGrowthYield: number;
  avgMonthlyYield: number;
  annualYield: number;
  roi: number;
}

export const ProfitabilityResultsSection: FC<ProfitabilityResultsSectionProps> = ({
  membershipFeeYield,
  capitalGrowthYield,
  avgMonthlyYield,
  annualYield,
  roi,
}) => {
  return (
    <BaseCard title="Предполагаемая доходность">
      <div className="result-item">
        <Text>
          Предполагаемая доходность от членских взносов:
          <SharedTooltip text="Ежемесячная доходность от выплат членских взносов за документооборот. Выплаты предположительно происходят в определенные месяцы (6, 12, 15, 18, 21, 24, 27, 30, 33, 36) и фактически зависят от эффективности использования капитала." />
        </Text>
        <Text strong>{membershipFeeYield.toFixed(2)}% в месяц</Text>
      </div>
      <div className="result-item">
        <Text>
          Предполагаемая доходность от роста капитала:
          <SharedTooltip text="Предполагаемая ежемесячная доходность от роста стоимости Вашей доли в складочном капитале. Рассчитывается исходя из прироста капитала за счет новых взносов результатами и генерируемых ими премий для всех вкладчиков согласно их долям в складочном капитале." />
        </Text>
        <Text strong>{capitalGrowthYield.toFixed(2)}% в месяц</Text>
      </div>
      <div className="result-item">
        <Text>
          Предполагаемая средняя месячная доходность:
          <SharedTooltip text="Суммарная предполагаемая месячная доходность от членских взносов и от роста капитала. Это основной показатель выгоды от участия в кооперативной экономике." />
        </Text>
        <Text strong>{avgMonthlyYield.toFixed(2)}% в месяц</Text>
      </div>
      <div className="result-item">
        <Text>
          Предполагаемая годовая доходность:
          <SharedTooltip text="Предполагаемая годовая доходность, полученная умножением месячной доходности на 12. Позволяет сравнить выгоду от участия в кооперативной экономике с другими инвестиционными инструментами." />
        </Text>
        <Text strong>{annualYield.toFixed(2)}% годовых</Text>
      </div>
      <div className="result-item">
        <Text>
          Предполагаемая рентабельность инвестиций (ROI):
          <SharedTooltip text="Процентное соотношение полученной выгоды к начальному вкладу за весь расчетный период (3 года). Выгода включает как выплаты членских взносов, так и рост стоимости доли. Из расчета исключается первоначальное 'тело' инвестиции (себестоимость)." />
        </Text>
        <Text strong>{roi.toFixed(2)}%</Text>
      </div>
      
      <div className="disclaimer" style={{ marginTop: '16px', fontSize: '12px', background: 'rgba(223, 136, 64, 0.68)', padding: '12px', borderRadius: '8px' }}>
        <Text italic>
          Указанные значения доходности являются предположительными и могут изменяться как в большую так и в меньшую сторону в зависимости 
          от фактической эффективности использования капитала, динамики прироста новых взносов, 
          а также поведения авторов и создателей в отношении возвратов по себестоимости их труда.
        </Text>
      </div>
    </BaseCard>
  );
}; 