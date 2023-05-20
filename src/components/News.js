import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'


export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 9,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  
  constructor(props){
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
    document.title = `News Monkey - ${this.capitalizeFirstLetter(this.props.category)}`
  }

  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2c71c42a7b184563ac3c6aeb9f6422db&page=1&pageSize=${this.props.pageSize}`
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({articles: parsedData.articles,
    totalResults: parsedData.totalResults,
    loading:false })
  }

  handleNext = async ()=>{
      if (!(this.state.page + 1 > Math.ceil( this.state.totalResults/this.props.pageSize))) {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2c71c42a7b184563ac3c6aeb9f6422db&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
        this.setState({loading: true});
        // window.scrollTo({top: 0, left: 0, behavior: 'smooth'}); 
        let data = await fetch(url);
        let parsedData = await data.json()
          this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles,
            loading:false
      })
    }
  }
  handlePrevious = async()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2c71c42a7b184563ac3c6aeb9f6422db&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
    this.setState({loading: true});
    // window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    let data = await fetch(url);
    let parsedData = await data.json()
      this.setState({
        page: this.state.page - 1,
        articles: parsedData.articles,
        loading:false
      })
  }

  render() {
    return (
      < div className='container my-3'>
        <h2 className='text-center'>News Monkey - Top Headlines in {this.capitalizeFirstLetter(this.props.category)} </h2>
        { this.state.loading && <Spinner  />}
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{
          return <div className="col-md-4" key={element.url}>
          <Newsitem  title={element.title?element.title:" "} description={element.description?element.description:" "} author={element.author} publishDate={element.publishedAt} imageUrl={!element.urlToImage?"https://cdn.ndtv.com/common/images/ogndtv.png":element.urlToImage} newsUrl={element.url} />
          </div>
        })}     
        </div>
          <div className="container d-flex justify-content-between">
          <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevious}>&larr; Previous Page</button>
          <button disabled={this.state.page + 1 > Math.ceil( this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNext}>Next Page &rarr;</button>

        </div>
        
      </div>
    )
  }
}

export default News

// /we can add infinite scroll