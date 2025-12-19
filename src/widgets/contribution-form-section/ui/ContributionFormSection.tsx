import { BaseCard, LabelText, DescriptionText, SharedTooltip, DebouncedInputSlider } from '../../../shared';
import { FC } from 'react';

interface ContributionFormSectionProps {
  contributionAmount: number;
  onContributionAmountChange: (value: number | undefined) => void;
}

export const ContributionFormSection: FC<ContributionFormSectionProps> = ({
  contributionAmount,
  onContributionAmountChange,
}) => {
  return (
    <BaseCard title="Ваш взнос трудом">
      <div className="input-container" style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
        {/* <LabelText> */}
          {/* Укажите стоимость труда */}
          {/* <SharedTooltip text="Стоимость труда, который вы вносите в систему. Расчитывается как затраченное время на «Результат» по вашей ставке за час." /> */}
        {/* </LabelText> */}
        <DebouncedInputSlider
          value={contributionAmount}
          onChange={onContributionAmountChange}
          min={0}
          max={10000000}
          step={10000}
          formatter={(value: number | string) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
          parser={(value: string | undefined) => value ? Number(value.replace(/\s/g, '')) : 0}
          addonAfter="₽"
          tooltipFormatter={(value: number | undefined) => `${value?.toLocaleString('ru-RU')} ₽`}
        />
        <DescriptionText>
          Укажите стоимость труда, который Вы вносите в «Результат» как «Исполнитель». Взнос увеличивает вашу долю в складочном капитале и создаёт «Премии», которые капитализируются новыми взносами "трудом" и возвращаются из числа членских взносов кооперативов за использование системы электронного документооборота платформы. Стоимость взноса расчитывается как затраченное время на «Результат» по вашей ставке за час.
        </DescriptionText>
      </div>
    </BaseCard>
  );
}; 