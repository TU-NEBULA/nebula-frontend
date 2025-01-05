import RectangleButton from "./rectangle-button";
import Flex from "../flex";

interface SocialLoginButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  social: "kakao" | "google";
  logo: React.ReactNode;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  social = "kakao",
  logo,
  ...restProps
}) => {
  const socials = {
    kakao: {
      style: "bg-kakao border-kakao",
      name: "카카오",
    },
    google: {
      style: "bg-white border-black",
      name: "Google",
    },
  };

  return (
    <RectangleButton className={`border ${socials[social].style}`} {...restProps}>
      <Flex justify="center" align="center" className="gap-1">
        {logo}
        {socials[social].name}로 계속하기
      </Flex>
    </RectangleButton>
  );
};

export default SocialLoginButton;
