import React from 'react'

export default function index(props) {
    const {list, pageTitle} = props;
    

    const renderList = () => {
        let data = null;
        if(list && list.length > 0) {
            data = list.map((item, index) => {
            return <li key={item.title} className={`breadcrumb-item ${(index === list.length - 1) ? "active" : ""}`} aria-current={(index === list.length - 1) ? "page" : ""}><a href={item.link}>{item.title}</a></li>
        })}
        return (
            <ol className="breadcrumb">
                {data}
            </ol>
        );
    }
    return (
        <div className="breadcrumb-bar">
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-md-12 col-12">
                        <nav aria-label="breadcrumb" className="page-breadcrumb">
                            {renderList()}
                        </nav>
                        <h2 className="breadcrumb-title">{pageTitle}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}
