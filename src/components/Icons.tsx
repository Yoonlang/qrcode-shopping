import Image from "next/image";

const Icons: {
  [key: string]: JSX.Element;
} = {
  back: (
    <Image src={"/svg/back.svg"} width={25} height={25.22} alt={"뒤로가기"} />
  ),
  cart: (
    <Image src={"/svg/cart.svg"} width={25} height={22.22} alt={"장바구니"} />
  ),
  person: <Image src={"/svg/person.svg"} width={25} height={25} alt={"사람"} />,
  person_dark: (
    <Image src={"/svg/person_dark.svg"} width={14} height={14} alt={"사람"} />
  ),
  check: <Image src={"/svg/check.svg"} width={25} height={25} alt={"체크"} />,
  x: <Image src={"/svg/x.svg"} width={8} height={8} alt={"x"} />,
  list: <Image src={"/svg/list.svg"} width={12} height={12} alt={"목록"} />,
  delete: <Image src={"/svg/delete.svg"} width={14} height={14} alt={"삭제"} />,
  open: <Image src={"/svg/open.svg"} width={7} height={11} alt={"열기"} />,
  close: <Image src={"/svg/close.svg"} width={7} height={11} alt={"닫기"} />,
  select: <Image src={"/svg/select.svg"} width={12} height={13} alt={"선택"} />,
  error: <Image src={"/svg/error.svg"} width={10} height={10} alt={"에러"} />,
};

export default Icons;
