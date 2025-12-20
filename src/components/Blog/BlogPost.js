import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import blogIndex from "./blogIndex.json";
import "./blog.css";

function BlogPost() {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [postMeta, setPostMeta] = useState(null);

  useEffect(() => {
    const post = blogIndex.find((p) => p.id === id);
    if (!post) return;

    setPostMeta(post);

    fetch(`/posts/${post.file}`)
      .then((res) => {
        if (!res.ok) throw new Error("Post file not found");
        return res.text();
      })
      .then((text) => {
        const cleaned = text.replace(/---[\s\S]*?---/, "");
        setContent(cleaned.trim());
      })
      .catch(() => setContent("Failed to load post."));
  }, [id]);

  if (!postMeta) {
    return (
      <Container className="blog-post">
        <p>Post not found.</p>
        <Link to="/blog">← Back to blog</Link>
      </Container>
    );
  }

  return (
    <Container className="blog-post">
      <Link to="/blog" className="blog-back">
        ← Back
      </Link>

      <h1 className="blog-post-title">{postMeta.title}</h1>
      <p className="blog-post-date">{postMeta.date}</p>

      <ReactMarkdown className="blog-markdown">
        {content}
      </ReactMarkdown>
    </Container>
  );
}

export default BlogPost;
