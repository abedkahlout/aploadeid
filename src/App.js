import { Box, Typography } from "@mui/material";
import "./App.css";
import { useState, useRef } from "react";
import { toJpeg } from 'html-to-image';

function App() {
  const [img, setImg] = useState(null);
  const [text, setText] = useState('');
  const containerRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImg(reader.result);
    };
  };

  const handleDownload = () => {
    if (!containerRef.current) return;  

    const options = {
      quality: 1,
      style: {
        fontFamily: 'Cairo !important',
        fontSize: '20px !important'
      }
    };

    toJpeg(containerRef.current, options)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'عيدسعيد.jpg';
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      });
  }

  return (
    <div className="App">
      <Box ref={containerRef} className="container" width={580} height={580}>
        <Typography className="posi-text"> {text}</Typography>
        {img && <img src={img} className="img-pos" height={260} width={260} />}
      </Box>
      <Box>
        <input type="text" className="textin" onChange={(e) => setText(e.target.value)} />
      </Box>
      <Box>
        <label htmlFor="imgs" className="imgin">أضف صورة</label>
        <input type="file" id="imgs" style={{display:'none'}} onChange={handleFileChange} />
        <button onClick={handleDownload}>Download</button>
      </Box>
    </div>
  );
}

export default App;
