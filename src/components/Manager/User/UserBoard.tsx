import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { pdf } from "@react-pdf/renderer";
import { useOverlay } from "@toss/use-overlay";
import JSZip from "jszip";
import { useEffect, useState } from "react";

import {
  getOrdererInfoList,
  getProductList,
  permanentDeleteOrdererList,
  reassignFolder,
} from "@/api";
import { FormType } from "@/components/const";
import CounselingIntakeForm from "@/components/CounselingIntakeForm";
import { USER_DEFAULT, USER_TRASH_CAN } from "@/components/Manager/const";
import DataFolderReassignModal from "@/components/Manager/Folder/DataFolderReassignModal";
import { PdfBlob } from "@/components/Manager/User/const";
import UserCopyModal from "@/components/Manager/User/UserCopyModal";
import UserTable from "@/components/Manager/User/UserTable";
import UserTextActionModal from "@/components/Manager/User/UserTextActionModal";
import MessageDialog from "@/components/MessageDialog";
import {
  countries,
  CountryType,
} from "@/components/UserInfoSubmission/countries";
import { Folder, OrdererInfo, Product } from "@/const";
import { imageUrlList } from "@/recoil/atoms/imageUrlListState";
import { SelectedInfoList } from "@/recoil/atoms/selectedInfoListState";

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
  const [userInfoList, setUserInfoList] = useState<OrdererInfo[]>([]);
  const filteredUserList = userInfoList.filter((u) => {
    if (folder.id === USER_DEFAULT) {
      return u.metadata.folderId !== USER_TRASH_CAN;
    }
    return u.metadata.folderId === folder.id;
  });
  const [selectedUserList, setSelectedUserList] = useState<string[]>([]);
  const overlay = useOverlay();
  const [productList, setProductList] = useState<Product[]>([]);

  const updateOrdererInfoList = () => {
    getOrdererInfoList(
      (data) => {
        setUserInfoList(data);
      },
      () => {
        overlay.open(({ isOpen, close }) => (
          <MessageDialog
            isDialogOpen={isOpen}
            onDialogClose={close}
            messageList={["데이터 가져오기 실패"]}
          />
        ));
      }
    );
  };

  const handleUserRestore = () => {
    reassignFolder(
      filteredUserList.filter((f) =>
        selectedUserList.find((userId) => f.userId === userId)
      ),
      USER_DEFAULT,
      () => {
        updateOrdererInfoList();
      },
      () => {
        overlay.open(({ isOpen, close }) => (
          <MessageDialog
            isDialogOpen={isOpen}
            onDialogClose={close}
            messageList={["데이터 복구 실패"]}
          />
        ));
      }
    );
  };

  const handleUserSoftDelete = () => {
    reassignFolder(
      filteredUserList.filter((f) =>
        selectedUserList.find((userId) => f.userId === userId)
      ),
      USER_TRASH_CAN,
      () => {
        updateOrdererInfoList();
      },
      () => {
        overlay.open(({ isOpen, close }) => (
          <MessageDialog
            isDialogOpen={isOpen}
            onDialogClose={close}
            messageList={["데이터 삭제 실패"]}
          />
        ));
      }
    );
  };

  const handleUserPermanentDelete = () => {
    permanentDeleteOrdererList(
      selectedUserList,
      () => {
        updateOrdererInfoList();
      },
      () => {
        overlay.open(({ isOpen, close }) => (
          <MessageDialog
            isDialogOpen={isOpen}
            onDialogClose={close}
            messageList={["데이터 영구 삭제 실패"]}
          />
        ));
      }
    );
  };

  const handleUserFolderReassign = () => {
    if (selectedUserList.length > 0) {
      overlay.open(({ isOpen, close }) => (
        <DataFolderReassignModal
          isModalOpen={isOpen}
          onModalClose={close}
          selectedDataList={filteredUserList.filter((f) =>
            selectedUserList.find((userId) => f.userId === userId)
          )}
          folder={folder}
          folderList={userFolderList}
          onReassignComplete={() => {
            updateOrdererInfoList();
          }}
        />
      ));
    }
  };

  const handleUserPDFDownloadButtonClick = async () => {
    const zip = new JSZip();
    const userList: OrdererInfo[] = filteredUserList.filter((f) =>
      selectedUserList.find((userId) => f.userId === userId)
    );
    const pdfBlobList: PdfBlob[] = [];

    for (const user of userList) {
      const { name, companyName } = user.personalInfo;
      const { email, phoneNumber, weChatId } = user.personalInfo.contactInfo;
      const { code, label }: CountryType = countries.filter(
        (country) =>
          `+${country.phone}` ===
          user.personalInfo.contactInfo.phoneNumber.countryCode
      )[0];

      const userValues: Partial<FormType> = {
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
          ordererInfo={userValues}
          selectedInfoList={selectedInfoList}
          imageUrlList={imageUrlList}
          userId={user.userId}
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

  useEffect(() => {
    updateOrdererInfoList();
    getProductList(
      (data) => {
        setProductList(data);
      },
      () => {
        overlay.open(({ isOpen, close }) => (
          <MessageDialog
            isDialogOpen={isOpen}
            onDialogClose={close}
            messageList={["제품 목록 받아오기 실패"]}
          />
        ));
      }
    );
  }, []);

  return (
    <StyledUserBoard>
      <div className="header">
        <h3>user / {folder.name}</h3>
        <div>
          {folder.id === USER_DEFAULT && (
            <Button
              onClick={() => {
                overlay.open(({ isOpen, close }) => (
                  <UserTextActionModal isModalOpen={isOpen} onClose={close} />
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
              <Button onClick={handleUserPDFDownloadButtonClick}>
                PDF 다운로드
              </Button>
              <Button
                onClick={() => {
                  overlay.open(({ isOpen, close }) => (
                    <UserCopyModal
                      isModalOpen={isOpen}
                      onModalClose={close}
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
        userInfoList={filteredUserList}
        setSelectedUserList={setSelectedUserList}
      />
    </StyledUserBoard>
  );
};

export default UserBoard;
