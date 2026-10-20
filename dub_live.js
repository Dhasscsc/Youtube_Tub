(()=>{
if(window.__dub){window.__dub.stop();return}
const API='https://script.google.com/macros/s/AKfycbyd72YokjJMy3eYQkUEYxjk1QCFf6cFqVv9j7ka0oMjYcOI6lzE_CpQOafe88ZoLc5-/exec';
const v=document.querySelector('video');if(!v){alert('YouTube வீடியோ பக்கத்தில் பயன்படுத்தவும்');return}
const cc=document.querySelector('.ytp-subtitles-button');
if(cc&&cc.getAttribute('aria-pressed')==='false')cc.click();
const box=document.createElement('div');
box.style.cssText='position:fixed;left:50%;bottom:90px;transform:translateX(-50%);max-width:80%;z-index:99999;background:rgba(0,0,0,.85);color:#ffe45c;font:600 20px sans-serif;padding:8px 14px;border-radius:8px;text-align:center';
box.textContent='🎙️ தமிழ் டப்பிங் தொடங்கியது (CC இயக்கத்தில் இருக்க வேண்டும்)';
document.body.appendChild(box);
const ov=v.volume;v.volume=0.08;
let last='',tm=null,voice=null;const cache={};
const pick=()=>{voice=speechSynthesis.getVoices().find(x=>x.lang.toLowerCase().startsWith('ta'))};pick();speechSynthesis.onvoiceschanged=pick;
const read=()=>[...document.querySelectorAll('.ytp-caption-segment')].map(x=>x.textContent).join(' ').replace(/\s+/g,' ').trim();
async function tr(t){if(cache[t])return cache[t];const r=await fetch(API+'?tr='+encodeURIComponent(t));const j=await r.json();if(j.error)throw j.error;return cache[t]=j.t}
async function handle(t){
 try{const ta=await tr(t);if(t!==last)return;box.textContent=ta;speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(ta);u.lang='ta-IN';if(voice)u.voice=voice;u.rate=1.15;speechSynthesis.speak(u)}
 catch(e){box.textContent='பிழை: '+e}
}
const obs=new MutationObserver(()=>{clearTimeout(tm);tm=setTimeout(()=>{const t=read();if(t&&t!==last){last=t;handle(t)}},350)});
obs.observe(document.querySelector('#movie_player')||document.body,{childList:true,subtree:true,characterData:true});
v.addEventListener('pause',()=>speechSynthesis.cancel());
window.__dub={stop(){obs.disconnect();speechSynthesis.cancel();v.volume=ov;box.remove();delete window.__dub}};
})();
