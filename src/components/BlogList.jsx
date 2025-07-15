import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts, searchPosts, filterPostsByTag, getAllTags } from '../utils/blogUtils';
import styles from './BlogList.module.css';

function BlogList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  
  const allPosts = useMemo(() => getAllPosts(), []);
  const allTags = useMemo(() => getAllTags(allPosts), [allPosts]);
  
  const filteredPosts = useMemo(() => {
    let posts = allPosts;
    posts = searchPosts(posts, searchTerm);
    posts = filterPostsByTag(posts, selectedTag);
    return posts;
  }, [allPosts, searchTerm, selectedTag]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedTag('');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Blog</h1>
        <p className={styles.subtitle}>
          Thoughts, tutorials, and insights about web development
        </p>
      </header>

      <div className={styles.filters}>
        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        
        <div className={styles.tagFilter}>
          <span className={styles.tagFilterLabel}>Filter by tag:</span>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
              className={`${styles.tagButton} ${selectedTag === tag ? styles.active : ''}`}
            >
              {tag}
            </button>
          ))}
          {(searchTerm || selectedTag) && (
            <button onClick={handleClearFilters} className={styles.clearFilters}>
              Clear filters
            </button>
          )}
        </div>
      </div>

      {filteredPosts.length > 0 ? (
        <div className={styles.postsGrid}>
          {filteredPosts.map((post) => (
            <article key={post.slug} className={styles.postCard}>
              <Link to={`/blog/${post.slug}`} className={styles.postTitle}>
                <h2>{post.title}</h2>
              </Link>
              
              <div className={styles.postMeta}>
                <span className={styles.postDate}>
                  {formatDate(post.date)} • {post.author}
                </span>
                <span className={styles.postReadTime}>{post.readTime}</span>
              </div>
              
              <p className={styles.postExcerpt}>{post.excerpt}</p>
              
              <div className={styles.postTags}>
                {post.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className={styles.noResults}>
          <h3 className={styles.noResultsTitle}>No posts found</h3>
          <p className={styles.noResultsText}>
            Try adjusting your search terms or clearing the filters.
          </p>
        </div>
      )}
    </div>
  );
}

export default BlogList; 