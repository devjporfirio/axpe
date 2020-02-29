import React from 'react';
import { useFormik } from 'formik';
// import * as Yup from 'yup';

// helpers
import { getParamsFromObject } from 'helpers/utils';

// components
import Button from 'components/Button';
import FormElements from 'components/FormElements';
import { FormGroup } from 'components/FormElements/styles';

// styles
import {
  Container,
  Wrapper,
  Form
} from './styles';

// const formSchema = Yup.object().shape({
//   name: Yup.string()
//     .min(2)
//     .required(),
//   lastName: Yup.string()
//     .min(2)
//     .required(),
//   email: Yup.string()
//     .email()
//     .required(),
//   phone: Yup.string().required(),
//   mobile: Yup.string().required(),
//   subject: Yup.string().required(),
//   message: Yup.string()
//     .min(2)
//     .required(),
//   terms: Yup.boolean()
//     .oneOf([ true ])
//     .required()
// });

function BuildingForm() {
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    isSubmitting,
    values,
    touched,
    errors
  } = useFormik({
    initialValues: {
      zf_referrer_name: '',
      zf_redirect_url: '',
      zc_gad: '',
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      utm_term: '',
      utm_content: '',
      Name_First: '',
      Name_Last: '',
      Dropdown: '',
      Dropdown1: '',
      Dropdown2: '',
      DecisionBox: '',
      PhoneNumber_countrycode: '',
      Email: '',
      SingleLine: '',
      MultiLine: '',
      MultipleChoice1: '',
      MultipleChoice: '',
      Number2: '',
      Number: '',
      Number1: '',
      Dropdown4: '',
      Currency: '',
      Dropdown5: '',
      Dropdown6: '',
      SingleLine1: '',
      MultiLine2: '',
      MultiLine1: '',
    },
    // validationSchema: formSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const params = getParamsFromObject(values);

      await fetch(
        `https://forms.zohopublic.com/axpeimoveis1/form/SITEVDRESRevendaSP/formperma/KNn-rBLBBrxdN7e3LS9gbDIJClRxjHZvIrN7IF0Nz6s/htmlRecords/submit`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data; charset=utf-8'
          },
          body: `${params.replace('?', '')}`
        }
      );
      resetForm({});
  }
  });

  return (
    <Container>
      <Wrapper>

        <Form onSubmit={handleSubmit}>

          <input type="hidden" name="zf_referrer_name" value={values.zf_referrer_name} />
          <input type="hidden" name="zf_redirect_url" value={values.zf_redirect_url} />
          <input type="hidden" name="zc_gad" value={values.zc_gad} />
          <input type="hidden" name="utm_source" value={values.utm_source} />
          <input type="hidden" name="utm_medium" value={values.utm_medium} />
          <input type="hidden" name="utm_campaign" value={values.utm_campaign} />
          <input type="hidden" name="utm_term" value={values.utm_term} />
          <input type="hidden" name="utm_content" value={values.utm_content} />

          <FormGroup>
            <h2>Seus dados de contato</h2>
            <FormElements
              name="Name_First"
              label="Nome"
              placeholder="Nome"
              onChange={handleChange}
              error={touched.Name_First && errors.Name_First}
              value={values.Name_First}
              onBlur={handleBlur}
            />
            <FormElements
              name="Name_Last"
              label="Último Nome"
              placeholder="Último Nome"
              onChange={handleChange}
              error={touched.Name_Last && errors.Name_Last}
              value={values.Name_Last}
              onBlur={handleBlur}
            />
          </FormGroup>

          <FormGroup>
            <h2>Tipo de lead - ocultar</h2>
            <FormElements
              name="Dropdown"
              type="select"
              items={[
                { label: 'Selecione o assunto', value: '' },
                { label: 'Interessado', value: 'Interessado' },
                { label: 'Proprietário', value: 'Proprietário' },
                { label: 'Interessado e proprietário', value: 'Interessado e proprietário' },
              ]}
              onChange={handleChange}
              error={touched.Dropdown && errors.Dropdown}
              value={values.Dropdown}
              onBlur={handleBlur}
            />
          </FormGroup>
          <FormGroup>
            <h2>Perfil da transação - ocultar</h2>
            <FormElements
              name="Dropdown1"
              type="select"
              items={[
                { label: 'Selecione o assunto', value: '' },
                { label: 'VD-AREA Inc', value: 'VD-AREA Inc' },
                { label: 'VD-COM Lançamento', value: 'VD-COM Lançamento' },
                { label: 'VD-COM Revenda', value: 'VD-COM Revenda' },
                { label: 'VD-RES Lançamento', value: 'VD-RES Lançamento' },
              ]}
              onChange={handleChange}
              error={touched.Dropdown1 && errors.Dropdown1}
              value={values.Dropdown1}
              onBlur={handleBlur}
            />
          </FormGroup>
          <FormGroup>
            <h2>Localidade - ocultar</h2>
            <FormElements
              name="Dropdown2"
              type="select"
              items={[
                { label: 'Selecione o assunto', value: '' },
                { label: 'VD-AREA Inc IN', value: 'VD-AREA Inc IN' },
                { label: 'VD-AREA Inc OL', value: 'VD-AREA Inc OL' },
                { label: 'VD-AREA Inc PC', value: 'VD-AREA Inc PC' },
                { label: 'VD-AREA Inc SP', value: 'VD-AREA Inc SP' },
                { label: 'VD-COM Lançamento IN', value: 'VD-COM Lançamento IN' },
                { label: 'VD-COM Lançamento OL', value: 'VD-COM Lançamento OL' },
                { label: 'VD-COM Lançamento SP', value: 'VD-COM Lançamento SP' },
                { label: 'VD-COM Revenda IN', value: 'VD-COM Revenda IN' },
                { label: 'VD-COM Revenda OL', value: 'VD-COM Revenda OL' },
                { label: 'VD-COM Revenda SP', value: 'VD-COM Revenda SP' },
                { label: 'VD-RES Lançamento IN', value: 'VD-RES Lançamento IN' },
                { label: 'VD-RES Lançamento OL', value: 'VD-RES Lançamento OL' },
                { label: 'VD-RES Lançamento PC', value: 'VD-RES Lançamento PC' },
                { label: 'VD-RES Lançamento SP', value: 'VD-RES Lançamento SP' },
                { label: 'VD-RES Revenda IN', value: 'VD-RES Revenda IN' },
                { label: 'VD-RES Revenda OL', value: 'VD-RES Revenda OL' },
                { label: 'VD-RES Revenda PC', value: 'VD-RES Revenda PC' },
                { label: 'VD-RES Revenda SP', value: 'VD-RES Revenda SP' },
              ]}
              onChange={handleChange}
              error={touched.Dropdown2 && errors.Dropdown2}
              value={values.Dropdown2}
              onBlur={handleBlur}
            />
          </FormGroup>
          <FormElements
            type="checkboxLink"
            name="DecisionBox"
            label={`Webform Zoho - ocultar`}
            onChange={handleChange}
            error={touched.DecisionBox && errors.DecisionBox}
            value={values.DecisionBox}
            checked={values.DecisionBox}
            onBlur={handleBlur}
          />
          <FormElements
            type="phone"
            name="PhoneNumber_countrycode"
            label="Celular"
            placeholder="Celular"
            onChange={handleChange}
            error={touched.PhoneNumber_countrycode && errors.PhoneNumber_countrycode}
            value={values.PhoneNumber_countrycode}
            onBlur={handleBlur}
          />
          <FormElements
            type="email"
            name="Email"
            label="E-mail"
            placeholder="E-mail"
            onChange={handleChange}
            error={touched.Email && errors.Email}
            value={values.Email}
            onBlur={handleBlur}
          />
          <FormElements
            name="SingleLine"
            label="Referência do imóvel"
            placeholder="Referência do imóvel"
            onChange={handleChange}
            error={touched.SingleLine && errors.SingleLine}
            value={values.SingleLine}
            onBlur={handleBlur}
          />
          <FormGroup>
            <h2>Tipo de imóvel</h2>
            <FormElements
              name="MultipleChoice1"
              type="select"
              multiple={true}
              items={[
                { label: 'Selecione o assunto', value: '' },
                { label: 'Apartamento', value: 'Apartamento' },
                { label: 'Casa', value: 'Casa' },
                { label: 'Casa de vila', value: 'Casa de vila' },
                { label: 'Casa em condomínio', value: 'Casa em condomínio' },
                { label: 'Cobertura', value: 'Cobertura' },
                { label: 'Conjunto', value: 'Conjunto' },
                { label: 'Galpão', value: 'Galpão' },
                { label: 'Laje', value: 'Laje' },
                { label: 'Loja', value: 'Loja' },
                { label: 'Prédio Monousuário', value: 'Prédio Monousuário' },
                { label: 'Terreno', value: 'Terreno' },
                { label: 'Vinhedo', value: 'Vinhedo' },
              ]}
              onChange={handleChange}
              error={touched.MultipleChoice1 && errors.MultipleChoice1}
              value={values.MultipleChoice1}
              onBlur={handleBlur}
            />
          </FormGroup>
          <FormGroup>
            <h2>Bairros</h2>
            <FormElements
              name="MultipleChoice"
              type="select"
              multiple={true}
              items={[
                { label: 'Selecione o assunto', value: '' },
                { label: 'Aclimação', value: 'Aclimação' },
                { label: 'Alto da Lapa', value: 'Alto da Lapa' },
                { label: 'Alto de Pinheiros', value: 'Alto de Pinheiros' },
                { label: 'Bela Vista', value: 'Bela Vista' },
                { label: 'Brooklin Novo', value: 'Brooklin Novo' },
                { label: 'Campo Belo', value: 'Campo Belo' },
                { label: 'Centro', value: 'Centro' },
                { label: 'Cidade Jardim', value: 'Cidade Jardim' },
                { label: 'Consolação', value: 'Consolação' },
                { label: 'Higienópolis', value: 'Higienópolis' },
                { label: 'Ibirapuera', value: 'Ibirapuera' },
                { label: 'Itaim Bibi', value: 'Itaim Bibi' },
                { label: 'Jardim América', value: 'Jardim América' },
                { label: 'Jardim Europa', value: 'Jardim Europa' },
                { label: 'Jardim Guedala', value: 'Jardim Guedala' },
                { label: 'Jardim Paulista', value: 'Jardim Paulista' },
                { label: 'Jardim Paulistano', value: 'Jardim Paulistano' },
                { label: 'Jardins & C. César', value: 'Jardins & C. César' },
                { label: 'Moema', value: 'Moema' },
                { label: 'Pacaembu', value: 'Pacaembu' },
                { label: 'Paraíso', value: 'Paraíso' },
                { label: 'Perdizes', value: 'Perdizes' },
                { label: 'Pinheiros', value: 'Pinheiros' },
                { label: 'Pompeia', value: 'Pompeia' },
                { label: 'Real Parque', value: 'Real Parque' },
                { label: 'Santa Cecília', value: 'Santa Cecília' },
                { label: 'Sumaré', value: 'Sumaré' },
                { label: 'Vila Beatriz', value: 'Vila Beatriz' },
                { label: 'Vila Madalena', value: 'Vila Madalena' },
                { label: 'Vila Mariana', value: 'Vila Mariana' },
                { label: 'Vila Nova Conceição', value: 'Vila Nova Conceição' },
                { label: 'Vila Olímpia', value: 'Vila Olímpia' },
              ]}
              onChange={handleChange}
              error={touched.MultipleChoice && errors.MultipleChoice}
              value={values.MultipleChoice}
              onBlur={handleBlur}
            />
          </FormGroup>
          <FormElements
            name="Number2"
            label="Área útil"
            placeholder="Área útil"
            onChange={handleChange}
            error={touched.Number2 && errors.Number2}
            value={values.Number2}
            onBlur={handleBlur}
          />
          <FormElements
            name="Number"
            label="Quartos"
            placeholder="Quartos"
            onChange={handleChange}
            error={touched.Number && errors.Number}
            value={values.Number}
            onBlur={handleBlur}
          />
          <FormElements
            name="Number1"
            label="Vagas"
            placeholder="Vagas"
            onChange={handleChange}
            error={touched.Number1 && errors.Number1}
            value={values.Number1}
            onBlur={handleBlur}
          />
          <FormGroup>
            <h2>Tipo de imóvel</h2>
            <FormElements
              name="MultipleChoice1"
              type="select"
              multiple={true}
              items={[
                { label: 'Selecione o assunto', value: '' },
                { label: 'De preferência, sem lazer', value: 'De preferência, sem lazer' },
                { label: 'O básico: piscina e academia', value: 'O básico: piscina e academia' },
                { label: 'Completo: tudo que podem me oferecer', value: 'Completo: tudo que podem me oferecer' },
              ]}
              onChange={handleChange}
              error={touched.MultipleChoice1 && errors.MultipleChoice1}
              value={values.MultipleChoice1}
              onBlur={handleBlur}
            />
          </FormGroup>
          <FormElements
            name="Currency"
            label="Orçamento"
            placeholder="Orçamento"
            onChange={handleChange}
            error={touched.Currency && errors.Currency}
            value={values.Currency}
            onBlur={handleBlur}
          />
          <FormGroup>
            <h2>Lead source</h2>
            <FormElements
              name="Dropdown5"
              type="select"
              items={[
                { label: 'Selecione o assunto', value: '' },
                { label: 'Google ou outros', value: 'Google ou outros' },
                { label: 'Facebook', value: 'Facebook' },
                { label: 'E-mail Publicitário', value: 'E-mail Publicitário' },
                { label: 'Instagram', value: 'Instagram' },
                { label: 'Indicação de amigos e família', value: 'Indicação de amigos e família' },
                { label: 'Placa na rua', value: 'Placa na rua' },
                { label: 'Anúncio na imprensa', value: 'Anúncio na imprensa' },
                { label: 'Matérias em jornais e revistas', value: 'Matérias em jornais e revistas' },
                { label: 'Outros sites e blogs', value: 'Outros sites e blogs' },
                { label: 'Eventos da Axpe', value: 'Eventos da Axpe' },
                { label: 'Linkedin', value: 'Linkedin' },
                { label: 'Christie\'s', value: 'Christie\'s' },
                { label: 'Viva Real', value: 'Viva Real' },
                { label: 'Zap Imóveis', value: 'Zap Imóveis' },
              ]}
              onChange={handleChange}
              error={touched.Dropdown5 && errors.Dropdown5}
              value={values.Dropdown5}
              onBlur={handleBlur}
            />
          </FormGroup>
          <FormGroup>
            <h2>Você Já foi atendido por alguém da Axpe?</h2>
            <FormElements
              name="Dropdown6"
              type="select"
              items={[
                { label: 'Selecione o assunto', value: '' },
                { label: 'Sim', value: 'Sim' },
                { label: 'Não', value: 'Não' },
                { label: 'Third Choice', value: 'Third Choice' },
              ]}
              onChange={handleChange}
              error={touched.Dropdown6 && errors.Dropdown6}
              value={values.Dropdown6}
              onBlur={handleBlur}
            />
          </FormGroup>
          <FormGroup>
            <h2>Por quem?</h2>
            <FormElements
              name="SingleLine1"
              placeholder="Por quem?"
              onChange={handleChange}
              error={touched.SingleLine1 && errors.SingleLine1}
              value={values.SingleLine1}
              onBlur={handleBlur}
            />
          </FormGroup>
          <FormGroup>
            <h2>Não pode faltar</h2>
            <FormElements
              type="area"
              name="MultiLine2"
              placeholder="Não pode faltar"
              onChange={handleChange}
              error={touched.MultiLine2 && errors.MultiLine2}
              value={values.MultiLine2}
              onBlur={handleBlur}
            />
          </FormGroup>
          <FormGroup>
            <h2>Não gosta ou não deseja</h2>
            <FormElements
              type="area"
              name="MultiLine1"
              placeholder="Não gosta ou não deseja"
              onChange={handleChange}
              error={touched.MultiLine1 && errors.MultiLine1}
              value={values.MultiLine1}
              onBlur={handleBlur}
            />
          </FormGroup>

          <FormGroup>
            <h2>Sua Mensagem</h2>
            <FormElements
              type="area"
              name="MultiLine"
              placeholder="Digite sua mensagem"
              onChange={handleChange}
              error={touched.MultiLine && errors.MultiLine}
              value={values.MultiLine}
              onBlur={handleBlur}
            />
          </FormGroup>
          <Button disabled={isSubmitting} type="submit">
            Enviar
          </Button>
        </Form>

      </Wrapper>
    </Container>
  )
}

export default BuildingForm
