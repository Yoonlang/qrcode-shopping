import { FailCallback, SucceedResponse, SuccessCallback } from "@/api/const";
import { putUser , deleteUser } from "@/api/users";
import { User } from "@/const";
import { transformUserForUpdate } from "@/services/util";

export const permanentDeleteOrdererList = (
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

export const editUserRemark = (
  user: User,
  onSuccess: SuccessCallback<SucceedResponse>,
  onFail: FailCallback
) => {
  return putUser(transformUserForUpdate(user), onSuccess, onFail, user.userId);
};
