// Initialize Lucide icons
lucide.createIcons();

// Initialize managers
const postsManager = new PostsManager();
const editor = new Editor(postsManager);

// Initialize posts
postsManager.renderPosts();

// Home navigation
document.querySelector('[data-nav="home"]').addEventListener('click', (e) => {
    e.preventDefault();
    editor.hideEditor();
});
