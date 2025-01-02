interface SocialLoginButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  social: "kakao" | "google";
  logo: React.ReactNode;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  social = "kakao",
  logo,
  ...props
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
    <button
      className={`flex items-center justify-center gap-1 rounded-xl py-2 font-medium border ${socials[social].style}`}
      {...props}
    >
      {logo}
      {socials[social].name}로 계속하기
    </button>
  );
};

export default SocialLoginButton;
