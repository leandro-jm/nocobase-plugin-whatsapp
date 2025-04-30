import { defineCollection } from '@nocobase/database';

export default defineCollection({
  name: 'ProvideConfig',
  fields: [
    { type: 'string', name: 'type_api' },
    { type: 'string', name: 'whatsapp_api_key' },
    { type: 'string', name: 'whatsapp_url' },
    { type: 'string', name: 'whatsapp_celular_from' },
    { type: 'string', name: 'twilio_account_sid' },
    { type: 'string', name: 'twilio_token' },
    { type: 'string', name: 'twilio_url' },
    { type: 'string', name: 'evolution_api_key' },
    { type: 'string', name: 'evolution_url' },
  ],
},
);
