import z from "@/lib/zod";

const url = z.string().url({
  message: "Invalid URL",
});

export const addLinkReqBodySchema = z.object({
  url,
  expiration: z.number().optional(),
});

export type AddLinkReqBody = z.infer<typeof addLinkReqBodySchema>;

export const shortLinkSchema = z.object({
  url,
});

export type ShortLinkSchema = z.infer<typeof shortLinkSchema>;
