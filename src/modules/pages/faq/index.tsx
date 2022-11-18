import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import strings from "../../../localization";
import routes from "../../../routes/paths";
import { IApplicationState } from "../../../store";
import { IUser, PlansTypes } from "../../../store/user/types";
import Accordion from "../../components/accordion";
import Footer from "../../components/footer";
import Navigation from "../../components/navigation";
import InternalLink from "../../components/internal-link";
import TriplePageTitle from "../../components/page-title";
import ThinWidthContent from "../../components/site-content/thin-width";
import { IFaq, IFaqState } from "./../../../store/faq/types";
import { getAllFaqs } from "./../../../store/faq/actions";
import LoadingSpinner from "../../components/loading-spinner";
import { PRIMARY_COLOR } from "../../../styles/colors";

const Faq = () => {
  const dispatch = useDispatch();

  const [expandedAccordion, setExpandedAccordion] = useState<string | false>(
    false
  );

  const profileState: IUser | undefined = useSelector(
    (state: IApplicationState) => state.user.profile
  );

  const faqState: IFaqState = useSelector(
    (state: IApplicationState) => state.faq
  );

  useEffect(() => {
    dispatch(getAllFaqs(strings.getLanguage()));
  }, [dispatch]);

  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, newExpanded: boolean) => {
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
      <Navigation />
      <ThinWidthContent center pb="100px">
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
        {faqState.loading && <LoadingSpinner color={PRIMARY_COLOR} size={40} />}

        {!faqState.loading && faqState.faqs.length === 0 && (
          <>{strings.sorryThisIsNotAvailable}.</>
        )}

        {!faqState.loading &&
          faqState.faqs.length > 0 &&
          faqState.faqs.map((faq: IFaq, index: number) => (
            <Accordion
              position={
                index === 0
                  ? "first"
                  : index === faqState.faqs.length - 1
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
      <Footer />
    </>
  );
};

export default Faq;
