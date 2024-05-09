import React, { useCallback, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Globe } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import { ShortLinkSchema, shortLinkSchema } from "@/validation-schemas";
import CopyButton from "./copy-button";

const ShortLink = () => {
  const [longLinkCopy, setLongLinkCopy] = useState("");
  const [shortLink, setShortLink] = useState("");
  const { toast } = useToast();

  const form = useForm<ShortLinkSchema>({
    defaultValues: { url: "" },
    resolver: zodResolver(shortLinkSchema),
  });

  const onSubmit = useCallback(
    (values: ShortLinkSchema) => {
      (async () => {
        try {
          const res = await fetch("/api/link/add", {
            method: "post",
            body: JSON.stringify({
              url: values.url,
            }),
          });

          const { data } = (await res.json()) as any;
          setShortLink(data.shortLink);
          setLongLinkCopy(values.url);
          form.reset();
        } catch (error) {
          toast({
            title: "Could not short link",
            variant: "destructive",
          });
        }
      })();
    },
    [form, toast]
  );

  return (
    <div className="text-center w-full text-white flex flex-col justify-center gap-4 items-center">
      <Form {...form}>
        <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-12 grid-cols-1 gap-4 w-full text-slate-300">
            <div className="md:col-span-10 col-span-full">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start">
                    <FormLabel>Long link</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Exp. https://www.google.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="md:col-span-2 col-span-full self-end">
              <Button className="w-full" type="submit">
                Short
              </Button>
            </div>
          </div>
        </form>
      </Form>
      {shortLink && (
        <div className="flex flex-col gap-4 w-full p-4 border rounded-md bg-background">
          <div className="flex md:flex-row flex-col md:items-center gap-2 w-full text-slate-300">
            <Link
              href={shortLink}
              target="_blank"
              referrerPolicy="no-referrer"
              className="flex gap-2 w-full h-[40px] items-center justify-start underline rounded-md text-blue-600"
            >
              <Globe className="h-5 w-5 flex-shrink-0" />
              <span className="break-all text-left">{shortLink}</span>
            </Link>
            <div className="flex gap-2">
              <CopyButton text={shortLink} />
            </div>
          </div>
          <p className="flex gap-2 w-full items-center justify-start">
            <span className="break-all text-left">Link: {longLinkCopy}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default ShortLink;
