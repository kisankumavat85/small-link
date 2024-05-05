"use server";

export const getPageTitle = async (url: string): Promise<string | null> => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch url: ${url}`);
    }

    const html = await response.text();
    const titleTag = html.match(/<title>(.*?)<\/title>/)?.[0];

    if (!titleTag) return null;

    const title = titleTag
      .replace("<title>", "")
      .replace("</title>", "")
      .trim();

    return title;
  } catch (error) {
    console.error("Error fetching page title:", error);
    return null;
  }
};
