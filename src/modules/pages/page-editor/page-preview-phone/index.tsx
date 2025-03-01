import { useEffect, useState } from "react";
import { IUserPage } from "../../../../store/user-pages/types";
import PageRenderer from "../../../components/page-renderer";
import {
  CloseIcon,
  PageContainer,
  FloatingPreviewContainer,
  ShowIcon,
  Iphone14Image,
} from "./style";
import { Close } from "@mui/icons-material";
import CustomTooltip from "../../../components/tooltip";
import strings from "../../../../localization";
import { Icon } from "@iconify/react";

interface IPagePreviewPhoneProps {
  page?: IUserPage;
}

const PagePreviewPhone = ({ page }: IPagePreviewPhoneProps) => {
  const [openPreview, setOpenPreview] = useState(true);
  const [pageToRender, setPageToRender] = useState<IUserPage>();

  useEffect(() => {
    setPageToRender(page);
  }, [page]);

  if (!pageToRender) return <></>;

  return (
    <>
      {!openPreview && (
        <ShowIcon onClick={() => setOpenPreview(true)}>
          {strings.pagePreview}
          <Icon icon="emojione-monotone:mobile-phone-with-arrow" width="28" />
        </ShowIcon>
      )}
      {openPreview && (
        <FloatingPreviewContainer>
          <Iphone14Image />
          <CustomTooltip title={strings.hide}>
            <CloseIcon onClick={() => setOpenPreview(false)}>
              <Close />
            </CloseIcon>
          </CustomTooltip>
          <PageContainer style={{ ...pageToRender.style }}>
            <PageRenderer pageToRender={pageToRender} isPagePreview />
          </PageContainer>
        </FloatingPreviewContainer>
      )}
    </>
  );
};

export default PagePreviewPhone;
