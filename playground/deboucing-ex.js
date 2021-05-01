const App=()=>{
    let timer
    const getData=()=>{
      clearTimeout(timer);
      timer=setTimeout(()=>{
        console.log("fetching data")
      },2000)
  
    }
  
    return(
      <div>
      hello world
      <input type="text" onKeyUp={getData}></input>
      </div>
    )
  }