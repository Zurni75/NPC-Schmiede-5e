export default function handler(req,res){
  res.setHeader('Cache-Control','no-store');
  const clientId=String(process.env.GOOGLE_CLIENT_ID||'').trim();
  if(!clientId)return res.status(503).json({error:'GOOGLE_CLIENT_ID ist in Vercel noch nicht eingetragen.'});
  return res.status(200).json({clientId});
}
