import React from 'react';

// helpers
import { Link } from 'helpers/routes';

// components
import LegalTextBox from 'components/LegalTextBox';

function TermsOfUse({ onDemand, active, onClose }) {
  return (
    <LegalTextBox
      onDemand={onDemand}
      active={active}
      onClose={onClose}
      title={
        <>
          <strong>Termos de</strong> Uso
        </>
      }
      content={
        <>
          <p>O acesso e utilização das mídias controladas pela Axpe Negócios Imobiliários Ltda. (“Axpe”), incluindo o website <a href="http://www.axpe.com.br" target="_blank">www.axpe.com.br</a> e todos os websites e aplicativos (“mídias digitais”), são regulados pelos presentes Termos e Condições de Uso (doravante “Termos”), disponível para acesso a qualquer tempo, por meio do website <a href="http://www.axpe.com.br" target="_blank">www.axpe.com.br</a> e das demais mídias controladas pela Axpe.</p>
          <p>A utilização das mídias controladas pela Axpe está sujeita às disposições da Política de Privacidade da Axpe, também disponível para acesso a qualquer tempo, por meio do endereço eletrônico <a href="http://www.axpe.com.br/politica-de-privacidade" target="_blank">Política de Privacidade</a>.</p>
          <p>Como Usuário, você poderá anunciar imóveis para venda ou locação, bem como consultar, alugar e adquirir imóveis anunciados em nossas mídias digitais.</p>
          
          <h2>Cadastro</h2>
          <p>O aceite aos presentes Termos e à Política de Privacidade incidente sobre os serviços disponibilizados nas mídias digitais se dará por meio do clique do Usuário no botão de aceite, quando de seu primeiro acesso às mídias digitais. Caso o Usuário não concorde com qualquer disposição constante destes documentos, deverá se abster de utilizar as mídias digitais.</p>
          <p>O acesso às mídias digitais pelo Usuário se dará por meio do website <a href="http://www.axpe.com.br" target="_blank">www.axpe.com.br</a>, mediante cadastro gratuito. Para realizar seu cadastro, o Usuário deverá fornecer apenas dados verdadeiros, capazes de permitir sua adequada identificação, como nome completo, telefone celular e e-mail. Se as informações solicitadas não forem fornecidas pelo Usuário, não será possível utilizar as mídias digitais.</p>
          <p>O Usuário poderá optar por realizar seu cadastro nas mídias digitais por meio de vinculação à sua conta em redes sociais, para fins de identificação. Ao optar por esta forma de cadastro, o Usuário: (i) consente que a Axpe colete suas informações de identificação disponíveis no perfil do Usuário da rede social indicada; (ii) reconhece que estará sujeito aos Termos de Uso da rede social selecionada.</p>
          <p>O Usuário é o único responsável pela manutenção da segurança de suas contas. Sugerimos a escolha de uma senha segura que seja alterada regularmente. A Axpe não entrará em contato com o Usuário solicitando informações para acesso à conta. Caso seja notada qualquer atividade suspeita, o Usuário deverá trocar sua senha imediatamente e poderá notificar a Axpe por e-mail (<a href="mailto:dpo@axpe.com.br" target="_blank">dpo@axpe.com.br</a>) para que as medidas cabíveis sejam adotadas.</p>
          <p>Caso haja qualquer alteração substancial nestes Termos, o Usuário será notificado no e-mail cadastrado.</p>
          
          <h2>Limitações e Uso Adequado das Mídias Digitais</h2>
          <p>Além de navegar livremente nas mídias digitais após a realização do cadastro, o Usuário poderá cadastrar imóveis, enviar mensagens para a Axpe através de nossos canais de comunicação, salvar imóveis favoritos e criar alertas para novos imóveis e outros produtos. Assim, ao navegar e utilizar todas as funcionalidades disponibilizadas nas mídias digitais, o Usuário deverá respeitar as condições estabelecidas nos presentes Termos.</p>
          <p>Por meio do aceite aos presentes Termos, o Usuário declara que: (i) é civilmente capaz à luz da legislação brasileira; (ii) está ciente de que não poderá inserir nas mídias digitais qualquer conteúdo ilícito ou que possua elementos violentos, pornográficos, degradantes ou, em geral, contrários à moral e aos bons costumes; e (iii) não incluirá nas mídias digitais qualquer informação incorreta ou inverídica, bem como qualquer conteúdo difamatório ou que viole direitos de terceiros.</p>
          <p>A fim de garantir a segurança e a confiabilidade das mídias digitais, o Usuário reconhece, ainda, que: (i) não poderá introduzir ou disseminar vírus ou outros elementos de programação nocivos, causando danos ao regular funcionamento do sistema ou a outros Usuários; (ii) não disponibilizará qualquer conteúdo difamatório, de conotação comercial ou que viole direitos de terceiros; e (iii) não inserirá qualquer hiperlink que direcione para conteúdo ilícito, mal intencionado ou que de qualquer modo viole a moral, os bons costumes ou os presentes Termos.</p>
          <p>Caso as mídias digitais permitam ao Usuário a inserção de qualquer material, vídeo, texto, hiperlink, comentário ou outro conteúdo, o Usuário se declara ciente de que deverá deter todos direitos do material que inserir, e, em qualquer hipótese, será o único responsável, inclusive perante terceiros, pelo uso que fizer das mídias digitais. O Usuário exime a Axpe e demais Usuários de qualquer responsabilidade por qualquer dano ou prejuízo decorrente de seu uso ou de informações incorretas, incompletas ou inverídicas inseridas nas mídias digitais.</p>
          <p>A Axpe não realizará qualquer filtragem prévia de comentários e conteúdos disponibilizados nas mídias digitais pelos Usuários. Entretanto, poderá, a qualquer momento e a seu exclusivo critério, sem que possua qualquer obrigação nesse sentido, excluir qualquer comentário ou conteúdo inserido nas mídias digitais, caso este potencialmente viole a legislação brasileira, a moral e os bons costumes ou as disposições dos presentes Termos. </p>
          <p>Para o envio de denúncias sobre conteúdo indevido, <Link href="/contato"><a>Clique aqui</a></Link>.</p>
          
          <h2>Propriedade Intelectual</h2>
          <p>Todos os textos, imagens, fotografias, marcas, logotipos, ícones, tecnologias, links e demais conteúdos audiovisuais ou sonoros, incluindo o software, desenhos gráficos e códigos-fonte disponibilizados nas mídias digitais diretamente pela Axpe, salvo se de outra forma indicada nas mídias digitais, são de propriedade exclusiva da Axpe e estão protegidos pelas leis e tratados internacionais, sendo vedada sua cópia, reprodução, ou qualquer outro tipo de utilização, ficando os infratores sujeitos às sanções civis e criminais correspondentes, nos termos das Leis 9.279/96, 9.609/98 e 9.610/98.</p>
          <p>O Usuário reconhece ser o único responsável pelos materiais inseridos por ele nas mídias digitais e se declara detentor dos direitos de divulgação ou distribuição do conteúdo. A Axpe não possui qualquer responsabilidade por conteúdo de terceiros disponibilizado nas mídias digitais e por qualquer dano ou prejuízo decorrentes desta disponibilização.</p>
          
          <h2>Isenções de Responsabilidade</h2>
          <p>A Axpe, seus representantes, agentes e funcionários não se responsabilizam: (i) por eventuais indisponibilidades, erros ou falhas das mídias digitais; (ii) por erros ou inconsistências na transmissão de dados ou pela qualidade ou disponibilidade do sinal de Internet; (iii) por eventuais falibilidades de armazenamento que ultrapassem qualquer controle razoável da Axpe ou que decorram de falhas na prestação de serviços contratados de terceiros; (iv) por qualquer produto ou serviço oferecido por terceiros, eventualmente disponibilizados ou divulgados nas mídias digitais; (v) por páginas de terceiros cujos links possam vir a ser disponibilizados nas mídias digitais; (vi) pela existência de vírus ou outros elementos de programação nocivos nas mídias digitais; e (vii) pelos danos decorrentes de informações inverídicas ou ofensivas inseridas pelos próprios Usuários nas mídias digitais, ocasião em que o próprio Usuário será o único responsável pelas suas interações, conforme legislação vigente.</p>
          
          <h2>Duração e Finalização do Acesso</h2>
          <p>As mídias digitais são disponibilizadas aos Usuários por prazo indeterminado, reservado à Axpe o direito de modificar, suspender ou encerrar o acesso às mídias digitais sem necessidade de aviso prévio, não cabendo qualquer indenização ao Usuário devido ao encerramento do acesso.</p>
          <p>A Axpe se reserva o direito de, embora não se obrigue a, monitorar a utilização das mídias digitais pelo Usuário, a fim de identificar eventuais Usuários que a utilizem de modo indevido, ilícito, inadequado ou contrário aos presentes Termos. Ao tomar ciência de qualquer violação aos presentes Termos ou a outros dispositivos legais do ordenamento jurídico brasileiro, a Axpe poderá realizar a exclusão imediata do Usuário das mídias digitais, sem prejuízo das penalidades cíveis e penais cabíveis.</p>
          
          <h2>Disposições Gerais</h2>
          <p>Qualquer cláusula ou condição deste instrumento que, por qualquer razão, venha a ser reputada nula ou ineficaz por qualquer juízo ou tribunal, não afetará a validade das demais disposições destes Termos, as quais permanecerão plenamente válidas e vinculantes, gerando efeitos em sua máxima extensão.</p>
          <p>A falha da Axpe em exigir o cumprimento de qualquer direito ou disposição constante dos presentes Termos não constituirá renúncia, podendo exercer regularmente o seu direito, dentro dos prazos legais.</p>
          <p>Estes Termos poderão ser alterados a qualquer momento, sem necessidade de aviso prévio ao Usuário, salvo se houver alteração substancial em seu conteúdo. Caso o Usuário não concorde com a atual versão dos Termos, deverá se abster de utilizar as mídias digitais imediatamente.</p>
          <p>O Usuário poderá entrar em contato com a Axpe a qualquer momento, por meio do e-mail <a href="mailto:dpo@axpe.com.br" target="_blank">dpo@axpe.com.br</a>. A Axpe poderá contatar o Usuário sobre questões concernentes ao uso das mídias digitais.</p>
          
          <h2>Legislação e Foro</h2>
          <p>A presente relação jurídica é regida exclusivamente pelas leis brasileiras, inclusive eventuais ações decorrentes de violação dos seus termos e condições.</p>
          <p>Fica eleito o Foro da Comarca da Capital do Estado de São Paulo para dirimir quaisquer dúvidas, questões ou litígios decorrentes dos presentes Termos, renunciando as partes a qualquer outro, por mais privilegiado que seja.</p>
          <p>Última atualização: 11/02/2021</p>
        </>
      }
    />
  );
}

export default TermsOfUse;