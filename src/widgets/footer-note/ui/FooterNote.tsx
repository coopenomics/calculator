import { Typography } from 'antd';
import { FC } from 'react';

const { Text } = Typography;

export const FooterNote: FC = () => {
  return (
    <div className="footer-note">
      <Text type="secondary">
        Модель демонстрирует рост вашей доли от взносов других участников при взносе результатом и/или деньгами.
        Капитализация распределяется пропорционально долям, что увеличивает ваш взнос с каждым месяцем. 
        Членские взносы кооперативов за электронный документооборот обеспечивают возврат взносов. 
      </Text>
    </div>
  );
}; 