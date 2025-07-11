import { useState } from "react";

import Logo from "@/assets/logo.svg?react";
import Menu from "@/assets/menu.svg?react";
import Loading from "@/components/loading";
import { useCreateStar } from "@/state/mutation/star";
import { useTabStore } from "@/state/zustand/tab";
import { getHtmlText } from "@/utils/chrome";
import { Modal, RectangleButton, useOutsideClick } from "@repo/ui";

import { useNavigate } from "react-router-dom";

const url = import.meta.env.VITE_BASE_URL;

const Bookmark = () => {
  const { currentTab, isFindingExistPath } = useTabStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const [menuContainerRef] = useOutsideClick<HTMLDivElement>(() => setIsMenuOpen(false));

  const navigate = useNavigate();
  const { mutateAsync } = useCreateStar();

  const onClickLogout = async () => {
    await chrome.cookies.remove({
      url,
      name: "accessToken",
    });
    await chrome.cookies.remove({
      url,
      name: "refreshToken",
    });
    navigate("/");
  };

  const onClickAdd = async () => {
    const html = await getHtmlText();
    const htmlContent = html.split("------MultipartBoundary--")[1];

    const htmlBlob = new Blob([htmlContent], { type: "text/html" });
    const htmlFile = new File([htmlBlob], "content.html", { type: "text/html" });

    const formData = new FormData();
    formData.append("htmlFile", htmlFile);

    await mutateAsync({
      title: currentTab.title,
      siteUrl: currentTab.url,
      htmlFile: formData,
    });
  };

  const onToggleMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  const onOpenLogoutModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsMenuOpen(false);
    setIsLogoutModalOpen(true);
  };

  return (
    <Loading title="페이지를 요약하고 있어요!" description="페이지를 벗어나면 요약이 취소돼요.">
      <header className="flex items-center justify-between">
        <Logo />
        <div className="relative">
          <button onClick={onToggleMenu}>
            <Menu />
          </button>
          {isMenuOpen && (
            <div ref={menuContainerRef} className="absolute bottom-0 right-0 translate-y-full">
              <button
                onClick={onOpenLogoutModal}
                className="w-max rounded-sm border border-black px-2.5 py-1"
              >
                로그아웃
              </button>
            </div>
          )}
        </div>
      </header>
      <main className="flex h-full flex-col justify-center gap-28 overflow-x-hidden">
        <section className="space-y-4">
          <div className="text-body space-y-2">
            <h2>URL</h2>
            <p className="text-gray7">{currentTab.url}</p>
          </div>
          <div className="text-body space-y-2">
            <h2>Title</h2>
            <p className="text-gray7">{currentTab.title}</p>
          </div>
        </section>
        <RectangleButton className="flex-none" onClick={onClickAdd} disabled={isFindingExistPath}>
          {isFindingExistPath ? "기존 북마크(추가 불가)" : "북마크에 추가하기"}
        </RectangleButton>
      </main>
      {isLogoutModalOpen && (
        <Modal
          title="로그아웃"
          subTitle="로그아웃 하시겠습니까?"
          callback={() => setIsLogoutModalOpen(false)}
        >
          <div className="flex w-full gap-2">
            <RectangleButton onClick={() => setIsLogoutModalOpen(false)} variation="outline">
              취소
            </RectangleButton>
            <RectangleButton onClick={onClickLogout}>로그아웃</RectangleButton>
          </div>
        </Modal>
      )}
    </Loading>
  );
};

export default Bookmark;
