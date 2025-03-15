import { useEffect } from "react";
import { ANALYTICS_EVENTS } from "../../../constants";
import PAGES_ROUTES from "../../../routes/paths";
import { logAnalyticsEvent } from "../../../services/firebase-analytics";

const PrivacyPTBR = () => {
  useEffect(() => {
    logAnalyticsEvent(ANALYTICS_EVENTS.pageView, {
      page_path: PAGES_ROUTES.privacy,
      page_title: "Privacy PT",
    });
  }, []);

  return (
    <>
      <p>Atualizado no dia 03-10-2022</p>

      <p>
        {" "}
        Pagefy (“nós” ou “nosso”) compromete-se a proteger sua privacidade. Esta
        Política de Privacidade explica como suas informações pessoais são
        coletadas, utilizadas e divulgadas a terceiros pela Pagefy.
      </p>
      <p>
        Esta Política de Privacidade aplica-se ao nosso site e seus sub-domínios
        (coletivamente, nossos "serviços"), junto com nossa aplicação, Pagefy.
        Ao acessar ou utilizar nossos serviços, você concorda que leu, endenteu
        e concordou com nossa coleta, nosso armazenamento, uso e a divulgação
        dos dados pessoais como descrito nesta Política de Privacidade e nossos
        Termos de Serviço.
      </p>

      <h1>Definições e palavras-chave</h1>
      <p>
        Para ajudar a explicar as coisas da forma mais clara possível nesta
        Política de Privacidade toda vez que um desses termos for utilizado,
        serão estritamente como definido abaixo:
        <ul>
          <li>
            <strong>Cookie</strong>: pequena quantidade de dados gerados por um
            site e salvos pelo seu navegador. Usado para identificar seu
            navegador, fornecer análises, lembrar de informações a seu respeito,
            como sua preferência de idioma ou informações de login.
          </li>
          <li>
            <strong>Empresa</strong>: quando esta política menciona "Empresa",
            "nós" ou "nosso", ela refere-se sempre à pagefy.me, Limerick,
            Irlanda, que é responsável por seus dados de acordo com esta
            Política de Privacidade.
          </li>
          <li>
            <strong>País</strong>: onde a Pagefy ou os proprietários/fundadores
            da Pagefy estão sediados, neste caso a Irlanda.
          </li>
          <li>
            <strong>Cliente</strong>: refere-se à empresa, organização ou pessoa
            que se cadastra para usar o serviço Pagefy para gerenciar os
            relacionamentos com seus consumidores ou usuários do serviço.
          </li>
          <li>
            <strong>Dispositivo</strong>: qualquer dispositivo conectado à
            Internet, como smartphone, tablet, computador ou qualquer outro
            dispositivo que possa ser usado para visitar a Pagefy e usar seus
            serviços.
          </li>
          <li>
            <strong>Endereço IP</strong>: A cada dispositivo conectado à
            Internet é atribuído um número conhecido como endereço de protocolo
            de Internet (IP). Esses números são geralmente atribuídos em blocos
            geográficos. Um endereço IP pode frequentemente usado para
            identificar o local de onde um dispositivo é conectando-se à
            Internet.
          </li>
          <li>
            <strong>Equipe</strong>: diz respeito àqueles que trabalham na
            Pagefy ou possuem contrato com esta para prestar serviços em nome de
            uma das partes.
          </li>
          <li>
            <strong>Dados pessoais</strong>: qualquer dado que, diretamente ou
            indiretamente, ou em conexão com outros dados — incluindo números de
            identificação pessoais — que permite a identificação ou a
            identificabilidade de uma pessoa natural.
          </li>
          <li>
            <strong>Serviço</strong>: diz respeito ao serviço prestado pela
            Pagefy como descrito nos termos relativos (se disponível) e nesta
            plataforma.
          </li>
          <li>
            <strong>Serviços de terceiros</strong>: diz respeito a anunciantes,
            patrocinadores, parceiros de marketing/promoção e outros que
            fornecerem nosso conteúdo, cujo produtos ou serviços podem
            interessar você.
          </li>
          <li>
            <strong>Site</strong>: site da Pagefy, que pode ser acessado através
            dessa URL: <a href="https://www.pagefy.me">https://www.pagefy.me</a>
            .
          </li>
          <li>
            <strong>You</strong>: uma pessoa ou entidade que está cadastrada
            para utilizar os serviços da Pagefy.
          </li>
        </ul>
      </p>
      <h1>What Information Do We Collect?</h1>
      <p>
        We collect information from you when you visit our website, register on
        our site, place an order, subscribe to our newsletter, respond to a
        survey or fill out a form.
      </p>

      <ul>
        <li>Name / Username</li>
        <li>Email Addresses</li>
        <li>Debit/credit card numbers</li>
        <li>Password</li>
      </ul>
      <ul></ul>

      <h1>How Do We Use The Information We Collect?</h1>
      <p>
        Any of the information we collect from you may be used in one of the
        following ways:
        <ul>
          <li>
            To personalize your experience (your information helps us to better
            respond to your individual needs)
          </li>
          <li>
            To improve our website (we continually strive to improve our website
            offerings based on the information and feedback we receive from you)
          </li>
          <li>
            To improve customer service (your information helps us to more
            effectively respond to your customer service requests and support
            needs)
          </li>
          <li>To process transactions</li>
          <li>
            To administer a contest, promotion, survey or other site feature
          </li>
          <li>To send periodic emails</li>
        </ul>
      </p>

      <h1>When does Pagefy use end user information from third parties?</h1>
      <p>
        Pagefy will collect End User Data necessary to provide the Pagefy
        services to our customers.
      </p>
      <p>
        End users may voluntarily provide us with information they have made
        available on social media websites. If you provide us with any such
        information, we may collect publicly available information from the
        social media websites you have indicated. You can control how much of
        your information social media websites make public by visiting these
        websites and changing your privacy settings.
      </p>

      <h1>When does Pagefy use customer information from third parties?</h1>
      <p>
        We receive some information from the third parties when you contact us.
        For example, when you submit your email address to us to show interest
        in becoming a Pagefy customer, we receive information from a third party
        that provides automated fraud detection services to Pagefy. We also
        occasionally collect information that is made publicly available on
        social media websites. You can control how much of your information
        social media websites make public by visiting these websites and
        changing your privacy settings.
      </p>

      <h1>Do we share the information we collect with third parties?</h1>
      <p>
        We may share the information that we collect, both personal and
        non-personal, with third parties such as advertisers, contest sponsors,
        promotional and marketing partners, and others who provide our content
        or whose products or services we think may interest you. We may also
        share it with our current and future affiliated companies and business
        partners, and if we are involved in a merger, asset sale or other
        business reorganization, we may also share or transfer your personal and
        non-personal information to our successors-in-interest.
      </p>
      <p>
        We may engage trusted third party service providers to perform functions
        and provide services to us, such as hosting and maintaining our servers
        and the website, database storage and management, e-mail management,
        storage marketing, credit card processing, customer service and
        fulfilling orders for products and services you may purchase through the
        website. We will likely share your personal information, and possibly
        some non-personal information, with these third parties to enable them
        to perform these services for us and for you.
      </p>
      <p>
        We may share portions of our log file data, including IP addresses, for
        analytics purposes with third parties such as web analytics partners,
        application developers, and ad networks. If your IP address is shared,
        it may be used to estimate general location and other technographics
        such as connection speed, whether you have visited the website in a
        shared location, and type of the device used to visit the website. They
        may aggregate information about our advertising and what you see on the
        website and then provide auditing, research and reporting for us and our
        advertisers. We may also disclose personal and non-personal information
        about you to government or law enforcement officials or private parties
        as we, in our sole discretion, believe necessary or appropriate in order
        to respond to claims, legal process (including subpoenas), to protect
        our rights and interests or those of a third party, the safety of the
        public or any person, to prevent or stop any illegal, unethical, or
        legally actionable activity, or to otherwise comply with applicable
        court orders, laws, rules and regulations.
      </p>

      <h1>
        Where and when is information collected from customers and end users?
      </h1>
      <p>
        Pagefy will collect personal information that you submit to us. We may
        also receive personal information about you from third parties as
        described above.
      </p>

      <h1>How Do We Use Your Email Address?</h1>
      <p>
        By submitting your email address on this website, you agree to receive
        emails from us. You can cancel your participation in any of these email
        lists at any time by clicking on the opt-out link or other unsubscribe
        option that is included in the respective email. We only send emails to
        people who have authorized us to contact them, either directly, or
        through a third party. We do not send unsolicited commercial emails,
        because we hate spam as much as you do. By submitting your email
        address, you also agree to allow us to use your email address for
        customer audience targeting on sites like Facebook, where we display
        custom advertising to specific people who have opted-in to receive
        communications from us. Email addresses submitted only through the order
        processing page will be used for the sole purpose of sending you
        information and updates pertaining to your order. If, however, you have
        provided the same email to us through another method, we may use it for
        any of the purposes stated in this Policy. Note: If at any time you
        would like to unsubscribe from receiving future emails, we include
        detailed unsubscribe instructions at the bottom of each email.
      </p>

      <h1>How Long Do We Keep Your Information?</h1>
      <p>
        We keep your information only so long as we need it to provide Pagefy to
        you and fulfill the purposes described in this policy. This is also the
        case for anyone that we share your information with and who carries out
        services on our behalf. When we no longer need to use your information
        and there is no need for us to keep it to comply with our legal or
        regulatory obligations, we’ll either remove it from our systems or
        depersonalize it so that we can't identify you.
      </p>

      <h1>How Do We Protect Your Information?</h1>
      <p>
        We implement a variety of security measures to maintain the safety of
        your personal information when you place an order or enter, submit, or
        access your personal information. We offer the use of a secure server.
        All supplied sensitive/credit information is transmitted via Secure
        Socket Layer (SSL) technology and then encrypted into our Payment
        gateway providers database only to be accessible by those authorized
        with special access rights to such systems, and are required to keep the
        information confidential. After a transaction, your private information
        (credit cards, social security numbers, financials, etc.) is never kept
        on file. We cannot, however, ensure or warrant the absolute security of
        any information you transmit to Pagefy or guarantee that your
        information on the Service may not be accessed, disclosed, altered, or
        destroyed by a breach of any of our physical, technical, or managerial
        safeguards.
      </p>

      <h1>Could my information be transferred to other countries?</h1>
      <p>
        Pagefy is incorporated in Ireland. Information collected via our
        website, through direct interactions with you, or from use of our help
        services may be transferred from time to time to our offices or
        personnel, or to third parties, located throughout the world, and may be
        viewed and hosted anywhere in the world, including countries that may
        not have laws of general applicability regulating the use and transfer
        of such data. To the fullest extent allowed by applicable law, by using
        any of the above, you voluntarily consent to the trans-border transfer
        and hosting of such information.
      </p>

      <h1>Is the information collected through the Pagefy Service secure?</h1>
      <p>
        We take precautions to protect the security of your information. We have
        physical, electronic, and managerial procedures to help safeguard,
        prevent unauthorized access, maintain data security, and correctly use
        your information. However, neither people nor security systems are
        foolproof, including encryption systems. In addition, people can commit
        intentional crimes, make mistakes or fail to follow policies. Therefore,
        while we use reasonable efforts to protect your personal information, we
        cannot guarantee its absolute security. If applicable law imposes any
        non-disclaimable duty to protect your personal information, you agree
        that intentional misconduct will be the standards used to measure our
        compliance with that duty.
      </p>

      <h1>Can I update or correct my information?</h1>
      <p>
        The rights you have to request updates or corrections to the information
        Pagefy collects depend on your relationship with Pagefy. Personnel may
        update or correct their information as detailed in our internal company
        employment policies.
      </p>
      <p>
        Customers have the right to request the restriction of certain uses and
        disclosures of personally identifiable information as follows. You
        can contact us in order to (1) update or correct your personally
        identifiable information, (2) change your preferences with respect to
        communications and other information you receive from us, or (3) delete
        the personally identifiable information maintained about you on our
        systems (subject to the following paragraph), by cancelling your
        account. Such updates, corrections, changes and deletions will have no
        effect on other information that we maintain, or information that we
        have provided to third parties in accordance with this Privacy Policy
        prior to such update, correction, change or deletion. To protect your
        privacy and security, we may take reasonable steps (such as requesting a
        unique password) to verify your identity before granting you profile
        access or making corrections. You are responsible for maintaining the
        secrecy of your unique password and account information at all times.
      </p>
      <p>
        You should be aware that it is not technologically possible to remove
        each and every record of the information you have provided to us from
        our system. The need to back up our systems to protect information from
        inadvertent loss means that a copy of your information may exist in a
        non-erasable form that will be difficult or impossible for us to locate.
        Promptly after receiving your request, all personal information stored
        in databases we actively use, and other readily searchable media will be
        updated, corrected, changed or deleted, as appropriate, as soon as and
        to the extent reasonably and technically practicable.
      </p>
      <p>
        If you are an end user and wish to update, delete, or receive any
        information we have about you, you may do so by contacting the
        organization of which you are a customer.
      </p>
      <h1>Personnel</h1>
      <p>
        If you are a Pagefy worker or applicant, we collect information you
        voluntarily provide to us. We use the information collected for Human
        Resources purposes in order to administer benefits to workers and screen
        applicants.
      </p>
      <p>
        You may contact us in order to (1) update or correct your information,
        (2) change your preferences with respect to communications and other
        information you receive from us, or (3) receive a record of the
        information we have relating to you. Such updates, corrections, changes
        and deletions will have no effect on other information that we maintain,
        or information that we have provided to third parties in accordance with
        this Privacy Policy prior to such update, correction, change or
        deletion.
      </p>
      <h1>Sale of Business</h1>
      <p>
        We reserve the right to transfer information to a third party in the
        event of a sale, merger or other transfer of all or substantially all of
        the assets of Pagefy or any of its Corporate Affiliates (as defined
        herein), or that portion of Pagefy or any of its Corporate Affiliates to
        which the Service relates, or in the event that we discontinue our
        business or file a petition or have filed against us a petition in
        bankruptcy, reorganization or similar proceeding, provided that the
        third party agrees to adhere to the terms of this Privacy Policy.
      </p>

      <h1>Affiliates</h1>
      <p>
        We may disclose information (including personal information) about you
        to our Corporate Affiliates. For purposes of this Privacy Policy,
        "Corporate Affiliate" means any person or entity which directly or
        indirectly controls, is controlled by or is under common control with
        Pagefy, whether by ownership or otherwise. Any information relating to
        you that we provide to our Corporate Affiliates will be treated by those
        Corporate Affiliates in accordance with the terms of this Privacy
        Policy.
      </p>

      <h1>Governing Law</h1>
      <p>
        This Privacy Policy is governed by the laws of Ireland without regard to
        its conflict of laws provision. You consent to the exclusive
        jurisdiction of the courts in connection with any action or dispute
        arising between the parties under or in connection with this Privacy
        Policy except for those individuals who may have rights to make claims
        under Privacy Shield, or the Swiss-US framework.
      </p>
      <p>
        The laws of Ireland, excluding its conflicts of law rules, shall govern
        this Agreement and your use of the website. Your use of the website may
        also be subject to other local, state, national, or international laws.
      </p>
      <p>
        By using Pagefy or contacting us directly, you signify your acceptance
        of this Privacy Policy. If you do not agree to this Privacy Policy, you
        should not engage with our website, or use our services. Continued use
        of the website, direct engagement with us, or following the posting of
        changes to this Privacy Policy that do not significantly affect the use
        or disclosure of your personal information will mean that you accept
        those changes.
      </p>

      <h1>Your Consent</h1>
      <p>
        We've updated our Privacy Policy to provide you with complete
        transparency into what is being set when you visit our site and how it's
        being used. By using our website, registering an account, or making a
        purchase, you hereby consent to our Privacy Policy and agree to its
        terms.
      </p>

      <h1>Links to Other Websites</h1>
      <p>
        This Privacy Policy applies only to the Services. The Services may
        contain links to other websites not operated or controlled by Pagefy. We
        are not responsible for the content, accuracy or opinions expressed in
        such websites, and such websites are not investigated, monitored or
        checked for accuracy or completeness by us. Please remember that when
        you use a link to go from the Services to another website, our Privacy
        Policy is no longer in effect. Your browsing and interaction on any
        other website, including those that have a link on our platform, is
        subject to that website’s own rules and policies. Such third parties may
        use their own cookies or other methods to collect information about you.
      </p>
      <h1>Cookies</h1>
      <p>
        Pagefy uses "Cookies" to identify the areas of our website that you have
        visited. A Cookie is a small piece of data stored on your computer or
        mobile device by your web browser. We use Cookies to enhance the
        performance and functionality of our website but are non-essential to
        their use. However, without these cookies, certain functionality like
        videos may become unavailable or you would be required to enter your
        login details every time you visit the website as we would not be able
        to remember that you had logged in previously. Most web browsers can be
        set to disable the use of Cookies. However, if you disable Cookies, you
        may not be able to access functionality on our website correctly or at
        all. We never place Personally Identifiable Information in Cookies.
      </p>

      <h1>Blocking and disabling cookies and similar technologies</h1>
      <p>
        Wherever you're located you may also set your browser to block cookies
        and similar technologies, but this action may block our essential
        cookies and prevent our website from functioning properly, and you may
        not be able to fully utilize all of its features and services. You
        should also be aware that you may also lose some saved information (e.g.
        saved login details, site preferences) if you block cookies on your
        browser. Different browsers make different controls available to you.
        Disabling a cookie or category of cookie does not delete the cookie from
        your browser, you will need to do this yourself from within your
        browser, you should visit your browser's help menu for more information.
      </p>
      <h1>Remarketing Services</h1>
      <p>
        We use remarketing services. What Is Remarketing? In digital marketing,
        remarketing (or retargeting) is the practice of serving ads across the
        internet to people who have already visited your website. It allows your
        company to seem like they're “following” people around the internet by
        serving ads on the websites and platforms they use most.
      </p>
      <h1>Payment Details</h1>
      <p>
        In respect to any credit card or other payment processing details you
        have provided us, we commit that this confidential information will be
        stored in the most secure manner possible.
      </p>
      <h1>Kids' Privacy</h1>
      <p>
        We do not address anyone under the age of 13. We do not knowingly
        collect personally identifiable information from anyone under the age of
        13. If You are a parent or guardian and You are aware that Your child
        has provided Us with Personal Data, please contact Us. If We become
        aware that We have collected Personal Data from anyone under the age of
        13 without verification of parental consent, We take steps to remove
        that information from Our servers.
      </p>
      <h1>Changes To Our Privacy Policy</h1>
      <p>
        We may change our Service and policies, and we may need to make changes
        to this Privacy Policy so that they accurately reflect our Service and
        policies. Unless otherwise required by law, we will notify you (for
        example, through our Service) before we make changes to this Privacy
        Policy and give you an opportunity to review them before they go into
        effect. Then, if you continue to use the Service, you will be bound by
        the updated Privacy Policy. If you do not want to agree to this or any
        updated Privacy Policy, you can delete your account.
      </p>

      <h1>Third-Party Services</h1>
      <p>
        We may display, include or make available third-party content (including
        data, information, applications and other products services) or provide
        links to third-party websites or services ("Third- Party Services").
      </p>
      <p>
        You acknowledge and agree that Pagefy shall not be responsible for any
        Third-Party Services, including their accuracy, completeness,
        timeliness, validity, copyright compliance, legality, decency, quality
        or any other aspect thereof. Pagefy does not assume and shall not have
        any liability or responsibility to you or any other person or entity for
        any Third-Party Services.
      </p>
      <p>
        Third-Party Services and links thereto are provided solely as a
        convenience to you and you access and use them entirely at your own risk
        and subject to such third parties' terms and conditions.
      </p>
      <h1>Facebook Pixel</h1>
      <p>
        Facebook pixel is an analytics tool that allows you to measure the
        effectiveness of your advertising by understanding the actions people
        take on your website. You can use the pixel to: Make sure your ads are
        shown to the right people. Facebook pixel may collect information from
        your device when you use the service. Facebook pixel collects
        information that is held in accordance with its Privacy Policy
      </p>
      <h1>Tracking Technologies</h1>
      <ul>
        <li>
          Google Maps API
          <br />
          <br />
          <p>
            Google Maps API is a robust tool that can be used to create a
            custom map, a searchable map, check-in functions, display live data
            synching with location, plan routes, or create a mashup just to name
            a few.
          </p>
          <p>
            Google Maps API may collect information from You and from Your
            Device for security purposes.
          </p>
          <p>
            Google Maps API collects information that is held in accordance with
            its Privacy Policy
          </p>
        </li>
        <br />
        <li>
          Cookies
          <br />
          <br />
          <p>
            We use Cookies to enhance the performance and functionality of our
            $platform but are non-essential to their use. However, without these
            cookies, certain functionality like videos may become unavailable or
            you would be required to enter your login details every time you
            visit the $platform as we would not be able to remember that you had
            logged in previously.
          </p>
        </li>
        <br />
        <li>
          Local Storage
          <br />
          <br />
          <p>
            Local Storage sometimes known as DOM storage, provides web apps with
            methods and protocols for storing client-side data. Web storage
            supports persistent data storage, similar to cookies but with a
            greatly enhanced capacity and no information stored in the HTTP
            request header.
          </p>
        </li>
        <br />
      </ul>
      <h1>Information about General Data Protection Regulation (GDPR)</h1>
      <p>
        We may be collecting and using information from you if you are from the
        European Economic Area (EEA), and in this section of our Privacy Policy
        we are going to explain exactly how and why is this data collected, and
        how we maintain this data under protection from being replicated or used
        in the wrong way.
      </p>

      <h1>What is GDPR?</h1>
      <p>
        GDPR is an EU-wide privacy and data protection law that regulates how EU
        residents' data is protected by companies and enhances the control the
        EU residents have, over their personal data.
      </p>
      <p>
        The GDPR is relevant to any globally operating company and not just the
        EU-based businesses and EU residents. Our customers’ data is important
        irrespective of where they are located, which is why we have implemented
        GDPR controls as our baseline standard for all our operations worldwide.
      </p>

      <h1>What is personal data?</h1>
      <p>
        Any data that relates to an identifiable or identified individual. GDPR
        covers a broad spectrum of information that could be used on its own, or
        in combination with other pieces of information, to identify a person.
        Personal data extends beyond a person’s name or email address. Some
        examples include financial information, political opinions, genetic
        data, biometric data, IP addresses, physical address, sexual
        orientation, and ethnicity.
      </p>
      <p>The Data Protection Principles include requirements such as:</p>
      <ul>
        <li>
          Personal data collected must be processed in a fair, legal, and
          transparent way and should only be used in a way that a person would
          reasonably expect.
        </li>
        <li>
          Personal data should only be collected to fulfil a specific purpose
          and it should only be used for that purpose. Organizations must
          specify why they need the personal data when they collect it.
        </li>
        <li>
          Personal data should be held no longer than necessary to fulfil its
          purpose.
        </li>
        <li>
          People covered by the GDPR have the right to access their own personal
          data. They can also request a copy of their data, and that their data
          be updated, deleted, restricted, or moved to another organization.
        </li>
      </ul>

      <h1>Why is GDPR important?</h1>
      <p>
        GDPR adds some new requirements regarding how companies should protect
        individuals' personal data that they collect and process. It also raises
        the stakes for compliance by increasing enforcement and imposing greater
        fines for breach. Beyond these facts it's simply the right thing to do.
        At Pagefy we strongly believe that your data privacy is very important
        and we already have solid security and privacy practices in place that
        go beyond the requirements of this new regulation.
      </p>

      <h1>
        Individual Data Subject's Rights - Data Access, Portability and Deletion
      </h1>
      <p>
        We are committed to helping our customers meet the data subject rights
        requirements of GDPR. Pagefy processes or stores all personal data in
        fully vetted, DPA compliant vendors. We do store all conversation and
        personal data for up to 6 years unless your account is deleted. In which
        case, we dispose of all data in accordance with our Terms of Service and
        Privacy Policy, but we will not hold it longer than 60 days.
      </p>
      <p>
        We are aware that if you are working with EU customers, you need to be
        able to provide them with the ability to access, update, retrieve and
        remove personal data. We got you! We've been set up as self service from
        the start and have always given you access to your data and your
        customers data. Our customer support team is here for you to answer any
        questions you might have about working with the API.
      </p>
      <h1>California Residents</h1>
      <p>
        The California Consumer Privacy Act (CCPA) requires us to disclose
        categories of Personal Information we collect and how we use it, the
        categories of sources from whom we collect Personal Information, and the
        third parties with whom we share it, which we have explained above.
      </p>
      <p>
        We are also required to communicate information about rights California
        residents have under California law. You may exercise the following
        rights:
      </p>
      <ul>
        <li>
          Right to Know and Access. You may submit a verifiable request for
          information regarding the: (1) categories of Personal Information we
          collect, use, or share; (2) purposes for which categories of Personal
          Information are collected or used by us; (3) categories of sources
          from which we collect Personal Information; and (4) specific pieces of
          Personal Information we have collected about you.
        </li>
        <li>
          Right to Equal Service. We will not discriminate against you if you
          exercise your privacy rights.
        </li>
        <li>
          Right to Delete. You may submit a verifiable request to close your
          account and we will delete Personal Information about you that we have
          collected.
        </li>
        <li>
          Request that a business that sells a consumer's personal data, not
          sell the consumer's personal data.
        </li>
      </ul>
      <p>
        If you make a request, we have one month to respond to you. If you would
        like to exercise any of these rights, please contact us.
      </p>
      <p>We do not sell the Personal Information of our users.</p>
      <p>For more information about these rights, please contact us.</p>
      <h1>California Online Privacy Protection Act (CalOPPA)</h1>
      <p>
        CalOPPA requires us to disclose categories of Personal Information we
        collect and how we use it, the categories of sources from whom we
        collect Personal Information, and the third parties with whom we share
        it, which we have explained above.
      </p>
      <p>CalOPPA users have the following rights:</p>
      <ul>
        <li>
          Right to Know and Access. You may submit a verifiable request for
          information regarding the: (1) categories of Personal Information we
          collect, use, or share; (2) purposes for which categories of Personal
          Information are collected or used by us; (3) categories of sources
          from which we collect Personal Information; and (4) specific pieces of
          Personal Information we have collected about you.
        </li>
        <li>
          Right to Equal Service. We will not discriminate against you if you
          exercise your privacy rights.
        </li>
        <li>
          Right to Delete. You may submit a verifiable request to close your
          account and we will delete Personal Information about you that we have
          collected.
        </li>
        <li>
          Right to request that a business that sells a consumer's personal
          data, not sell the consumer's personal data.
        </li>
      </ul>
      <p>
        If you make a request, we have one month to respond to you. If you would
        like to exercise any of these rights, please contact us.
      </p>
      <p>We do not sell the Personal Information of our users.</p>
      <p>For more information about these rights, please contact us.</p>
      <h1>Contact Us</h1>
      <p>Don't hesitate to contact us if you have any questions.</p>
      <ul>
        <li>Via this Link: https://pagefy.me/public/faq</li>
      </ul>
    </>
  );
};

export default PrivacyPTBR;
