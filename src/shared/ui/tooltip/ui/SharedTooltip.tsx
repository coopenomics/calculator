import { FC, ReactNode } from 'react';
import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

interface SharedTooltipProps {
  text: string;
  children?: ReactNode;
}

export const SharedTooltip: FC<SharedTooltipProps> = ({ text, children }) => (
  <Tooltip title={text} styles={{ root: { maxWidth: 320 } }}>
    {children ?? <QuestionCircleOutlined style={{ marginLeft: 6, color: '#aaa', fontSize: 16 }} />}
  </Tooltip>
); 