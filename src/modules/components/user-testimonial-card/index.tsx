import {
  Root,
  Testimonial,
  UserCompany,
  UserName,
  UserPicture,
  UserProfession,
} from "./style";

interface IUserTestimonialCardProps {
  userPictureUrl: string;
  testimonial: string;
  userName: string;
  userProfession: string;
  userCompany: string;
  [x: string]: any;
}

const UserTestimonialCard = ({
  userPictureUrl,
  testimonial,
  userName,
  userProfession,
  userCompany,
  ...rest
}: IUserTestimonialCardProps) => {
  return (
    <Root {...rest}>
      <UserPicture userImage={userPictureUrl} />
      <Testimonial>{testimonial}</Testimonial>
      <UserName>{userName}</UserName>
      <UserProfession>{userProfession}</UserProfession>
      <UserCompany>{userCompany}</UserCompany>
    </Root>
  );
};

export default UserTestimonialCard;
