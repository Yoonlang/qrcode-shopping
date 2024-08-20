import { deleteUser } from "@/api/users";

export const deleteUserList = (ordererList: string[]) => {
  const deletePromises = ordererList.map((ordererId) => {
    return deleteUser(undefined, ordererId);
  });

  return Promise.all(deletePromises);
};
