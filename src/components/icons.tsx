import Image from "next/image";

const Icons: {
  [key: string]: JSX.Element;
} = {
  back: (
    <Image src={"/svg/back.svg"} width={25} height={25.22} alt={"뒤로가기"} />
  ),
  cart: (
    <Image src={"/svg/cart.svg"} width={25} height={25.22} alt={"장바구니"} />
  ),
};

export default Icons;
