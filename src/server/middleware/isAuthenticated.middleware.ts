import { trpc } from "../trpc";

export const isAuthenticatedMiddleware = trpc.middleware(
    async ({ ctx, next }) => {
        if (!ctx.session?.user) {
            throw new Error("Not authenticated");
        }

        return next({
            ctx: {
                session: {
                    user: ctx.session.user,
                    expires: ctx.session.expires,
                },
            },
        });
    }
);

export default isAuthenticatedMiddleware;
