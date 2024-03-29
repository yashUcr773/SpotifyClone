import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { authOptions } from "../auth/[...nextauth]/route";

const f = createUploadthing();

const auth = async (req: Request) => {
    const session = await getServerSession(authOptions)
    return session?.user
}

export const ourFileRouter = {
    coverImages: f({ image: { maxFileSize: "1MB" } })
        .middleware(async ({ req }) => {
            const user = await auth(req);
            if (!user) throw new UploadThingError("Unauthorized");
            return { user };
        })
        .onUploadComplete(async ({ metadata }) => {
            return { uploadedBy: metadata.user };
        }),

    audioFiles: f({ audio: { maxFileSize: "32MB" } })
        .middleware(async ({ req }) => {
            const user = await auth(req);
            if (!user) throw new UploadThingError("Unauthorized");
            return { user };
        })
        .onUploadComplete(async ({ metadata }) => {
            return { uploadedBy: metadata.user };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;