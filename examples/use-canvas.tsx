import ReactDOM from 'react-dom';
import React, { FunctionComponent, useCallback, useState } from 'react';
import useCanvas from '../src/useCanvas';
import Layout from './components/Layout';

let x = Math.random() * 280 + 10;
let y = Math.random() * 280 + 10;
let xD = 1.6;
let yD = 1.6;
const Index: FunctionComponent<IProps> = ({}) => {
  const [color, setColor] = useState('#ffffff');
  const draw = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      ctx.clearRect(0, 0, 300, 300);
      if (x > 290 || x < 10) xD = -xD;
      if (y > 290 || y < 10) yD = -yD;
      x = x + xD;
      y = y + yD;
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    },
    [color]
  );
  const canvasRef = useCanvas(draw);
  function changeColor(ev): void {
    setColor(ev.target.value);
  }
  return (
    <Layout title={'useCanvas'}>
      <canvas ref={canvasRef} width={300} height={300} style={{ background: 'orange' }} />
      <div>
        change ball color
        <input type="text" value={color} onChange={changeColor} />
      </div>
    </Layout>
  );
};

interface IProps {}

ReactDOM.render(<Index />, document.querySelector('#useCanvas'));
