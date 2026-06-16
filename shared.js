// ── NAV INIT ──
function initPage() {
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');
  if(hamburger && navLinks) {
    hamburger.addEventListener('click', function(){ navLinks.classList.toggle('open'); });
    navLinks.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ navLinks.classList.remove('open'); });
    });
  }
}

// ── LIGHTBOX ──
var lbImages = [];
var lbIndex = 0;

function openGallery(title, images) {
  lbImages = images;
  lbIndex = 0;
  document.getElementById('lbTitle').textContent = title;
  document.getElementById('lbModal').classList.add('open');
  renderLB();
  document.addEventListener('keydown', lbKey);
}

function closeLB() {
  document.getElementById('lbModal').classList.remove('open');
  document.removeEventListener('keydown', lbKey);
}

function lbKey(e) {
  if(e.key==='ArrowRight') lbNext();
  if(e.key==='ArrowLeft') lbPrev();
  if(e.key==='Escape') closeLB();
}

function lbNext(){ lbIndex=(lbIndex+1)%lbImages.length; renderLB(); }
function lbPrev(){ lbIndex=(lbIndex-1+lbImages.length)%lbImages.length; renderLB(); }
function lbGoTo(i){ lbIndex=i; renderLB(); }

function renderLB(){
  var img=lbImages[lbIndex];
  var wrap=document.getElementById('lbImgWrap');
  if(img.src){
    wrap.innerHTML='<img src="'+img.src+'" alt="'+img.label+'">';
  } else {
    wrap.innerHTML='<div class="ph" style="width:65vw;height:52vh;font-size:0.8rem;"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg><br>'+img.label+'</div>';
  }
  document.getElementById('lbCounter').textContent=(lbIndex+1)+' / '+lbImages.length;
  var thumbs=document.getElementById('lbThumbs');
  thumbs.innerHTML=lbImages.map(function(im,i){
    var active=i===lbIndex?' active':'';
    if(im.src) return '<div class="lb-thumb'+active+'" onclick="lbGoTo('+i+')"><img src="'+im.src+'" alt="'+im.label+'"></div>';
    return '<div class="lb-thumb'+active+'" onclick="lbGoTo('+i+')">'+im.label+'</div>';
  }).join('');
}

var galleries = {
  revere:{title:'Roots in Revere',images:[{label:'Revere — as a kid'},{label:'Revere — growing up'},{label:'Revere — community'},{label:'Revere — as an adult'},{label:'Revere — today'}]},
  bbbs:{title:'Big Brothers Big Sisters',images:[{label:'Photo with mentee 1'},{label:'Photo with mentee 2'},{label:'Photo with mentee 3'}]},
  haymakers:{title:'Haymakers for Hope',images:[{label:'Boxing photo 1'},{label:'Boxing photo 2'},{label:'Boxing photo 3'},{label:'Boxing photo 4'}]},
  rodman:{title:'Rodman for Kids',images:[{label:'Rodman for Kids photo 1'},{label:'Rodman for Kids photo 2'},{label:'Rodman for Kids photo 3'},{label:'Rodman for Kids photo 4'}]}
};
