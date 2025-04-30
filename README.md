
# What is Plugin WhatsApp

Send message the notification using WhatsApp providers inside the Nocobase plataform. Allow used with workflow or send other types messages using endpoint.

### Architecture

![](https://miro.medium.com/v2/resize:fit:1400/1*lQRMJvxzOGh711wDABKV-g.png)

### Provider

Below show the providers compatible with plugin.

|Provider| Status  |
|--|--|
|Meta  | In soon |
|Twilio  | In development |
|Evolution API  | Done |

### Collections

Collections are essential because they define the structure of the data stored in tables within your database. For this example, I created two collections, as described below.
 
 **ProviderConfig**
| Name                    | Description                                                                 |
|-------------------------|-----------------------------------------------------------------------------|
| type_api                | Defines which WhatsApp API provider is being used (e.g., Twilio, Meta, Evolution). |
| whatsapp_api_key        | API key used to authenticate with the WhatsApp provider.                    |
| whatsapp_url            | The endpoint URL for sending WhatsApp messages via the selected API.       |
| whatsapp_celular_from   | The phone number or sender ID used to send WhatsApp messages.              |
| twilio_account_sid      | Twilio Account SID used to identify your Twilio project.                   |
| twilio_token            | Authentication token used for accessing the Twilio API.                    |
| twilio_url              | Twilio API endpoint for sending WhatsApp messages.                         |
| evolution_api_key       | API key used to authenticate requests with the Evolution messaging service.|
| evolution_url           | The Evolution API endpoint for sending WhatsApp messages.                  |

        
**MessageQueue**
| Name            | Description                                                                       |
|-----------------|-----------------------------------------------------------------------------------|
| provider         | Identifies the message provider being used (e.g., Twilio, Meta, Evolution).      |
| number           | The recipient's phone number in international format.                            |
| content          | The message text to be sent to the recipient.                                    |
| status           | Current status of the message (e.g., pending, sent, failed).                     |
| status_message   | Additional information or error message related to the message status.           |


### Usage

To use the plugin, you can download the package into the `XXX` folder and install it in your NocoBase instance by navigating to **Plugin > Add & Update > Upload**. Select the package and click **Submit**. After that, simply activate the plugin and configure it according to your chosen provider.

### TO-DO

-   Add encryption to the provider settings;
-   Add Meta provider;
-   Add a message sending queue;
-   Add a node to the Workflow module to support sending messages through a workflow.


### Author

-  Leandro Martins 
	-	LinkedIn: https://www.linkedin.com/in/leandrojmartins/
	-	Blog PT: https://medium.com/@leandro.jm
	-	Blog EN: https://leandromartins.hashnode.dev/

## What is NocoBase

NocoBase is a scalability-first, open-source no-code development platform.  
Instead of investing years of time and millions of dollars in research and development, deploy NocoBase in a few minutes and you'll have a private, controllable, and extremely scalable no-code development platform!

Homepage:  
https://www.nocobase.com/

Online Demo:  
https://demo.nocobase.com/new

Documents:  
https://docs.nocobase.com/

Commericial license & plugins:  
https://www.nocobase.com/en/commercial

License agreement:   
https://www.nocobase.com/en/agreement


## Contact Us:  
hello@nocobase.com
