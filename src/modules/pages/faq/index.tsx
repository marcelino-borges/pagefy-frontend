import React, { useState } from "react";
import strings from "../../../localization";
import { PRIMARY_COLOR } from "../../../styles/colors";
import Accordion from "../../components/accordion";
import Header from "../../components/header";
import PageTitle from "../../components/page-title";
import DashboardContent from "../../components/site-content";

const Faq = () => {
  const [expandedAccordion, setExpandedAccordion] = useState<string | false>(
    false
  );

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpandedAccordion(newExpanded ? panel : false);
    };

  return (
    <>
      <Header />
      <div style={{ marginTop: "20px" }}>
        <DashboardContent>
          <PageTitle
            increasingSize
            title={strings.faq.menu}
            subtitle={strings.faq.title}
            description={strings.faq.description}
            sizeGrowth={0.5}
            colors={[PRIMARY_COLOR, "#000", "#000"]}
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
        </DashboardContent>
      </div>
    </>
  );
};

export default Faq;
