// Posts management
class PostsManager {
    constructor() {
        this.posts = JSON.parse(localStorage.getItem('blog_posts')) || [];
        this.postsGrid = document.getElementById('posts-grid');
    }

    addPost(post) {
        post.id = Date.now();
        this.posts.unshift(post);
        this.savePosts();
        this.renderPosts();
    }

    updatePost(id, updatedPost) {
        const index = this.posts.findIndex(p => p.id === id);
        if (index !== -1) {
            this.posts[index] = { ...this.posts[index], ...updatedPost };
            this.savePosts();
            this.renderPosts();
        }
    }

    deletePost(id) {
        if (confirm('Are you sure you want to delete this post?')) {
            this.posts = this.posts.filter(post => post.id !== id);
            this.savePosts();
            this.renderPosts();
        }
    }

    savePosts() {
        localStorage.setItem('blog_posts', JSON.stringify(this.posts));
    }

    renderPosts() {
        this.postsGrid.innerHTML = this.posts.map(post => `
            <article class="post-card">
                <img src="${post.image || 'https://via.placeholder.com/800x400'}" alt="${post.title}" class="post-image">
                <div class="post-content">
                    <div class="post-meta">
                        <i data-lucide="clock" class="icon-sm"></i>
                        <span>${post.readTime} min read</span>
                        <span class="mx-2">•</span>
                        <span>${post.date}</span>
                    </div>
                    <h2 class="post-title">${post.title}</h2>
                    <p class="post-excerpt">${this.formatContent(post.content.substring(0, 150))}...</p>
                    <div class="post-footer">
                        <span class="author">By ${post.author}</span>
                        <div class="post-actions">
                            <button class="btn-icon" onclick="editor.editPost(${post.id})">
                                <i data-lucide="edit" class="icon-sm"></i>
                            </button>
                            <button class="btn-icon" onclick="postsManager.deletePost(${post.id})">
                                <i data-lucide="trash-2" class="icon-sm"></i>
                            </button>
                            <button class="btn-icon" onclick="postsManager.viewFullPost(${post.id})">
                                <i data-lucide="eye" class="icon-sm"></i> 
                            </button>
                        </div>
                    </div>
                </div>
            </article>
        `).join('');
        
        lucide.createIcons();
    }

    // Method to handle viewing full post
    viewFullPost(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (post) {
            const fullPostModal = this.createFullPostModal(post);
            document.body.appendChild(fullPostModal);
        }
    }

    // Method to create the full post modal
    createFullPostModal(post) {
        const modal = document.createElement('div');
        modal.classList.add('full-post-modal');
        modal.innerHTML = `
            <div class="full-post-modal-content">
                <button class="close-modal-btn">&times;</button>
                <h2>${post.title}</h2>
                <img src="${post.image || 'https://via.placeholder.com/800x400'}" alt="${post.title}" class="full-post-image">
                <p>${this.formatContent(post.content)}</p> 
                <div class="post-footer">
                    <span class="author">By ${post.author}</span>
                    <span class="date">${post.date}</span>
                </div>
            </div>
        `;
        
        modal.querySelector('.close-modal-btn').addEventListener('click', () => {
            modal.remove();
        });

        return modal;
    }

    // New method to format content with paragraph spaces
    /*formatContent(content) {
        // Ensure that paragraphs are separated by <p> tags in the rendered content
        const formattedContent = content
            .split('\n') // Split content by line breaks
            .map(paragraph => `<p>${paragraph.trim()}</p>`) // Wrap each paragraph in <p> tags
            .join('');
        
        return formattedContent;
    }*/
        formatContent(content) {
            // Split content by paragraph (i.e., double newlines) and add space between paragraphs
            return content
                .split('\n\n') // Split by paragraphs
                .join('\n\n<br><br>\n\n'); // Add extra space between paragraphs
}
}