import { Typography } from 'antd';
import { FC, ReactNode } from 'react';

const { Text } = Typography;

interface DescriptionTextProps {
  children: ReactNode;
  className?: string;
}

export const DescriptionText: FC<DescriptionTextProps> = ({ 
  children, 
  className = 'card-description' 
}) => {
  return (
    <Text type="secondary" className={className}>
      {children}
    </Text>
  );
}; 