import { Plugin, useAPIClient, useRequest } from '@nocobase/client';
import { WhatsAppTabs } from './components/WhatsAppTabs';

/**
 *
 */
export class PluginWhatsappClient extends Plugin {

  async install() {

  }

  async beforeLoad() {
  }

  async load() {

    this.app.pluginSettingsManager.add('whatsapp', {
      title: 'WhatsApp',
      icon: 'WhatsAppOutlined',
      Component: WhatsAppTabs,
      sort: 100,
    });
  }
}

export default PluginWhatsappClient;
