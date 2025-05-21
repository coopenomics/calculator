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
    <BaseCard title="Процент возврата себестоимости труда">
      <div>
        <LabelText>
          Процент возврата
          <SharedTooltip text="Определяет, какой процент от себестоимости вашего труда как создателя будет возвращен сразу после внесения результата. Оставленная в системе часть себестоимости вместе с премиями капитализируется внесением новых результатов. Важно: в этой модели мы предполагаем, что `все действуют как Вы`, т.е. каждый создатель и автор будет возвращать такую же часть себестоимости, какую Вы укажите здесь для себя." />
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
            ? "Вся себестоимость труда остается в системе (максимальная выгода)" 
            : withdrawalRate === 100 
              ? "Вся себестоимость труда возвращается при внесении результата (минимальная выгода)" 
              : "Часть себестоимости труда возвращается, а часть капитализируется новыми результатами"}
        </DescriptionText>
      </div>
    </BaseCard>
  );
}; 