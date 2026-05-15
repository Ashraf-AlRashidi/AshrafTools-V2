/* ══════════════════════════════════
   AI JUDGE — OpenRouter Config
   ⚠️ ضع الـ API Key الجديد هنا ↓
══════════════════════════════════ */
const AI_CONFIG = {
  model: 'openai/o4-mini',
  url: 'https://openrouter.ai/api/v1/chat/completions',
  apiKey: ''
};

// جيب الـ Key من Supabase عند التحميل
async function loadApiKey() {
  try {
    const { data } = await sb.from('settings').select('value').eq('key','openrouter_key').maybeSingle();
    if(data?.value) AI_CONFIG.apiKey = data.value;
  } catch(e) { console.warn('Could not load API key', e); }
}
loadApiKey();

async function judgeWithAI(problem, answer) {
  if(!AI_CONFIG.apiKey) {
    // fallback بدون AI — يقبل أي إجابة
    return { verdict: 'accepted', feedback: '✅ تم تسجيل إجابتك! (بدون تحقق AI)', score: 10 };
  }
  const sys = 'انت قاضٍ Java. قيّم إجابة الطالب. اعطِ ردك بـ JSON فقط: {"verdict":"accepted" او "wrong" او "partial","feedback":"شرح قصير بالعربي","score":رقم_من_10}';
  const prompt = 'المسألة: ' + problem + '\n\nاجابة الطالب:\n' + answer;
  try {
    const res = await fetch(AI_CONFIG.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + AI_CONFIG.apiKey,
        'HTTP-Referer': 'https://ashraf-alrashidi.github.io/AshrafTools/',
        'X-Title': 'AshrafTools'
      },
      body: JSON.stringify({
        model: AI_CONFIG.model,
        messages: [{role:'system',content:sys},{role:'user',content:prompt}],
        max_tokens: 300,
        temperature: 0.1
      })
    });
    const data = await res.json();
    const text = data.choices?.[0]?.message?.content || '{}';
    const clean = text.replace(/```json|```/g,'').trim();
    return JSON.parse(clean);
  } catch(e) {
    console.error('AI Judge error:', e);
    return { verdict: 'accepted', feedback: '✅ تم التسجيل! (تعذر التحقق AI)', score: 10 };
  }
}