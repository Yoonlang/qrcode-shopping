import { deleteUser } from "@/api/users";

export const deleteUserList = (userList: string[]) => {
  const deletePromises = userList.map((userId) => {
    return deleteUser(undefined, userId);
  });

  return Promise.all(deletePromises);
};
