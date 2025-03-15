import { useEffect } from "react";
import { ANALYTICS_EVENTS } from "../../../constants";
import PAGES_ROUTES from "../../../routes/paths";
import { logAnalyticsEvent } from "../../../services/firebase-analytics";
import { useSelector } from "react-redux";
import { IApplicationState } from "../../../store";
import { toBase64 } from "../../../utils";

const TermsOfUseEN = () => {
  const userProfile = useSelector(
    (state: IApplicationState) => state.user.profile
  );

  useEffect(() => {
    logAnalyticsEvent(ANALYTICS_EVENTS.pageView, {
      page_path: PAGES_ROUTES.terms,
      page_title: "Termos EN",
      email: toBase64(userProfile?.email),
    });
  }, [userProfile?.email]);

  return (
    <>
      <p>Updated at 2022-10-03</p>

      <h1>General Terms</h1>
      <p>
        By accessing and placing an order with Pagefy, you confirm that you are
        in agreement with and bound by the terms of service contained in the
        Terms & Conditions outlined below. These terms apply to the entire
        website and any email or other type of communication between you and
        Pagefy.
      </p>
      <p>
        Under no circumstances shall Pagefy team be liable for any direct,
        indirect, special, incidental or consequential damages, including, but
        not limited to, loss of data or profit, arising out of the use, or the
        inability to use, the materials on this site, even if Pagefy team or an
        authorized representative has been advised of the possibility of such
        damages. If your use of materials from this site results in the need for
        servicing, repair or correction of equipment or data, you assume any
        costs thereof.
      </p>
      <p>
        Pagefy will not be responsible for any outcome that may occur during the
        course of usage of our resources. We reserve the rights to change prices
        and revise the resources usage policy in any moment.
      </p>

      <h1>License</h1>
      <p>
        Pagefy grants you a revocable, non-exclusive, non-transferable, limited
        license to download, install and use the website strictly in accordance
        with the terms of this Agreement.
      </p>
      <p>
        These Terms & Conditions are a contract between you and Pagefy (referred
        to in these Terms & Conditions as "Pagefy", "us", "we" or "our"), the
        provider of the Pagefy website and the services accessible from the
        Pagefy website (which are collectively referred to in these Terms &
        Conditions as the "Pagefy Service").
      </p>
      <p>
        You are agreeing to be bound by these Terms & Conditions. If you do not
        agree to these Terms & Conditions, please do not use the Pagefy Service.
        In these Terms & Conditions, "you" refers both to you as an individual
        and to the entity you represent. If you violate any of these Terms &
        Conditions, we reserve the right to cancel your account or block access
        to your account without notice.
      </p>

      <h1>Definitions and key terms</h1>
      <p>
        To help explain things as clearly as possible in this Terms &
        Conditions, every time any of these terms are referenced, are strictly
        defined as:
      </p>
      <ul>
        <li>
          Cookie: small amount of data generated by a website and saved by your
          web browser. It is used to identify your browser, provide analytics,
          remember information about you such as your language preference or
          login information.
        </li>
        <li>
          Company: when this policy mentions “Company,” “we,” “us,” or “our,” it
          refers to pagefy.me, Belfield Crescent, Farranshone, Limerick, Ireland
          that is responsible for your information under this Terms &
          Conditions.
        </li>
        <li>
          Country: where Pagefy or the owners/founders of Pagefy are based, in
          this case is IE
        </li>
        <li>
          Device: any internet connected device such as a phone, tablet,
          computer or any other device that can be used to visit Pagefy and use
          the services.
        </li>
        <li>
          Service: refers to the service provided by Pagefy as described in the
          relative terms (if available) and on this platform.
        </li>
        <li>
          Third-party service: refers to advertisers, contest sponsors,
          promotional and marketing partners, and others who provide our content
          or whose products or services we think may interest you.
        </li>
        <li>
          Website: Pagefy's site, which can be accessed via this URL:
          https://www.pagefy.me
        </li>
        <li>
          You: a person or entity that is registered with Pagefy to use the
          Services.
        </li>
      </ul>

      <h1>Restrictions</h1>
      <p>You agree not to, and you will not permit others to:</p>
      <ul>
        <li>
          License, sell, rent, lease, assign, distribute, transmit, host,
          outsource, disclose or otherwise commercially exploit the website or
          make the platform available to any third party.
        </li>
        <li>
          Modify, make derivative works of, disassemble, decrypt, reverse
          compile or reverse engineer any part of the website.
        </li>
        <li>
          Remove, alter or obscure any proprietary notice (including any notice
          of copyright or trademark) of Pagefy or its affiliates, partners,
          suppliers or the licensors of the website.
        </li>
      </ul>
      <h1>Return and Refund Policy</h1>
      <p>
        Thanks for shopping at Pagefy. We appreciate the fact that you like to
        buy the stuff we build. We also want to make sure you have a rewarding
        experience while you’re exploring, evaluating, and purchasing our
        products.
      </p>
      <p>
        As with any shopping experience, there are terms and conditions that
        apply to transactions at Pagefy. We’ll be as brief as our attorneys will
        allow. The main thing to remember is that by placing an order or making
        a purchase at Pagefy, you agree to the terms along with Pagefy's Privacy
        Policy.
      </p>
      <p>
        If, for any reason, You are not completely satisfied with any good or
        service that we provide, don't hesitate to contact us and we will
        discuss any of the issues you are going through with our product.
      </p>

      <h1>Your Suggestions</h1>
      <p>
        Any feedback, comments, ideas, improvements or suggestions
        (collectively, "Suggestions") provided by you to Pagefy with respect to
        the website shall remain the sole and exclusive property of Pagefy.
      </p>
      <p>
        Pagefy shall be free to use, copy, modify, publish, or redistribute the
        Suggestions for any purpose and in any way without any credit or any
        compensation to you.
      </p>

      <h1>Your Consent</h1>
      <p>
        We've updated our Terms & Conditions to provide you with complete
        transparency into what is being set when you visit our site and how it's
        being used. By using our website, registering an account, or making a
        purchase, you hereby consent to our Terms & Conditions.
      </p>

      <h1>Links to Other Websites</h1>
      <p>
        This Terms & Conditions applies only to the Services. The Services may
        contain links to other websites not operated or controlled by Pagefy. We
        are not responsible for the content, accuracy or opinions expressed in
        such websites, and such websites are not investigated, monitored or
        checked for accuracy or completeness by us. Please remember that when
        you use a link to go from the Services to another website, our Terms &
        Conditions are no longer in effect. Your browsing and interaction on any
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

      <h1>Changes To Our Terms & Conditions</h1>
      <p>
        You acknowledge and agree that Pagefy may stop (permanently or
        temporarily) providing the Service (or any features within the Service)
        to you or to users generally at Pagefy’s sole discretion, without prior
        notice to you. You may stop using the Service at any time. You do not
        need to specifically inform Pagefy when you stop using the Service. You
        acknowledge and agree that if Pagefy disables access to your account,
        you may be prevented from accessing the Service, your account details or
        any files or other materials which is contained in your account.
      </p>
      <p>
        If we decide to change our Terms & Conditions, we will post those
        changes on this page, and/or update the Terms & Conditions modification
        date below.
      </p>

      <h1>Modifications to Our website</h1>
      <p>
        Pagefy reserves the right to modify, suspend or discontinue, temporarily
        or permanently, the website or any service to which it connects, with or
        without notice and without liability to you.
      </p>

      <h1>Updates to Our website</h1>
      <p>
        Pagefy may from time to time provide enhancements or improvements to the
        features/ functionality of the website, which may include patches, bug
        fixes, updates, upgrades and other modifications ("Updates").
      </p>
      <p>
        Updates may modify or delete certain features and/or functionalities of
        the website. You agree that Pagefy has no obligation to (i) provide any
        Updates, or (ii) continue to provide or enable any particular features
        and/or functionalities of the website to you.
      </p>
      <p>
        You further agree that all Updates will be (i) deemed to constitute an
        integral part of the website, and (ii) subject to the terms and
        conditions of this Agreement.
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

      <h1>Term and Termination</h1>
      <p>
        This Agreement shall remain in effect until terminated by you or Pagefy.
      </p>
      <p>
        Pagefy may, in its sole discretion, at any time and for any or no
        reason, suspend or terminate this Agreement with or without prior
        notice.
      </p>
      <p>
        This Agreement will terminate immediately, without prior notice from
        Pagefy, in the event that you fail to comply with any provision of this
        Agreement. You may also terminate this Agreement by deleting the website
        and all copies thereof from your computer.
      </p>
      <p>
        Upon termination of this Agreement, you shall cease all use of the
        website and delete all copies of the website from your computer.
      </p>
      <p>
        Termination of this Agreement will not limit any of Pagefy's rights or
        remedies at law or in equity in case of breach by you (during the term
        of this Agreement) of any of your obligations under the present
        Agreement.
      </p>

      <h1>Copyright Infringement Notice</h1>
      <p>
        If you are a copyright owner or such owner’s agent and believe any
        material on our website constitutes an infringement on your copyright,
        please contact us setting forth the following information: (a) a
        physical or electronic signature of the copyright owner or a person
        authorized to act on his behalf; (b) identification of the material that
        is claimed to be infringing; (c) your contact information, including
        your address, telephone number, and an email; (d) a statement by you
        that you have a good faith belief that use of the material is not
        authorized by the copyright owners; and (e) the a statement that the
        information in the notification is accurate, and, under penalty of
        perjury you are authorized to act on behalf of the owner.
      </p>

      <h1>Indemnification</h1>
      <p>
        You agree to indemnify and hold Pagefy and its parents, subsidiaries,
        affiliates, officers, employees, agents, partners and licensors (if any)
        harmless from any claim or demand, including reasonable attorneys' fees,
        due to or arising out of your: (a) use of the website; (b) violation of
        this Agreement or any law or regulation; or (c) violation of any right
        of a third party.
      </p>

      <h1>No Warranties</h1>
      <p>
        The website is provided to you "AS IS" and "AS AVAILABLE" and with all
        faults and defects without warranty of any kind. To the maximum extent
        permitted under applicable law, Pagefy, on its own behalf and on behalf
        of its affiliates and its and their respective licensors and service
        providers, expressly disclaims all warranties, whether express, implied,
        statutory or otherwise, with respect to the website, including all
        implied warranties of merchantability, fitness for a particular purpose,
        title and non-infringement, and warranties that may arise out of course
        of dealing, course of performance, usage or trade practice. Without
        limitation to the foregoing, Pagefy provides no warranty or undertaking,
        and makes no representation of any kind that the website will meet your
        requirements, achieve any intended results, be compatible or work with
        any other software, , systems or services, operate without interruption,
        meet any performance or reliability standards or be error free or that
        any errors or defects can or will be corrected.
      </p>
      <p>
        Without limiting the foregoing, neither Pagefy nor any Pagefy's provider
        makes any representation or warranty of any kind, express or implied:
        (i) as to the operation or availability of the website, or the
        information, content, and materials or products included thereon; (ii)
        that the website will be uninterrupted or error-free; (iii) as to the
        accuracy, reliability, or currency of any information or content
        provided through the website; or (iv) that the website, its servers, the
        content, or e-mails sent from or on behalf of Pagefy are free of
        viruses, scripts, trojan horses, worms, malware, timebombs or other
        harmful components.
      </p>
      <p>
        Some jurisdictions do not allow the exclusion of or limitations on
        implied warranties or the limitations on the applicable statutory rights
        of a consumer, so some or all of the above exclusions and limitations
        may not apply to you.
      </p>

      <h1>Limitation of Liability</h1>
      <p>
        Notwithstanding any damages that you might incur, the entire liability
        of Pagefy and any of its suppliers under any provision of this Agreement
        and your exclusive remedy for all of the foregoing shall be limited to
        the amount actually paid by you for the website.
      </p>
      <p>
        To the maximum extent permitted by applicable law, in no event shall
        Pagefy or its suppliers be liable for any special, incidental, indirect,
        or consequential damages whatsoever (including, but not limited to,
        damages for loss of profits, for loss of data or other information, for
        business interruption, for personal injury, for loss of privacy arising
        out of or in any way related to the use of or inability to use the
        website, third-party software and/or third-party hardware used with the
        website, or otherwise in connection with any provision of this
        Agreement), even if Pagefy or any supplier has been advised of the
        possibility of such damages and even if the remedy fails of its
        essential purpose.
      </p>
      <p>
        Some states/jurisdictions do not allow the exclusion or limitation of
        incidental or consequential damages, so the above limitation or
        exclusion may not apply to you.
      </p>

      <h1>Severability</h1>
      <p>
        If any provision of this Agreement is held to be unenforceable or
        invalid, such provision will be changed and interpreted to accomplish
        the objectives of such provision to the greatest extent possible under
        applicable law and the remaining provisions will continue in full force
        and effect.
      </p>
      <p>
        This Agreement, together with the Privacy Policy and any other legal
        notices published by Pagefy on the Services, shall constitute the entire
        agreement between you and Pagefy concerning the Services. If any
        provision of this Agreement is deemed invalid by a court of competent
        jurisdiction, the invalidity of such provision shall not affect the
        validity of the remaining provisions of this Agreement, which shall
        remain in full force and effect. No waiver of any term of this Agreement
        shall be deemed a further or continuing waiver of such term or any other
        term, and Pagefy's failure to assert any right or provision under this
        Agreement shall not constitute a waiver of such right or provision. YOU
        AND Pagefy AGREE THAT ANY CAUSE OF ACTION ARISING OUT OF OR RELATED TO
        THE SERVICES MUST COMMENCE WITHIN ONE (1) YEAR AFTER THE CAUSE OF ACTION
        ACCRUES. OTHERWISE, SUCH CAUSE OF ACTION IS PERMANENTLY BARRED.
      </p>

      <h1>Waiver</h1>
      <p>
        Except as provided herein, the failure to exercise a right or to require
        performance of an obligation under this Agreement shall not effect a
        party's ability to exercise such right or require such performance at
        any time thereafter nor shall be the waiver of a breach constitute
        waiver of any subsequent breach.
      </p>
      <p>
        o failure to exercise, and no delay in exercising, on the part of either
        party, any right or any power under this Agreement shall operate as a
        waiver of that right or power. Nor shall any single or partial exercise
        of any right or power under this Agreement preclude further exercise of
        that or any other right granted herein. In the event of a conflict
        between this Agreement and any applicable purchase or other terms, the
        terms of this Agreement shall govern.
      </p>

      <h1>Amendments to this Agreement</h1>
      <p>
        Pagefy reserves the right, at its sole discretion, to modify or replace
        this Agreement at any time. If a revision is material we will provide at
        least 30 days' notice prior to any new terms taking effect. What
        constitutes a material change will be determined at our sole discretion.
      </p>
      <p>
        By continuing to access or use our website after any revisions become
        effective, you agree to be bound by the revised terms. If you do not
        agree to the new terms, you are no longer authorized to use Pagefy.
      </p>

      <h1>Entire Agreement</h1>
      <p>
        The Agreement constitutes the entire agreement between you and Pagefy
        regarding your use of the website and supersedes all prior and
        contemporaneous written or oral agreements between you and Pagefy.
      </p>
      <p>
        You may be subject to additional terms and conditions that apply when
        you use or purchase other Pagefy's services, which Pagefy will provide
        to you at the time of such use or purchase.
      </p>

      <h1>Updates to Our Terms</h1>
      <p>
        We may change our Service and policies, and we may need to make changes
        to these Terms so that they accurately reflect our Service and policies.
        Unless otherwise required by law, we will notify you (for example,
        through our Service) before we make changes to these Terms and give you
        an opportunity to review them before they go into effect. Then, if you
        continue to use the Service, you will be bound by the updated Terms. If
        you do not want to agree to these or any updated Terms, you can delete
        your account.
      </p>

      <h1>Intellectual Property</h1>
      <p>
        The website and its entire contents, features and functionality
        (including but not limited to all information, software, text, displays,
        images, video and audio, and the design, selection and arrangement
        thereof), are owned by Pagefy, its licensors or other providers of such
        material and are protected by IE and international copyright, trademark,
        patent, trade secret and other intellectual property or proprietary
        rights laws. The material may not be copied, modified, reproduced,
        downloaded or distributed in any way, in whole or in part, without the
        express prior written permission of Pagefy, unless and except as is
        expressly provided in these Terms & Conditions. Any unauthorized use of
        the material is prohibited.
      </p>

      <h1>Agreement to Arbitrate</h1>
      <p>
        This section applies to any dispute EXCEPT IT DOESN’T INCLUDE A DISPUTE
        RELATING TO CLAIMS FOR INJUNCTIVE OR EQUITABLE RELIEF REGARDING THE
        ENFORCEMENT OR VALIDITY OF YOUR OR Pagefy's INTELLECTUAL PROPERTY
        RIGHTS. The term “dispute” means any dispute, action, or other
        controversy between you and Pagefy concerning the Services or this
        agreement, whether in contract, warranty, tort, statute, regulation,
        ordinance, or any other legal or equitable basis. “Dispute” will be
        given the broadest possible meaning allowable under law.
      </p>

      <h1>Notice of Dispute</h1>
      <p>
        In the event of a dispute, you or Pagefy must give the other a Notice of
        Dispute, which is a written statement that sets forth the name, address,
        and contact information of the party giving it, the facts giving rise to
        the dispute, and the relief requested. You must send any Notice of
        Dispute via email to: . Pagefy will send any Notice of Dispute to you by
        mail to your address if we have it, or otherwise to your email address.
        You and Pagefy will attempt to resolve any dispute through informal
        negotiation within sixty (60) days from the date the Notice of Dispute
        is sent. After sixty (60) days, you or Pagefy may commence arbitration.
      </p>

      <h1>Binding Arbitration</h1>
      <p>
        If you and Pagefy don’t resolve any dispute by informal negotiation, any
        other effort to resolve the dispute will be conducted exclusively by
        binding arbitration as described in this section. You are giving up the
        right to litigate (or participate in as a party or class member) all
        disputes in court before a judge or jury. The dispute shall be settled
        by binding arbitration in accordance with the commercial arbitration
        rules of the American Arbitration Association. Either party may seek any
        interim or preliminary injunctive relief from any court of competent
        jurisdiction, as necessary to protect the party’s rights or property
        pending the completion of arbitration. Any and all legal, accounting,
        and other costs, fees, and expenses incurred by the prevailing party
        shall be borne by the non-prevailing party.
      </p>

      <h1>Submissions and Privacy</h1>
      <p>
        In the event that you submit or post any ideas, creative suggestions,
        designs, photographs, information, advertisements, data or proposals,
        including ideas for new or improved products, services, features,
        technologies or promotions, you expressly agree that such submissions
        will automatically be treated as non-confidential and non-proprietary
        and will become the sole property of Pagefy without any compensation or
        credit to you whatsoever. Pagefy and its affiliates shall have no
        obligations with respect to such submissions or posts and may use the
        ideas contained in such submissions or posts for any purposes in any
        medium in perpetuity, including, but not limited to, developing,
        manufacturing, and marketing products and services using such ideas.
      </p>

      <h1>Promotions</h1>
      <p>
        Pagefy may, from time to time, include contests, promotions,
        sweepstakes, or other activities (“Promotions”) that require you to
        submit material or information concerning yourself. Please note that all
        Promotions may be governed by separate rules that may contain certain
        eligibility requirements, such as restrictions as to age and geographic
        location. You are responsible to read all Promotions rules to determine
        whether or not you are eligible to participate. If you enter any
        Promotion, you agree to abide by and to comply with all Promotions
        Rules.
      </p>
      <p>
        Additional terms and conditions may apply to purchases of goods or
        services on or through the Services, which terms and conditions are made
        a part of this Agreement by this reference.
      </p>

      <h1>Typographical Errors</h1>
      <p>
        In the event a product and/or service is listed at an incorrect price or
        with incorrect information due to typographical error, we shall have the
        right to refuse or cancel any orders placed for the product and/or
        service listed at the incorrect price. We shall have the right to refuse
        or cancel any such order whether or not the order has been confirmed and
        your credit card charged. If your credit card has already been charged
        for the purchase and your order is canceled, we shall immediately issue
        a credit to your credit card account or other payment account in the
        amount of the charge.
      </p>

      <h1>Miscellaneous</h1>
      <p>
        If for any reason a court of competent jurisdiction finds any provision
        or portion of these Terms & Conditions to be unenforceable, the
        remainder of these Terms & Conditions will continue in full force and
        effect. Any waiver of any provision of these Terms & Conditions will be
        effective only if in writing and signed by an authorized representative
        of Pagefy. Pagefy will be entitled to injunctive or other equitable
        relief (without the obligations of posting any bond or surety) in the
        event of any breach or anticipatory breach by you. Pagefy operates and
        controls the Pagefy Service from its offices in IE. The Service is not
        intended for distribution to or use by any person or entity in any
        jurisdiction or country where such distribution or use would be contrary
        to law or regulation. Accordingly, those persons who choose to access
        the Pagefy Service from other locations do so on their own initiative
        and are solely responsible for compliance with local laws, if and to the
        extent local laws are applicable. These Terms & Conditions (which
        include and incorporate the Pagefy Privacy Policy) contains the entire
        understanding, and supersedes all prior understandings, between you and
        Pagefy concerning its subject matter, and cannot be changed or modified
        by you. The section headings used in this Agreement are for convenience
        only and will not be given any legal import.
      </p>

      <h1>Disclaimer</h1>
      <p>
        Pagefy is not responsible for any content, code or any other
        imprecision.
      </p>
      <p>Pagefy does not provide warranties or guarantees.</p>
      <p>
        In no event shall Pagefy be liable for any special, direct, indirect,
        consequential, or incidental damages or any damages whatsoever, whether
        in an action of contract, negligence or other tort, arising out of or in
        connection with the use of the Service or the contents of the Service.
        The Company reserves the right to make additions, deletions, or
        modifications to the contents on the Service at any time without prior
        notice.
      </p>
      <p>
        The Pagefy Service and its contents are provided "as is" and "as
        available" without any warranty or representations of any kind, whether
        express or implied. Pagefy is a distributor and not a publisher of the
        content supplied by third parties; as such, Pagefy exercises no
        editorial control over such content and makes no warranty or
        representation as to the accuracy, reliability or currency of any
        information, content, service or merchandise provided through or
        accessible via the Pagefy Service. Without limiting the foregoing,
        Pagefy specifically disclaims all warranties and representations in any
        content transmitted on or in connection with the Pagefy Service or on
        sites that may appear as links on the Pagefy Service, or in the products
        provided as a part of, or otherwise in connection with, the Pagefy
        Service, including without limitation any warranties of merchantability,
        fitness for a particular purpose or non-infringement of third party
        rights. No oral advice or written information given by Pagefy or any of
        its affiliates, employees, officers, directors, agents, or the like will
        create a warranty. Price and availability information is subject to
        change without notice. Without limiting the foregoing, Pagefy does not
        warrant that the Pagefy Service will be uninterrupted, uncorrupted,
        timely, or error-free.
      </p>

      <h1>Contact Us</h1>
      <p>Don't hesitate to contact us if you have any questions.</p>
      <ul>
        <li>Via this Link: https://www.pagefy.me/faq</li>
      </ul>
    </>
  );
};

export default TermsOfUseEN;
