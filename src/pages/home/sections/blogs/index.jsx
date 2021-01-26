import React from 'react';
import {blogs} from './data';

export default function index() {

    const renderBlogPosts = () => {
        const data = blogs.map(blog => {
            const authorFullname = blog.author.firstname ? `${blog.author.firstname} ${blog.author.lastname}` : blog.author.username;
            return (
                <div ley={blog.id} className="col-md-6 col-lg-3 col-sm-12">
                    
                    {/* <!-- Blog Post --> */}
                    <div className="blog grid-blog">
                        <div className="blog-image">
                            <a href={`/blogs/${blog.slug}`}><img className="img-fluid" src={blog.image} alt={blog.title} /></a>
                        </div>
                        <div className="blog-content">
                            <ul className="entry-meta meta-item">
                                <li>
                                    <div className="post-author">
                                        <a href={`/doctor/profile/${blog.author.username}`}><img src={blog.author.avatar} alt={authorFullname} /> <span>{`Dr. ${authorFullname}`}</span></a>
                                    </div>
                                </li>
                                <li><i className="far fa-clock"></i>{` ${blog.publishDate}`}</li>
                            </ul>
                            <h3 className="blog-title"><a href={`/blogs/${blog.slug}`}>{blog.title}</a></h3>
                            <p className="mb-0">{blog.shortDescription}</p>
                        </div>
                    </div>
                    {/* <!-- /Blog Post --> */}
                    
                </div>
            );
        });
        return <div className="row blog-grid-row">{data}</div>
    };

    return (
        <section className="section section-blogs">
            <div className="container-fluid">
            
                {/* <!-- Section Header --> */}
                <div className="section-header text-center">
                    <h2>Blogs and News</h2>
                    <p className="sub-title">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                {/* <!-- /Section Header --> */}
                
                {renderBlogPosts()}
                <div className="view-all text-center"> 
                    <a href="/blogs" className="btn btn-primary">View All</a>
                </div>
            </div>
        </section>
    )
}
