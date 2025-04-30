import { Tabs, TabsProps } from 'antd';
import React from "react";
import ProviderConfigForm from './ProviderConfigForm';
import MessageContentTable from './MessageContentTable';


/**
 * Main Component for view tabs messages and configs.
 * @returns
 */
export const WhatsAppTabs: React.FC = () => {

  const itemsTabs: TabsProps['items'] = [
    {
      key: '1',
      label: 'Messages',
      children: <MessageContentTable />,
    },
    {
      key: '2',
      label: 'Configurations',
      children: <ProviderConfigForm/>,
    }
  ];

  return (<Tabs defaultActiveKey="1" items={itemsTabs}/>)

}

