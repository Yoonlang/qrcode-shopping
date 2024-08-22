import "@testing-library/jest-dom";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { mockProductList } from "@/components/manager/product/const";
import ProductDetailModal from "@/components/manager/product/ProductDetailModal";
import { OverlayProvider } from "@/hooks/useOverlay";

describe("ProductDetailModal", () => {
  it("초기 렌더링 확인", async () => {
    // Given
    const modalProductData = mockProductList[0];
    const control = {
      isOpen: true,
      close: jest.fn(),
      exit: jest.fn(),
    };

    // When
    render(
      <OverlayProvider>
        <ProductDetailModal
          overlayControl={control}
          modalProductData={modalProductData}
        />
      </OverlayProvider>
    );

    // Then
    await waitFor(() => {
      expect(screen.getByTestId("product-detail-modal")).toBeInTheDocument();
    });
  });

  it("수정 누를 시 edit 모드로 변경", async () => {
    // Given
    const modalProductData = mockProductList[0];
    const control = {
      isOpen: true,
      close: jest.fn(),
      exit: jest.fn(),
    };

    // When
    render(
      <OverlayProvider>
        <ProductDetailModal
          overlayControl={control}
          modalProductData={modalProductData}
        />
      </OverlayProvider>
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
