const start = new Date(2026, 6, 21, 0, 0, 0);
function updateCounter() {
  const now = new Date();
  let total = Math.max(0, now - start);
  let cursor = new Date(start);
  let years = 0, months = 0;
  while (new Date(cursor.getFullYear()+1,cursor.getMonth(),cursor.getDate()) <= now) {
    cursor.setFullYear(cursor.getFullYear()+1); years++;
  }
  while (new Date(cursor.getFullYear(),cursor.getMonth()+1,cursor.getDate()) <= now) {
    cursor.setMonth(cursor.getMonth()+1); months++;
  }
  const days = Math.floor((now - cursor)/86400000);
  const hours = Math.floor((total%86400000)/3600000);
  const minutes = Math.floor((total%3600000)/60000);
  const seconds = Math.floor((total%60000)/1000);
  for (const [id,val] of Object.entries({years,months,days,hours,minutes,seconds})) document.getElementById(id).textContent=val;
}
updateCounter(); setInterval(updateCounter,1000);
document.querySelectorAll('.letter').forEach(el=>el.addEventListener('click',()=>{el.classList.toggle('open'); el.querySelector('i').textContent=el.classList.contains('open')?'−':'＋';}));
const modal=document.getElementById('modal'), modalImg=document.getElementById('modalImg');
document.querySelectorAll('.photo').forEach(el=>el.addEventListener('click',()=>{modalImg.src=el.querySelector('img').src; modal.classList.add('show');}));
function closeModal(){modal.classList.remove('show'); modalImg.src='';}
document.getElementById('closeModal').addEventListener('click',closeModal);
modal.addEventListener('click',e=>{if(e.target===modal)closeModal();});
let score=0, active=false;
const field=document.getElementById('playfield'), scoreEl=document.getElementById('score'), note=document.getElementById('gameNote'), startBtn=document.getElementById('startGame');
function addHeart(){
  if(!active) return;
  const heart=document.createElement('button');
  heart.className='heart'; heart.type='button'; heart.textContent='♥'; heart.setAttribute('aria-label','اجمع قلب');
  heart.style.left=(4+Math.random()*84)+'%'; heart.style.top=(8+Math.random()*72)+'%';
  heart.addEventListener('click',()=>{
    if(!active)return;
    score++; scoreEl.textContent=score; heart.remove();
    if(score>=10){active=false; field.innerHTML=''; note.textContent='برافو! جمعت العشرة قلوب ❤️'; startBtn.textContent='العب مرة تانية';}
    else addHeart();
  });
  field.appendChild(heart);
}
function beginGame(){score=0;active=true;scoreEl.textContent='0';field.innerHTML='';note.textContent='يلا! اجمع القلوب ❤️';startBtn.textContent='إعادة اللعبة';addHeart();}
startBtn.addEventListener('click',beginGame);
