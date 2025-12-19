import { BaseCard, LabelText, DescriptionText, SharedTooltip, DebouncedInputSlider } from '../../../shared';
import { FC } from 'react';

interface WithdrawalRateSectionProps {
  withdrawalRate: number;
  onWithdrawalRateChange: (value: number) => void;
}

export const WithdrawalRateSection: FC<WithdrawalRateSectionProps> = ({
  withdrawalRate,
  onWithdrawalRateChange,
}) => {
  return (
    <BaseCard title="Возврат стоимости труда">
      <div>
        <div className="slider-container">
          <DebouncedInputSlider
            value={withdrawalRate}
            onChange={onWithdrawalRateChange}
            min={0}
            max={100}
            step={5}
            tooltipFormatter={(value: number | undefined) => `${value}%`}
            sliderStyle={{ marginBottom: 0 }}
            unitSuffix="%"
            // marks={{ 0: '0%', 50: '50%', 100: '100%' }} // если понадобится
          />
        </div>
        <DescriptionText>
          Определяет долю стоимости труда, которая будет выплачена после внесения «Результата» в кооператив. Оставленная в кооперативе часть стоимости капитализируется новыми взносами «Исполнителей». Важно: в этой модели мы предполагаем, что `Все действуют как Вы` - т.е. каждый исполнитель и автор будет возвращать такую же часть стоимости, какую Вы укажите здесь для себя.
          {/* {withdrawalRate === 0 
            ? "Вся стоимость труда остается в системе (максимальная выгода)" 
            : withdrawalRate === 100 
              ? "Вся стоимость труда возвращается при внесении «Результата» (минимальная выгода)" 
              : "Часть стоимости труда возвращается, а часть капитализируется новыми «Результатами»"} */}
        </DescriptionText>
      </div>
    </BaseCard>
  );
}; 