import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import Parser from "rss-parser";

interface MediumArticle {
  id: string | number;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  readTime: string;
  date: string;
  datePublished: string;
  link: string;
  alt: string;
  platform: string;
}

async function startServer() {
  const app = express();
  const PORT = 3000;
  const parser = new Parser();

  // Middleware
  app.use(express.json());

  // API route for fetching Medium articles
  app.get("/api/medium", async (req, res) => {
    try {
      const response = await fetch("https://medium.com/feed/@rupsah800", {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch Medium RSS feed: ${response.status} ${response.statusText}`);
      }

      const xmlText = await response.text();
      const feed = await parser.parseString(xmlText);

      const articles: MediumArticle[] = feed.items.map((item, idx) => {
        const content = item["content:encoded"] || "";
        
        // Extract first image URL from <content:encoded> or enclosure
        let image = "";
        const imgRegex = /<img[^>]+src="([^">]+)"/;
        const match = content.match(imgRegex);
        if (match && match[1]) {
          image = match[1];
        } else if (item.enclosure && item.enclosure.url) {
          image = item.enclosure.url;
        }

        // If no image is found, use a fallback image from our static list
        if (!image) {
          const fallbackImages = [
            "https://cdn-images-1.medium.com/max/1024/1*Scsf5eojga7FmZinEexH3Q.png",
            "https://cdn-images-1.medium.com/max/1024/1*xygvqAUKQ9Ql7T6sJitI4A.png",
            "https://cdn-images-1.medium.com/max/1024/1*ISQKGK1NULnl9Kc-qiodYg.jpeg"
          ];
          image = fallbackImages[idx % fallbackImages.length];
        }

        // Strip HTML to get clean excerpt
        const cleanText = content
          .replace(/<[^>]*>/g, "") // strip HTML tags
          .replace(/\s+/g, " ")    // normalize whitespace
          .trim();
        
        const excerpt = cleanText.length > 180 
          ? cleanText.substring(0, 180).trim() + "..." 
          : cleanText || "Read my latest thoughts and insights on Medium.";

        // Word count / read time calculation (200 words per minute average)
        const wordCount = cleanText.split(/\s+/).filter(Boolean).length;
        const readTimeVal = Math.max(1, Math.ceil(wordCount / 200));
        const readTime = `${readTimeVal} min read`;

        // Date formatting
        const dateStr = item.pubDate || "";
        let formattedDate = dateStr;
        let datePublished = dateStr;
        try {
          if (dateStr) {
            const d = new Date(dateStr);
            formattedDate = d.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric"
            });
            datePublished = d.toISOString().split("T")[0];
          }
        } catch (e) {
          console.error("Error formatting date", e);
        }

        // Categories / Tags
        const categories = item.categories && item.categories.length > 0
          ? item.categories.slice(0, 2).map((cat: string) => {
              return cat.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
            }).join(" • ")
          : "Social Media • SMM";

        return {
          id: item.guid || item.link || idx.toString(),
          title: item.title || "Medium Article",
          category: categories,
          excerpt: excerpt,
          image: image,
          readTime: readTime,
          date: formattedDate,
          datePublished: datePublished,
          link: item.link || "https://medium.com/@rupsah800",
          alt: `Featured image for ${item.title || "Medium Article"}`,
          platform: "Medium"
        };
      });

      res.json({ success: true, articles });
    } catch (error: any) {
      console.error("Medium RSS proxy error:", error);
      res.status(500).json({ 
        success: false, 
        error: error.message || "Failed to fetch Medium RSS feed" 
      });
    }
  });

  // Serve static assets and handle Client Routing
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
