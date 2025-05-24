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
        <LabelText>
          Укажите процент возврата стоимости труда
          <SharedTooltip text="Определяет долю стоимости труда, которая будет возвращена (выплачена) после внесения «результата» в кооператив. Оставленная в системе часть стоимости вместе с премиями капитализируется внесением новых «результатов». Важно: в этой модели мы предполагаем, что `все действуют как Вы`, т.е. каждый создатель и автор будет возвращать такую же часть стоимости, какую Вы укажите здесь для себя." />
        </LabelText>
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
          {withdrawalRate === 0 
            ? "Вся стоимость труда остается в системе (максимальная выгода)" 
            : withdrawalRate === 100 
              ? "Вся стоимость труда возвращается при внесении «результата» (минимальная выгода)" 
              : "Часть стоимости труда возвращается, а часть капитализируется новыми «результатами»"}
        </DescriptionText>
      </div>
    </BaseCard>
  );
}; 