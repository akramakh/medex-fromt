import React from 'react';
import Blog_2_img from '../../assets/img/blog/blog-02.jpg';
import Doc_2_img from '../../assets/img/doctors/doctor-thumb-02.jpg';

export default function BlogList() {
    return (
        
        <div className="col-lg-8 col-md-12">

            <div className="blog">
                <div className="blog-image">
                    <a href="blog-details.html"><img className="img-fluid" src={Blog_2_img} alt="Post Image" /></a>
                </div>
                <h3 className="blog-title"><a href="blog-details.html">MedEX – Making your clinic painless visit?</a></h3>
                <div className="blog-info clearfix">
                    <div className="post-left">
                        <ul>
                            <li>
                                <div className="post-author">
                                    <a href="doctor-profile.html"><img src={Doc_2_img} alt="Post Author" /> <span>Dr. Ruby Perrin</span></a>
                                </div>
                            </li>
                            <li><i className="far fa-clock"></i>4 Dec 2019</li>
                            <li><i className="far fa-comments"></i>12 Comments</li>
                            <li><i className="fa fa-tags"></i>Health Tips</li>
                        </ul>
                    </div>
                </div>
                <div className="blog-content">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco sit laboris ullamco laborisut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <a href="blog-details.html" className="read-more">Read More</a>
                </div>
            </div>

            <div className="blog">
                <div className="blog-image">
                    <a href="blog-details.html"><img className="img-fluid" src={Blog_2_img} alt="" /></a>
                </div>
                <h3 className="blog-title"><a href="blog-details.html">What are the benefits of Online Doctor Booking?</a></h3>
                <div className="blog-info clearfix">
                    <div className="post-left">
                        <ul>
                            <li>
                                <div className="post-author">
                                    <a href="doctor-profile.html"><img src={Doc_2_img} alt="Post Author" /> <span>Dr. Darren Elder</span></a>
                                </div>
                            </li>
                            <li><i className="far fa-clock"></i>3 Dec 2019</li>
                            <li><i className="far fa-comments"></i>7 Comments</li>
                            <li><i className="fa fa-tags"></i>Cardiology</li>
                        </ul>
                    </div>
                </div>
                <div className="blog-content">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco sit laboris ullamco laborisut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <a href="blog-details.html" className="read-more">Read More</a>
                </div>
            </div>

            <div className="blog">
                <div className="blog-image">
                    <div className="video">
                        <iframe src="https://www.youtube.com/embed/nuVqJ_OriR8?rel=0&amp;controls=0&amp;showinfo=0" width="940" allowfullscreen></iframe>
                    </div>
                </div>
                <h3 className="blog-title"><a href="blog-details.html">Benefits of consulting with an Online Doctor</a></h3>
                <div className="blog-info clearfix">
                    <div className="post-left">
                        <ul>
                            <li>
                                <div className="post-author">
                                    <a href="doctor-profile.html"><img src={Doc_2_img} alt="Post Author" /> <span>Dr. Deborah Angel</span></a>
                                </div>
                            </li>
                            <li><i className="far fa-clock"></i>3 Dec 2019</li>
                            <li><i className="far fa-comments"></i>2 Comments</li>
                            <li><i className="fa fa-tags"></i>Health Care</li>
                        </ul>
                    </div>
                </div>
                <div className="blog-content">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco sit laboris ullamco laborisut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <a href="blog-details.html" className="read-more">Read More</a>
                </div>
            </div>

            <div className="blog">
                <div className="blog-image">
                    <div className="video">
                        <iframe src="https://player.vimeo.com/video/133170635" width="940"></iframe>
                    </div>
                </div>
                <h3 className="blog-title"><a href="blog-details.html">5 Great reasons to use an Online Doctor</a></h3>
                <div className="blog-info clearfix">
                    <div className="post-left">
                        <ul>
                            <li>
                                <div className="post-author">
                                    <a href="doctor-profile.html"><img src={Doc_2_img} alt="Post Author" /> <span>Dr. Sofia Brient</span></a>
                                </div>
                            </li>
                            <li><i className="far fa-clock"></i>2 Dec 2019</li>
                            <li><i className="far fa-comments"></i>41 Comments</li>
                            <li><i className="fa fa-tags"></i>Health Tips</li>
                        </ul>
                    </div>
                </div>
                <div className="blog-content">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco sit laboris ullamco laborisut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <a href="blog-details.html" className="read-more">Read More</a>
                </div>
            </div>

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
            
        </div>

    )
}
