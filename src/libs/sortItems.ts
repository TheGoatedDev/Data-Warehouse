import IFileSystemItem from "@/types/FileSystemItem";

export const sortItems = (items: IFileSystemItem[]) => {
    // Sort items with folders first, then files.
    const sortedItems = items.sort((a, b) => {
        if (a.Type === "folder" && b.Type === "file") {
            return -1;
        } else if (a.Type === "file" && b.Type === "folder") {
            return 1;
        } else {
            return 0;
        }
    });

    return sortedItems;
};

export const sortItemsDeep = (items: IFileSystemItem[]) => {
    // Sort items with folders first, then files.
    // This function is recursive, so it will sort all items in the tree.
    const sortedItems = sortItems(items);

    sortedItems.forEach((item) => {
        if (item.Type === "folder" && item.items) {
            item.items = sortItemsDeep(item.items);
        }
    });

    return sortedItems;
};
