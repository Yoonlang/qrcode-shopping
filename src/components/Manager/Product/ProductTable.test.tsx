import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { OverlayProvider } from "@toss/use-overlay";

import {
  mockProductFolderList,
  mockProductList,
} from "@/components/Manager/Product/const";
import ProductTable from "@/components/Manager/Product/ProductTable";

const mockSetSelectedProductList = jest.fn();

describe("ProductTable", () => {
  it("초기 렌더링 확인", () => {
    // Given
    const folderList = mockProductFolderList;
    const folder = folderList[0];
    const productList = mockProductList;

    // When
    render(
      <OverlayProvider>
        <ProductTable
          folder={folder}
          folderList={folderList}
          productList={productList}
          setSelectedProductList={mockSetSelectedProductList}
        />
      </OverlayProvider>
    );

    // Then
    expect(screen.getByText("JQ 12370SIQ")).toBeInTheDocument();
  });

  it("DataGrid Cell 클릭 시 모달창 열림 확인", async () => {
    // Given
    const folderList = mockProductFolderList;
    const folder = folderList[0];
    const productList = mockProductList;

    // When
    render(
      <OverlayProvider>
        <ProductTable
          folder={folder}
          folderList={folderList}
          productList={productList}
          setSelectedProductList={mockSetSelectedProductList}
        />
      </OverlayProvider>
    );

    await waitFor(() => {
      expect(screen.getByRole("grid")).toBeInTheDocument();
    });

    const productIdCell = screen.getByText("JQ 12370SIQ");
    fireEvent.click(productIdCell);

    // Then
    await waitFor(() => {
      expect(screen.getByTestId("product-detail-modal")).toBeInTheDocument();
    });
  });
});
