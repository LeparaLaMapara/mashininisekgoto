import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./blog.css";

function BlogPost() {
  const { slug } = useParams();
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Blog slug:", slug); // <--- see what you get in the console

    if (!slug) {
      setError("No blog post specified.");
      return;
    }

    (async () => {
      try {
        const file = await import(`./posts/${slug}.md`);
        const res = await fetch(file.default);
        const text = await res.text();
        setContent(text);
        setError(null);
      } catch (e) {
        console.error(e);
        setError(`Could not load post: ${slug}.md`);
      }
    })();
  }, [slug]);

  if (error) {
    return (
      <div className="blog-post-container">
        <h1 className="blog-heading">Blog not found</h1>
        <p style={{ textAlign: "center" }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="blog-post-container">
      <ReactMarkdown remarkPlugins={[remarkGfm]} className="markdown-body">
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default BlogPost;
