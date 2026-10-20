(()=>{
if(window.__dub){window.__dub.stop();return}
const H='https://dhasscsc.github.io';
const v=document.querySelector('video');if(!v){alert('YouTube வீடியோ பக்கத்தில் பயன்படுத்தவும்');return}
const w=window.open(H+'/Youtube_Tub/','dubspeak','width=480,height=340');
if(!w){alert('Popup தடுக்கப்பட்டது - address bar-ல் popup-ஐ அனுமதிக்கவும்');return}
const cc=document.querySelector('.ytp-subtitles-button');
if(cc&&cc.getAttribute('aria-pressed')==='false')cc.click();
const box=document.createElement('div');
box.style.cssText='position:fixed;left:50%;bottom:90px;transform:translateX(-50%);max-width:80%;z-index:99999;background:rgba(0,0,0,.85);color:#ffe45c;font:600 20px sans-serif;padding:8px 14px;border-radius:8px;text-align:center';
box.textContent='🎙️ தமிழ் டப்பிங் - popup-ல் "குரலை இயக்கு" அழுத்தவும்';
document.body.appendChild(box);
const ov=v.volume;v.volume=0.08;
let last='',tm=null;
const send=o=>{try{w.postMessage(o,H)}catch(e){}};
const read=()=>[...document.querySelectorAll('.ytp-caption-segment')].map(x=>x.textContent).join(' ').replace(/\s+/g,' ').trim();
const obs=new MutationObserver(()=>{clearTimeout(tm);tm=setTimeout(()=>{const t=read();if(t&&t!==last){last=t;send({type:'cap',t})}},350)});
obs.observe(document.querySelector('#movie_player')||document.body,{childList:true,subtree:true,characterData:true});
const onm=e=>{if(e.origin===H&&e.data&&e.data.type==='tr')box.textContent=e.data.t};
addEventListener('message',onm);
v.addEventListener('pause',()=>send({type:'stop'}));
window.__dub={stop(){obs.disconnect();removeEventListener('message',onm);send({type:'stop'});v.volume=ov;box.remove();try{w.close()}catch(e){}delete window.__dub}};
})();
