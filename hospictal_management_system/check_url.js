fetch('https://hospictal-front.vercel.app/').then(r=>r.text()).then(html=>{
  const m=html.match(/assets\/index-[a-zA-Z0-9]+\.js/);
  if(!m)return console.log("No js file found in html");
  fetch('https://hospictal-front.vercel.app/'+m[0]).then(r=>r.text()).then(js=>{
    console.log(js.includes('https://hospictal-backend-url.onrender.com/api') ? 'CORRECT URL BAKED' : 'WRONG URL BAKED'); 
    const found = js.match(/http[^\"\'\`]+\/api/g); 
    if (found) console.log('Actually baked: ', found);
  })
});
