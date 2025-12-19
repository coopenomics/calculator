import { BaseCard, LabelText, DescriptionText, SharedTooltip, DebouncedInputSlider } from '../../../shared';
import { FC } from 'react';

interface MonthlyContributionsSectionProps {
  monthlyContributions: number;
  onMonthlyContributionsChange: (value: number) => void;
}

export const MonthlyContributionsSection: FC<MonthlyContributionsSectionProps> = ({
  monthlyContributions,
  onMonthlyContributionsChange,
}) => {
  return (
    <BaseCard title="Ежемесячные взносы результатами других исполнителей">
      <div className="input-container" style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
        <LabelText>
          Сумма взносов в месяц
          <SharedTooltip text="Общая сумма взносов результатами других исполнителей, вносимая ими в систему ежемесячно после вашего внесения результата. Эти взносы создают «Премии», которые увеличивают складочный капитал и приносят выгоду всем участникам, включая Вас." />
        </LabelText>
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
        />
        <DescriptionText>
          Ежемесячная сумма взносов результатами других исполнителей
        </DescriptionText>
      </div>
    </BaseCard>
  );
}; 