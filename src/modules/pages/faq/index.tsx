import React, { useState } from "react";
import { useSelector } from "react-redux";
import strings from "../../../localization";
import routes from "../../../routes/paths";
import { IApplicationState } from "../../../store";
import { faqsPT, faqsEN } from "../../../store/faq/temp";
import { IUser, PlansTypes } from "../../../store/user/types";
import Accordion from "../../components/accordion";
import Footer from "../../components/footer";
import Navigation from "../../components/navigation";
import InternalLink from "../../components/internal-link";
import TriplePageTitle from "../../components/page-title";
import ThinWidthContent from "../../components/site-content/thin-width";
import { IFaq } from "./../../../store/faq/types";

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

  const getLocalizedFaq = () => {
    switch (strings.getLanguage()) {
      case "pt":
        return faqsPT;
      case "en":
        return faqsEN;
      default:
        return faqsEN;
    }
  };

  return (
    <>
      <Navigation />
      <div style={{ marginTop: "20px" }}>
        <ThinWidthContent>
          <TriplePageTitle
            increasingSize
            titles={[
              strings.faq.menu,
              strings.faq.title,
              strings.faq.description,
            ]}
            sizeGrowth={0.5}
            marginTop="30px"
          />
          <span style={{ marginTop: "40px" }} />
          {getLocalizedFaq().map((faq: IFaq, index: number) => (
            <Accordion
              position={
                index === 0
                  ? "first"
                  : index === faqsPT.length - 1
                  ? "last"
                  : "middle"
              }
              expanded={expandedAccordion === faq.question}
              onChange={handleChange(faq.question)}
              title={faq.question}
              content={faq.answer}
              id={faq.question}
            />
          ))}
          <div style={{ marginTop: "50px" }}>{showSupportByPlanType()}</div>
        </ThinWidthContent>
      </div>
      <Footer />
    </>
  );
};

export default Faq;
