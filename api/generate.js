function json(res,obj,status=200){return res.status(status).json(obj)}
export default async function handler(req,res){
  if(req.method!=='POST')return json(res,{error:'Method not allowed'},405);
  try{
    const body=req.body||{};
    if(!process.env.OPENAI_API_KEY)return json(res,{error:'OPENAI_API_KEY fehlt'},503);
    const {type,topic,subject,level,klass,count}=body;
    if(!type||!topic)return json(res,{error:'type und topic fehlen'},400);
    let schema;
    if(type==='quiz'){
      schema={type:'object',properties:{questions:{type:'array',items:{type:'object',properties:{q:{type:'string'},o:{type:'array',items:{type:'string'},minItems:4,maxItems:4},a:{type:'integer',minimum:0,maximum:3},e:{type:'string'}},required:['q','o','a','e'],additionalProperties:false},minItems:3,maxItems:15}},required:['questions'],additionalProperties:false};
    }else{
      schema={type:'object',properties:{title:{type:'string'},content:{type:'string'},solutions:{type:'string'}},required:['title','content','solutions'],additionalProperties:false};
    }
    const prompt=type==='quiz'
      ? `Erstelle ein deutschsprachiges Schulquiz. Thema: ${topic}. Fach: ${subject}. Anzahl Fragen: ${count}. Jede Frage hat genau 4 Antwortmöglichkeiten und genau eine richtige Antwort. a ist der nullbasierte Index der richtigen Antwort. e ist eine kurze Erklärung. Keine Trickfragen.`
      : `Erstelle ein hochwertiges deutschsprachiges Arbeitsblatt. Thema: ${topic}. Fach: ${subject}. Klassenstufe: ${klass}. Schwierigkeit: ${level}. Anzahl Aufgaben: ${count}. Erstelle abwechslungsreiche, fachlich passende Aufgaben mit Platz zum Bearbeiten. content muss fertiges HTML ohne html/body-Tag sein. solutions enthält ein separates HTML-Lösungsblatt. Keine erfundenen Quellen.`;
    const response=await fetch('https://api.openai.com/v1/responses',{
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':`Bearer ${process.env.OPENAI_API_KEY}`},
      body:JSON.stringify({
        model:process.env.OPENAI_MODEL||'gpt-5.6-luna',
        instructions:'Du bist ein professioneller deutschsprachiger Schulmaterial-Generator. Inhalte sollen korrekt, altersgerecht und klar sein.',
        input:prompt,
        text:{format:{type:'json_schema',name:type==='quiz'?'quiz':'worksheet',strict:true,schema}}
      })
    });
    const data=await response.json();
    if(!response.ok)return json(res,{error:data.error?.message||'KI-Fehler'},response.status);
    let parsed;try{parsed=JSON.parse(data.output_text||'{}')}catch{return json(res,{error:'Ungültige KI-Ausgabe'},502)}
    return json(res,parsed);
  }catch(e){return json(res,{error:e.message||'Serverfehler'},500)}
}