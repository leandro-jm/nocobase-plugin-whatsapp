import axios from 'axios';
import { Plugin } from '@nocobase/server';

/**
 * Plugin for sending WhatsApp messages using different providers.
 * @class PluginWhatsappServer
 * @extends Plugin
 * @description This plugin provides an endpoint to send WhatsApp messages using different providers such as Twilio, Evolution, and WhatsApp API.
 * It allows the user to configure the provider and send messages through the specified API.
 * The plugin also handles the status of the messages sent and stores them in a collection.
 */
export class PluginWhatsappServer extends Plugin {

  async afterAdd() {}

  async beforeLoad() {}

  async load() {
    this.app.acl.allow('whatsapp', '*', 'public');

    /**
     * Endpoint for Send message depending on the provider
     * @param {string} recipient - The recipient of the message.
     * @param {string} message - The message to send.
     * @returns {Promise<void>}
     */
    this.app.resourceManager.define({
      name: 'whatsapp',
      actions: {
        async sendMessage(ctx, next) {
          const { body } = ctx.request;
          let response = '';
          let responseStatus = 0;

          const MessageQueue = ctx.db.getCollection('MessageQueue').model;
          let message;

          try {

            const ProvideConfig = ctx.db.getCollection('ProvideConfig').model;
            const apiConfig = await ProvideConfig.findOne({
              order: [['createdAt', 'DESC']],
            });

            message = await MessageQueue.create({
              provider: apiConfig.type_api,
              number: body.number,
              content: body.content,
              status: 'pending',
            });

            if (!apiConfig || !apiConfig.type_api) {

              const messageResponse = 'Provider configuration not found';
              console.error(messageResponse);
              response = messageResponse;
              responseStatus = 500;

            } else {

              switch (apiConfig.type_api) {

                case 'evolution':
                  const evolutionResponse = await axios.post(
                    apiConfig.evolution_url,
                    {
                      number: body.number,
                      text: body.content,
                    },
                    {
                      headers: {
                        'Content-Type': 'application/json',
                        'apiKey': apiConfig.evolution_api_key,
                      },
                    },
                  );

                  if (evolutionResponse.status !== 200 && evolutionResponse.status !== 201) {

                    await MessageQueue.update(
                      { status: 'error' },
                      { where: { id: message.id } }
                    );

                    const messageResponse = 'Error for sending message: '+ evolutionResponse.statusText;
                    console.error(messageResponse);
                    response = messageResponse;
                    responseStatus = 500;

                  } else {

                    await MessageQueue.update(
                      { status: 'done' },
                      { where: { id: message.id } }
                    );

                    const messageResponse = 'Message sending with success';
                    console.error(messageResponse);
                    response = messageResponse;
                    responseStatus = 200;
                  }
                  break;

                default:

                  const messageResponse = 'Provider configuration not found';
                  console.error(messageResponse);
                  response = messageResponse;
                  responseStatus = 500;
                  break;
              }
            }
          } catch (error) {
            await MessageQueue.update(
              { status: 'error' },
              { where: { id: message.id } }
            );
            console.error('Error for sending message: ', error);
          }

          ctx.body = { message: response };
          ctx.status = responseStatus;
          await next();
        },
      },
    });
  }

  async install() {}

  async afterEnable() {}

  async afterDisable() {}

  async remove() {}
}

export default PluginWhatsappServer;
