import "@testing-library/jest-dom";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Formik } from "formik";

import { initialValues } from "@/components/Manager/const";
import { mockProductList } from "@/components/Manager/Product/const";
import { ProductDetailModal } from "@/components/Manager/Product/ProductTable";

describe("ProductDetailModal", () => {
  it("초기 렌더링 확인", async () => {
    // Given
    const modalProductData = mockProductList[0];

    // When
    render(
      <Formik initialValues={{}} onSubmit={jest.fn()}>
        {(formik) => (
          <ProductDetailModal
            isModalOpen={true}
            closeModal={jest.fn()}
            modalProductData={modalProductData}
            formik={formik}
          />
        )}
      </Formik>
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
      <Formik initialValues={initialValues} onSubmit={jest.fn()}>
        {(formik) => (
          <ProductDetailModal
            isModalOpen={true}
            closeModal={jest.fn()}
            modalProductData={modalProductData}
            formik={formik}
          />
        )}
      </Formik>
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
