import { FailCallback, SucceedResponse, SuccessCallback } from "@/api/const";
import { deleteUser } from "@/api/users";

export const deleteUserList = (
  ordererList: string[],
  onSuccess: SuccessCallback<SucceedResponse[]>,
  onFail: FailCallback
) => {
  const deletePromises: Promise<SucceedResponse>[] = ordererList.map(
    (ordererId) => {
      return new Promise((resolve, reject) => {
        deleteUser(undefined, resolve, reject, ordererId);
      });
    }
  );

  return Promise.all(deletePromises).then(onSuccess).catch(onFail);
};
