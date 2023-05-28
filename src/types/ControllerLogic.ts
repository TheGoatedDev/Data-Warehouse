import { Context } from "@/server/context";

export type ControllerLogic<U, T = unknown> = (input: {
    ctx: Context;
    input: T;
}) => Promise<U>;
