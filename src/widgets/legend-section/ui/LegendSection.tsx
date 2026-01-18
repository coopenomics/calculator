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
            <Text className="legend-role-title"><UserOutlined style={{ fontSize: 24, marginRight: 8 }} />«Исполнитель»</Text>
            <Text>Участник, который создаёт результат, внося своё время.</Text>
          </div>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <div className="legend-role">
            <Text className="legend-role-title"><BulbOutlined style={{ fontSize: 24, marginRight: 8 }} />«Автор»</Text>
            <Text>Участник, который предложил проектную идею для «Результата».</Text>
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
            <Text className="legend-role-title"><TeamOutlined style={{ fontSize: 24, marginRight: 8 }} />Участник</Text>
            <Text>Любой участник системы, получающий выгоду от капитализации взносов в результат.</Text>
          </div>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: '25px' }} justify={"space-around"}>
        <Col xs={24} lg={6} style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="legend-role">
            <Text className="legend-role-title"><FileTextOutlined style={{ fontSize: 24, marginRight: 8 }} />«Результат»</Text>
            <Text>Полезный объект интеллектуальной собственности - программа, презентация, приложение, метод, ...</Text>
          </div>
        </Col>
        
        <Col xs={24} lg={6} style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="legend-role">
            <Text className="legend-role-title"><FileTextOutlined style={{ fontSize: 24, marginRight: 8 }} />«Доля»</Text>
            <Text>Часть складочного капитала, выраженная в праве требования возврата паевого взноса из кооператива.</Text>
          </div>
        </Col>
        <Col xs={24} lg={6} style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="legend-role">
            <Text className="legend-role-title"><FileTextOutlined style={{ fontSize: 24, marginRight: 8 }} />«Прибавка»</Text>
            <Text>Дополнительный взнос, который образуется при внесении «Результата» в кооператив.</Text>
          </div>
        </Col>
        <Col xs={24} lg={6} style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="legend-role">
            <Text className="legend-role-title"><FileTextOutlined style={{ fontSize: 24, marginRight: 8 }} />«Благорост»</Text>
            <Text>Увеличение «Доли» в «Результате» от «Премий».</Text>
          </div>
        </Col>
      </Row>
      <Divider />
      <div className="legend-description">
        <Text>
          <strong>Как это работает:</strong> Каждый взнос «Исполнителя» в «Результат» образует дополнительные взносы («Премии») для «Исполнителей», «Авторов» и «Ранние участники», которые определяются по золотому сечению, увеличивая «Долю» и «Результат» в целом. Денежные взносы «Инвесторов» не образуют дополнительных взносов («Премий») и обеспечивают компенсацию стоимости труда «Авторов» и «Исполнителей».
        </Text>
      </div>
      <div className="legend-description">
        <Text>
          <strong>Бизнес-модель:</strong> Увеличение «Результатов» ведет к расширению экосистемы платформы «Кооперативной Экономики», где подключенные кооперативы оплачивают членские взносы за электронный документооборот по минимальной подписке и по факту за каждый произведенный документ. Эти членские взносы составляют основной источник обеспечения возвратов сформированной выгоды для «Ранние участники». 
        </Text>
      </div>
    </BaseCard>
  );
}; 