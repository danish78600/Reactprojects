import React, { Component } from 'react';

export class NewsItem extends Component {
  render() {
    let{title,description,imageURL,newsUrl,author,date,source}=this.props;
    return (
      <>
    <div className='my-3'>
<div className="card">
  <div style={
  {
    display:'flex',
    justifyContent:'flex-end',
    position:'absolue',
    right:'0'
  }
  }>
    <span className='badge rounded-pill bg-danger'>
{source}
    </span>
  </div>
   <img src={imageURL} className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <div className="card-text"><small className="text-muted">By{author} on {date}</small></div>
    <a href={newsUrl} target="_blank" className="btn btn-dark">Go somewhere</a>
  </div>
</div>
<div className="con">
 
  
</div>
    </div>
    </>
    )
  }
}
export default NewsItem;
