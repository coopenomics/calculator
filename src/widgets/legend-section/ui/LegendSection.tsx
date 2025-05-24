import { FC } from 'react';
import { Typography, Divider, Row, Col } from 'antd';
import { BaseCard } from '../../../shared';
import '../styles/legend.css';
import { UserOutlined, BulbOutlined, DollarCircleOutlined, TeamOutlined, FileTextOutlined } from '@ant-design/icons';

const { Text } = Typography;

export const LegendSection: FC = () => {
  return (
    <BaseCard 
      title="Легенда" 
      className="mb-md"
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <div className="legend-role">
            <Text className="legend-role-title"><UserOutlined style={{ fontSize: 24, marginRight: 8 }} />«Создатель»</Text>
            <Text>Участник, который создаёт результат, вкладывая своё время.</Text>
          </div>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <div className="legend-role">
            <Text className="legend-role-title"><BulbOutlined style={{ fontSize: 24, marginRight: 8 }} />«Автор»</Text>
            <Text>Участник, который предложил проектную идею результата.</Text>
          </div>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <div className="legend-role">
            <Text className="legend-role-title"><DollarCircleOutlined style={{ fontSize: 24, marginRight: 8 }} />«Инвестор»</Text>
            <Text>Участник, который предоставляет денежные средства для создания результата.</Text>
          </div>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <div className="legend-role">
            <Text className="legend-role-title"><TeamOutlined style={{ fontSize: 24, marginRight: 8 }} />«Вкладчик»</Text>
            <Text>Любой участник системы, получающий выгоду от капитализации вкладов в результат.</Text>
          </div>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
        <Col xs={24} style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="legend-role">
            <Text className="legend-role-title"><FileTextOutlined style={{ fontSize: 24, marginRight: 8 }} />«Результат»</Text>
            <Text>Объект интеллектуальной собственности, созданный трудом участников и вносимый в систему.</Text>
          </div>
        </Col>
      </Row>
      <Divider />
      <div className="legend-description">
        <Text>
          <strong>Как это работает:</strong> в основе модели лежит принцип капитализации «результатов» интеллектуальной деятельности 
          по золотому сечению, что создает справедливое распределение между «вкладчиками». Каждый вклад в кооператив «результатами» труда генерирует премии, которые капитализируются и увеличивают общую стоимость объекта интеллектуальной собственности.
          Денежные взносы «инвесторов» входят в долю без создания премий и направляются на возвраты стоимости труда «авторов» и «создателей» «результатов». Взносы «инвесторов» обеспечивают компенсацию стоимости труда «авторов» и «создателей».
        </Text>
      </div>
      <div className="legend-description">
        <Text>
          <strong>Бизнес-модель:</strong> Реализация приложений платформы кооперативной экономики приводит к росту электронного 
          документооборота, который оплачивается кооперативами по минимальной подписке и за каждый произведенный документ. Эти членские взносы и составляют основной источник возврата сформированной выгоды для «вкладчиков», которая выплачивается пропорционально их доле в складочном капитале, уменьшая его при каждой выплате.
        </Text>
      </div>
    </BaseCard>
  );
}; 