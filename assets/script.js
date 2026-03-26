const t=document.querySelector('.mobile-toggle'),m=document.querySelector('.menu');
if(t&&m){
  t.onclick=()=>{
    const o=m.classList.toggle('open');
    t.setAttribute('aria-expanded',o?'true':'false');
  };
}

document.querySelectorAll('form[data-formspree="true"]').forEach(form=>{
  form.addEventListener('submit',async e=>{
    e.preventDefault();
    const data=new FormData(form);
    const name=(data.get('name')||'').toString().trim();
    const phone=(data.get('phone')||'').toString().trim();
    const details=(data.get('details')||'').toString().trim();
    const endpoint=(form.getAttribute('action')||'').trim();
    const statusId=form.getAttribute('data-status');
    const status=statusId?document.getElementById(statusId):null;
    if(status){
      status.className='form-status';
      status.textContent='';
    }
    if(!name || !phone || !details){
      if(status){
        status.className='form-status error';
        status.textContent='Please fill in your name, phone number and details.';
      }
      return;
    }
    if(!endpoint || endpoint.includes('REPLACE_WITH_YOUR_CODE')){
      if(status){
        status.className='form-status error';
        status.textContent='Add your real Formspree endpoint in _config.yml first.';
      }
      return;
    }
    const btn=form.querySelector('button[type="submit"]');
    const original=btn?btn.textContent:'Send enquiry';
    if(btn){
      btn.disabled=true;
      btn.textContent='Sending...';
    }
    try{
      const response=await fetch(endpoint,{
        method:'POST',
        body:data,
        headers:{'Accept':'application/json'}
      });
      if(response.ok){
        form.reset();
        if(status){
          status.className='form-status success';
          status.textContent='Thanks. Your enquiry has been sent.';
        }
      }else{
        if(status){
          status.className='form-status error';
          status.textContent='Something went wrong sending your enquiry. Please call or WhatsApp instead.';
        }
      }
    }catch(err){
      if(status){
        status.className='form-status error';
        status.textContent='Something went wrong sending your enquiry. Please call or WhatsApp instead.';
      }
    }finally{
      if(btn){
        btn.disabled=false;
        btn.textContent=original;
      }
    }
  });
});
