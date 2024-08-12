import { Folder } from "@/const";

export const sortFolderListByType = (
  folderList: Folder[],
  type: "user" | "product"
): Folder[] => {
  return folderList
    .filter((folder) => folder.type === type)
    .sort((a, b) => {
      if (a.id === `${type}-default`) return -1;
      if (b.id === `${type}-default`) return 1;

      if (a.id === `${type}-trash-can`) return 1;
      if (b.id === `${type}-trash-can`) return -1;

      return a.creationTime.localeCompare(b.creationTime);
    });
};
