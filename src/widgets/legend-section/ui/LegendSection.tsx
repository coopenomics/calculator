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
      <Row gutter={[16, 16]} style={{ marginTop: '25px' }} justify={"space-around"}>
        <Col xs={24} lg={8} style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="legend-role">
            <Text className="legend-role-title"><FileTextOutlined style={{ fontSize: 24, marginRight: 8 }} />«Результат»</Text>
            <Text>Полезный объект интеллектуальной собственности - программа, презентация, приложение, метод, ...</Text>
          </div>
        </Col>
        
        <Col xs={24} lg={8} style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="legend-role">
            <Text className="legend-role-title"><FileTextOutlined style={{ fontSize: 24, marginRight: 8 }} />«Доля»</Text>
            <Text>Право требования возврата взноса из кооператива.</Text>
          </div>
        </Col>
        <Col xs={24} lg={8} style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="legend-role">
            <Text className="legend-role-title"><FileTextOutlined style={{ fontSize: 24, marginRight: 8 }} />«Благорост»</Text>
            <Text>Увеличение стоимости «Доли» в «Результате» от последующих вкладов временем «Создателей».</Text>
          </div>
        </Col>
      </Row>
      <Divider />
      <div className="legend-description">
        <Text>
          <strong>Как это работает:</strong> Каждый вклад «Создателя» в «Результат» образует премии для «Авторов» и «Вкладчиков», которые справедливо распределяются по золотому сечению, увеличивая стоимость «Доли» и «Результата» в целом. Денежные взносы «Инвесторов» не образуют новых премий и обеспечивают компенсацию стоимости труда «Авторов» и «Создателей».
        </Text>
      </div>
      <div className="legend-description">
        <Text>
          <strong>Бизнес-модель:</strong> Увеличение «Результатов» ведет к расширению экосистемы платформы «Кооперативной Экономики», где подключенные кооперативы оплачивают членские взносы за электронный документооборот по минимальной подписке и по факту за каждый произведенный документ. Эти членские взносы составляют основной источник обеспечения возвратов сформированной выгоды для «Вкладчиков». 
        </Text>
      </div>
    </BaseCard>
  );
}; 