import styled from "@emotion/styled";

export const PagePicture = styled(({ backgroundImage, ...rest }: any) => (
  <div {...rest} />
))`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  background-image: url(${(props) => props.backgroundImage});
`;

export const PageName = styled(({ ...rest }: any) => <div {...rest} />)`
  font-size: 1.2em;
  margin-top: 24px;
  font-weight: 600;
  text-align: center;
`;
