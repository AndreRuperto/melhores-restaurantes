for(const port of [4174,4177])for(const path of ['/restaurante/asador-etxebarri','/restaurante/asador-etxebarri/','/restaurantes']){const r=await fetch('http://127.0.0.1:'+port+path);const s=await r.text();console.log(port,path,r.url,s.includes('profile-data'),s.match(/<title>(.*?)<\/title>/)?.[1],s.length)}


