import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/firebase';
import './Commstyle.css'

const POSTS_URL = 'http://localhost:5000/posts';

const postsRequest = async (options = {}) => {
    const token = await auth.currentUser.getIdToken();
    let response;
    try {
        response = await fetch(POSTS_URL, {
            ...options,
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        });
    } catch (error) {
        throw new Error('Could not reach the server. Check that the back-end is running.');
    }
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        throw new Error(data.error || 'Something went wrong.');
    }
    return data;
};

function CommunityPage() {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        postsRequest()
            .then(setPosts)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    const addPost = async (event) => {
        event.preventDefault();
        setError('');
        setSubmitting(true);
        try {
            const post = await postsRequest({ method: 'POST', body: JSON.stringify({ title, content }) });
            setPosts((current) => [post, ...current]);
            setTitle('');
            setContent('');
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <section className="abheader">
                <div className="abtext-box">
                    <h1 style={{ paddingTop: '30px', fontSize: '50px' }}>Empowering Health: Our Community Hub</h1>
                </div>
            </section>

            <section className="add-post" style={{ textAlign: 'center' }}>
                <h2>Add New Post</h2>
                <form id="post-form" onSubmit={(event) => addPost(event)} style={{ maxWidth: '500px', margin: 'auto' }}>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="post-title" style={{ display: 'block' }}>Title:</label>
                        <input type="text" id="post-title" name="title" placeholder="Enter the post title" style={{ width: '100%', padding: '8px' }} value={title} onChange={(e) => setTitle(e.target.value)} maxLength={120} required />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="post-content" style={{ display: 'block' }}>Content:</label>
                        <textarea id="post-content" name="content" placeholder="Write your post content here" style={{ width: '100%', height: '150px', padding: '8px' }} value={content} onChange={(e) => setContent(e.target.value)} maxLength={2000} required></textarea>
                    </div>
                    {error && <p className="post-error">{error}</p>}
                    <div>
                        <button type="submit" disabled={submitting} style={{ backgroundColor: '#88e2e8', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>{submitting ? 'Posting...' : 'Add Post'}</button>
                    </div>
                </form>
            </section>

            <section className="blogs" id="new-post-section">
                <br /><br />
                {loading && <p className="post-status">Loading posts...</p>}
                {!loading && !error && posts.length === 0 && (
                    <p className="post-status">No posts yet. Be the first to share something.</p>
                )}
                {posts.map((post) => (
                    <div className="blog" key={post.id}>
                        <h3>{post.title}</h3>
                        <p className="blog-meta">{post.author} &middot; {new Date(post.createdAt).toLocaleDateString()}</p>
                        <p className="blog-content">{post.content}</p>
                    </div>
                ))}
                <br />
            </section>
        </div>
    );
}

export default CommunityPage;