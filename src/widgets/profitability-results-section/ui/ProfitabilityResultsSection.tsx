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
      <div className="result-item" style={{ textAlign: 'center', marginBottom: '24px' }}>
        <Text style={{ fontSize: '16px', marginBottom: '8px', display: 'block' }}>
          Предполагаемая годовая доходность:
          <SharedTooltip text="Включает в себя предполагаемую доходность от роста стоимости Вашего взноса и распределения членских взносов подключенных кооперативов, оплачивающих свой электронный документооборот." />
        </Text>
        <Text strong >{annualYield.toFixed(2)}% годовых</Text>
      </div>
      
      <div className="disclaimer" style={{ marginTop: '16px', fontSize: '12px', background: 'rgba(223, 136, 64, 0.68)', padding: '12px', borderRadius: '8px' }}>
        <Text italic>
          Указанное значение доходности является предположительным и может изменяться как в большую так и в меньшую сторону в зависимости 
          от фактической эффективности использования капитала, динамики прироста новых взносов, 
          а также поведения «авторов» и «создателей» в отношении возвратов по стоимости их труда.
        </Text>
      </div>
    </BaseCard>
  );
}; 