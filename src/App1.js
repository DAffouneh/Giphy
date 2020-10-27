
import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import request from 'superagent';
import GifList from './GifList';
import Modal from './modal';

class App1 extends React.Component{
state={
    gifs : [],
    limit : 6,
    paginate : 0,
    searchValue:'',
    lodaing:false,
    hasMore:true,
    isOpen: false,
    available:false,
    totalPages:null,
    scrolling:false


}

componentDidMount(){
    this.loadGifs();
    
}


loadGifs = ()=> 
{

const {limit,paginate,gifs,searchValue }=this.state;

   let giphyAPI =`https://api.giphy.com/v1/gifs/search?q=${searchValue.replace(/\s/g, '+')}&limit=${limit}&offset=${paginate}&api_key=ybaPDWvW02i61gblWgdFkxkrsfhsZzhi`;
   fetch(`https://api.giphy.com/v1/gifs/search?q=${searchValue.replace(/\s/g, '+')}&limit=${limit}&offset=${paginate}&api_key=ybaPDWvW02i61gblWgdFkxkrsfhsZzhi`)
    .then( res => res.json() )
    .then(json => {
      if(json.error) {
        alert("Error")
      } 
      else {
         // console.log(json)
        this.setState({
          gifs: json,
          totalPages: json.total_count
        })

      }
    })
  }
 // console.log(this.state.gifs)

   
   //request.get(giphyAPI, (err, res) => {
   //this.setState({gifs :res.body.data});
   //console.log(this.state.gifs);
   //});


loadMore = () => {
   
    this.setState({paginate:this.state.paginate+1,
    scrolling:true
    })
    this.loadGifs()
}
onChangeValue=(event)=>
{
    let searchValue = event.target.value
    this.setState({
        searchValue,
        paginate: 0,
        gifs: []
    },  this.loadGifs())
}
openModal = () => 
{
    console.log(this.state.isOpen);

    this.setState({ isOpen: true });
}
closeModal = () =>
{ 

    this.setState({ isOpen: false });
}
showModal=()=>
{
    console.log(this.state.isOpen);
    if(this.state.isOpen==true)
    {
        this.closeModal=this.closeModal.bind(this);

    }
    else if(this.state.isOpen==true)
    {
     this.openModal=this.openModal.bind(this);   
    }
}

render () {
 //  console.log(this.state.gifs)
 // let childrenEvnts = [...this.state.gifs];
 // this.setState({gifs:childrenEvnts})
//if (this.state.available)
//{
   // console.log(this.state.gifs)

  // for(var i = 0; i<6;i++){
 //childrenEvnts.push(this.state.gifs[i])
  // }
   //console.log("hi"+childrenEvnts)

   //this.setState({gifs:childrenEvnts})
  // this.setState({available:false})
//}

if(!this.state.gifs.data) {
    return null
  } else {
return <Modal className="ui grid container">
        <input type="text"
       onChange={this.onChangeValue}
        ></input>
        <InfiniteScroll
              loadMore={this.loadMore}
              pageStart={this.state.paginate}>
        <div className="ui grid">
        <GifList  gifs={this.state.gifs.data}/>

        </div>
    
        </InfiniteScroll>
        </Modal>
      
}
}
}

export default App1;
