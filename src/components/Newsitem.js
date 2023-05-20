import React, { Component } from 'react'

export class Newsitem extends Component {
    render() {
        let {title, description, imageUrl,newsUrl,author,publishDate} = this.props;
        return (
            <div>
                <div className="card my-3" >
                    <img src={imageUrl} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <p className="card-text"><small className="text-body-secondary">By {!author?"Unknown":author} on {new Date(publishDate).toGMTString()}</small></p>
                            <a rel="noreferrer"  href={newsUrl} target="_blank" className="btn btn-dark btn-sm">Read more</a>
                        </div>
                </div>
            </div>
        )
    }
}

export default Newsitem
