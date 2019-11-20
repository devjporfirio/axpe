import React from 'react';
import { useFormik } from 'formik';
import SVG from 'react-inlinesvg';
import BlockHighlighted from 'components/BlockHighlighted';
import FormElements from 'components/FormElements';
import Contact from 'components/Contact';
// import Api from 'services';

import IUser from 'assets/icons/user';

import { FormGroup } from 'components/FormElements/styles';
import {
  Container,
  Body,
  Form,
  Description,
  InfoLogin,
  Info,
  ButtonPhotos,
  CheckLinkTerms,
  ButtonSubmit
} from 'pages/RegisterProperty/styles';

function RegisterProperty() {
  const { handleSubmit, handleChange, setFieldValue, values } = useFormik({
    initialValues: {
      type: '',
      finality: '',
      category: '',
      zipcode: '',
      address: '',
      number: '',
      complement: '',
      neighborhood: '',
      areaUseful: '',
      numDorms: '',
      numSuites: '',
      numParking: '',
      isVacant: '',
      managerKey: '',
      valueRequested: '',
      rent: '',
      valueTax: '',
      valueCondo: '',
      positiveCharacteristics: '',
      negativeCharacteristics: '',
      images: [],
      terms: false
    },
    onSubmit: async values => {
      if (!values.terms) {
        alert('Aceite os termos :D');
        return;
      }
      // const resp = await Api.Contact.postContact(values);
      // if (resp.status === 'success') {
      //   alert(resp.status);
      // }
    }
  });

  return (
    <Container>
      <BlockHighlighted type="registerProperty" />
      <Body>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <h2>Qual o perfil do imóvel que deseja cadastrar?</h2>
            <FormElements
              name="type"
              type="checkbox"
              label="Residencial"
              size="big"
              checked={values.type === 'Residencial'}
              onChange={() => setFieldValue('type', 'Residencial')}
            />
            <FormElements
              name="type"
              type="checkbox"
              label="Comercial"
              size="big"
              checked={values.type === 'Comercial'}
              onChange={() => setFieldValue('type', 'Comercial')}
            />
            <FormElements
              name="type"
              type="checkbox"
              label="Praia"
              size="big"
              checked={values.type === 'Praia'}
              onChange={() => setFieldValue('type', 'Praia')}
            />
            <FormElements
              name="type"
              type="checkbox"
              label="Campo"
              size="big"
              checked={values.type === 'Campo'}
              onChange={() => setFieldValue('type', 'Campo')}
            />
            <FormElements
              name="type"
              type="checkbox"
              label="Internacional"
              size="big"
              checked={values.type === 'Internacional'}
              onChange={() => setFieldValue('type', 'Internacional')}
            />
          </FormGroup>

          <FormGroup>
            <h2>O que você deseja?</h2>
            <FormElements
              name="finality"
              type="checkbox"
              label="Vender"
              checked={values.finality === 'Vender'}
              onChange={() => setFieldValue('finality', 'Vender')}
            />
            <FormElements
              name="finality"
              type="checkbox"
              label="Alugar"
              checked={values.finality === 'Alugar'}
              onChange={() => setFieldValue('finality', 'Alugar')}
            />
          </FormGroup>

          <FormGroup>
            <h2>Qual o tipo do imóvel?</h2>
            <FormElements
              name="category"
              type="select"
              items={[
                { label: 'Selecione', value: '' },
                { label: 'Apartamento', value: 'apartamento' },
                { label: 'Casa', value: 'casa' },
                { label: 'Casa de Praia', value: 'casa-praia' },
                { label: 'Casa no Campo', value: 'casa-campo' }
              ]}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <h2>Qual o endereço?</h2>
            <FormElements
              type="cep"
              name="zipcode"
              label="CEP"
              placeholder="CEP"
              onChange={handleChange}
            />
            <FormElements
              name="address"
              label="Rua"
              placeholder="Rua"
              onChange={handleChange}
            />
            <FormElements
              name="number"
              label="Numero"
              placeholder="Numero"
              onChange={handleChange}
            />
            <FormElements
              name="complement"
              label="Complemento"
              placeholder="Complemento"
              onChange={handleChange}
            />
            <FormElements
              name="neighborhood"
              placeholder="Bairro"
              label="Bairro"
              type="select"
              items={[
                { label: 'Selecione', value: '' },
                { label: 'Centro', value: 'centro' },
                { label: 'Consolacao', value: 'consolacao' }
              ]}
              onChange={handleChange}
              message="* Por enquanto atuamos apenas nestes bairros"
            />
          </FormGroup>

          <FormGroup>
            <h2>Características do imóvel</h2>
            <FormElements
              name="areaUseful"
              label="Área útil (m²)"
              placeholder="Área útil (m²)"
              onChange={handleChange}
            />
            <FormElements
              name="numDorms"
              label="Dormitórios"
              placeholder="Dormitórios"
              onChange={handleChange}
            />
            <FormElements
              name="numSuites"
              label="Sendo suítes"
              placeholder="Sendo suítes"
              onChange={handleChange}
            />
            <FormElements
              name="numParking"
              label="Vagas de garagem"
              placeholder="Vagas de garagem"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <h2>O imóvel está vago?</h2>
            <FormElements
              name="isVacant"
              type="checkbox"
              label="Não"
              size="big"
              checked={values.isVacant === false}
              onChange={() => setFieldValue('isVacant', false)}
            />
            <FormElements
              name="isVacant"
              type="checkbox"
              label="Sim"
              size="big"
              checked={values.isVacant}
              onChange={() => setFieldValue('isVacant', true)}
            />
          </FormGroup>

          <FormGroup>
            <h2>Com quem ficam as chaves?</h2>
            <FormElements
              name="managerKey"
              label="Nome"
              placeholder="Nome"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <h2>Valores do imóvel</h2>
            <FormElements
              name="valueRequested"
              label="Qual o valor de venda que gostaria?"
              placeholder="R$"
              onChange={handleChange}
              message="(Incluindo 6% de comissão)"
            />

            <FormElements
              name="rent"
              label="Qual o valor de aluguel que gostaria?"
              placeholder="R$"
              onChange={handleChange}
            />
            <FormElements
              name="valueTax"
              label="Valor mensal de IPTU"
              placeholder="R$"
              onChange={handleChange}
            />
            <FormElements
              name="valueCondo"
              label="Qual o valor do condomínio"
              placeholder="R$"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <h2>O que o seu imóvel tem de melhor?</h2>
            <FormElements
              type="area"
              name="positiveCharacteristics"
              placeholder="Digite sua mensagem"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <h2>Há algum ponto problemático no imóvel?</h2>
            <FormElements
              type="area"
              name="negativeCharacteristics"
              placeholder="Digite sua mensagem"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <h2>FOTOS</h2>
            <Description>
              Por favor, envie algumas fotos que podem ser tiradas com o seu
              celular. Elas nos ajudarão a planejar a sessão de fotos que
              faremos no seu imóvel.
            </Description>
            <ButtonPhotos type="button" onClick={() => {}}>
              Selecionar fotos
            </ButtonPhotos>
          </FormGroup>

          <CheckLinkTerms
            type="checkboxLink"
            name="terms"
            label="Concordo com o termo de autorização de comercialização de imóveis"
            checked={values.terms}
            onChange={() => setFieldValue('terms', !values.terms)}
          />

          <InfoLogin>
            <SVG src={IUser} uniquifyIDs={true} />
            <Info>
              <p>
                Você está logado como <br />
                <strong>Rodrigo Alarcon</strong>
                <br />
                Tel.: (11) 3082 5693 | E-mail: ralarcon@futuebrand.com
                <br />
                Se não for você
              </p>
              <a href="/">clique aqui</a>
            </Info>
          </InfoLogin>

          <ButtonSubmit type="submit">Salvar</ButtonSubmit>
        </Form>
      </Body>
      <Contact />
    </Container>
  );
}

export default RegisterProperty;
