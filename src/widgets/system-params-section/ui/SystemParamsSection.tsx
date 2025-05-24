import { Row, Col, Space, Badge } from 'antd';
import { FC } from 'react';
import { BaseCard, LabelText, DescriptionText, SharedTooltip, DebouncedInputSlider } from '../../../shared';
import { CALCULATOR_CONSTANTS } from '../../../entities/core/model/constants';


interface SystemParamsSectionProps {
  initialCapital: number;
  membershipFee: number;
  growthMultiplier: number;
  membershipFeeGrowthMultiplier: number;
  monthlyContributions: number;
  onInitialCapitalChange: (value: number) => void;
  onMembershipFeeChange: (value: number) => void;
  onGrowthMultiplierChange: (value: number) => void;
  onMembershipFeeGrowthMultiplierChange: (value: number) => void;
  onMonthlyContributionsChange: (value: number | undefined) => void;
}

export const SystemParamsSection: FC<SystemParamsSectionProps> = ({
  initialCapital,
  membershipFee,
  growthMultiplier,
  membershipFeeGrowthMultiplier,
  monthlyContributions,
  onInitialCapitalChange,
  onMembershipFeeChange,
  onGrowthMultiplierChange,
  onMembershipFeeGrowthMultiplierChange,
  onMonthlyContributionsChange,
}) => {
  return (
    <BaseCard title="Параметры и Допущения">
      <Row gutter={[32, 24]}>
        {/* Левая колонка — константы */}
        <Col xs={24} md={12}>
          <div className="info-constants" style={{ width: '100%' }}>
            <style>{`
              .info-constants .ant-badge-status-text {
                word-break: break-all;
              }
            `}</style>
            <LabelText style={{ width: '100%', textAlign: 'center' }}>Константы</LabelText>
            <Space direction="vertical" size={16} style={{ width: '100%', alignItems: 'flex-start' }}>
              <Badge 
                color="#13c2c2" 
                text={
                  <span>
                    Доля «Создателя»: <b>{(100).toFixed(1)}%</b>
                    <SharedTooltip text="Доля «Создателя» — это часть, которую получает «Создатель» «Результата» труда (100% от его стоимости)." />
                  </span>
                }
              />
              <Badge 
                color="#52c41a" 
                text={
                  <span>
                    Доля «Автора»: <b>{(CALCULATOR_CONSTANTS.AUTHOR_RATIO * 100).toFixed(1)}%</b>
                    <SharedTooltip text="Доля «Автора» — это часть, которую получает «Автор» «Результата» (61.8% от стоимости «Создателя»)." />
                  </span>
                }
              />
              <Badge 
                color="#1890ff" 
                text={
                  <span>
                    Премия «Создателя»: <b>{(CALCULATOR_CONSTANTS.CREATOR_BONUS_RATIO * 100).toFixed(0)}%</b>
                    <SharedTooltip text="Премия «Создателя» — дополнительная сумма, начисляемая «Создателю» (100% от его стоимости)." />
                  </span>
                }
              />
              <Badge 
                color="#722ed1" 
                text={
                  <span>
                    Премия «Автора»: <b>{(CALCULATOR_CONSTANTS.AUTHOR_BONUS_RATIO * 100).toFixed(0)}%</b>
                    <SharedTooltip text="Премия «Автора» — дополнительная сумма, начисляемая «Автору» (100% от его стоимости)." />
                  </span>
                }
              />
              <Badge 
                color="#faad14" 
                text={
                  <span>
                    Премия «Вкладчиков»: <b>{CALCULATOR_CONSTANTS.GOLDEN_RATIO * 100}%</b>
                    <SharedTooltip text="Премия «Вкладчиков» — коэффициент (1.618), по которому рассчитывается дополнительная выгода для ранних участников." />
                  </span>
                }
              />
              <Badge 
                color="#d4380d" 
                text={
                  <span>
                    Месяцы выплат: <b>{CALCULATOR_CONSTANTS.PAYOUT_MONTHS.join(', ')}</b>
                    <SharedTooltip text="Месяцы выплат — периоды, в которые участникам выплачиваются накопленные членские взносы." />
                  </span>
                }
              />
              <Badge 
                color="#9254de" 
                text={
                  <span>
                    Отложенные первые выплаты: <b>{CALCULATOR_CONSTANTS.DELAYED_FIRST_PAYMENTS} мес.</b>
                    <SharedTooltip text="Начало накопления членских взносов откладывается на указанное количество месяцев после первого взноса." />
                  </span>
                }
              />
              <Badge 
                color="#d4380d" 
                text={
                  <span>
                    Обеспечение инвестициями: <b>100%</b>
                    <SharedTooltip text="Модель предполагает, что каждый месяц в систему инвестируются средства, обеспечивающие возвраты стоимости труда «Создателям» и «Авторам» в полном объеме." />
                  </span>
                }
              />
            </Space>
            <div className="disclaimer" style={{ marginTop: '16px', fontSize: '12px', background: 'rgba(223, 136, 64, 0.68)', padding: '12px', borderRadius: '8px' }}>
              <span style={{ fontStyle: 'italic' }}>
                При снижении уровня взносов от инвесторов возвраты стоимости труда «Создателям» и «Авторам» могут быть отложены до поступления достаточного объёма новых инвестиций.
              </span>
            </div>
          </div>
        </Col>
        {/* Правая колонка — все слайдеры и поля */}
        <Col xs={24} md={12}>
          <Space direction="vertical" size={32} style={{ width: '100%' }}>
            {/* Стартовая капитализация */}
            <div className="p-md">
              <LabelText>Стартовый складочный капитал</LabelText>
              <DebouncedInputSlider
                value={initialCapital}
                onChange={onInitialCapitalChange}
                min={25000000}
                max={100000000}
                step={1000000}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                parser={(value: string | undefined) => value ? Number(value.replace(/\s/g, '')) : 25000000}
                addonAfter="₽"
                tooltipFormatter={value => `${value?.toLocaleString('ru-RU')} ₽`}
                sliderStyle={{ marginBottom: 16 }}
              />
              <DescriptionText>
                Начальный складочный капитал, на базе которого производится расчет. Фиксируется и публикуется в бухгалтерской отчетности кооператива ежеквартально. 
              </DescriptionText>
            </div>
            {/* Ежемесячные взносы результатами других создателей */}
            <div className="p-md" >
              <LabelText>Ежемесячные взносы «Результатами» других «Создателей»</LabelText>
              <DebouncedInputSlider
                value={monthlyContributions}
                onChange={onMonthlyContributionsChange}
                min={100000}
                max={10000000}
                step={100000}
                formatter={(value: number | string) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                parser={(value: string | undefined) => value ? Number(value.replace(/\s/g, '')) : 0}
                addonAfter="₽/мес"
                tooltipFormatter={(value: number | undefined) => `${value?.toLocaleString('ru-RU')} ₽/мес`}
                sliderStyle={{ marginBottom: 16 }}
              />
              <DescriptionText>
                Общая сумма взносов «Результатами» других «Создателей», вносимая ими в систему ежемесячно после вашего внесения «Результата». Эти взносы создают премии, которые увеличивают складочный капитал и приносят выгоду всем участникам, включая Вас.
              </DescriptionText>
            </div>
            {/* Множитель роста взносов результатами */}
            <div className="p-md" >
              <LabelText>Множитель роста взносов «Результатами»</LabelText>
              <DebouncedInputSlider
                value={growthMultiplier}
                onChange={onGrowthMultiplierChange}
                min={0}
                max={50}
                step={1}
                tooltipFormatter={value => `${value}%`}
                sliderStyle={{ marginBottom: 16 }}
                unitSuffix="%"
              />
              <DescriptionText>
                Определяет динамику роста «Результатов» - насколько увеличиваются взносы «Результатов» других «Создателей» каждый месяц
              </DescriptionText>
            </div>
            {/* Эффективность капитала */}
            <div className="p-md" >
              <LabelText>Эффективность капитала</LabelText>
              <DebouncedInputSlider
                value={membershipFee}
                onChange={onMembershipFeeChange}
                min={0}
                max={100}
                step={1}
                tooltipFormatter={value => `${value}%`}
                sliderStyle={{ marginBottom: 16 }}
                unitSuffix="%"
              />
              <DescriptionText>
                Эффективность показывает, сколько членских взносов приходит за электронный документооборот на каждый новый рубль складочного капитала.
              </DescriptionText>
            </div>
            {/* Множитель роста членских взносов */}
            <div className="p-md" >
              <LabelText>Множитель роста эффективности капитала</LabelText>
              <DebouncedInputSlider
                value={membershipFeeGrowthMultiplier}
                onChange={onMembershipFeeGrowthMultiplierChange}
                min={0}
                max={50}
                step={1}
                tooltipFormatter={value => `${value}%`}
                sliderStyle={{ marginBottom: 16 }}
                unitSuffix="%"
              />
              <DescriptionText>
                Определяет ежемесячный прирост членских взносов по формуле сложного процента, которая применяется на эффективности капитала.
              </DescriptionText>
            </div>
          </Space>
        </Col>
      </Row>
    </BaseCard>
  );
}; 