import { useRequest, useApp } from "@nocobase/client";
import { useState, useEffect } from "react";
import { Table, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import React from "react";

/**
 * Component for view messages sending.
 * @returns
 */
const MessageContentTable: React.FC = () => {

  const { i18n } = useApp();
  const { t } = useTranslation('@leandrojm/plugin-whatsapp');

  const [dataSource, setDataSource] = useState<Array<{
    key: string;
    provider: string;
    number: string;
    content: string;
    date: string;
    status: string;
    status_message: string;
  }>>([]);

  const { data } = useRequest<{
    data: any;
  }>({
    resource: 'MessageQueue:list',
    action: 'get',
    params: {
    },
  });

  useEffect(() => {
    if (data?.data) {
      const formattedData = data.data.map((item) => ({
        key: item.id,
        provider: item.provider,
        number: item.number,
        content: item.content,
        date: item.createdAt,
        status: item.status,
        status_message: item.status_message
      }));

      setDataSource(formattedData);
    }
  }, [data]);

  const columns = [
    {
      title: t('table_column_title_provider'),
      dataIndex: 'provider',
      key: 'provider',
      render: (_, { provider }) => (
        <>
          <Tag color="green" >
                {(provider != null ? provider.toUpperCase(): 'NOT SET')}
              </Tag>
        </>
      ),
    },
    {
      title: t('table_column_title_number'),
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: t('table_column_title_content'),
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: t('table_column_title_date'),
      dataIndex: 'date',
      key: 'date',

    },
    {
      title: t('table_column_title_status'),
      dataIndex: 'status',
      key: 'status',
      render: (_, { status }) => (
        <>
          <Tag color="blue">
                {status.toUpperCase()}
              </Tag>
        </>
      ),
      filters: [
        {
          text: 'Error',
          value: 'error',
        },
        {
          text: 'Done',
          value: 'done',
        },
      ],
      filterSearch: true,
      onFilter: (value, record) => record.status.startsWith(value as string),
    },
    {
      title: t('table_column_title_status_message'),
      dataIndex: 'status_message',
      key: 'status_message',
    },
  ];

  return <Table dataSource={dataSource} columns={columns} />
}

export default MessageContentTable;
