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
}

const UserTestimonialCard = ({
  userPictureUrl,
  testimonial,
  userName,
  userProfession,
  userCompany,
}: IUserTestimonialCardProps) => {
  return (
    <Root>
      <UserPicture userImage={userPictureUrl} />
      <Testimonial>{testimonial}</Testimonial>
      <UserName>{userName}</UserName>
      <UserProfession>{userProfession}</UserProfession>
      <UserCompany>{userCompany}</UserCompany>
    </Root>
  );
};

export default UserTestimonialCard;
