import { InputNumber, Slider, Space } from 'antd';
import { FC, useEffect, useRef, useState } from 'react';

interface DebouncedInputSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  formatter?: (value: number | string) => string;
  parser?: (value: string | undefined) => number;
  addonAfter?: React.ReactNode;
  tooltipFormatter?: (value?: number) => React.ReactNode;
  unitSuffix?: string;
  style?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  sliderStyle?: React.CSSProperties;
}

export const DebouncedInputSlider: FC<DebouncedInputSliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 10000000,
  step = 10000,
  formatter,
  parser,
  addonAfter,
  tooltipFormatter,
  unitSuffix,
  style,
  inputStyle,
  sliderStyle,
}) => {
  const [localValue, setLocalValue] = useState<number>(value);
  const debounceTimeout = useRef<number | null>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = window.setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue);
      }
    }, 500);
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localValue]);

  // Обёртки для formatter и tooltipFormatter с явной типизацией value
  const inputNumberFormatter = formatter
    ? (val: number | undefined, _info: { userTyping: boolean; input: string }) => formatter(val ?? 0)
    : undefined;
  const inputNumberParser = parser
    ? (val: string | undefined) => parser(val)
    : undefined;
  const sliderTooltipFormatter = tooltipFormatter
    ? (val: number | undefined) => tooltipFormatter(val ?? 0)
    : undefined;

  return (
    <div className="input-container" style={style}>
      <Space.Compact style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px', ...inputStyle }}>
        <InputNumber
          style={{ width: '180px' }}
          value={localValue}
          onChange={(value: number | null) => {
            if (typeof value === 'number' && !isNaN(value)) {
              setLocalValue(value);
            }
          }}
          min={min}
          max={max}
          step={step}
          formatter={inputNumberFormatter}
          parser={inputNumberParser}
          addonAfter={addonAfter || unitSuffix}
        />
      </Space.Compact>
      <Slider
        value={localValue}
        onChange={(value: number) => {
          if (typeof value === 'number' && !isNaN(value)) {
            setLocalValue(value);
          }
        }}
        min={min}
        max={max}
        step={step}
        tooltip={sliderTooltipFormatter ? { formatter: sliderTooltipFormatter } : undefined}
        style={{ width: '100%', marginBottom: 'auto', ...sliderStyle }}
      />
    </div>
  );
}; 