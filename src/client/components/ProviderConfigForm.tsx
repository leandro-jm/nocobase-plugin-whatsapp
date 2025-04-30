import { useRequest, useApp, useAPIClient } from "@nocobase/client";
import React, { useState, useEffect } from "react";
import { Alert, Button, Form, Input, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import message from "antd/lib/message";

/**
 * Show form with fields for provider configuration (Meta, Twilio and Evolution API).
 * @returns
 */
const ProviderConfigForm: React.FC = () => {

  const { i18n } = useApp();
  const { t } = useTranslation('@leandrojm/plugin-whatsapp');

  const whatsapp_instructions = (<><p><b>{t('whatsapp_instruction_title')}</b></p>
    <ul>
      <li>{t('whatsapp_instruction_description1')}</li>
      <li>{t('whatsapp_instruction_description2')}</li>
    </ul>
  </>);

  const twilio_instructions = (<><p><b>{t('twilio_instruction_title')}</b></p>
    <ul>
      <li>{t('twilio_instruction_description1')}</li>
      <li>{t('twilio_instruction_description2')}</li>
    </ul>
  </>);

  const evolution_instructions = (<><p><b>{t('evolution_instruction_title')}</b></p>
    <ul>
      <li>{t('evolution_instruction_description1')}</li>
      <li>{t('evolution_instruction_description2')}</li>
    </ul>
  </>);

  const [apiSelected, setApiSelected] = useState(null);
  const [id, setId] = useState(null);
  const [whatsappApiKey, setWhatsappApiKey] = useState<string>();
  const [whatsappUrl, setWhatsappUrl] = useState<string>();
  const [whatsappCellPhoneFrom, setCellPhoneFrom] = useState<string>();
  const [twilioAccountSid, setTwilioAccountSid] = useState<string>();
  const [twilioToken, setTwilioToken] = useState<string>();
  const [twilioUrl, setTwilioUrl] = useState<string>();
  const [evolutionUrl, setEvolutionUrl] = useState<string>();
  const [evolutionApiKey, setEvolutionApiKey] = useState<string>();
  const { Option } = Select;

  interface ProvideConfig {
    id: number;
    type_api: string;
    whatsapp_api_key: string;
    whatsapp_url: string;
    whatsapp_celular_from: string;
    twilio_account_sid: string;
    twilio_token: string;
    twilio_url: string;
    evolution_api_key: string;
    evolution_url: string;
  }

  const apiConfig = useAPIClient();
  const resultConfig = useRequest<ProvideConfig>(
    () =>
      apiConfig
        .request({
          url: '/ProvideConfig:get',
          method: 'GET'
        })
        .then((res) => res?.data?.data),
    {
      manual: true,
    },
  );

  const apiInsert = useAPIClient();
  const resultInsert = useRequest<any>(
    () =>
      apiInsert
        .request({
          url: `/ProvideConfig:create`,
          method: 'POST',
          data: {
          },
        })
        .then((res) => { return res?.data }),
    {
      manual: true,
    },
  );

  useEffect(() => {

    const fetchData = async () => {

      const result = await resultConfig.runAsync();
      if (result != null) {
        setId(result.id);
        setApiSelected(result.type_api);
        setWhatsappApiKey(result.whatsapp_api_key);
        setWhatsappUrl(result.whatsapp_url);
        setCellPhoneFrom(result.whatsapp_celular_from);
        setTwilioAccountSid(result.twilio_account_sid);
        setTwilioToken(result.twilio_token);
        setTwilioUrl(result.twilio_url);
        setEvolutionApiKey(result.evolution_api_key);
        setEvolutionUrl(result.evolution_url);
      } else {

        //Insert new register only if not exists
        const result = await resultInsert.runAsync();
        setId(result.id);
      }
    };
    fetchData();

  }, []);

  const apiUpdate = useAPIClient();
  const resultUpdate = useRequest<any>(
    () =>
      apiUpdate
        .request({
          url: `/ProvideConfig:update?filterByTk=${id}`,
          method: 'POST',
          data: {
            type_api: apiSelected,
            whatsapp_api_key: (apiSelected == 'meta' ? whatsappApiKey : ''),
            whatsapp_url: (apiSelected == 'meta' ? whatsappUrl : ''),
            whatsapp_celular_from: (apiSelected == 'meta' ? whatsappCellPhoneFrom : ''),
            twilio_account_sid: (apiSelected == 'twilio' ? twilioAccountSid : ''),
            twilio_token: (apiSelected == 'twilio' ? twilioToken : ''),
            twilio_url: (apiSelected == 'twilio' ? twilioUrl : ''),
            evolution_api_key: (apiSelected == 'evolution' ? evolutionApiKey : ''),
            evolution_url: (apiSelected == 'evolution' ? evolutionUrl : ''),
          },
        })
        .then((res) => { return res?.data }),
    {
      manual: true,
    },
  );

  const SendUpdateButton: React.FC = () => {

    const onClickSubmit = async () => {
      try {
        const result = await resultUpdate.runAsync();
        message.success(t('send_save_configuration'));

      } catch (error) {
        console.error('Erro to sending configuration: ', error);
      }
    };
    return <Button type="primary" onClick={onClickSubmit}>{t('send_button_configuration')}</Button>
  }

  return <>

    <br></br>
    <Form layout="vertical">
      <Form.Item label="Provider" required style={{ fontWeight: 'bold' }}>
        <Select
          placeholder="API..."
          onChange={(value) => setApiSelected(value)}
          value={apiSelected}
        >
          <Option value="meta">Meta</Option>
          <Option value="twilio">Twilio</Option>
          <Option value="evolution">Evolution</Option>
        </Select>
      </Form.Item>

      {apiSelected === "meta" && (
        <>
          <p><Alert message={whatsapp_instructions} type="info" /></p>
          <Form.Item label={t('field_api_key_title')} style={{ fontWeight: 'bold' }}>
            <Input placeholder="xq1w2e3r4t5y6u8o..." value={whatsappApiKey} onChange={(e) => setWhatsappApiKey(e.target.value)} />
          </Form.Item>
          <Form.Item label={t('field_api_url_title')} style={{ fontWeight: 'bold' }}>
            <Input placeholder="https://domain.com...." value={whatsappUrl} onChange={(e) => setWhatsappUrl(e.target.value)} />
          </Form.Item>
          <Form.Item label={t('field_phone_from_title')} style={{ fontWeight: 'bold' }}>
            <Input placeholder="554412346789" value={whatsappCellPhoneFrom} onChange={(e) => setCellPhoneFrom(e.target.value)} />
          </Form.Item>
        </>
      )}

      {apiSelected === "twilio" && (
        <>
          <p><Alert message={twilio_instructions} type="info" /></p>
          <Form.Item label={t('field_account_sid_title')} style={{ fontWeight: 'bold' }}>
            <Input placeholder="12356890..." value={twilioAccountSid} onChange={(e) => setTwilioAccountSid(e.target.value)} />
          </Form.Item>
          <Form.Item label={t('field_token_title')} style={{ fontWeight: 'bold' }}>
            <Input placeholder="q1q1s2e32r3f3r3..." value={twilioToken} onChange={(e) => setTwilioToken(e.target.value)} />
          </Form.Item>
          <Form.Item label={t('field_url_title')} style={{ fontWeight: 'bold' }}>
            <Input placeholder="https://domain.com...." value={twilioUrl} onChange={(e) => setTwilioUrl(e.target.value)} />
          </Form.Item>
        </>
      )}

      {apiSelected === "evolution" && (
        <>
          <p><Alert message={evolution_instructions} type="info" /></p>
          <Form.Item label={t('field_evolution_api_key_title')} style={{ fontWeight: 'bold' }}>
            <Input placeholder="xq1w2e3r4t5y6u8o..." value={evolutionApiKey} onChange={(e) => setEvolutionApiKey(e.target.value)} />
          </Form.Item>
          <Form.Item label={t('field_evolution_api_url_title')} style={{ fontWeight: 'bold' }}>
            <Input placeholder="https://domain.com...." value={evolutionUrl} onChange={(e) => setEvolutionUrl(e.target.value)} />
          </Form.Item>
        </>
      )}

      <Form.Item>
        <SendUpdateButton />
      </Form.Item>
    </Form></>;
};

export default ProviderConfigForm;
