import { trpc } from "../trpc";

export const appRouter = trpc.router({
    // ...
});
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
