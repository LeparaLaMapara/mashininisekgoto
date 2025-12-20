import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import blogIndex from "./blogIndex.json";
import "./blog.css";

function BlogList() {
  const postsByYear = blogIndex.reduce((acc, post) => {
    const year = new Date(post.date).getFullYear();

    if (!acc[year]) acc[year] = [];
    acc[year].push(post);

    return acc;
  }, {});

  const sortedYears = Object.keys(postsByYear)
    .sort((a, b) => b - a);

  return (
    <Container className="blog-archive">
      {sortedYears.map((year) => (
        <div key={year} className="blog-year-section">
          <h2 className="blog-year">{year}</h2>

          <ul className="blog-list">
            {postsByYear[year].map((post) => (
              <li key={post.id} className="blog-list-item">
                <Link to={`/blog/${post.id}`} className="blog-title-link">
                  {post.title}
                </Link>
                <span className="blog-date">{post.date}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </Container>
  );
}


export default BlogList;
