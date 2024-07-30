import "@testing-library/jest-dom";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { mockProductList } from "@/components/Manager/Product/const";
import ProductDetailModal from "@/components/Manager/Product/ProductDetailModal";

describe("ProductDetailModal", () => {
  it("초기 렌더링 확인", async () => {
    // Given
    const modalProductData = mockProductList[0];

    // When
    render(
      <ProductDetailModal
        isModalOpen={true}
        onModalClose={jest.fn()}
        modalProductData={modalProductData}
      />
    );

    // Then
    await waitFor(() => {
      expect(screen.getByTestId("product-detail-modal")).toBeInTheDocument();
    });
  });

  it("수정 누를 시 edit 모드로 변경", async () => {
    // Given
    const modalProductData = mockProductList[0];

    // When
    render(
      <ProductDetailModal
        isModalOpen={true}
        onModalClose={jest.fn()}
        modalProductData={modalProductData}
      />
    );
    await waitFor(() => {
      expect(
        screen.getByTestId("product-detail-open-edit-modal-button")
      ).toBeInTheDocument();
    });

    const EditModalOpenButton = screen.getByTestId(
      "product-detail-open-edit-modal-button"
    );
    fireEvent.click(EditModalOpenButton);

    // Then
    await waitFor(() => {
      expect(screen.getByTestId("product-edit-modal")).toBeInTheDocument();
    });
  });
});
