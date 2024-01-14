// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './App.css';
// import { baseurl } from './const';
// function App() {
//   const [data,setData] = useState();
//   const [searchvalue , setSearchValue] = useState('')
//   var Word = null;



    
//   // try {
//   //   const response = await axios.request(options);
//   //   console.log(response.data);
//   // } catch (error) {
//   //   console.error(error);
//   // }

//   // const axios = require('axios');

// let config = {
//   method: 'get',
//   maxBodyLength: Infinity,
//   url: `https://api.dictionaryapi.dev/api/v2/entries/en/${Word}`,
//   headers: { }
// };

// axios.request(config)
// .then((response) => {
//   console.log(JSON.stringify(response.data));
// })
// .catch((error) => {
//   console.log(error);
// });

//   return (
//     <div className="App">
//       <h1>Text Analyzer</h1>
//       <p className='m1'>Text Analyzer is a simple free online tool for SEO web content analysis that helps
//          you find most frequent phrases and words, number of characters, words, sentences and paragraphs, 
//          and estimated read and speak time of your content.</p>
//       <div>
//         <button className='m2'>Word Input</button>   
//         <button className='m2'>Paragraph</button>
//       </div>
    
//     <div style={{display : "flex" , marginTop:15, width : "100%" }} >
//         <div style={{ width : "80%" , display : "flex" , alignItem : "center"  , justifyContent : "space-between" ,}} >
//           <textarea value={Word} id="w3review" name="w3review" rows="1" style={{width : "90%" , padding : "0.5%"}} >
//           </textarea>
//           <div className='m6'> <button>Process Word</button></div>
//         </div>
//     </div>

//     <div>
//       <table style={{margin : "10px"}}>
//         <thead>
//         <tr>
//         <th className='m3'>
//          Characters
//         </th>
//         <th className='m4'>Words</th>
//         </tr>
//         </thead>
//         <tbody>
//         <tr>
//           <td>5</td>
//           <td>1</td>
//         </tr>
//         </tbody>
//         </table>
//     </div>

//     <div className='m5'>
//       <text>Defination : </text>
//       <text>Part of speech :</text>
//       <text>Synonyms :</text>
//       <text>Antonyms :</text>
//     </div>

  
//     </div>
//   );
// }

// export default App;
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { baseurl } from './const';

function App() {
  const [word, setWord] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [definition, setDefinition] = useState('');
  const [partOfSpeech, setPartOfSpeech] = useState('');
  const [synonyms, setSynonyms] = useState([]);
  const [antonyms, setAntonyms] = useState([]);

  const handleProcessWord = async () => {
    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      console.log(JSON.stringify(response.data));
      console.log(baseurl);

      // Update state with relevant data from the API response
      setDefinition(response.data[0]?.meanings[0]?.definitions[0]?.definition || '');
      setPartOfSpeech(response.data[0]?.meanings[0]?.partOfSpeech || '');
      setSynonyms(response.data[0]?.meanings[0]?.definitions[0]?.synonyms || []);
      setAntonyms(response.data[0]?.meanings[0]?.definitions[0]?.antonyms || []);
    } catch (error) {
      console.error(error);
    }

    // Calculate character and word count
    setCharacterCount(word.length);
    setWordCount(word.split(/\s+/).filter((word) => word !== '').length);
  };

  return (
    <div className="App">
      <h1>Text Analyzer</h1>
      <p className='m1'>Text Analyzer is a simple free online tool for SEO web content analysis that helps
        you find most frequent phrases and words, the number of characters, words, sentences and paragraphs,
        and the estimated read and speak time of your content.</p>
      <div>
        <button className='m2'>Word Input</button>
        <button className='m2'>Paragraph</button>
      </div>

      <div style={{ display: "flex", marginTop: 15, width: "100%" }} >
        <div style={{ width: "80%", display: "flex", alignItems: "center", justifyContent: "space-between", }} >
          <textarea value={word} onChange={(e) => setWord(e.target.value)} id="w3review" name="w3review" rows="1" style={{ width: "90%", padding: "0.5%", overflow: "hidden" }} ></textarea>
          <div className='m6'> <button onClick={handleProcessWord}>Process Word</button></div>
        </div>
      </div>

      <div>
        <table style={{ margin: "10px" }}>
          <thead>
            <tr>
              <th className='m3'>Characters</th>
              <th className='m4'>Words</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{characterCount}</td>
              <td>{wordCount}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className='m5'>
        <p>Definition: {definition}</p>
        <p>Part of speech: {partOfSpeech}</p>
        <p>Synonyms: {synonyms.join(', ')}</p>
        <p>Antonyms: {antonyms.join(', ')}</p>
      </div>
    </div>
  );
}

export default App;

