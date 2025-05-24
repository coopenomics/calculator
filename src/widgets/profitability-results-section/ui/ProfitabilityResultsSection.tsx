import { Typography, Row, Col, Statistic } from 'antd';
import { FC } from 'react';
import { BaseCard, DescriptionText } from '../../../shared';

const { Text } = Typography;

interface ProfitabilityResultsSectionProps {
  additionalCapitalization: number;
  availableRefund: number;
  membershipFeeYield: number;
  capitalGrowthYield: number;
  avgMonthlyYield: number;
  annualYield: number;
  roi: number;
  creatorBonus: number;
}

export const ProfitabilityResultsSection: FC<ProfitabilityResultsSectionProps> = ({
  membershipFeeYield,
  capitalGrowthYield,
  avgMonthlyYield,
  annualYield,
  roi,
  creatorBonus,
}) => {
  return (
    <BaseCard title="Предполагаемая доходность">
      <Row gutter={16} align="bottom" style={{ marginBottom: 16 }}>
        <Col flex="1 1 50%">
          <Statistic
            title="Годовых"
            value={annualYield}
            precision={2}
            suffix="%"
            valueStyle={{ color: '#111', fontWeight: 700, fontSize: 30 }}
          />
        </Col>
        <Col flex="1 1 50%">
          <Statistic
            title="Премия «Создателя»"
            value={creatorBonus}
            precision={0}
            prefix="+"
            suffix="₽"
            valueStyle={{ color: '#111', fontWeight: 700, fontSize: 30 }}
          />
        </Col>
      </Row>
      <DescriptionText>
        Включает в себя предполагаемую доходность от роста стоимости Вашего взноса и членских взносов кооперативов за использование электронного документооборота платформы, а также, включает в себя единоразовую премию «Создателя» за вклад трудом.
      </DescriptionText>
      <div className="disclaimer" style={{ marginTop: '16px', fontSize: '12px', background: 'rgba(223, 136, 64, 0.68)', padding: '12px', borderRadius: '8px' }}>
        <Text italic>
          Указанное значение годовой доходности является предположительным и может изменяться как в большую так и в меньшую сторону в зависимости 
          от фактической эффективности использования капитала, динамики прироста новых взносов, 
          а также поведения «Авторов» и «Создателей» в отношении возвратов стоимости их труда.
        </Text>
      </div>
    </BaseCard>
  );
}; 