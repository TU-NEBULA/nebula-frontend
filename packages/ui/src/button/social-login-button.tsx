import RectangleButton from "./rectangle-button";
import { cn } from "../../utils/cn";

interface SocialLoginButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  social: "kakao" | "google";
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  social = "kakao",
  ...restProps
}) => {
  const socials = {
    kakao: {
      style: "bg-kakao border-kakao",
      name: "카카오",
      logo: () => (
        <svg
          width="18"
          height="17"
          viewBox="0 0 18 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.00004 0.977536C4.02919 0.977536 1.8e-05 3.92285 1.8e-05 7.55541C1.8e-05 9.81456 1.55842 11.8061 3.93154 12.9907L2.93305 16.4418C2.84483 16.7468 3.21343 16.9898 3.49648 16.8131L7.87336 14.08C8.24272 14.1137 8.61809 14.1334 9.00004 14.1334C13.9705 14.1334 17.9999 11.1882 17.9999 7.55541C17.9999 3.92285 13.9705 0.977536 9.00004 0.977536"
            fill="black"
          />
        </svg>
      ),
    },
    google: {
      style: "bg-white border-black2",
      name: "Google",
      logo: () => (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.64 9.20456C17.64 8.56637 17.5827 7.95274 17.4764 7.36365H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8196H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.20456Z"
            fill="#4285F4"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5614C11.2418 14.1014 10.2109 14.4204 9 14.4204C6.65591 14.4204 4.67182 12.8373 3.96409 10.71H0.957275V13.0418C2.43818 15.9832 5.48182 18 9 18Z"
            fill="#34A853"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.96409 10.71C3.78409 10.17 3.68182 9.59319 3.68182 9.00001C3.68182 8.40683 3.78409 7.83001 3.96409 7.29001V4.95819H0.957273C0.347727 6.17319 0 7.54774 0 9.00001C0 10.4523 0.347727 11.8268 0.957273 13.0418L3.96409 10.71Z"
            fill="#FBBC05"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z"
            fill="#EA4335"
          />
        </svg>
      ),
    },
  };

  return (
    <RectangleButton
      className={cn(
        "text-body flex justify-center items-center gap-2 border",
        socials[social].style
      )}
      {...restProps}
    >
      {socials[social].logo()}
      {socials[social].name}로 계속하기
    </RectangleButton>
  );
};

export default SocialLoginButton;
