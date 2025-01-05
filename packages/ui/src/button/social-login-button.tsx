import RectangleButton from "./rectangle-button";

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
    <RectangleButton
      className={`flex justify-center items-center gap-1 border ${socials[social].style}`}
      {...restProps}
    >
      {logo}
      {socials[social].name}로 계속하기
    </RectangleButton>
  );
};

export default SocialLoginButton;
