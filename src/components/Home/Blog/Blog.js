import React from 'react';
import './Blog.css';

const Blog = ({ blog }) => {
    const { img, title, description, author } = blog;
    return (
        <div>
            <div className="col">
                <div className="card single-blog">
                    <img src={img} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="mb-1 author">{author}</p>
                        <p className="card-text">{description.slice(0, 200)}</p>
                        <button className="shop-now-button-others blog-button">READ MORE</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Blog;