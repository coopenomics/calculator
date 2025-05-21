import { Card, CardProps } from 'antd';
import { FC, ReactNode, CSSProperties } from 'react';

interface BaseCardProps extends CardProps {
  title: string;
  children: ReactNode;
  flexGrow?: boolean;
}

export const BaseCard: FC<BaseCardProps> = ({ 
  title, 
  children, 
  className = 'mb-md', 
  headStyle = { backgroundColor: '#f0f5ff', fontWeight: 'bold' },
  flexGrow = true,
  style,
  bodyStyle,
  ...restProps 
}) => {
  const cardStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    ...(flexGrow ? { flex: '1 1 auto' } : {}),
    ...(style as CSSProperties)
  };
  
  const cardBodyStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: '16px',
    ...(flexGrow ? { flex: '1 1 auto' } : {}),
    ...(bodyStyle as CSSProperties)
  };
  
  const contentStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    ...(flexGrow ? { flex: '1 1 auto' } : {})
  };
  
  return (
    <Card 
      title={title} 
      className={className}
      headStyle={headStyle}
      style={cardStyle}
      bodyStyle={cardBodyStyle}
      {...restProps}
    >
      <div className="card-content" style={contentStyle}>
        {children}
      </div>
    </Card>
  );
}; 