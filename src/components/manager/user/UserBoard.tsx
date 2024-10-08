import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { pdf } from "@react-pdf/renderer";
import JSZip from "jszip";
import { useEffect, useState } from "react";

import { getProductList } from "@/api/products";
import { getUserList } from "@/api/users";
import CounselingIntakeForm from "@/components/common/CounselingIntakeForm";
import MessageDialog from "@/components/common/MessageDialog";
import { UserInfo } from "@/components/const";
import { USER_DEFAULT, USER_TRASH_CAN } from "@/components/manager/const";
import DataFolderReassignModal from "@/components/manager/folder/DataFolderReassignModal";
import { PdfBlob } from "@/components/manager/user/const";
import UserCopyModal from "@/components/manager/user/UserCopyModal";
import UserTable from "@/components/manager/user/UserTable";
import UserTextActionModal from "@/components/manager/user/UserTextActionModal";
import { countries, Country } from "@/components/user/userSubmission/countries";
import { Folder, Product, User } from "@/const";
import { useMultipleOverlay } from "@/hooks/useOverlay";
import { imageUrlList } from "@/recoil/user/atoms/imageUrlListState";
import { SelectedInfoList } from "@/recoil/user/atoms/selectedInfoListState";
import { reassignFolder } from "@/services/folders";
import { deleteUserList } from "@/services/users";

const StyledUserBoard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  > .header {
    width: 100%;
    height: 60px;
    padding: 0 10px;
    display: flex;
    align-items: end;
    justify-content: space-between;
  }
`;

const UserBoard = ({
  folder,
  userFolderList,
}: {
  folder: Folder;
  userFolderList: Folder[];
}) => {
  const [userList, setUserList] = useState<User[]>([]);
  const filteredUserList = userList.filter((u) => {
    if (folder.id === USER_DEFAULT) {
      return u.metadata.folderId !== USER_TRASH_CAN;
    }
    return u.metadata.folderId === folder.id;
  });
  const [selectedUserList, setSelectedUserList] = useState<string[]>([]);
  const overlays = useMultipleOverlay(8);
  const [productList, setProductList] = useState<Product[]>([]);

  const updateUserList = async () => {
    try {
      const userList = await getUserList();
      setUserList(userList);
    } catch {
      overlays[0].open((control) => (
        <MessageDialog
          overlayControl={control}
          messageList={["데이터 가져오기 실패"]}
        />
      ));
    }
  };

  const handleUserRestore = async () => {
    try {
      await reassignFolder(
        filteredUserList.filter((f) =>
          selectedUserList.find((userId) => f.userId === userId)
        ),
        USER_DEFAULT
      );
      await updateUserList();
    } catch {
      overlays[1].open((control) => (
        <MessageDialog
          overlayControl={control}
          messageList={["데이터 복구 실패"]}
        />
      ));
    }
  };

  const handleUserSoftDelete = async () => {
    try {
      await reassignFolder(
        filteredUserList.filter((f) =>
          selectedUserList.find((userId) => f.userId === userId)
        ),
        USER_TRASH_CAN
      );
      await updateUserList();
    } catch {
      overlays[2].open((control) => (
        <MessageDialog
          overlayControl={control}
          messageList={["데이터 삭제 실패"]}
        />
      ));
    }
  };

  const handleUserPermanentDelete = async () => {
    try {
      await deleteUserList(selectedUserList);
      await updateUserList();
    } catch {
      overlays[3].open((control) => (
        <MessageDialog
          overlayControl={control}
          messageList={["데이터 영구 삭제 실패"]}
        />
      ));
    }
  };

  const handleUserFolderReassign = () => {
    if (selectedUserList.length > 0) {
      overlays[4].open((control) => (
        <DataFolderReassignModal
          overlayControl={control}
          selectedDataList={filteredUserList.filter((f) =>
            selectedUserList.find((userId) => f.userId === userId)
          )}
          folder={folder}
          folderList={userFolderList}
          onReassignComplete={async () => {
            await updateUserList();
          }}
        />
      ));
    }
  };

  const handleUserPdfDownloadButtonClick = async () => {
    const zip = new JSZip();
    const userList: User[] = filteredUserList.filter((f) =>
      selectedUserList.find((userId) => f.userId === userId)
    );
    const pdfBlobList: PdfBlob[] = [];

    for (const user of userList) {
      const { name, companyName } = user.personalInfo;
      const { email, phoneNumber, weChatId } = user.personalInfo.contactInfo;
      const { code, label }: Country = countries.filter(
        (country) =>
          `+${country.phone}` ===
          user.personalInfo.contactInfo.phoneNumber.countryCode
      )[0];

      const userValues: Partial<UserInfo> = {
        name: name,
        companyName: companyName,
        email: email,
        countryCode: {
          code: code,
          label: label,
          phone: phoneNumber.countryCode.split("+")[1],
        },
        weChatId: weChatId || "",
        phoneNumber: phoneNumber.number,
      };

      const selectedInfoList: SelectedInfoList = {};
      const imageUrlList: imageUrlList = {};

      user.hopeProducts.forEach((product) => {
        const productInfo = productList.find(
          (p) => p.productId === product.productId
        );

        if (productInfo && productInfo.image) {
          imageUrlList[product.productId] = productInfo.image;
        }

        if (product.colorCardQuantity > 0) {
          selectedInfoList[product.productId] = {
            "Color Card": product.colorCardQuantity,
          };
        }
        product.sampleYardages.forEach((sy) => {
          selectedInfoList[product.productId] = {
            ...selectedInfoList[product.productId],
            [sy.colorName]: sy.yardageQuantity,
          };
        });
      });

      const pdfBlob = await pdf(
        <CounselingIntakeForm
          userInfo={userValues}
          selectedInfoList={selectedInfoList}
          imageUrlList={imageUrlList}
          userId={user.userId}
          language={user.metadata.language}
        />
      ).toBlob();

      pdfBlobList.push({ userId: user.userId, pdf: pdfBlob });
    }

    const link = document.createElement("a");

    if (userList.length === 1) {
      link.href = URL.createObjectURL(pdfBlobList[0].pdf);
      link.download = `${pdfBlobList[0].userId}.pdf`;
    } else {
      pdfBlobList.forEach(({ userId, pdf }) => {
        zip.file(`${userId}.pdf`, pdf);
      });
      const zipContent = await zip.generateAsync({ type: "blob" });
      link.href = URL.createObjectURL(zipContent);
      link.download = `pdfs.zip`;
    }

    link.click();
  };

  const handleProductListUpdate = async () => {
    try {
      const productList = await getProductList();
      setProductList(productList);
    } catch {
      overlays[5].open((control) => (
        <MessageDialog
          overlayControl={control}
          messageList={["제품 목록 받아오기 실패"]}
        />
      ));
    }
  };

  useEffect(() => {
    void updateUserList();
    void handleProductListUpdate();
  }, []);

  return (
    <StyledUserBoard data-cy="user-board">
      <div className="header">
        <h3>user / {folder.name}</h3>
        <div>
          {folder.id === USER_DEFAULT && (
            <Button
              onClick={() => {
                overlays[6].open((control) => (
                  <UserTextActionModal overlayControl={control} />
                ));
              }}
            >
              텍스트 설정
            </Button>
          )}
          {folder.id === USER_TRASH_CAN ? (
            <>
              <Button onClick={handleUserRestore}>데이터 복구</Button>
              <Button onClick={handleUserPermanentDelete}>
                데이터 영구 삭제
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleUserPdfDownloadButtonClick}>
                PDF 다운로드
              </Button>
              <Button
                onClick={() => {
                  overlays[7].open((control) => (
                    <UserCopyModal
                      overlayControl={control}
                      selectedUserList={filteredUserList.filter((f) =>
                        selectedUserList.find((userId) => f.userId === userId)
                      )}
                    ></UserCopyModal>
                  ));
                }}
              >
                선택한 유저 정보 복사
              </Button>
              <Button onClick={handleUserFolderReassign}>
                데이터 폴더 이동
              </Button>
              <Button onClick={handleUserSoftDelete}>데이터 삭제</Button>
            </>
          )}
        </div>
      </div>
      <UserTable
        folder={folder}
        folderList={userFolderList}
        userList={filteredUserList}
        setSelectedUserList={setSelectedUserList}
      />
    </StyledUserBoard>
  );
};

export default UserBoard;
