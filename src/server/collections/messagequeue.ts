import { defineCollection } from '@nocobase/database';

export default defineCollection({
  name: 'MessageQueue',
  fields: [
    { type: 'string', name: 'provider' },
    { type: 'string', name: 'number' },
    { type: 'string', name: 'content' },
    { type: 'string', name: 'status' },
    { type: 'string', name: 'status_message' }
  ],
},
);
