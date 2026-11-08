// scratch-card.js - Interactive Birthday Scratch Card
(function() {
  const style = document.createElement('style');
  style.innerHTML = `
    #scratch-widget-btn {
      position: fixed;
      bottom: 80px;
      right: 20px;
      z-index: 999;
      background: linear-gradient(135deg, #ff7675, #d63031);
      color: white;
      border: none;
      padding: 12px 18px;
      border-radius: 25px;
      cursor: pointer;
      font-weight: bold;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }
    #scratch-modal {
      display: none;
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.6);
      z-index: 10000;
      justify-content: center;
      align-items: center;
    }
    .scratch-container {
      background: #fff;
      padding: 20px;
      border-radius: 16px;
      text-align: center;
      position: relative;
      width: 300px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }
    .scratch-card-wrapper {
      position: relative;
      width: 260px;
      height: 140px;
      margin: 15px auto;
      border-radius: 12px;
      overflow: hidden;
    }
    .scratch-secret {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      background: #fff0f3;
      color: #d63031;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 15px;
      box-sizing: border-box;
      font-weight: bold;
      font-size: 13px;
      line-height: 1.4;
      border: 2px dashed #ff7675;
      border-radius: 12px;
    }
    #scratch-canvas {
      position: absolute;
      top: 0; left: 0;
      cursor: pointer;
      border-radius: 12px;
    }
  `;
  document.head.appendChild(style);

  const btn = document.createElement('button');
  btn.id = 'scratch-widget-btn';
  btn.innerHTML = '🎁 Scratch Surprise';
  document.body.appendChild(btn);

  const modal = document.createElement('div');
  modal.id = 'scratch-modal';
  modal.innerHTML = `
    <div class="scratch-container">
      <span style="position:absolute; top:10px; right:15px; cursor:pointer; font-size:18px;" id="scratch-close">✖</span>
      <h3 style="margin:5px 0; color:#d63031;">🎉 Special Surprise Note</h3>
      <p style="font-size:12px; color:#666; margin:0;">Scratch the card below to reveal your secret wish!</p>
      <div class="scratch-card-wrapper">
        <div class="scratch-secret">
          ✨ Secret Wish for Sumona ✨<br><br>
          "May your future be brighter than your worries. Stay Happy, Stay Blessed, Keep Smiling! 💖"
        </div>
        <canvas id="scratch-canvas" width="260" height="140"></canvas>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  btn.onclick = () => {
    modal.style.display = 'flex';
    initCanvas();
  };

  document.getElementById('scratch-close').onclick = () => {
    modal.style.display = 'none';
  };

  function initCanvas() {
    const canvas = document.getElementById('scratch-canvas');
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#b2bec3';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = 'bold 15px sans-serif';
    ctx.fillStyle = '#636e72';
    ctx.textAlign = 'center';
    ctx.fillText('✨ Scratch Here ✨', canvas.width / 2, canvas.height / 2 + 5);

    let isScratching = false;

    function scratch(e) {
      if (!isScratching) return;
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
      const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 18, 0, Math.PI * 2);
      ctx.fill();
    }

    canvas.onmousedown = (e) => { isScratching = true; scratch(e); };
    canvas.onmousemove = scratch;
    canvas.onmouseup = () => { isScratching = false; };

    canvas.ontouchstart = (e) => { isScratching = true; scratch(e); };
    canvas.ontouchmove = scratch;
    canvas.ontouchend = () => { isScratching = false; };
  }
})();
