import './App.css';
import React from 'react';
import axios from "axios";

const _ = require("lodash");
// using axios

function App() {
  const [items, setItems] = React.useState([]);
  React.useEffect(() => {
    callApiWithAxios();
  }, [])

  async function callApiWithAxios() {
    axios({
      url : "https://api.spacex.land/graphql",
      method:'post',
      data:{
        query: `
        {
            launchesPast(limit:10) {
            mission_name
            launch_date_local
            links {
              flickr_images
            }
          }
        }
        `
      }
  }).then((res)=>{
      const launchesPastArray = res.data.data.launchesPast
      console.log("before sort", launchesPastArray);
      const result = _.sortBy(launchesPastArray, 'mission_name');
      console.log("sorted result", result);
      //return result;
      setItems(result)
  })
}
  return (
    <div className="App">
      {items.map(item=>{
        return (
          <div className="item-container">
            {item.mission_name}
            {
              item.links.flickr_images.length ?
              <img src={item.links.flickr_images[0]} className="image-container" alt="mission img"></img>
              :
              <img src={item.links.flickr_images[0]} className="image-container" alt="no-img"></img>
              
            }
          </div>
        )
      })}
    </div>
  );
}

export default App;
