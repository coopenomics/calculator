import { Typography } from 'antd';
import { FC, ReactNode } from 'react';

const { Text } = Typography;

interface LabelTextProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const LabelText: FC<LabelTextProps> = ({ children, className = 'label-text', style }) => {
  return (
    <Text className={className} strong style={style}>
      {children}
    </Text>
  );
}; 