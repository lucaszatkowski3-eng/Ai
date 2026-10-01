// Optional serverless endpoint (for Vercel-style deployments).
// Set OPENAI_API_KEY as an environment variable on the server. Never put it in app.js.
export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
  try{
    const {message}=req.body||{};
    if(!message) return res.status(400).json({error:'message fehlt'});
    if(!process.env.OPENAI_API_KEY) return res.status(503).json({error:'OPENAI_API_KEY fehlt'});
    const response=await fetch('https://api.openai.com/v1/responses',{
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':`Bearer ${process.env.OPENAI_API_KEY}`},
      body:JSON.stringify({
        model:process.env.OPENAI_MODEL||'gpt-5.6-luna',
        instructions:'Du bist LernAI, ein freundlicher deutschsprachiger Lernbegleiter. Erkläre altersgerecht, klar und strukturiert. Hilf bei allen Schulfächern. Stelle bei Bedarf Rückfragen und nutze Beispiele. Gib keine erfundenen Quellen an.',
        input:message
      })
    });
    const data=await response.json();
    if(!response.ok) return res.status(response.status).json({error:data.error?.message||'KI-Fehler'});
    return res.status(200).json({answer:data.output_text||'Keine Antwort erhalten.'});
  }catch(e){return res.status(500).json({error:e.message||'Serverfehler'});}
}