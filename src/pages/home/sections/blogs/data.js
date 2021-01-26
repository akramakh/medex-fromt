import BlogImage_01 from '../../../../assets/img/blog/blog-01.jpg';
import BlogImage_02 from '../../../../assets/img/blog/blog-02.jpg';
import BlogImage_03 from '../../../../assets/img/blog/blog-03.jpg';
import BlogImage_04 from '../../../../assets/img/blog/blog-04.jpg';

import AuthorAvatar_01 from '../../../../assets/img/doctors/doctor-thumb-01.jpg';
import AuthorAvatar_02 from '../../../../assets/img/doctors/doctor-thumb-02.jpg';
import AuthorAvatar_03 from '../../../../assets/img/doctors/doctor-thumb-03.jpg';
import AuthorAvatar_04 from '../../../../assets/img/doctors/doctor-thumb-04.jpg';

export const blogs = [
    {
        id: 1,
        slug: "blog_01",
        title: "MedEX – Making your clinic painless visit?",
        image: BlogImage_01,
        shortDescription: "Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.",
        publishDate: "4 Dec 2019",
        author: {
            id: 1,
            username: "ruby_perrin",
            firstname: "Ruby",
            lastname: "Perrin",
            avatar: AuthorAvatar_01
        }
    },
    {
        id: 2,
        slug: "blog_02",
        title: "What are the benefits of Online Doctor Booking?",
        image: BlogImage_02,
        shortDescription: "Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.",
        publishDate: "3 Dec 2019",
        author: {
            id: 2,
            username: "darren_elder",
            firstname: "Darren",
            lastname: "Elder",
            avatar: AuthorAvatar_02
        }
    },
    {
        id: 3,
        slug: "blog_03",
        title: "Benefits of consulting with an Online Doctor",
        image: BlogImage_03,
        shortDescription: "Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.",
        publishDate: "3 Dec 2019",
        author: {
            id: 3,
            username: "deborah_angel",
            firstname: "Deborah",
            lastname: "Angel",
            avatar: AuthorAvatar_03
        }
    },
    {
        id: 4,
        slug: "blog_04",
        title: "5 Great reasons to use an Online Doctor",
        image: BlogImage_04,
        shortDescription: "Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.",
        publishDate: "2 Dec 2019",
        author: {
            id: 4,
            username: "bofia_brient",
            firstname: "Sofia",
            lastname: "Brient",
            avatar: AuthorAvatar_04
        }
    },
];