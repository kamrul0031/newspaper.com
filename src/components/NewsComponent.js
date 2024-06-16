import React, { Component } from "react";
import NewsCart from "./NewsCart";
import loder from "./Loading.gif";
// import fetchDataOffline from './fetchDataSample.json';

export default class NewsComponent extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      page: 1,
      pageSize: 10,
      totalResults:0,
    };
  }
  async fetchData() {
    const { page, pageSize } = this.state;
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&page=${page}&pageSize=${pageSize}&apiKey=47b6e4561bd241989eb59cf3ca1221ef`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults
    });
  }

  // --------------- offline fetching ------------------
  // offlineFetching(){
  //   let offlineParsedData = fetchDataOffline;
  //   this.setState({
  //       articles:offlineParsedData.articles,
  //   })
  // }

handleNextBtn= async()=>{
  this.setState(
    (pageState)=>({page:pageState.page + 1}),
    ()=>this.fetchData()
  )
}
handlePreviousBtn= async()=>{
  this.setState(
    (pageState)=>({page:pageState.page - 1}),
    ()=>this.fetchData()
  )
}

  async componentDidMount() {
    this.fetchData();

    // this.offlineFetching()
  }
  render() {
    const { articles,page,totalResults,pageSize } = this.state;
    const totalPages = Math.ceil(totalResults / pageSize);
    return (
      <div className="flex gap-4 flex-col justify-center items-center mt-20">
        <h1 className="capitalize p-5 font-semibold text-3xl">
          top news headings ... .. .
        </h1>
        <div className="flex flex-wrap justify-center items-center gap-5">
          {articles.length !== 0 ? (
            articles.map((element) => {
              return (
                <NewsCart
                  title={element.title}
                  description={element.description}
                  imgUrl={element.urlToImage}
                  date={element.publishedAt.slice(0,10)}
                  time={element.publishedAt.slice(11,20)}
                  url={element.url}
                  key={element.url}
                />
              );
            })
          ) : (
            <img className="w-[10rem] " src={loder} alt="" />
          )}
        </div>
        <div className="w-full flex justify-around">
          <button disabled={page <= 1} onClick={this.handlePreviousBtn} className="bg-red-500 disabled:hidden">previous</button>
          <button disabled={page === totalPages} onClick={this.handleNextBtn} className="bg-red-500 disabled:hidden">next</button>
        </div>
      </div>
    );
  }
}
