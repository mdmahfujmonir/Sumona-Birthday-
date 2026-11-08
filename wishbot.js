// wishbot.js - Birthday AI Chatbot Widget for Sumona
(function() {
  const style = document.createElement('style');
  style.innerHTML = `
    #wishbot-btn {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9999;
      background: linear-gradient(135deg, #6c5ce7, #a29bfe);
      color: white;
      border: none;
      padding: 12px 20px;
      border-radius: 25px;
      cursor: pointer;
      font-weight: bold;
      box-shadow: 0 4px 14px rgba(0,0,0,0.25);
    }
    #wishbot-box {
      display: none;
      position: fixed;
      bottom: 75px;
      right: 20px;
      width: 320px;
      height: 400px;
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      z-index: 9999;
      flex-direction: column;
      overflow: hidden;
      border: 1px solid #e0e0e0;
      font-family: sans-serif;
    }
    .wb-header {
      background: linear-gradient(135deg, #6c5ce7, #a29bfe);
      color: white;
      padding: 12px 16px;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .wb-messages {
      flex: 1;
      padding: 12px;
      overflow-y: auto;
      font-size: 13px;
      background: #f9f9fb;
    }
    .wb-msg { margin-bottom: 10px; line-height: 1.4; }
    .wb-bot { color: #2d3436; background: #eee; padding: 8px 12px; border-radius: 12px; display: inline-block; max-width: 85%; }
    .wb-user { text-align: right; }
    .wb-user span { background: #6c5ce7; color: white; padding: 8px 12px; border-radius: 12px; display: inline-block; max-width: 85%; }
    .wb-input-area { display: flex; border-top: 1px solid #eee; padding: 8px; background: white; }
    .wb-input-area input { flex: 1; border: 1px solid #ddd; padding: 8px 12px; border-radius: 20px; outline: none; font-size: 13px; }
    .wb-input-area button { background: #6c5ce7; color: white; border: none; padding: 8px 14px; margin-left: 6px; border-radius: 20px; cursor: pointer; font-weight: bold; }
  `;
  document.head.appendChild(style);

  const btn = document.createElement('button');
  btn.id = 'wishbot-btn';
  btn.innerHTML = '✨ Talk to WishBot';
  document.body.appendChild(btn);

  const box = document.createElement('div');
  box.id = 'wishbot-box';
  box.innerHTML = `
    <div class="wb-header">
      <span>🎉 WishBot (Sumona's Companion)</span>
      <span id="wb-close" style="cursor:pointer; font-size:16px;">✖</span>
    </div>
    <div class="wb-messages" id="wb-msgs">
      <div class="wb-msg"><div class="wb-bot">শুভ জন্মদিন সুমনা! 🎈 ২০১৮-২০২৬ এর স্মৃতি বা যেকোনো বিষয়ে কথা বলতে পারো!</div></div>
    </div>
    <div class="wb-input-area">
      <input type="text" id="wb-input" placeholder="Say something to WishBot..." />
      <button id="wb-send">Send</button>
    </div>
  `;
  document.body.appendChild(box);

  btn.onclick = () => { box.style.display = box.style.display === 'flex' ? 'none' : 'flex'; };
  document.getElementById('wb-close').onclick = () => { box.style.display = 'none'; };

  const input = document.getElementById('wb-input');
  const sendBtn = document.getElementById('wb-send');
  const msgs = document.getElementById('wb-msgs');

  function handleSend() {
    const text = input.value.trim();
    if (!text) return;

    msgs.innerHTML += `<div class="wb-msg wb-user"><span>${text}</span></div>`;
    input.value = '';
    msgs.scrollTop = msgs.scrollHeight;

    setTimeout(() => {
      let reply = getResponse(text.toLowerCase());
      msgs.innerHTML += `<div class="wb-msg"><div class="wb-bot">${reply}</div></div>`;
      msgs.scrollTop = msgs.scrollHeight;
    }, 500);
  }

  sendBtn.onclick = handleSend;
  input.onkeypress = (e) => { if (e.key === 'Enter') handleSend(); };

  function getResponse(q) {
    if (q.includes('timeline') || q.includes('স্মৃতি') || q.includes('2018') || q.includes('2026')) {
      return "২০১৮ সালে অনাকাঙ্ক্ষিত পরিচয়ের মাধ্যমে গল্পের শুরু। মাঝের বিরতি শেষে ২০২৬ সালে আবার সেই পরিচিত চ্যাট ফিরে এসেছে! ✨";
    }
    if (q.includes('wish') || q.includes('উইশ') || q.includes('শুভেচ্ছা') || q.includes('birthday')) {
      return "সুমনার জন্য চিরন্তন দোয়া: Stay Happy, Stay Blessed, and Keep Smiling! 💖";
    }
    if (q.includes('qualities') || q.includes('গুণ') || q.includes('কেন বিশেষ')) {
      return "সুমনার নিজস্বতা, সদয় মন (Kindness), সৃজনশীলতা, মিষ্টি হাসি এবং স্বপ্নের প্রতি সাহস তাকে সবার চেয়ে আলাদা করে! 🌸";
    }
    return "সুমনার জীবনের প্রতিটি অধ্যায় অনাবিল আনন্দ ও সুখে ভরে উঠুক! 🎈";
  }
})();
