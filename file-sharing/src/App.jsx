import { useRef,useState,useEffect } from 'react'
import './App.css'
import { uploadFile } from './services/api'

function App() {
    
  const [file,setFile] = useState('')
  const [result, setResult] = useState('');
  const FileInputRef = useRef('')
  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await uploadFile(data);
        setResult(response.path);
        
      }
    }
    getImage();
  }, [file])
  const onUploadClick = () => {
    FileInputRef.current.click();
  }
  const url = 'https://cdn-icons-png.flaticon.com/512/10057/10057604.png'

  return (
    <div className="container">
      <img src={url} className='img' />
      <div className="wrapper">
      <h1>File Link Generator!</h1>
      <p>Upload and share the download link.</p>
      <button onClick={()=>onUploadClick()}>Upload</button>
      <input type="file" 
      ref = {FileInputRef}
      style = {{display:'none'}}
      onChange={(e)=>setFile(e.target.files[0])}/>
      <a href={result} target='_blank'>{result}</a>
      </div>
    </div>
  )
}

export default App
