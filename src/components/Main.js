import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import CategoryNav from './../Layout/CategoryNav'
import '../css/Main.css';
import Category from './Category';
import Loader from '../Layout/Loader';
import Button from './Button';

 class Main extends Component {
  render() {
  const { posts } = this.props;
  const postList = posts.length ? (
      posts.map((post)=> {
          return(
              <div key={post._id} className="card-wrap">
               <span className="pos">
               <img src={post.metadata.image.url} alt=""/>
               </span>
              <div className="card">
               <Link to={'/' + post.slug}> <h2 className="card-title">{post.title}</h2></Link>
          {post.metadata.snipped &&  post.metadata.snipped.length < 80 ?  <p className="card-body" dangerouslySetInnerHTML={{__html:post.metadata.snipped}}></p> :
           <p className="card-body" dangerouslySetInnerHTML={{__html: post.metadata.snipped && post.metadata.snipped.slice(0,80)}}></p> 
        }
               <span className="date">{post.created_at}</span>
                
              </div>
            </div>
          )
      })

  ) 
  : 
  (
      // <div className="text-center"> No posts yet </div>
     <Loader />
  )
  return (
    <div>
      <CategoryNav />
      <div className="content-wrap">
        {postList}
      </div>
      <hr/>
      {
      this.props ?
      <div className="page">
        <div className="page-overlay">
          <h1>{ this.props.ads.title}</h1>
          <p dangerouslySetInnerHTML={{__html:this.props.ads.content}} ></p>
          <Button title={"See more"} />
        </div>
        <img className="ads-image" src={this.props.ads.metadata? this.props.ads.metadata.image.url : "#" } alt="img"/>
        </div>
        :
        <p>No page</p>
        }
        <div>
       { posts && <h2 className="category-title">FILM</h2>}
          <hr/>
          <Category />
        </div>
      
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  
  return{
    posts: state.posts.posts.slice(0,5),
    ads: state.posts.ads,
  }
}
export default connect(mapStateToProps)(Main);