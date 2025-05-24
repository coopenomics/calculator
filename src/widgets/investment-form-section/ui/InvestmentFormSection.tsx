import { BaseCard, LabelText, DescriptionText, SharedTooltip, DebouncedInputSlider } from '../../../shared';
import { FC } from 'react';

interface InvestmentFormSectionProps {
  investorAmount: number;
  onInvestorAmountChange: (value: number) => void;
}

export const InvestmentFormSection: FC<InvestmentFormSectionProps> = ({
  investorAmount,
  onInvestorAmountChange,
}) => {
  return (
    <BaseCard title="Ваш взнос деньгами">
      <div className="input-container" style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
        <LabelText>
          Укажите сумму взноса деньгами
          <SharedTooltip text="Сумма денежных средств, которые вы вносите в «результат» как «инвестор». Взнос деньгами не создаёт премий, но увеличивает вашу долю в складочном капитале и позволяет получать выгоду от роста капитала и членских взносов." />
        </LabelText>
        <DebouncedInputSlider
          value={investorAmount}
          onChange={onInvestorAmountChange}
          min={0}
          max={10000000}
          step={10000}
          formatter={(value: number | string) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
          parser={(value: string | undefined) => value ? Number(value.replace(/\s/g, '')) : 0}
          addonAfter="₽"
          tooltipFormatter={(value: number | undefined) => `${value?.toLocaleString('ru-RU')} ₽`}
        />
        <DescriptionText>
          Сумма денежных средств, которые вы вносите в «результат» как «инвестор»
        </DescriptionText>
      </div>
    </BaseCard>
  );
}; 