import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import { FaClock } from 'react-icons/fa';
import Blog_2_img from '../../assets/img/blog/blog-02.jpg';
import Doc_2_img from '../../assets/img/doctors/doctor-thumb-02.jpg';
import {fetchBlogs} from '../../actions/index';
import Avatar from '../../components/avatar';

const init_blogs = [
    {
        id: 100,
        slug: "blog-100",
        title: "MedEX – Making your clinic painless visit?",
        cover_image: Blog_2_img,
        pub_date: "20-5-2020",
        description: "Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.",
        doctor: {
            id: 100,
            first_name: "Michelle",
            last_name: "Fairfax",
            username: "michellefairfax",
            avatar: Doc_2_img,
            email: "michellefairfax@example.com",
            phone: "+1 504 368 6874",
            location: "Indiana, United States"
        },
    },
    {
        id: 101,
        slug: "blog-101",
        title: "What are the benefits of Online Doctor Booking?",
        cover_image: Blog_2_img,
        pub_date: "22-5-2020",
        description: "Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.",
        doctor: {
            id: 101,
            first_name: "John",
            last_name: "Doe",
            username: "johndoe",
            avatar: Doc_2_img,
            email: "johndoe@example.com",
            phone: "+1 504 368 6874",
            location: "Indiana, United States"
        },
    },
    {
        id: 103,
        slug: "blog-103",
        title: "MedEX – Making your clinic painless visit?",
        cover_image: Blog_2_img,
        pub_date: "20-5-2020",
        description: "Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.",
        doctor: {
            id: 103,
            first_name: "Michelle",
            last_name: "Fairfax",
            username: "michellefairfax",
            avatar: Doc_2_img,
            email: "michellefairfax@example.com",
            phone: "+1 504 368 6874",
            location: "Indiana, United States"
        },
    },
    {
        id: 104,
        slug: "blog-104",
        title: "What are the benefits of Online Doctor Booking?",
        cover_image: Blog_2_img,
        pub_date: "22-5-2020",
        description: "Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.",
        doctor: {
            id: 104,
            first_name: "John",
            last_name: "Doe",
            username: "johndoe",
            avatar: Doc_2_img,
            email: "johndoe@example.com",
            phone: "+1 504 368 6874",
            location: "Indiana, United States"
        },
    },
    {
        id: 105,
        slug: "blog-105",
        title: "MedEX – Making your clinic painless visit?",
        cover_image: Blog_2_img,
        pub_date: "20-5-2020",
        description: "Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.",
        doctor: {
            id: 105,
            first_name: "Michelle",
            last_name: "Fairfax",
            username: "michellefairfax",
            avatar: Doc_2_img,
            email: "michellefairfax@example.com",
            phone: "+1 504 368 6874",
            location: "Indiana, United States"
        },
    },
    {
        id: 106,
        slug: "blog-106",
        title: "What are the benefits of Online Doctor Booking?",
        cover_image: Blog_2_img,
        pub_date: "22-5-2020",
        description: "Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.",
        doctor: {
            id: 106,
            first_name: "John",
            last_name: "Doe",
            username: "johndoe",
            avatar: Doc_2_img,
            email: "johndoe@example.com",
            phone: "+1 504 368 6874",
            location: "Indiana, United States"
        },
    },
    {
        id: 107,
        slug: "blog-107",
        title: "What are the benefits of Online Doctor Booking?",
        cover_image: Blog_2_img,
        pub_date: "22-5-2020",
        description: "Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.",
        doctor: {
            id: 107,
            first_name: "John",
            last_name: "Doe",
            username: "johndoe",
            avatar: Doc_2_img,
            email: "johndoe@example.com",
            phone: "+1 504 368 6874",
            location: "Indiana, United States"
        },
    },
    {
        id: 108,
        slug: "blog-108",
        title: "MedEX – Making your clinic painless visit?",
        cover_image: Blog_2_img,
        pub_date: "20-5-2020",
        description: "Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.",
        doctor: {
            id: 108,
            first_name: "Michelle",
            last_name: "Fairfax",
            username: "michellefairfax",
            avatar: Doc_2_img,
            email: "michellefairfax@example.com",
            phone: "+1 504 368 6874",
            location: "Indiana, United States"
        },
    },
    {
        id: 109,
        slug: "blog-109",
        title: "What are the benefits of Online Doctor Booking?",
        cover_image: Blog_2_img,
        pub_date: "22-5-2020",
        description: "Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.",
        doctor: {
            id: 109,
            first_name: "John",
            last_name: "Doe",
            username: "johndoe",
            avatar: Doc_2_img,
            email: "johndoe@example.com",
            phone: "+1 504 368 6874",
            location: "Indiana, United States"
        },
    },
    {
        id: 110,
        slug: "blog-110",
        title: "MedEX – Making your clinic painless visit?",
        cover_image: Blog_2_img,
        pub_date: "20-5-2020",
        description: "Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.",
        doctor: {
            id: 110,
            first_name: "Michelle",
            last_name: "Fairfax",
            username: "michellefairfax",
            avatar: Doc_2_img,
            email: "michellefairfax@example.com",
            phone: "+1 504 368 6874",
            location: "Indiana, United States"
        },
    }

]

export default function BlogGrid() {
    const dispatch = useDispatch();
    const [blogs, setBlogs] = useState([]);
    
    useEffect(() => {
        dispatch(fetchBlogs((success, data) => {
            if (success){
                setBlogs(data);
            }else{

            }
        }));
        return () => {
            
        }
    }, [dispatch]);

    const renderBlogs = () => {
        const list = blogs.map(blog => {
            const blogUrl = `/blogs/${blog.slug}`;
            const doctor = blog.author;
            const doctorName = doctor.first_name ? `Dr. ${doctor.first_name} ${doctor.last_name}` : doctor.username;
            const doctorUrl = `/doctors/${doctor.username}`;
            const blogDate = moment(blog.published_at).format('YYYY-MM-DD');

            return (
                <div className="col-md-6 col-sm-12">
                
                    <div className="blog grid-blog">
                        <div className="blog-image">
                            <a href={blogUrl}>
                                <img 
                                    className="img-fluid" 
                                    src={blog.image} 
                                    alt="Post Image" 
                                />
                            </a>
                        </div>
                        <div className="blog-content">
                            <ul className="entry-meta meta-item">
                                <li>
                                    <div className="post-author">
                                        <Avatar width="30px" height="30px" circle user={doctor} />
                                        {doctorName}
                                    </div>
                                </li>
                                <li className="pub-date"><FaClock />{blogDate}</li>
                            </ul>
                            <h3 className="blog-title"><a href={blogUrl}>{blog.title}</a></h3>
                            <p className="mb-0" dangerouslySetInnerHTML={{__html: blog.body}}></p>
                        </div>
                    </div>
                    
                </div>
            );
        });
        return <div className="row blog-grid-row">{list}</div>;
    }
    const renderPagination = () => {
        
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="blog-pagination">
                        <nav>
                            <ul className="pagination justify-content-center">
                                <li className="page-item disabled">
                                    <a className="page-link" href="#" tabindex="-1"><i className="fas fa-angle-double-left"></i></a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">1</a>
                                </li>
                                <li className="page-item active">
                                    <a className="page-link" href="#">2 <span className="sr-only">(current)</span></a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">3</a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#"><i className="fas fa-angle-double-right"></i></a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        )
    }

    return (

        <div className="col-lg-8 col-md-12">
        
            {renderBlogs()}
            {renderPagination()}
                  
        </div>

    )
}
