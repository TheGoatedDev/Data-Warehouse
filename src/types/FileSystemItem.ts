export interface IFileSystemItem {
    Name: string;
    Path: string;
    LastModified: Date;
    Size: number;
    StorageClass: string;
    Type?: "file" | "folder";
    items?: IFileSystemItem[];
}

export default IFileSystemItem;
