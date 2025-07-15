import matter from 'gray-matter';

// Import all markdown files
const blogPosts = import.meta.glob('../data/blog-posts/*.md', { 
  query: '?raw',
  import: 'default',
  eager: true 
});

export function getAllPosts() {
  const posts = Object.entries(blogPosts).map(([path, content]) => {
    const { data, content: markdown } = matter(content);
    const slug = path.split('/').pop().replace('.md', '');
    
    return {
      slug,
      ...data,
      content: markdown,
      date: new Date(data.date).toISOString(),
    };
  });

  // Sort posts by date (newest first)
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPostBySlug(slug) {
  const posts = getAllPosts();
  return posts.find(post => post.slug === slug);
}

export function searchPosts(posts, searchTerm) {
  if (!searchTerm.trim()) return posts;
  
  const term = searchTerm.toLowerCase();
  return posts.filter(post => 
    post.title.toLowerCase().includes(term) ||
    post.excerpt.toLowerCase().includes(term) ||
    post.content.toLowerCase().includes(term) ||
    post.tags.some(tag => tag.toLowerCase().includes(term))
  );
}

export function filterPostsByTag(posts, selectedTag) {
  if (!selectedTag) return posts;
  return posts.filter(post => post.tags.includes(selectedTag));
}

export function getAllTags(posts) {
  const allTags = posts.flatMap(post => post.tags);
  return [...new Set(allTags)].sort();
} 