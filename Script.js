const HER_NAME = "My Love";   // change to her name
const LEE_PHONE = "260976906537"; // YOUR WhatsApp number: country code + number, no +, spaces or leading 0 (Zambia example: 260971234567)

const $ = s => document.querySelector(s);
const screens = [...document.querySelectorAll('.screen')];
const A = {love:20, why:[], kisses:10};
let cur = 0;

function go(n){
  screens[cur].classList.remove('active');
  cur = n;
  screens[n].classList.add('active');
  $('#bar').style.width = (n/(screens.length-1)*100) + '%';
  if(n === screens.length-1) finale();
}
function burst(x, y, n=14, set=['💖','💗','💕','✨','💘','🌹']){
  for(let i=0;i<n;i++){
    const s = document.createElement('span');
    s.className = 'burst';
    s.textContent = set[Math.floor(Math.random()*set.length)];
    s.style.left = x+'px'; s.style.top = y+'px';
    const a = Math.random()*Math.PI*2, d = 70+Math.random()*150;
    s.style.setProperty('--x', Math.cos(a)*d+'px');
    s.style.setProperty('--y', Math.sin(a)*d+'px');
    s.style.setProperty('--r', (Math.random()*80-40)+'deg');
    document.body.appendChild(s);
    setTimeout(()=>s.remove(), 1400);
  }
}
// floating background hearts
setInterval(()=>{
  const h = document.createElement('div');
  h.className = 'fl';
  h.textContent = ['💗','💕','💖','🌸','✨','🤍'][Math.floor(Math.random()*6)];
  h.style.left = Math.random()*100 + 'vw';
  h.style.fontSize = (14+Math.random()*26) + 'px';
  h.style.animationDuration = (7+Math.random()*7) + 's';
  document.body.appendChild(h);
  setTimeout(()=>h.remove(), 15000);
}, 650);

// 1. open the envelope
function openEnv(e){
  if($('#env').classList.contains('open')) return;
  $('#env').classList.add('open');
  const r = $('#seal').getBoundingClientRect();
  burst(r.left+r.width/2, r.top+r.height/2, 18);
  setTimeout(()=>go(1), 1900);
}
$('#openBtn').onclick = openEnv;
$('#seal').onclick = openEnv;

// next buttons
document.querySelectorAll('[data-next]').forEach(b => b.addEventListener('click', e=>{
  burst(e.clientX, e.clientY, 10);
  go(cur+1);
}));

// 2. slider
const r = $('#love');
function lv(){
  const v = +r.value; A.love = v;
  $('#lovelbl').textContent = v<30 ? 'Hmm… try again 😒' : v<70 ? 'Getting warmer 🥰' : v<100 ? 'Almost there 😍' : 'To infinity and beyond ♾️💖';
  $('#bigheart').style.transform = `scale(${1+v/70})`;
}
r.oninput = lv; lv();

// 3. chips
document.querySelectorAll('.chip').forEach(c => c.onclick = e => {
  c.classList.toggle('on');
  if(c.classList.contains('on')) burst(e.clientX, e.clientY, 5, ['💗','✨']);
});

// 4. runaway "No"
const no = $('#no'); let tries = 0;
const lines = ['No 💔','Are you sure? 🥺','Think again 😭','Lee is crying 😢','Just say yes 😤','Nice try 😏'];
function dodge(e){
  e.preventDefault();
  tries++;
  no.textContent = lines[Math.min(tries, lines.length-1)];
  no.style.transform = `translate(${(Math.random()*200-100)|0}px,${(Math.random()*160-40)|0}px) rotate(${(Math.random()*30-15)|0}deg)`;
}
no.addEventListener('pointerenter', dodge);
no.addEventListener('touchstart', dodge, {passive:false});
no.addEventListener('click', dodge);

// 5. kisses
$('#plus').onclick = () => { const k=$('#kiss'); k.textContent = ++A.kisses; };
$('#minus').onclick = () => { if(A.kisses>0) $('#kiss').textContent = --A.kisses; };

// 6. finale
function finale(){
  A.why = [...document.querySelectorAll('.chip.on')].map(c=>c.textContent);
  const extra = $('#why').value.trim(), food = $('#food').value.trim();
  const txt =
`Hi Lee 💌 ${HER_NAME} here, I opened your letter!

💗 How much I love you: ${A.love>=100 ? 'INFINITY ♾️' : A.love+'%'}
🥺 Why I love you: ${A.why.join(', ') || 'everything'}${extra ? ' — '+extra : ''}
🍕 Do I love you more than food? Yes, obviously
🤪 You would be: ${food || 'a strawberry'}
😘 Kisses you deserve today: ${A.kisses}

I love you too! 💖`;
  $('#send').href = `https://wa.me/${LEE_PHONE}?text=${encodeURIComponent(txt)}`;
  const w = innerWidth;
  for(let i=0;i<6;i++) setTimeout(()=>burst(w*(0.15+Math.random()*0.7), innerHeight*(0.2+Math.random()*0.4), 16), i*350);
}
$('#again').onclick = () => location.reload();