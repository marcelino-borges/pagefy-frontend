import { useState } from "react";
import { IUserPage } from "../../../../store/user-pages/types";
import PageRenderer from "../../../components/page-renderer";
import {
  CloseIcon,
  PageContainer,
  FloatingPreviewContainer,
  ShowIcon,
  Iphone14Image,
} from "./style";
import { Close, Preview } from "@mui/icons-material";

interface IPagePreviewPhoneProps {
  page?: IUserPage;
}

const PagePreviewPhone = ({ page }: IPagePreviewPhoneProps) => {
  const [openPreview, setOpenPreview] = useState(true);

  if (!page) return <></>;

  return (
    <>
      {!openPreview && (
        <ShowIcon onClick={() => setOpenPreview(true)}>
          <Preview />
        </ShowIcon>
      )}
      {openPreview && (
        <FloatingPreviewContainer>
          <Iphone14Image />
          <CloseIcon onClick={() => setOpenPreview(false)}>
            <Close />
          </CloseIcon>
          <PageContainer style={{ ...page.style }}>
            <PageRenderer pageToRender={page} isPagePreview />
          </PageContainer>
        </FloatingPreviewContainer>
      )}
    </>
  );
};

export default PagePreviewPhone;
