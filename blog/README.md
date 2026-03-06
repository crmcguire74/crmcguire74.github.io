## Blog Content Structure

Use this structure for all local blog content pages:

- `blog/assets/blog-post-theme.css`: Shared visual theme for article pages.
- `blog/posts/template.html`: Reusable template for new posts.
- `blog/posts/*.html`: Published article files.

### Quick workflow

1. Copy `blog/posts/template.html` to a new file like `blog/posts/your-slug.html`.
2. Replace all `{{...}}` placeholders.
3. Add the new post metadata entry in `blog.html` (`blogPosts` array).
4. Set `url` to your local file path, for example: `/blog/posts/your-slug`.
