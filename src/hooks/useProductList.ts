import { useEffect, useState } from "react";

import { SERVER_URL } from "@/components/const";

const useProductList = () => {
  const [isProductListLoading, setIsProductListLoading] = useState(true);
  const [productList, setProductList] = useState(null);
  const [error, setError] = useState(null);

  const refreshProductList = async () => {
    try {
      setIsProductListLoading(true);
      const res = await fetch(`${SERVER_URL}/products`, {
        method: "get",
      });
      const data = await res.json();
      if (data?.error) {
        throw data.error;
      }
      setProductList(data);
    } catch (e) {
      setError(e.error || e.message);
    } finally {
      setIsProductListLoading(false);
    }
  };

  useEffect(() => {
    refreshProductList();
  }, []);

  return {
    productList,
    isProductListLoading,
    error,
    refreshProductList,
  };
};

export default useProductList;
