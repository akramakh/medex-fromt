import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {fetchTags, fetchCategories, fetchLatestBlogs} from '../../actions/index';
import BlogList from './list';
import BlogGrid from './grid';
import BlogItem from './item';
import Publish from './publish';
import './style.scss';

export default function Blogs() {
    const dispatch = useDispatch();

    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const [latestBlogs, setLatestBlogs] = useState([]);
    const [isItem, setIsItem] = useState(false);
    const [isGrid, setIsGrid] = useState(false);
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        dispatch(fetchLatestBlogs((success, data) => {
            if (success){
                setLatestBlogs(data);
            }else{

            }
        }));
        dispatch(fetchTags((success, data) => {
            if (success){
                setTags(data);
            }else{

            }
        }));
        dispatch(fetchCategories((success, data) => {
            if (success){
                setCategories(data);
            }else{

            }
        }));
        const pathname = window.location.pathname;
        let blog_id = pathname.split('/blogs/')[1];
        if (blog_id !== undefined && blog_id.length > 0){
            blog_id = blog_id.split('/')[0]
            setIsItem(true);
            setBlog(blog_id);
            // fetch the specific Patient Object
        }else{
            // fetch all Patient objects
        }

        setLoading(false);
        return () => {
            
        }
    }, [dispatch]);

    if (loading){
        const antIcon = <LoadingOutlined spin />;
        return (
            <div className="spinner">
                <Spin indicator={antIcon} /> 
            </div>
        )
    }

    const renderBlogPage = () => {
        if(isItem) {
            if (blog === 'publish'){
                return <Publish />
            }
            return <BlogItem item={blog} />
        }
    
        if(isGrid || true) {
            return <BlogGrid />
        }
        
        return <BlogList />
    }

    const renderLatestBlogs = () => {
        const data = latestBlogs.map(blog => {
            const blogUrl = `/blogs/${blog.slug}`;
            const blogDate = moment(blog.published_at).format('YYYY-MM-DD');
            return (
                <li>
                    <div className="post-thumb">
                        <a href={blogUrl}>
                            <img className="img-fluid" src={blog.image} alt="" />
                        </a>
                    </div>
                    <div className="post-info">
                        <h4>
                            <a href={blogUrl}>{blog.title}</a>
                        </h4>
                        <p>{blogDate}</p>
                    </div>
                </li>
            )
        })
        return (
            <div className="card post-widget">
                <div className="card-header">
                    <h4 className="card-title">Latest Posts</h4>
                </div>
                <div className="card-body">
                    <ul className="latest-posts">
                        {data}
                    </ul>
                </div>
            </div>
        )
    }

    const renderCatigories = () => {
        const data = categories.map(cat => {
            return <li><a href={`/categories/${cat.slug}`}>{cat.name} <span>({cat.blogs_count})</span></a></li>
        })
        return (
            <div className="card category-widget">
                <div className="card-header">
                    <h4 className="card-title">Blog Categories</h4>
                </div>
                <div className="card-body">
                    <ul className="categories">
                        {data}
                    </ul>
                </div>
            </div>
        )
    }

    const renderTags = () => {
        const data = tags.map(tag => {
            return <li><a href={`/categories/${tag.slug}`} className="tag">{tag.name}</a></li>
        })
        return (
            <div className="card tags-widget">
                <div className="card-header">
                    <h4 className="card-title">Tags</h4>
                </div>
                <div className="card-body">
                    <ul className="tags">
                        {data}
                    </ul>
                </div>
            </div>
        )
    }

    return (
        <div id="blog-list" className="container">
             
            <div className="row">
                {renderBlogPage()}
                <div className="col-lg-4 col-md-12 sidebar-right theiaStickySidebar">

                    <div className="card search-widget">
                        <div className="card-body">
                            <form className="search-form">
                                <div className="input-group">
                                    <input type="text" placeholder="Search..." className="form-control" />
                                    <div className="input-group-append">
                                        <button type="submit" className="btn btn-primary"><i className="fa fa-search"></i></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {renderLatestBlogs()}
                    {renderCatigories()}
                    {renderTags()}
                    
                </div>
            </div>
        </div>
    )
}
