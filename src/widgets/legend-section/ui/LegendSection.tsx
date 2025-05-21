import { FC } from 'react';
import { Typography, Divider } from 'antd';
import { BaseCard } from '../../../shared';
import '../styles/legend.css';
import { UserOutlined, BulbOutlined, DollarCircleOutlined, TeamOutlined } from '@ant-design/icons';

const { Text } = Typography;

export const LegendSection: FC = () => {
  return (
    <BaseCard 
      title="Легенда" 
      className="mb-md"
    >
      <div className="legend-roles">
        <div className="legend-role">
          <Text className="legend-role-title"><UserOutlined style={{ fontSize: 24, marginRight: 8 }} />Создатель</Text>
          <Text>Участник, который создаёт результат, вкладывая своё время.</Text>
        </div>
        
        <div className="legend-role">
          <Text className="legend-role-title"><BulbOutlined style={{ fontSize: 24, marginRight: 8 }} />Автор</Text>
          <Text>Участник, который предложил идею проекта результата.</Text>
        </div>
        
        <div className="legend-role">
          <Text className="legend-role-title"><DollarCircleOutlined style={{ fontSize: 24, marginRight: 8 }} />Инвестор</Text>
          <Text>Участник, который инвестирует денежные средства в результат.</Text>
        </div>
        
        <div className="legend-role">
          <Text className="legend-role-title"><TeamOutlined style={{ fontSize: 24, marginRight: 8 }} />Вкладчик</Text>
          <Text>Любой участник системы, получающий выгоду от капитализации вклада.</Text>
        </div>
      </div>
      
      <Divider />
      
      <div className="legend-description">
        <Text>
          <strong>Как это работает:</strong> в основе модели лежит принцип капитализации результатов интеллектуальной деятельности 
          по золотому сечению, что создает справедливое распределение между вкладчиками. Каждый вклад в кооператив результатами труда генерирует премии, которые капитализируются и увеличивают общую стоимость объекта интеллектуальной собственности.
          Денежные взносы инвесторов входят в долю без создания премий и направляются на возвраты себестоимости труда авторов и создателей результатов. 
        </Text>
      </div>
      <div className="legend-description">
        <Text>
          <strong>Бизнес-модель:</strong> Реализация приложений платформы кооперативной экономики приводит к росту электронного 
          документооборота, который оплачивается кооперативами по минимальной подписке и за каждый произведенный документ. Эти членские взносы и составляют основной источник возврата сформированной выгоды для вкладчиков, которая выплачивается пропорционально их доле в складочном капитале, уменьшая его при каждой выплате.
        </Text>
      </div>
    </BaseCard>
  );
}; 