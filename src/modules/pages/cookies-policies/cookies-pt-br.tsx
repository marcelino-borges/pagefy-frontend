import { useEffect } from "react";
import { ANALYTICS_EVENTS } from "../../../constants";
import PAGES_ROUTES from "../../../routes/paths";
import { logAnalyticsEvent } from "../../../services/firebase-analytics";
import { useSelector } from "react-redux";
import { IApplicationState } from "../../../store";
import { toBase64 } from "../../../utils";

const CookiesPoliciesPTBR = () => {
  const userEmail = useSelector(
    (state: IApplicationState) => state.user.profile?.email
  );

  useEffect(() => {
    logAnalyticsEvent(ANALYTICS_EVENTS.pageView, {
      page_path: PAGES_ROUTES.cookies,
      page_title: "Cookies Policies PT",
      email: toBase64(userEmail),
    });
  }, [userEmail]);

  return (
    <>
      <p>Atualizado no dia 03/10/2022</p>

      <h1>Definições e termos chave</h1>
      <p>
        Para ajudar a explicar as coisas da forma mais clara possível nesta
        Política de Cookies, cada vez que qualquer um destes termos é
        mencionado, são estritamente definidos como:
      </p>
      <ul>
        <li>
          Cookie: pequena quantidade de dados gerada por um site e salva pelo
          seu navegador da web. É usado para identificar seu navegador, fornecer
          análises, lembrar informações sobre você, como sua preferência de
          idioma ou informações de login.
        </li>
        <li>
          Empresa: quando esta política menciona "Empresa", "nós", "nos" ou
          "nosso", refere-se à Pagefy, que é responsável por suas informações
          sob esta Política de Cookies.
        </li>
        <li>
          Dispositivo: qualquer dispositivo conectado à internet, como um
          telefone, tablet, computador ou qualquer outro dispositivo que pode
          ser usado para visitar a Pagefy e usar os serviços.
        </li>
        <li>
          Dados Pessoais: qualquer informação que, direta ou indiretamente, em
          conexão com outras informações, incluindo um número de identificação
          pessoal, permite a identificação ou identificabilidade de uma pessoa
          natural.
        </li>
        <li>
          Serviço: refere-se ao serviço fornecido pela Pagefy, conforme descrito
          nos termos relativos (se disponíveis) e nesta plataforma.
        </li>
        <li>
          Serviço de terceiros: refere-se a anunciantes, patrocinadores de
          concursos, parceiros promocionais e de marketing, e outros que
          fornecem nosso conteúdo ou cujos produtos ou serviços achamos que
          podem interessar você.
        </li>
        <li>Site: site, acessível via este URL: https://pagefy.me</li>
      </ul>

      <h1>Introdução</h1>
      <p>
        Esta Política de Cookies explica como a Pagefy e suas afiliadas
        (coletivamente "Pagefy", "nós", "nos" e "nossos") usam cookies e
        tecnologias semelhantes para reconhecê-lo quando você visita nosso site,
        incluindo, sem limitação, https://pagefy.me e quaisquer URLs
        relacionados, versões móveis ou localizadas e domínios/subdomínios
        relacionados ("Sites"). Ela explica o que são essas tecnologias e por
        que as usamos, bem como as opções de como controlá-las.
      </p>

      <h1>O que é um cookie?</h1>
      <p>
        Um cookie é um pequeno arquivo de texto armazenado em seu computador ou
        outro dispositivo conectado à internet para identificar seu navegador,
        fornecer análises, lembrar informações sobre você, como sua preferência
        de idioma ou informações de login. Eles são completamente seguros e não
        podem ser usados para executar programas ou enviar vírus para seu
        dispositivo.
      </p>

      <h1>Por que usamos cookies?</h1>
      <p>
        Usamos cookies de primeira e/ou terceira parte em nosso site para
        diversos fins, tais como:
      </p>
      <ul>
        <li>Facilitar a operação e funcionalidade de nosso site;</li>
        <li>Melhorar sua experiência em nosso site e facilitar a navegação;</li>
        <li>
          Permitir-nos criar uma experiência de usuário personalizada para você
          e entender o que é útil ou de interesse para você;
        </li>
        <li>
          Analisar como nosso site é usado e como podemos personalizá-lo da
          melhor forma;
        </li>
        <li>
          Identificar futuros prospectos e personalizar interações de marketing
          e vendas com eles;
        </li>
        <li>
          Facilitar a adaptação da publicidade online aos seus interesses.
        </li>
        <li>
          Você: uma pessoa ou entidade registrada na Pagefy para usar os
          Serviços.
        </li>
      </ul>

      <h1>Que tipo de cookies a Pagefy utiliza?</h1>
      <p>
        Os cookies podem ser cookies de sessão ou cookies persistentes. Um
        cookie de sessão expira automaticamente quando você fecha seu navegador.
        Um cookie persistente permanecerá até expirar ou até você excluir seus
        cookies. As datas de expiração são definidas nos próprios cookies;
        alguns podem expirar após alguns minutos, enquanto outros podem expirar
        após vários anos. Os cookies colocados pelo site que você está visitando
        são chamados de "cookies de primeira parte".
      </p>
      <p>
        Cookies Estritamente Necessários são necessários para o funcionamento de
        nosso site e não podem ser desativados em nossos sistemas. Eles são
        essenciais para permitir que você navegue pelo site e use suas
        funcionalidades. Se você remover ou desativar esses cookies, não podemos
        garantir que você poderá usar nosso site.
      </p>
      <p>Usamos os seguintes tipos de cookies em nosso site:</p>
      <h1>Cookies Essenciais</h1>
      <p>
        Utilizamos cookies essenciais para fazer nosso site funcionar. Esses
        cookies são estritamente necessários para habilitar funcionalidades
        essenciais, como segurança, gerenciamento de rede, suas preferências de
        cookies e acessibilidade. Sem eles, você não conseguiria usar serviços
        básicos. Você pode desativá-los alterando as configurações do seu
        navegador, mas isso pode afetar o funcionamento dos Sites.
      </p>
      <h1>Cookies de Desempenho e Funcionalidade</h1>
      <p>
        Esses cookies são usados para aprimorar o desempenho e a funcionalidade
        de nosso site, mas não são essenciais para seu uso. No entanto, sem
        esses cookies, determinadas funcionalidades, como vídeos, podem se
        tornar indisponíveis ou você precisará inserir seus detalhes de login
        toda vez que visitar o site, pois não seríamos capazes de lembrar que
        você fez login anteriormente.
      </p>
      <h1>Cookies de Marketing</h1>
      <p>
        Esses cookies de marketing baseados em contas nos permitem identificar
        futuros prospectos e personalizar interações de vendas e marketing com
        eles.
      </p>
      <h1>Cookies de Análise e Personalização</h1>
      <p>
        Esses cookies coletam informações que são usadas para nos ajudar a
        entender como nosso site está sendo usado ou quão eficazes são nossas
        campanhas de marketing, ou para nos ajudar a personalizar nosso site
        para você.
      </p>
      <p>
        Utilizamos cookies servidos pelo Google Analytics para coletar dados
        limitados diretamente dos navegadores de usuários finais, a fim de
        melhor compreender o uso de nosso site por você. Mais informações sobre
        como o Google coleta e usa esses dados podem ser encontradas em:
        https://www.google.com/policies/privacy/partners/. Você pode optar por
        não participar de todas as análises suportadas pelo Google em nossos
        Sites, visitando: https://tools.google.com/dlpage/gaoptout.
      </p>
      <h1>Cookies de Mídias Sociais</h1>
      <p>
        Esses cookies são usados quando você compartilha informações usando um
        botão de compartilhamento em redes sociais ou botão "curtir" em nosso
        Site, ou quando você vincula sua conta ou interage com nosso conteúdo em
        uma rede social, como Facebook, Twitter ou Google+. A rede social
        registrará que você fez isso. Esses cookies também podem incluir
        determinado código colocado na plataforma para ajudar a rastrear
        conversões de anúncios, otimizar anúncios com base em dados coletados,
        criar públicos-alvo direcionados para anúncios futuros e fazer
        remarketing para usuários qualificados que já tomaram determinadas ações
        na plataforma.
      </p>
      <h1>Cookies de Terceiros</h1>
      <p>
        Alguns cookies definidos em nosso site não são definidos em uma base de
        primeira parte pela Pagefy. Os Sites podem incorporar conteúdo de
        terceiros para servir anúncios. Esses provedores de serviços de
        terceiros podem definir seus próprios cookies em seu navegador da web.
        Os provedores de serviços de terceiros controlam muitos dos cookies de
        desempenho e funcionalidade, publicidade, marketing e análise descritos
        acima. Não controlamos o uso desses cookies de terceiros, pois os
        cookies só podem ser acessados pelo terceiro que os definiu
        originalmente.
      </p>
      <h1>Como você pode gerenciar cookies?</h1>
      <p>
        A maioria dos navegadores permite que você controle os cookies por meio
        de suas preferências de 'configurações'. No entanto, se você limitar a
        capacidade dos sites de definir cookies, poderá piorar sua experiência
        geral do usuário, pois ela não será mais personalizada para você. Isso
        também pode impedir que você salve configurações personalizadas, como
        informações de login. Os fabricantes de navegadores fornecem páginas de
        ajuda relacionadas à gestão de cookies em seus produtos.
      </p>
      <p>
        Os fabricantes de navegadores fornecem páginas de ajuda relacionadas à
        gestão de cookies em seus produtos. Consulte abaixo para obter mais
        informações.
      </p>
      <ul>
        <li>Google Chrome</li>
        <li>Internet Explorer</li>
        <li>Mozilla Firefox</li>
        <li>Safari (Desktop)</li>
        <li>Safari (Mobile)</li>
        <li>Navegador Android</li>
        <li>Opera</li>
        <li>Opera Mobile</li>
      </ul>

      <h1>Bloqueio e desativação de cookies e tecnologias semelhantes</h1>
      <p>
        Onde quer que você esteja localizado, também pode configurar seu
        navegador para bloquear cookies e tecnologias semelhantes, mas essa ação
        pode bloquear nossos cookies essenciais e impedir que nosso site
        funcione corretamente, e você pode não conseguir aproveitar totalmente
        todas as suas funcionalidades e serviços. Você também deve estar ciente
        de que pode perder algumas informações salvas (por exemplo, detalhes de
        login salvos, preferências do site) se bloquear cookies em seu
        navegador. Navegadores diferentes oferecem controles diferentes.
        Desativar um cookie ou categoria de cookie não exclui o cookie do seu
        navegador, você precisará fazer isso manualmente em seu navegador;
        consulte o menu de ajuda do seu navegador para obter mais informações.
      </p>

      <h1>Alterações em Nossa Política de Cookies</h1>
      <p>
        Podemos alterar nosso Serviço e políticas, e podemos precisar fazer
        alterações nesta Política de Cookies para refletir com precisão nosso
        Serviço e políticas. A menos que seja exigido por lei, notificaremos
        você (por exemplo, por meio de nosso Serviço) antes de fazer alterações
        nesta Política de Cookies e daremos a você a oportunidade de revisá-las
        antes que entrem em vigor. Em seguida, se você continuar a usar o
        Serviço, ficará vinculado à Política de Cookies atualizada. Se você não
        concordar com esta ou qualquer Política de Cookies atualizada, pode
        excluir sua conta.
      </p>

      <h1>Seu Consentimento</h1>
      <p>
        Ao usar nosso site, registrar uma conta ou fazer uma compra, você
        consente com nossa Política de Cookies e concorda com seus termos.
      </p>
      <h1>Entre em Contato Conosco</h1>
      <p>
        Não hesite em nos contatar se tiver alguma dúvida sobre nossa Política
        de Cookies.
      </p>
      <ul>
        <li>Via este Link: https://www.pagefy.me/faq</li>
      </ul>
    </>
  );
};

export default CookiesPoliciesPTBR;
