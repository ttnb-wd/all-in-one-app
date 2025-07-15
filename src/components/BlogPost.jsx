import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPostBySlug } from '../utils/blogUtils';
import styles from './BlogPost.module.css';

function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className={styles.container}>
        <Link to="/blog" className={styles.backLink}>
          <span className={styles.backIcon}>←</span>
          Back to Blog
        </Link>
        <div className={styles.error}>
          <h1 className={styles.errorTitle}>Post Not Found</h1>
          <p className={styles.errorText}>
            The blog post you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={styles.container}>
      <Link to="/blog" className={styles.backLink}>
        <span className={styles.backIcon}>←</span>
        Back to Blog
      </Link>
      
      <article className={styles.article}>
        <header className={styles.header}>
          <h1 className={styles.title}>{post.title}</h1>
          
          <div className={styles.meta}>
            <div>
              <span className={styles.author}>By {post.author}</span>
              <span> • </span>
              <span className={styles.date}>{formatDate(post.date)}</span>
            </div>
            <span className={styles.readTime}>{post.readTime}</span>
          </div>
          
          <div className={styles.tags}>
            {post.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </header>
        
        <div className={styles.content}>
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            children={post.content}
          />
        </div>
      </article>
    </div>
  );
}

export default BlogPost; 