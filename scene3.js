
// Scene 3: Sparkles + Carousel (from your code, scoped)
(function(){
  // Sparkles canvas
  const canvas = document.getElementById("sparkles-scene3");
  const ctx = canvas.getContext("2d");
  function resize(){ canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resize(); window.addEventListener("resize", resize);

  let sparkles = []; let animatingSparkles = false;
  function createSparkle(){ const x=Math.random()*canvas.width, y=Math.random()*canvas.height, size=Math.random()*3+1, speed=Math.random()*0.5+0.2, hue=Math.floor(Math.random()*360); sparkles.push({x,y,size,speed,hue}); }
  function animateSparkles(){
    if(!animatingSparkles) return;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i=0;i<sparkles.length;i++){
      const s=sparkles[i]; ctx.beginPath(); ctx.arc(s.x,s.y,s.size,0,Math.PI*2); ctx.fillStyle=`hsl(${s.hue},100%,70%)`; ctx.fill();
      s.y -= s.speed; s.x += Math.sin(s.y*0.05)*0.5;
      if(s.y < -s.size){ sparkles.splice(i,1); i--; }
    }
    while(sparkles.length < 200) createSparkle();
    requestAnimationFrame(animateSparkles);
  }

  function setActive(run){ animatingSparkles = run; if(run){ animateSparkles(); } }

  // Carousel logic
  let progress = 50, startX = 0, active = 0, isDown = false;
  const speedWheel = 0.02, speedDrag = -0.1;
  const $items = document.querySelectorAll('#scene3-container .carousel-item');
  const $cursors = document.querySelectorAll('#scene3-container .cursor');
  const getZindex = (array, index) => array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i));
  const displayItems = (item, index, active) => {
    const zIndex = getZindex([...$items], active)[index];
    item.style.setProperty('--zIndex', zIndex);
    item.style.setProperty('--active', $items.length > 0 ? (index - active) / $items.length : 0);
  };
  const animateCarousel = () => {
    progress = Math.max(0, Math.min(progress, 100));
    active = Math.floor(progress / 100 * ($items.length - 1));
    $items.forEach((item, index) => displayItems(item, index, active));
  };

  $items.forEach((item, i) => item.addEventListener('click', () => { progress = (i / $items.length) * 100; animateCarousel(); }));
  const handleWheel = (e) => { progress = progress + e.deltaY * speedWheel; animateCarousel(); };
  const handleMouseMove = (e) => {
    if (e.type === 'mousemove') { $cursors.forEach(($c)=>{ $c.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`; }); }
    if (!isDown) return;
    const x = e.clientX || (e.touches && e.touches.length ? e.touches[0].clientX : 0);
    progress = progress + (x - startX) * speedDrag; startX = x; animateCarousel();
  };
  const handleMouseDown = (e) => { isDown = true; startX = e.clientX || (e.touches && e.touches.length ? e.touches[0].clientX : 0); };
  const handleMouseUp = () => { isDown = false; };

  // Link scene3 intention to go to scene4
  function bindButtons(){
    const intentionBtn = document.querySelector("#scene3-container .intention-btn");
    if(intentionBtn){ intentionBtn.onclick = (e)=>{ e.preventDefault(); document.getElementById('scene4').checked = true; window.dispatchEvent(new Event('scenechange')); }; }
    const prev = document.getElementById('prevFrom3');
    if(prev){ prev.onclick = (e)=>{ e.preventDefault(); document.getElementById('prevBtn').click(); }; }
  }

  function attachGlobal(){
    document.addEventListener('wheel', handleWheel);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchstart', handleMouseDown);
    document.addEventListener('touchmove', handleMouseMove);
    document.addEventListener('touchend', handleMouseUp);
  }
  function detachGlobal(){
    document.removeEventListener('wheel', handleWheel);
    document.removeEventListener('mousedown', handleMouseDown);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('touchstart', handleMouseDown);
    document.removeEventListener('touchmove', handleMouseMove);
    document.removeEventListener('touchend', handleMouseUp);
  }

  function updateActive(){
    const active = document.getElementById('scene3').checked;
    if(active){
      setActive(true);
      animateCarousel();
      attachGlobal();
      bindButtons();
    } else {
      setActive(false);
      detachGlobal();
    }
  }
  window.addEventListener('scenechange', updateActive);
})();
