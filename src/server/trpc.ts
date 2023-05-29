import { initTRPC } from "@trpc/server";
import { Context } from "./context";
import superjson from "superjson";
/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
export const trpc = initTRPC.context<Context>().create({
    transformer: superjson,
});
