import { SERVER_URL } from "@/components/const";
import { useEffect, useState } from "react";

const useProductList = () => {
  const [isProductListLoading, setIsProductListLoading] = useState(true);
  const [productList, setProductList] = useState(null);

  const getProductList = async () => {
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
      console.log(e);
    } finally {
      setIsProductListLoading(false);
    }
  };

  useEffect(() => {
    getProductList();
  }, []);

  return {
    productList,
    isProductListLoading,
    getProductList,
  };
};

export default useProductList;
