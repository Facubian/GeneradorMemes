import React, { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import './memeGenerator.css';
import interact from 'interactjs';
import MemeSettings from '../MemeSettings/MemeSettings.js';
import { getMemes } from '../../services/meme';

const MemeGenerator = () => {
  const [memeList, setMemeList] = useState([]);
  const [memeImage, setMemeImage] = useState('');
  const [memeText, setMemeText] = useState('');
  const [memeText2, setMemeText2] = useState('');
  const [memeText3, setMemeText3] = useState('');
  const [memeTextSize, setMemeTextSize] = useState(22);
  const [memeTextSize2, setMemeTextSize2] = useState(22);
  const [memeTextSize3, setMemeTextSize3] = useState(22);
  const [memeTextColor, setMemeTextColor] = useState('#FFF');
  const [memeTextColor2, setMemeTextColor2] = useState('#FFF');
  const [memeTextColor3, setMemeTextColor3] = useState('#FFF');
  const [showText2, setShowText2] = useState(false);
  const [showText3, setShowText3] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMemes();
        setMemeImage(response[0].url);
        setMemeList(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const Download = () => {
    html2canvas(document.querySelector('#export'),{allowTaint: true,useCORS: true,width: 400,}).then(function (canvas) {
      let img = canvas.toDataURL('memes/jpg');
      let link = document.createElement('a');
      link.download = 'meme.jpg';
      link.href = img;
      link.click();
    });
  };

  const position = { x: 0, y: 0 };

  interact('.draggable').draggable({
    listeners: {
      start(event) {},
      move(event) {
        position.x += event.dx;
        position.y += event.dy;
        event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
      },
    },
  });

  return (
    <>
      <div className="headerContainer">
        <h1>Generador de memes</h1>
      </div>
      <div className="seleccionador">
        <h2 className="titleText">Elegí Plantilla</h2>
          <select onChange={(e) => setMemeImage(e.target.value)}>
            {memeList.map((meme) => (
              <option key={meme.id} value={meme.url}>
                {meme.name}
              </option>
            ))}
          </select>
      </div>
      <div className="memeGeneratorContainer">
        
      <figure id="export">
          <img src={memeImage} alt="MemeImage" className="memeImage" />
          <figcaption
            className="memeText draggable"
            style={{
              color: `${memeTextColor}`,
              fontSize: `${memeTextSize}px`,
            }}
          >
            {memeText}
          </figcaption>
          <figcaption
            className="memeText draggable"
            style={{
              color: `${memeTextColor2}`,
              fontSize: `${memeTextSize2}px`,
            }}
          >
            {memeText2}
          </figcaption>
          <figcaption
            className="memeText draggable"
            style={{
              color: `${memeTextColor3}`,
              fontSize: `${memeTextSize3}px`,
            }}
          >
            {memeText3}
          </figcaption>
        </figure>

        <div className="memeSettings">
          <h2 className="titleText">Escribí hasta 3 textos</h2>
          <p>Arrastralos para ubicarlos donde quieras</p>
          <MemeSettings
            textNumber={'Texto 1'}
            onMemeTextSize={memeTextSize}
            onSetMemeText={(e) => setMemeText(e.target.value)}
            onSetMemeTextSize={(e) => setMemeTextSize(e.target.value)}
            onSetMemeTextColor={(e) => setMemeTextColor(e.target.value)}
          />
          {showText2 ? (
            <MemeSettings
              textNumber={'Texto 2'}
              onMemeTextSize={memeTextSize2}
              onSetMemeText={(e) => setMemeText2(e.target.value)}
              onSetMemeTextSize={(e) => setMemeTextSize2(e.target.value)}
              onSetMemeTextColor={(e) => setMemeTextColor2(e.target.value)}
            />
          ) : (
            <button onClick={() => setShowText2(true)}>Agregar texto</button>
          )}
          
          {showText3 ? (
            <MemeSettings
              textNumber={'Texto 3'}
              onMemeTextSize={memeTextSize3}
              onSetMemeText={(e) => setMemeText3(e.target.value)}
              onSetMemeTextSize={(e) => setMemeTextSize3(e.target.value)}
              onSetMemeTextColor={(e) => setMemeTextColor3(e.target.value)}
            />
          ) : (
            <button onClick={() => setShowText3(true)}>Agregar texto</button>
          )}
          <button onClick={Download} type="button" className="btnDownload">
            DESCARGAR MEME
          </button>
        </div>
      </div>
    </>
  );
};

export default MemeGenerator;