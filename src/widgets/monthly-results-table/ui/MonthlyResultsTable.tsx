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
      title: columnTitle('Складочный капитал', 'Общая сумма всех вкладов и премий в системе на конец месяца, с учетом выплат членских взносов, которые уменьшают складочный капитал'),
      dataIndex: 'shareholderCapital',
      key: 'shareholderCapital',
      render: (value: number) => value.toLocaleString('ru-RU') + ' RUB'
    },
    {
      title: columnTitle('Прирост складочного капитала', 'Общий прирост складочного капитала за месяц с учетом всех взносов и премий'),
      dataIndex: 'capitalGrowth',
      key: 'capitalGrowth',
      render: (value: number) => value.toLocaleString('ru-RU') + ' RUB'
    },
    
    {
      title: columnTitle('Сумма генерации', 'Общая сумма себестоимости взносов результатов труда создателей и авторов, а также их премий (без учёта премий вкладчиков и взносов инвесторов) за месяц'),
      dataIndex: 'monthlyGeneration',
      key: 'monthlyGeneration',
      render: (value: number) => value.toLocaleString('ru-RU') + ' RUB'
    },
    {
      title: columnTitle('Премия вкладчиков', 'Дополнительная капитализация от новых взносов результатами труда создателей и авторов (161.8% от суммы себестоимости труда и их премий за вычетом возвратов)'),
      dataIndex: 'contributorsBonus',
      key: 'contributorsBonus',
      render: (value: number) => value.toLocaleString('ru-RU') + ' RUB'
    },
    {
      title: columnTitle('Вклад других инвесторов', 'Денежный взнос других инвесторов в текущем месяце'),
      dataIndex: 'monthlyInvestorAmount',
      key: 'monthlyInvestorAmount',
      render: (value: number) => value.toLocaleString('ru-RU') + ' RUB'
    },
    {
      title: columnTitle('Сумма вкладов инвесторов', 'Накопительная сумма всех взносов всех инвесторов с начала учета (включая Вас)'),
      dataIndex: 'totalInvestorsAmount',
      key: 'totalInvestorsAmount',
      render: (value: number) => value.toLocaleString('ru-RU') + ' RUB'
    },
    {
      title: columnTitle('Доля инвесторов', 'Процентная доля всех инвесторов в общем складочном капитале системы'),
      dataIndex: 'investorsShare',
      key: 'investorsShare',
      render: (value: number) => value + ' %'
    },
    {
      title: columnTitle('Вклады других создателей и инвесторов', 'Общая сумма взносов других создателей и инвесторов в текущем месяце'),
      dataIndex: 'currentMonthlyContributions',
      key: 'currentMonthlyContributions',
      render: (value: number) => value.toLocaleString('ru-RU') + ' RUB'
    },
    {
      title: columnTitle('Предполагаемая стоимость вашего вклада', 'Общая сумма вашего вклада на конец месяца, включая первоначальный взнос и накопленную долю в премиях вкладчиков'),
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
      title: columnTitle('Ваши предполагаемые возвраты', 'Сумма, которую вы предположительно получите в текущем месяце (возврат себестоимости результата в 1 месяце или членские взносы в последующих месяцах выплат)'),
      dataIndex: 'creatorMembershipFeePayment',
      key: 'creatorMembershipFeePayment',
      render: (value: number) => value.toLocaleString('ru-RU') + ' RUB'
    }
  ];

  // Определяем основные колонки для краткого режима
  const basicColumnKeys = ['month', 'shareholderCapital', 'initialContribution', 'creatorShare', 'creatorMembershipFeePayment'];

  // Фильтруем видимые колонки по настройке и по режиму отображения
  const columns = allColumns.filter(column => {
    if (!isDetailedView) {
      // В кратком режиме показываем только основные колонки
      return basicColumnKeys.includes(column.key) && columnVisibility[column.key as keyof ColumnVisibility];
    }
    // В подробном режиме фильтруем по настройкам видимости
    return columnVisibility[column.key as keyof ColumnVisibility];
  });

  return (
    <BaseCard title="Предполагаемые результаты по месяцам" className="mt-lg mb-md">
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
        columns={columns} 
        pagination={false} 
        rowKey="month" 
        scroll={{ x: 'max-content' }}
        size="small"
        bordered
      />
    </BaseCard>
  );
}; 