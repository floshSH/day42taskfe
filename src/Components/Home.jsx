import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useState } from 'react'

const Home = () => {
  const [url, setUrl]=useState('');
  const navigate=useNavigate();
const [shortUrl,setShortUrl]=useState('');
const [message, setMessage]=useState('');
  const deployClick=async()=>{
    const response= await axios.post("https://day42taskbe.onrender.com/url/getLongurl", {shortUrl:url});
  if(response.data.message === "deploy") {
     window.location.href=response.data.url;
  }
  }
  
const handleSubmit=(e)=>{
    e.preventDefault();
   
}
const shortClick=async()=>{
    const response= await axios.post("https://day42taskbe.onrender.com/url/createShorturl", {longurl:url});
    setShortUrl(response.data.shortUrl);
    setMessage(response.data.message);

}

  return (
    <div className='d-flex flex-column justify-content-center align-items-center' style={{width:"100vw"}}>
    <form className='border border-5 p-5' onSubmit={handleSubmit}  style={{borderRadius:"25px"}}>
        <h1 className="text-center">URL MANAGE</h1>
        <div className="emailDiv mt-5">
            <label >URL:</label>
            <input className="form-control mt-3" type="text" name="url" value={url} onChange={(e)=> setUrl(e.target.value)} required/>
        </div>
       
{
  message === "shorted" ? ( <div className='mt-5'>Shorted URL :
  <input value={shortUrl} className='form-control'></input>
  </div>):null
}




        <div className="d-flex justify-content-evenly mt-5">
              
              <div><button className='btn btn-primary' onClick={deployClick}>Deploy</button>
              </div>
              <div><button className="btn btn-primary" onClick={shortClick}>Short</button></div>
         
              </div>    </form>
</div>
  )
}

export default Home
