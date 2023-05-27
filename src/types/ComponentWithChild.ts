import { FC } from "react";

export interface ComponentWithChild<T = unknown>
    extends FC<
        {
            children?: React.ReactNode;
        } & T
    > {}

export default ComponentWithChild;
