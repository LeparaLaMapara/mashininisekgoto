import React from "react";
import { Link } from "react-router-dom";
import blogIndex from "./blogIndex.json";
import "./blog.css";

function BlogList() {
  return (
    <div className="blog-container">
      <h1 className="blog-heading">Blog</h1>

      {Object.keys(blogIndex)
        .sort((a, b) => b - a)
        .map((year) => (
          <div key={year} className="blog-year-section">
            <h2 className="blog-year">{year}</h2>

            {blogIndex[year].map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="blog-post-link"
              >
                <div className="blog-post-entry">
                  <span className="blog-post-title">{post.title}</span>
                  <span className="blog-post-date">{post.date}</span>
                </div>
              </Link>
            ))}
          </div>
        ))}
    </div>
  );
}

export default BlogList;
