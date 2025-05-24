import { Table, Switch } from 'antd';
import { FC, useState } from 'react';
import { MonthlyResult, ColumnVisibility } from '../../../entities/core';
import { BaseCard, SharedTooltip } from '../../../shared';

interface MonthlyResultsTableProps {
  results: MonthlyResult[];
  columnVisibility: ColumnVisibility;
}

export const MonthlyResultsTable: FC<MonthlyResultsTableProps> = ({
  results,
  columnVisibility,
}) => {
  const [isDetailedView, setIsDetailedView] = useState(false);

  // Функция для создания заголовка колонки с подсказкой
  const columnTitle = (title: string, tooltip: string) => (
    <span>
      {title}
      <SharedTooltip text={tooltip} />
    </span>
  );

  // Колонки для таблицы результатов
  const allColumns = [
    {
      title: columnTitle('Месяц', 'Номер месяца от начала участия. Месяц 1 - момент вступления, месяц 2 - первый месяц после внесения вашего вклада'),
      dataIndex: 'month',
      key: 'month',
      render: (value: number) => value + 1
    },
    {
      title: columnTitle('Складочный капитал', 'Общая сумма всех вкладов и «Премий» в системе на конец месяца, с учетом выплат членских взносов, которые уменьшают складочный капитал'),
      dataIndex: 'shareholderCapital',
      key: 'shareholderCapital',
      render: (value: number) => value.toLocaleString('ru-RU') + ' RUB'
    },
    {
      title: columnTitle('Прирост складочного капитала', 'Общий прирост складочного капитала за месяц с учетом всех взносов и «Премий»'),
      dataIndex: 'capitalGrowth',
      key: 'capitalGrowth',
      render: (value: number) => value.toLocaleString('ru-RU') + ' RUB'
    },
    
    {
      title: columnTitle('Сумма генерации', 'Общая сумма стоимости взносов «Результатов» труда «Создателей» и «Авторов», а также их «Премий» (без учёта «Премий» «Вкладчиков» и взносов «Инвесторов») за месяц'),
      dataIndex: 'monthlyGeneration',
      key: 'monthlyGeneration',
      render: (value: number) => value.toLocaleString('ru-RU') + ' RUB'
    },
    {
      title: columnTitle('«Премия» «Вкладчиков»', 'Дополнительная капитализация от новых взносов «Результатами» труда «Создателей» и «Авторов» (161.8% от суммы стоимости труда и их «Премий» за вычетом возвратов)'),
      dataIndex: 'contributorsBonus',
      key: 'contributorsBonus',
      render: (value: number) => value.toLocaleString('ru-RU') + ' RUB'
    },
    {
      title: columnTitle('Вклад других «Инвесторов»', 'Денежный взнос других «Инвесторов» в текущем месяце'),
      dataIndex: 'monthlyInvestorAmount',
      key: 'monthlyInvestorAmount',
      render: (value: number) => value.toLocaleString('ru-RU') + ' RUB'
    },
    {
      title: columnTitle('Сумма вкладов «Инвесторов»', 'Накопительная сумма всех взносов всех «Инвесторов» с начала учета (включая Вас)'),
      dataIndex: 'totalInvestorsAmount',
      key: 'totalInvestorsAmount',
      render: (value: number) => value.toLocaleString('ru-RU') + ' RUB'
    },
    {
      title: columnTitle('Доля «Инвесторов»', 'Процентная доля всех «Инвесторов» в общем складочном капитале системы'),
      dataIndex: 'investorsShare',
      key: 'investorsShare',
      render: (value: number) => value + ' %'
    },
    {
      title: columnTitle('Вклады других «Создателей» и «Инвесторов»', 'Общая сумма взносов других «Создателей» и «Инвесторов» в текущем месяце'),
      dataIndex: 'currentMonthlyContributions',
      key: 'currentMonthlyContributions',
      render: (value: number) => value.toLocaleString('ru-RU') + ' RUB'
    },
    ,
    {
      title: columnTitle('Вклад других «Создателей»', 'Базовая стоимость «Результатов» труда других «Создателей» в текущем месяце'),
      dataIndex: 'othersCreatorBase',
      key: 'othersCreatorBase',
      render: (value: number) => value.toLocaleString('ru-RU') + ' RUB'
    },
    {
      title: columnTitle('Вклад «Авторов» других', 'Стоимость труда «Авторов», связанных с «Результатами» других «Создателей» (61.8% от их базовой стоимости)'),
      dataIndex: 'othersAuthorBase',
      key: 'othersAuthorBase',
      render: (value: number) => value.toLocaleString('ru-RU') + ' RUB'
    },
    {
      title: columnTitle('«Премия» других «Создателей»', 'Дополнительная сумма, начисляемая другим «Создателям» (100% от стоимости их «Результатов»)'),
      dataIndex: 'othersCreatorBonus',
      key: 'othersCreatorBonus',
      render: (value: number) => value.toLocaleString('ru-RU') + ' RUB'
    },
    {
      title: columnTitle('«Премия» «Авторов» других', 'Дополнительная сумма, начисляемая «Авторам» других «Создателей» (100% от стоимости их труда)'),
      dataIndex: 'othersAuthorBonus',
      key: 'othersAuthorBonus',
      render: (value: number) => value.toLocaleString('ru-RU') + ' RUB'
    },
    {
      title: columnTitle('Возврат другим', 'Сумма возврата стоимости «Результатов» другим «Создателям» и их «Авторам» в текущем месяце'),
      dataIndex: 'othersWithdrawalAmount',
      key: 'othersWithdrawalAmount',
      render: (value: number) => value.toLocaleString('ru-RU') + ' RUB'
    },
    {
      title: columnTitle('Предполагаемая стоимость вашего вклада', 'Общая сумма вашего вклада на конец месяца, включая первоначальный взнос и накопленную долю в «Премия»х вкладчиков'),
      dataIndex: 'initialContribution',
      key: 'initialContribution',
      render: (value: number) => value.toLocaleString('ru-RU') + ' RUB'
    },
    {
      title: columnTitle('Ваша предполагаемая доля', 'Процент Вашей доли в общем складочном капитале системы'),
      dataIndex: 'creatorShare',
      key: 'creatorShare',
      render: (value: number) => value + ' %'
    },
    {
      title: columnTitle('Предполагаемые членские взносы за документооборот', 'Сумма членских взносов за электронный документооборот, получаемые от подключенных кооперативов в текущем месяце'),
      dataIndex: 'monthlyFee',
      key: 'monthlyFee',
      render: (value: number) => value.toLocaleString('ru-RU') + ' RUB'
    },
    {
      title: columnTitle('Накопленные членские взносы за документооборот', 'Общая сумма накопленных членских взносов, ожидающих выплаты'),
      dataIndex: 'accumulatedFees',
      key: 'accumulatedFees',
      render: (value: number) => value.toLocaleString('ru-RU') + ' RUB'
    },
    {
      title: columnTitle('Ваши предполагаемые возвраты', 'Сумма, которую вы предположительно получите в текущем месяце (возврат стоимости «Результата» в 1 месяце или членские взносы в последующих месяцах выплат)'),
      dataIndex: 'creatorMembershipFeePayment',
      key: 'creatorMembershipFeePayment',
      render: (value: number) => value.toLocaleString('ru-RU') + ' RUB'
    }
  ];

  // Определяем основные колонки для краткого режима
  const basicColumnKeys = ['month', 'shareholderCapital', 'initialContribution', 'creatorShare', 'creatorMembershipFeePayment'];

  // Фильтруем видимые колонки по настройке и по режиму отображения
  const columns = allColumns
    .filter((column) => {
      if (!column) return false;
      if (!isDetailedView) {
        // В кратком режиме показываем только основные колонки
        return basicColumnKeys.includes(column.key) && columnVisibility[column.key as keyof ColumnVisibility];
      }
      // В подробном режиме фильтруем по настройкам видимости
      return columnVisibility[column.key as keyof ColumnVisibility];
    })
    .filter(Boolean) as Exclude<typeof allColumns[number], undefined>[]; // Явно приводим к массиву колонок без undefined

  return (
    <BaseCard title="Складочный капитал по месяцам" className="mt-lg mb-md">
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
        <span style={{ marginRight: 8 }}>Кратко</span>
        <Switch 
          checked={isDetailedView} 
          onChange={setIsDetailedView} 
        />
        <span style={{ marginLeft: 8 }}>Подробно</span>
      </div>
      <Table 
        dataSource={results} 
        columns={columns as any} // Явно приводим к any для Table, чтобы убрать ошибку типов
        pagination={false} 
        rowKey="month" 
        scroll={{ x: 'max-content' }}
        size="small"
        bordered
      />
    </BaseCard>
  );
}; 