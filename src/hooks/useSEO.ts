import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

export const useSEO = ({ title, description, image, url }: SEOProps) => {
  useEffect(() => {
    // Update Document Title
    document.title = `${title} | St. Kabir Public Sr. Sec. School`;

    // Helper to find or create meta tag
    const updateMeta = (name: string, property: boolean, value: string) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        if (property) {
          element.setAttribute("property", name);
        } else {
          element.setAttribute("name", name);
        }
        document.head.appendChild(element);
      }
      element.setAttribute("content", value);
    };

    // Update standard meta tags
    updateMeta("description", false, description);

    // Update Open Graph tags (Google uses these to display preview snippets)
    updateMeta("og:title", true, title);
    updateMeta("og:description", true, description);
    if (image) {
      // Convert relative paths to absolute URLs
      const absoluteImage = image.startsWith("http") ? image : `${window.location.origin}${image}`;
      updateMeta("og:image", true, absoluteImage);
    }
    if (url) {
      const absoluteUrl = url.startsWith("http") ? url : `${window.location.origin}${url}`;
      updateMeta("og:url", true, absoluteUrl);
    }

    // Update Twitter tags
    updateMeta("twitter:title", false, title);
    updateMeta("twitter:description", false, description);
    if (image) {
      const absoluteImage = image.startsWith("http") ? image : `${window.location.origin}${image}`;
      updateMeta("twitter:image", false, absoluteImage);
    }
  }, [title, description, image, url]);
};
