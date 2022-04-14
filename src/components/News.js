import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';


export class News extends Component {
  static defaultProps={
    country:"in",
    category:"sports",
    pageSize:8
  }

static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
  }


// If we want to take response direclty from articles then define articles with json file
  constructor(props)
  {
    super(props);
    this.state={
    articles:[],
    loading:false,
    page:1
    }
    document.title=`${this.props.category} - NewsMonkey`;  //Prints the category in title
  }


  async updateNews()
  {
    this.props.setProgress(10)
    console.log("cmd")
const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e0d154ae81a64b81a03b008ffab94d37&page=${this.state.page}&pageSize=${this.props.pageSize}`;
let data=await fetch(url)
this.setState({loading:true})
let parsedData=await data.json()
this.props.setProgress(70)
console.log(parsedData)
this.setState({articles: parsedData.articles,totalResults:parsedData.totalResults,loading:false})
this.props.setProgress(100)
  }


  //Taking response by using fetch api.
  async componentDidMount()
  {
    this.updateNews();
  }


  prevClick=async()=>
  {
console.log("Previous clikc")
this.setState({page:this.state.page - 1})
this.updateNews();
  }



  nextClick=async()=>
  {
console.log("Next clicked")
this.setState({page:this.state.page + 1})
this.updateNews();
}

 

  render() {
    return (

    <div className="container my-3">
      <h1 className="text-center">
        Monkey News Top {this.props.category} Headlines By Danish Bhandari
      </h1>
      {this.state.loading && <Spinner /> }
     
      <div className="row">
        
      {this.state.articles.map((element)=>{
      return <div className="col-md-4">
      <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageURL={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/>   </div>
      }
      )}
        
        </div>
  <div className="container d-flex justify-content-between">
    <button disabled={this.state.page<=1} className='btn btn-primary' onClick={this.prevClick}> &larr; Previous</button>
    <button disabled={(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))}className='btn btn-primary' onClick={this.nextClick}> &rarr; Next</button>
  </div>
      </div>

    )
  }
}

export default News;
