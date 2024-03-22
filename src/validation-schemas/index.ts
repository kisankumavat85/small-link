import z from "@/libs/zod";

export const addLinkReqBodySchema = z.object({
  url: z.string().url({
    message: "Invalid URL",
  }),
});

export type AddLinkReqBody = z.infer<typeof addLinkReqBodySchema>;
