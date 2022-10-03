import React, { useState } from "react";
import { useSelector } from "react-redux";
import strings from "../../../localization";
import routes from "../../../routes/paths";
import { IApplicationState } from "../../../store";
import { IUser, PlansTypes } from "../../../store/user/types";
import Accordion from "../../components/accordion";
import Footer from "../../components/footer";
import Header from "../../components/header";
import InternalLink from "../../components/internal-link";
import PageTitle from "../../components/page-title";
import ThinWidthContent from "../../components/site-content/thin-width";

const Faq = () => {
  const [expandedAccordion, setExpandedAccordion] = useState<string | false>(
    false
  );

  const profileState: IUser | undefined = useSelector(
    (state: IApplicationState) => state.user.profile
  );

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpandedAccordion(newExpanded ? panel : false);
    };

  const showSupportByPlanType = () => {
    if (!profileState) {
      return (
        <>
          <InternalLink to={routes.signIn}>{strings.signIn}</InternalLink>
          &nbsp;
          {strings.toGetSupport}
        </>
      );
    } else if (profileState?.plan === PlansTypes.FREE) {
      return (
        <>
          <InternalLink to={routes.root}>{strings.getAPlanNow}</InternalLink>
          &nbsp;
          {`${strings.toGetSupport}`}
        </>
      );
    } else if (profileState?.plan === PlansTypes.VIP) {
      return (
        <>
          <InternalLink to={routes.root}>
            {strings.upgradeYourPlan}
          </InternalLink>
          &nbsp;
          {`${strings.toGetSupport}`}
        </>
      );
    } else {
      return (
        <>
          {`${strings.faq.stillNeedHelp}`}&nbsp;
          <InternalLink to={routes.support}>{strings.getInTouch}</InternalLink>
        </>
      );
    }
  };

  return (
    <>
      <Header />
      <div style={{ marginTop: "20px" }}>
        <ThinWidthContent>
          <PageTitle
            increasingSize
            title={strings.faq.menu}
            subtitle={strings.faq.title}
            description={strings.faq.description}
            sizeGrowth={0.5}
            marginTop="30px"
          />
          <span style={{ marginTop: "40px" }} />
          <Accordion
            position="first"
            expanded={expandedAccordion === "acc1"}
            onChange={handleChange("acc1")}
            title="Como criar minha conta?"
            content="Blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla"
            id="acc1"
          />
          <Accordion
            position="middle"
            expanded={expandedAccordion === "acc2"}
            onChange={handleChange("acc2")}
            title="Como criar minha página?"
            content="Blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla"
            id="acc2"
          />
          <Accordion
            position="middle"
            expanded={expandedAccordion === "acc3"}
            onChange={handleChange("acc3")}
            title="Como criar meu componente?"
            content="Blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla"
            id="acc3"
          />
          <Accordion
            position="middle"
            expanded={expandedAccordion === "acc4"}
            onChange={handleChange("acc4")}
            title="Como criar um componente de 2 colunas?"
            content="Blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla"
            id="acc4"
          />
          <Accordion
            position="last"
            expanded={expandedAccordion === "acc5"}
            onChange={handleChange("acc5")}
            title="Como criar um componente de 2 linhas?"
            content="Blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla blablabla"
            id="acc5"
          />
          <div style={{ marginTop: "50px" }}>{showSupportByPlanType()}</div>
        </ThinWidthContent>
      </div>
      <Footer />
    </>
  );
};

export default Faq;
