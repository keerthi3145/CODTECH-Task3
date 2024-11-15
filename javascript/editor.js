// Editor management
class Editor {
    constructor(postsManager) {
        this.postsManager = postsManager;
        this.editor = document.getElementById('editor');
        this.mainContent = document.getElementById('main-content');
        this.postForm = document.getElementById('post-form');
        this.cancelBtn = document.getElementById('cancel-edit');
        this.editingPostId = null;

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        document.querySelectorAll('.btn-start-writing').forEach(btn => {
            btn.addEventListener('click', () => this.showEditor());
        });

        this.cancelBtn.addEventListener('click', () => this.hideEditor());

        this.postForm.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    showEditor(post = null) {
        this.mainContent.style.display = 'none';
        this.editor.classList.remove('hidden');
        
        if (post) {
            this.editingPostId = post.id;
            document.getElementById('title').value = post.title;
            document.getElementById('content').value = post.content;
            document.getElementById('image').value = post.image;
            document.querySelector('.editor-title').textContent = 'Edit Post';
        } else {
            this.editingPostId = null;
            this.postForm.reset();
            document.querySelector('.editor-title').textContent = 'Create New Post';
        }
    }

    hideEditor() {
        this.mainContent.style.display = 'block';
        this.editor.classList.add('hidden');
        this.editingPostId = null;
        this.postForm.reset();
    }

    handleSubmit(e) {
        e.preventDefault();
        const formData = {
            title: document.getElementById('title').value,
            content: document.getElementById('content').value,
            image: document.getElementById('image').value,
            date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            author: 'Anonymous',
            readTime: Math.ceil(document.getElementById('content').value.split(' ').length / 200)
        };

        if (this.editingPostId) {
            this.postsManager.updatePost(this.editingPostId, formData);
        } else {
            this.postsManager.addPost(formData);
        }

        this.hideEditor();
    }

    editPost(id) {
        const post = this.postsManager.posts.find(p => p.id === id);
        if (post) {
            this.showEditor(post);
        }
    }
}