import z from "@/lib/zod";

export const addLinkReqBodySchema = z.object({
  url: z.string().url({
    message: "Invalid URL",
  }),
  expiration: z.number().optional(),
});

export type AddLinkReqBody = z.infer<typeof addLinkReqBodySchema>;
