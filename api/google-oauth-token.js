function cookie(req,name){const m=String(req.headers.cookie||'').match(new RegExp('(?:^|;\\s*)'+name+'=([^;]*)'));return m?decodeURIComponent(m[1]):'';}
async function redis(cmd){const r=await fetch(process.env.UPSTASH_REDIS_REST_URL,{method:'POST',headers:{Authorization:`Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,'Content-Type':'application/json'},body:JSON.stringify(cmd)});const d=await r.json();if(!r.ok||d.error)throw new Error(d.error||`Redis ${r.status}`);return d.result;}
export default async function handler(req,res){
 res.setHeader('Cache-Control','no-store');
 try{
  const sid=cookie(req,'nsc_google_session'); if(!sid)return res.status(401).json({connected:false});
  const refresh=await redis(['GET',`npc-schmiede:google-session:v1:${sid}`]); if(!refresh)return res.status(401).json({connected:false});
  const body=new URLSearchParams({client_id:String(process.env.GOOGLE_CLIENT_ID||''),client_secret:String(process.env.GOOGLE_CLIENT_SECRET||''),refresh_token:refresh,grant_type:'refresh_token'});
  const tr=await fetch('https://oauth2.googleapis.com/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body}); const tok=await tr.json();
  if(!tr.ok)return res.status(401).json({connected:false,error:tok.error||'refresh_failed'});
  return res.status(200).json({connected:true,accessToken:tok.access_token,expiresIn:tok.expires_in||3600});
 }catch(e){console.error(e);return res.status(500).json({connected:false,error:'Google-Token konnte nicht erneuert werden.'});}
}
