const {jsPDF} = window.jspdf || {};

/* ══ SIGNATURE ══ */
const NAME='أشرووووف';
function makeSig(id){
  const el=document.getElementById(id);if(!el)return;
  el.innerHTML=[...NAME].map((c,i)=>`<span class="sig-letter" style="animation-delay:${i*.18}s">${c}</span>`).join('');
}
['sig1','sig2','sig3','sig4','sig5','sig6','sig7','sig8'].forEach(makeSig);

/* ══ TAB SWITCH ══ */
window.switchTab = function switchTab(id,btn){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById('page-'+id).classList.add('active');
  if(btn)btn.classList.add('active');
  if(id==='diagram')setTimeout(()=>{resizeCv();drawDiagram();},60);
  if(id==='project')setTimeout(refreshProjectPage,80);
  if(id==='problems')renderProblems();
  if(id==='leaderboard')loadLeaderboard('all');
  if(id==='profile')renderProfile();
  if(id==='keys')buildShortcuts();
};

// اختصارات Ctrl+1..4 للتنقل بين الصفحات
document.addEventListener('keydown',e=>{
  if(!e.ctrlKey)return;
  const tabs=document.querySelectorAll('.tab-btn');
  if(e.key==='1'){e.preventDefault();switchTab('img',tabs[0]);}
  else if(e.key==='2'){e.preventDefault();switchTab('code',tabs[1]);}
  else if(e.key==='3'){e.preventDefault();switchTab('diagram',tabs[2]);}
  else if(e.key==='4'){e.preventDefault();switchTab('project',tabs[3]);}
});

/* ══════════════════════════════════
   BUILD SHORTCUTS PAGE
══════════════════════════════════ */
function buildShortcuts() {
  function sk(keys, desc, sub, color) {
    const k = keys.map(k => `<span class="key ${color}">${k}</span>`).join('<span class="kp">+</span>');
    return `<div class="sk"><div class="sk-keys">${k}</div><div class="sk-desc">${desc}<small>${sub}</small></div></div>`;
  }

  // Windows
  const winData = [
    [['Ctrl','C'],'نسخ','Copy المحدد'],
    [['Ctrl','V'],'لصق','Paste من الـ Clipboard'],
    [['Ctrl','X'],'قص','Cut المحدد'],
    [['Ctrl','Z'],'تراجع','Undo آخر عملية'],
    [['Ctrl','Y'],'إعادة','Redo'],
    [['Ctrl','A'],'تحديد الكل','Select All'],
    [['Ctrl','S'],'حفظ','Save الملف'],
    [['Ctrl','P'],'طباعة','Print'],
    [['Ctrl','F'],'بحث','Find في الملف'],
    [['Ctrl','H'],'استبدال','Find & Replace'],
    [['Ctrl','N'],'ملف جديد','New file/window'],
    [['Ctrl','O'],'فتح ملف','Open file'],
    [['Ctrl','W'],'إغلاق تاب','Close current tab'],
    [['Ctrl','T'],'تاب جديد','New browser tab'],
    [['Ctrl','Tab'],'تبديل التابات','Switch tabs'],
    [['Ctrl','Shift','T'],'فتح تاب مغلق','Reopen closed tab'],
    [['Ctrl','+'],'تكبير','Zoom in'],
    [['Ctrl','-'],'تصغير','Zoom out'],
    [['Ctrl','0'],'حجم طبيعي','Reset zoom 100%'],
    [['Alt','Tab'],'تبديل البرامج','Switch windows'],
    [['Alt','F4'],'إغلاق البرنامج','Close program'],
    [['Win','D'],'سطح المكتب','Show desktop'],
    [['Win','L'],'قفل الجهاز','Lock screen'],
    [['Win','E'],'المستكشف','File explorer'],
    [['Win','R'],'Run','Open run dialog'],
    [['Win','I'],'الإعدادات','Open settings'],
    [['Win','Tab'],'عرض النوافذ','Task view'],
    [['Win','V'],'Clipboard','Clipboard history'],
    [['Win','Shift','S'],'لقطة شاشة','Screenshot snip'],
    [['PrtSc'],'لقطة الشاشة كلها','Full screenshot'],
    [['Shift','Delete'],'حذف نهائي','Delete permanently'],
    [['F2'],'إعادة تسمية','Rename file'],
    [['F5'],'تحديث','Refresh page'],
    [['Ctrl','Shift','Esc'],'مدير المهام','Task Manager'],
  ];
  document.getElementById('ks-win-grid').innerHTML = winData.map(([k,d,s])=>sk(k,d,s,'c')).join('');

  // IntelliJ Navigate
  const navData = [
    [['Shift','Shift'],'Search Everywhere','ابحث في كل حاجة دفعة واحدة'],
    [['Ctrl','N'],'Find Class','ابحث عن كلاس باسمه'],
    [['Ctrl','Shift','N'],'Find File','ابحث عن ملف'],
    [['Ctrl','Alt','Shift','N'],'Find Symbol','ابحث عن method أو variable'],
    [['Ctrl','B'],'Go to Declaration','روح لتعريف المتغير أو الدالة'],
    [['Ctrl','Alt','B'],'Go to Implementation','روح للتنفيذ'],
    [['Ctrl','U'],'Go to Super','روح للكلاس الأب'],
    [['Alt','F7'],'Find Usages','فين بيتستخدم ده؟'],
    [['Ctrl','F12'],'File Structure','هيكل الملف - methods & fields'],
    [['Ctrl','E'],'Recent Files','آخر الملفات اللي فتحتها'],
    [['Ctrl','Shift','E'],'Recent Locations','آخر الأماكن في الكود'],
    [['Alt','←'],'Back','ارجع للمكان السابق'],
    [['Alt','→'],'Forward','روح للأمام'],
    [['Ctrl','G'],'Go to Line','روح لسطر معين بالرقم'],
    [['Ctrl','F'],'Find in File','بحث في الملف'],
    [['Ctrl','R'],'Replace in File','استبدال في الملف'],
    [['Ctrl','Shift','F'],'Find in Path','بحث في كل المشروع'],
    [['Ctrl','Shift','R'],'Replace in Path','استبدال في كل المشروع'],
    [['Ctrl','Tab'],'Switcher','التنقل بين الملفات المفتوحة'],
    [['Esc'],'Close Panel','إغلاق أي panel مفتوح'],
  ];
  document.getElementById('ks-nav-grid').innerHTML = navData.map(([k,d,s])=>sk(k,d,s,'p')).join('');

  // IntelliJ Edit
  const editData = [
    [['Ctrl','Space'],'Basic Completion','اقتراحات الكود الأساسية'],
    [['Ctrl','Shift','Space'],'Smart Completion','اقتراحات ذكية حسب النوع'],
    [['Alt','Enter'],'Show Intentions','إصلاح الكود والاقتراحات'],
    [['Ctrl','Alt','L'],'Reformat Code','ترتيب وتنسيق الكود تلقائي'],
    [['Ctrl','Alt','O'],'Optimize Imports','حذف الـ imports الزيادة'],
    [['Ctrl','/'],'Comment Line','تعليق سطر //'],
    [['Ctrl','Shift','/'],'Comment Block','تعليق بلوك /* */'],
    [['Ctrl','D'],'Duplicate Line','نسخ السطر الحالي تحته'],
    [['Ctrl','Y'],'Delete Line','حذف السطر كامل'],
    [['Alt','Shift','↑'],'Move Line Up','نقل السطر لأعلى'],
    [['Alt','Shift','↓'],'Move Line Down','نقل السطر لأسفل'],
    [['Ctrl','Shift','↑'],'Move Statement Up','نقل الـ method لأعلى'],
    [['Ctrl','Shift','↓'],'Move Statement Down','نقل الـ method لأسفل'],
    [['Ctrl','W'],'Extend Selection','توسيع التحديد تدريجياً'],
    [['Ctrl','Shift','W'],'Shrink Selection','تضييق التحديد'],
    [['Shift','F6'],'Rename','إعادة تسمية في كل الكود'],
    [['Ctrl','Alt','M'],'Extract Method','استخراج كود في method جديدة'],
    [['Ctrl','Alt','V'],'Extract Variable','استخراج قيمة في variable'],
    [['Ctrl','Alt','T'],'Surround With','لف الكود في try/if/for...'],
    [['Ctrl','Shift','U'],'Toggle Case','تحويل UPPER/lower case'],
    [['Alt','Insert'],'Generate','توليد Constructor/Getter/Setter'],
    [['Ctrl','O'],'Override Methods','Override من الكلاس الأب'],
    [['Ctrl','I'],'Implement Methods','تنفيذ methods من Interface'],
    [['Ctrl','Alt','F'],'Extract Field','استخراج في field'],
    [['Ctrl','Alt','P'],'Extract Parameter','استخراج في parameter'],
    [['Ctrl','F6'],'Change Signature','تغيير signature الدالة'],
  ];
  document.getElementById('ks-edit-grid').innerHTML = editData.map(([k,d,s])=>sk(k,d,s,'b')).join('');

  // IntelliJ Run
  const runData = [
    [['Shift','F10'],'Run','تشغيل البرنامج'],
    [['Shift','F9'],'Debug','تشغيل في Debug mode'],
    [['Ctrl','F2'],'Stop','إيقاف البرنامج'],
    [['Ctrl','F5'],'Rerun','إعادة التشغيل'],
    [['F8'],'Step Over','خطوة خطوة - تجاوز الدالة'],
    [['F7'],'Step Into','الدخول داخل الدالة'],
    [['Shift','F8'],'Step Out','الخروج من الدالة'],
    [['Alt','F9'],'Run to Cursor','شغّل لحد مكان الـ cursor'],
    [['Alt','F8'],'Evaluate Expression','تقييم expression في Debug'],
    [['Ctrl','F8'],'Toggle Breakpoint','إضافة/حذف Breakpoint'],
    [['Ctrl','Shift','F8'],'View Breakpoints','شوف كل الـ Breakpoints'],
    [['F9'],'Resume','استكمال التشغيل'],
  ];
  document.getElementById('ks-run-grid').innerHTML = runData.map(([k,d,s])=>sk(k,d,s,'g')).join('');

  // Live Templates
  const liveData = [
    ['sout','System.out.println()','أشهر سطر في Java'],
    ['souf','System.out.printf()','طباعة منسقة'],
    ['serr','System.err.println()','طباعة error'],
    ['psvm','public static void main','نقطة البداية'],
    ['fori','for (int i=0; i<n; i++)','for loop بـ index'],
    ['iter','for (Type x : list)','for-each loop'],
    ['ifn','if (x == null)','شرط null check'],
    ['inn','if (x != null)','شرط not null'],
    ['while','while loop','حلقة while'],
    ['do','do-while loop','حلقة do-while'],
    ['thr','throw new ...','رمي exception'],
    ['try','try-catch block','معالجة الاستثناءات'],
    ['prsf','private static final','ثابت خاص'],
    ['geti','getInstance()','Singleton pattern'],
    ['new','new Object()','إنشاء كائن'],
  ];
  document.getElementById('ks-live-grid').innerHTML = liveData.map(([k,title,desc])=>`
    <div style="background:var(--surface2);border:1px solid var(--border);border-radius:9px;padding:11px 14px;display:flex;align-items:center;gap:10px;transition:border-color .15s;"
      onmouseenter="this.style.borderColor='rgba(245,166,35,.4)'" onmouseleave="this.style.borderColor=''">
      <span class="key o" style="font-size:.8rem;padding:4px 10px;">${k}</span>
      <div style="flex:1;">
        <div style="font-size:.82rem;font-weight:700;">${title}</div>
        <div style="font-size:.72rem;color:var(--muted);margin-top:1px;">${desc}</div>
      </div>
    </div>`).join('');
}

/* ══════════════════════════════════
   PROBLEMS DATA
══════════════════════════════════ */
const PROBLEMS = [
  // ══ EASY ══
  {id:'p1', title:'مجموع الأرقام', difficulty:'easy', points:10,
   desc:'اكتب دالة تستقبل رقمين وترجع مجموعهم.',
   examples:[{in:'add(3, 5)', out:'8'},{in:'add(-1, 4)', out:'3'}]},
  {id:'p2', title:'الرقم الزوجي أو الفردي', difficulty:'easy', points:10,
   desc:'اكتب دالة تستقبل رقم وتطبع "زوجي" لو كان زوجي و"فردي" لو كان فردي.',
   examples:[{in:'check(4)', out:'زوجي'},{in:'check(7)', out:'فردي'}]},
  {id:'p3', title:'عكس النص', difficulty:'easy', points:15,
   desc:'اكتب دالة تستقبل String وترجعه معكوس.',
   examples:[{in:'reverse("hello")', out:'"olleh"'},{in:'reverse("java")', out:'"avaj"'}]},
  {id:'p4', title:'أكبر عدد في Array', difficulty:'easy', points:10,
   desc:'اكتب دالة تستقبل int array وترجع أكبر رقم فيه.',
   examples:[{in:'max(new int[]{3,7,1,9,2})', out:'9'},{in:'max(new int[]{-1,-5,-2})', out:'-1'}]},
  {id:'p5', title:'عد الحروف', difficulty:'easy', points:10,
   desc:'اكتب دالة تستقبل String وحرف، وترجع عدد مرات ظهور الحرف في النص.',
   examples:[{in:'count("hello", "l")', out:'2'},{in:'count("java", "a")', out:'2'}]},
  {id:'p6', title:'مجموع أرقام Array', difficulty:'easy', points:10,
   desc:'اكتب دالة تستقبل int array وترجع مجموع كل عناصره.',
   examples:[{in:'sum(new int[]{1,2,3,4,5})', out:'15'},{in:'sum(new int[]{-1,1})', out:'0'}]},
  {id:'p7', title:'هل النص فارغ؟', difficulty:'easy', points:10,
   desc:'اكتب دالة تستقبل String وترجع true لو فارغ أو null، وfalse لو فيه محتوى.',
   examples:[{in:'isEmpty("")', out:'true'},{in:'isEmpty("hello")', out:'false'}]},
  {id:'p8', title:'تحويل درجات الحرارة', difficulty:'easy', points:15,
   desc:'اكتب دالة تحوّل درجة الحرارة من Celsius لـ Fahrenheit. المعادلة: F = C * 9/5 + 32',
   examples:[{in:'toFahrenheit(0)', out:'32.0'},{in:'toFahrenheit(100)', out:'212.0'}]},
  {id:'p9', title:'هل الرقم أولي؟', difficulty:'easy', points:15,
   desc:'اكتب دالة تستقبل رقم وترجع true لو أولي (prime) وfalse لو لأ.',
   examples:[{in:'isPrime(7)', out:'true'},{in:'isPrime(9)', out:'false'}]},
  {id:'p10', title:'قلب الأرقام', difficulty:'easy', points:15,
   desc:'اكتب دالة تستقبل عدد صحيح وترجعه معكوس الأرقام.',
   examples:[{in:'reverseNum(1234)', out:'4321'},{in:'reverseNum(100)', out:'1'}]},

  // ══ MEDIUM ══
  {id:'p11', title:'الفيبوناتشي', difficulty:'medium', points:30,
   desc:'اكتب دالة تطبع أول N رقم في سلسلة فيبوناتشي. السلسلة: 0, 1, 1, 2, 3, 5, 8, ...',
   examples:[{in:'fib(5)', out:'0 1 1 2 3'},{in:'fib(7)', out:'0 1 1 2 3 5 8'}]},
  {id:'p12', title:'الباليندروم', difficulty:'medium', points:30,
   desc:'اكتب دالة تتحقق لو الكلمة palindrome (تُقرأ بنفس الطريقة من الاتجاهين). ارجع true أو false.',
   examples:[{in:'isPalindrome("racecar")', out:'true'},{in:'isPalindrome("hello")', out:'false'}]},
  {id:'p13', title:'الفاكتوريال', difficulty:'medium', points:35,
   desc:'اكتب دالة recursive تحسب factorial لرقم N. تذكر: factorial(0) = 1',
   examples:[{in:'factorial(5)', out:'120'},{in:'factorial(0)', out:'1'}]},
  {id:'p14', title:'ترتيب Bubble Sort', difficulty:'medium', points:30,
   desc:'نفّذ خوارزمية Bubble Sort لترتيب int array تصاعدياً.',
   examples:[{in:'bubbleSort(new int[]{5,3,8,1})', out:'[1, 3, 5, 8]'},{in:'bubbleSort(new int[]{2,1})', out:'[1, 2]'}]},
  {id:'p15', title:'HashMap — تكرار الكلمات', difficulty:'medium', points:35,
   desc:'اكتب برنامج يستقبل جملة ويطبع عدد مرات تكرار كل كلمة باستخدام HashMap.',
   examples:[{in:'"hello world hello"', out:'hello=2, world=1'}]},
  {id:'p16', title:'مصفوفة مقلوبة', difficulty:'medium', points:30,
   desc:'اكتب دالة تعكس ترتيب عناصر int array في نفس المصفوفة (in-place) بدون مصفوفة جديدة.',
   examples:[{in:'reverse(new int[]{1,2,3,4,5})', out:'[5, 4, 3, 2, 1]'}]},
  {id:'p17', title:'أكبر عدد مشترك — GCD', difficulty:'medium', points:35,
   desc:'اكتب دالة recursive تحسب القاسم المشترك الأكبر (GCD) لعددين باستخدام خوارزمية Euclidean.',
   examples:[{in:'gcd(48, 18)', out:'6'},{in:'gcd(100, 75)', out:'25'}]},
  {id:'p18', title:'Queue بـ LinkedList', difficulty:'medium', points:40,
   desc:'نفّذ Queue بـ Java LinkedList فيها: enqueue(), dequeue(), peek(), isEmpty().',
   examples:[{in:'enqueue(1),enqueue(2),dequeue()', out:'1'},{in:'peek()', out:'2'}]},
  {id:'p19', title:'String — عكس الكلمات', difficulty:'medium', points:30,
   desc:'اكتب دالة تستقبل جملة وتعكس ترتيب الكلمات (مش الحروف).',
   examples:[{in:'reverseWords("Hello World Java")', out:'"Java World Hello"'}]},
  {id:'p20', title:'المصفوفة الثنائية — بحث', difficulty:'medium', points:40,
   desc:'اعمل 2D array 3x3 وابحث عن قيمة معينة، ارجع [row, col] أو [-1,-1] لو مش موجودة.',
   examples:[{in:'find(matrix, 5)', out:'[1, 2]'},{in:'find(matrix, 99)', out:'[-1, -1]'}]},

  // ══ HARD ══
  {id:'p21', title:'Binary Search', difficulty:'hard', points:60,
   desc:'نفّذ خوارزمية Binary Search على array مرتب. ارجع index العنصر أو -1 لو مش موجود.',
   examples:[{in:'search(new int[]{1,3,5,7,9}, 5)', out:'2'},{in:'search(new int[]{1,3,5}, 4)', out:'-1'}]},
  {id:'p22', title:'Linked List — إضافة وطباعة', difficulty:'hard', points:70,
   desc:'اعمل Linked List في Java فيها: addFirst(), addLast(), printList(). اكتب الكلاسين Node و LinkedList.',
   examples:[{in:'addFirst(1), addLast(2), addLast(3), printList()', out:'1 -> 2 -> 3'}]},
  {id:'p23', title:'Stack بـ Array', difficulty:'hard', points:75,
   desc:'نفّذ Stack باستخدام Array فيها: push(), pop(), peek(), isEmpty(). تعامل مع الـ overflow و underflow.',
   examples:[{in:'push(1),push(2),pop()', out:'2'},{in:'peek()', out:'1'}]},
  {id:'p24', title:'Binary Tree — إدراج وطباعة', difficulty:'hard', points:80,
   desc:'نفّذ Binary Search Tree فيها: insert() و inOrder(). اكتب الكلاسين Node و BST.',
   examples:[{in:'insert(5),insert(3),insert(7), inOrder()', out:'3 5 7'}]},
  {id:'p25', title:'Recursion — Tower of Hanoi', difficulty:'hard', points:70,
   desc:'اكتب برنامج recursive يحل لغز Tower of Hanoi لـ N قرص. اطبع كل حركة.',
   examples:[{in:'hanoi(3, "A", "C", "B")', out:'Move disk 1 from A to C | Move disk 2 from A to B | ...'}]},
  {id:'p26', title:'Design Pattern — Singleton', difficulty:'hard', points:65,
   desc:'نفّذ Singleton Design Pattern في Java. الكلاس لازم يكون Thread-Safe باستخدام synchronized.',
   examples:[{in:'getInstance() == getInstance()', out:'true — نفس الـ object'}]},
  {id:'p27', title:'Exception Handling كامل', difficulty:'hard', points:60,
   desc:'اكتب برنامج يقرأ رقم من المستخدم ويقسم 100 عليه. تعامل مع: NumberFormatException و ArithmeticException واكتب finally block.',
   examples:[{in:'input: 0', out:'ArithmeticException: Cannot divide by zero'},{in:'input: 5', out:'Result: 20'}]},

  // ══ IMPOSSIBLE ══
  {id:'p28', title:'Merge Sort', difficulty:'impossible', points:150,
   desc:'نفّذ خوارزمية Merge Sort كاملة. اكتب الدالتين: mergeSort() و merge(). الخوارزمية لازم تكون Divide & Conquer.',
   examples:[{in:'mergeSort(new int[]{5,2,8,1,9,3})', out:'[1, 2, 3, 5, 8, 9]'}]},
  {id:'p29', title:'Graph — BFS', difficulty:'impossible', points:180,
   desc:'نفّذ Breadth-First Search على Graph ممثّل بـ Adjacency List. اطبع الـ nodes بترتيب الزيارة.',
   examples:[{in:'BFS(graph, 0)', out:'0 1 2 3 4'}]},
  {id:'p30', title:'LRU Cache', difficulty:'impossible', points:200,
   desc:'نفّذ LRU (Least Recently Used) Cache بـ Java باستخدام LinkedHashMap أو Doubly Linked List + HashMap. فيها: get(key) و put(key, value) بـ O(1).',
   examples:[{in:'put(1,1),put(2,2),get(1),put(3,3),get(2)', out:'1, -1 (evicted)'}]},
];

let currentProblem = null;
let currentFilter = 'all';

function diffColor(d){
  return d==='easy'?'var(--green)':d==='medium'?'var(--orange)':d==='hard'?'var(--red)':'var(--purple)';
}
function diffLabel(d){
  return d==='easy'?'🟢 سهل':d==='medium'?'🟡 متوسط':d==='hard'?'🔴 صعب':'💀 مستحيل';
}

function getSolvedProblems(){
  try{ return JSON.parse(localStorage.getItem('solved_problems')||'[]'); }catch(e){ return []; }
}

window.renderProblems = function renderProblems(){
  const solved = getSolvedProblems();
  const list = document.getElementById('problemsList');
  const filtered = currentFilter==='all'?PROBLEMS:PROBLEMS.filter(p=>p.difficulty===currentFilter);
  list.innerHTML = filtered.map(p=>{
    const isSolved = solved.includes(p.id);
    return `<div class="card" style="border-right:4px solid ${diffColor(p.difficulty)};cursor:pointer;transition:transform .15s,box-shadow .15s;${isSolved?'opacity:.7':''}"
      onmouseenter="this.style.transform='translateY(-2px)';this.style.boxShadow='0 8px 30px rgba(0,0,0,.4)'"
      onmouseleave="this.style.transform='';this.style.boxShadow=''"
      onclick="openProblem('${p.id}')">
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="font-size:1.4rem;">${isSolved?'✅':'🔒'}</div>
          <div>
            <div style="font-weight:900;font-size:1rem;">${p.title}</div>
            <div style="font-size:.78rem;color:${diffColor(p.difficulty)};margin-top:2px;">${diffLabel(p.difficulty)}</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="background:rgba(245,166,35,.12);border:1px solid rgba(245,166,35,.3);border-radius:8px;padding:6px 14px;font-size:.85rem;font-weight:900;color:var(--orange);">
            ⭐ ${p.points} نقطة
          </div>
          <div class="btn btn-ghost btn-sm">${isSolved?'مراجعة':'حل المسألة →'}</div>
        </div>
      </div>
    </div>`;
  }).join('');
}

function filterProblems(f, btn){
  currentFilter = f;
  document.querySelectorAll('.prob-filter').forEach(b=>{
    b.className = 'btn btn-ghost btn-sm prob-filter';
  });
  if(btn){ btn.classList.remove('btn-ghost'); btn.classList.add('btn-primary'); }
  renderProblems();
}

window.openProblem = function openProblem(id){
  if(!window._currentUser){ 
    showToast('⚠️ سجّل دخول الأول!','error');
    openAuthModal('login');
    return; 
  }
  const p = PROBLEMS.find(x=>x.id===id);
  if(!p) return;
  currentProblem = p;
  document.getElementById('pmDiff').innerHTML = `<span style="color:${diffColor(p.difficulty)}">${diffLabel(p.difficulty)}</span>`;
  document.getElementById('pmTitle').textContent = p.title;
  document.getElementById('pmPoints').textContent = `⭐ ${p.points} نقطة`;
  document.getElementById('pmDesc').textContent = p.desc;
  document.getElementById('pmExamples').innerHTML = p.examples.map(ex=>`
    <div style="background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:12px 16px;margin-bottom:8px;font-family:var(--font-mono);font-size:.83rem;">
      <span style="color:var(--muted);">Input: </span><span style="color:var(--blue);">${ex.in}</span>
      <span style="color:var(--muted);margin-right:12px;">Output: </span><span style="color:var(--green);">${ex.out}</span>
    </div>`).join('');
  document.getElementById('pmAnswer').value = '';
  document.getElementById('pmResult').style.display = 'none';
  document.getElementById('problemModal').style.display = 'flex';
}

window.closeProblemModal = function closeProblemModal(){
  document.getElementById('problemModal').style.display = 'none';
}

async function submitProblem(){
  const answer = document.getElementById('pmAnswer').value.trim();
  if(!answer){ showToast('⚠️ اكتب إجابتك الأول!','error'); return; }
  const solved = getSolvedProblems();
  if(solved.includes(currentProblem.id)){
    showToast('✅ أنت حليت المسألة دي قبل كده!','success');
    closeProblemModal(); return;
  }
  const btn = document.getElementById('pmSubmitBtn');
  const resEl = document.getElementById('pmResult');
  btn.disabled = true;
  btn.innerHTML = '<span style="display:inline-flex;gap:4px;align-items:center;"><span class="loading-dot"></span><span class="loading-dot"></span><span class="loading-dot"></span></span> جاري التحقق...';

  // إظهار loading
  resEl.style.display = 'block';
  resEl.innerHTML = `<div style="background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:16px;text-align:center;color:var(--muted);">
    <div style="margin-bottom:8px;">🤖 الـ AI بيحكم على إجابتك...</div>
    <div style="font-size:.78rem;">ده ممكن ياخد ثانية أو اتنين</div>
  </div>`;

  // تحقق AI
  const judgment = await judgeWithAI(currentProblem.desc || currentProblem.title, answer);
  const accepted = judgment.verdict === 'accepted' || judgment.verdict === 'partial';

  if(accepted){
    // حفظ محلي
    solved.push(currentProblem.id);
    localStorage.setItem('solved_problems', JSON.stringify(solved));

    // تحديث Supabase
    if(window._sb && window._currentUser){
      try {
        const uid = window._currentUser.id;
        const {data: pData} = await window._sb.from('profiles').select('points,solved').eq('id',uid).maybeSingle();
        const pts = judgment.verdict === 'partial' ? Math.floor(currentProblem.points * 0.5) : currentProblem.points;
        await window._sb.from('profiles').upsert({
          id: uid,
          name: window._currentUser.user_metadata?.name || window._currentUser.email.split('@')[0],
          email: window._currentUser.email,
          points: (pData?.points||0) + pts,
          solved: (pData?.solved||0) + 1,
          last_solve: new Date().toISOString()
        });
        resEl.innerHTML = `<div style="background:rgba(34,211,122,.1);border:1px solid rgba(34,211,122,.3);border-radius:12px;padding:18px;">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
            <span style="font-size:1.8rem;">${judgment.verdict==='accepted'?'🎉':'⚠️'}</span>
            <div>
              <div style="font-weight:900;color:var(--green);font-size:1rem;">${judgment.verdict==='accepted'?'إجابة صحيحة!':'إجابة جزئية!'}</div>
              <div style="font-size:.78rem;color:var(--orange);">+${pts} نقطة ⭐  |  تقييم: ${judgment.score}/10</div>
            </div>
          </div>
          <div style="font-size:.85rem;line-height:1.7;color:var(--text);background:var(--surface3);border-radius:8px;padding:10px;">${judgment.feedback}</div>
        </div>`;
        showToast('🎉 +' + pts + ' نقطة!', 'success');
      } catch(e){ console.error('points error',e); }
    }
  } else {
    resEl.innerHTML = `<div style="background:rgba(240,90,90,.08);border:1px solid rgba(240,90,90,.25);border-radius:12px;padding:18px;">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
        <span style="font-size:1.8rem;">❌</span>
        <div>
          <div style="font-weight:900;color:var(--red);font-size:1rem;">إجابة غلط</div>
          <div style="font-size:.78rem;color:var(--muted);">حاول تاني! النقاط لسه موجودة</div>
        </div>
      </div>
      <div style="font-size:.85rem;line-height:1.7;color:var(--text);background:var(--surface3);border-radius:8px;padding:10px;">${judgment.feedback}</div>
    </div>`;
    showToast('❌ إجابة غلط، حاول تاني!', 'error');
    btn.disabled = false;
    btn.textContent = '✅ سلّم الإجابة';
    return;
  }

  btn.disabled = false;
  btn.textContent = '✅ سلّم الإجابة';
  renderProblems();
}

/* ══════════════════════════════════
   AVATAR HELPERS
══════════════════════════════════ */
function makeAvatar(name, avatarUrl, size) {
  size = size || 40;
  if(avatarUrl) return '<img src="'+avatarUrl+'" style="width:'+size+'px;height:'+size+'px;border-radius:50%;object-fit:cover;border:2px solid rgba(34,211,122,.4);flex-shrink:0;">';
  var colors = ['#4f8ef7','#22d37a','#a66cff','#f5a623','#f06292','#00e5d4'];
  var color = colors[(name.charCodeAt(0)||0) % colors.length];
  var fs = Math.round(size*0.4);
  return '<div style="width:'+size+'px;height:'+size+'px;border-radius:50%;background:'+color+';display:grid;place-items:center;font-size:'+fs+'px;font-weight:900;color:white;flex-shrink:0;border:2px solid '+color+'44;">'+name.charAt(0).toUpperCase()+'</div>';
}

function getAvatar(user) {
  return localStorage.getItem('avatar_' + user.id) || null;
}

/* ══════════════════════════════════
   LEADERBOARD
══════════════════════════════════ */
async function loadLeaderboard(type){
  document.querySelectorAll('.lb-tab').forEach(b=>{ b.className='btn btn-ghost lb-tab'; });
  const activeTab=document.getElementById('lbTab'+type.charAt(0).toUpperCase()+type.slice(1));
  if(activeTab) activeTab.className='btn btn-primary lb-tab';
  const list=document.getElementById('leaderboardList');
  list.innerHTML='<div style="text-align:center;color:var(--muted);padding:50px;font-size:.9rem;">⏳ جاري التحميل...</div>';
  if(!window._sb){
    list.innerHTML='<div style="text-align:center;color:var(--muted);padding:50px;">🔐 سجّل دخول عشان تشوف المتصدرين</div>';
    return;
  }
  try {
    let query=window._sb.from('profiles').select('name,email,points,solved,avatar_url').order('points',{ascending:false}).limit(20);
    if(type==='daily'){
      const today=new Date(); today.setHours(0,0,0,0);
      query=window._sb.from('profiles').select('name,email,points,solved,avatar_url').gte('last_solve',today.toISOString()).order('points',{ascending:false}).limit(20);
    } else if(type==='weekly'){
      const week=new Date(); week.setDate(week.getDate()-7);
      query=window._sb.from('profiles').select('name,email,points,solved,avatar_url').gte('last_solve',week.toISOString()).order('points',{ascending:false}).limit(20);
    }
    const {data,error}=await query;
    if(error) throw error;
    if(!data||data.length===0){
      const typeAr={all:'لم يحل أحد بعد',daily:'لا أحد حل اليوم',weekly:'لا أحد حل هذا الأسبوع'};
      list.innerHTML=`<div style="text-align:center;padding:60px 20px;">
        <div style="font-size:3rem;margin-bottom:12px;">🏆</div>
        <div style="font-weight:900;font-size:1rem;margin-bottom:6px;">${typeAr[type]||'لا يوجد بيانات'}</div>
        <div style="color:var(--muted);font-size:.85rem;">كن أول واحد يتصدر! 🚀</div>
      </div>`;
      return;
    }
    const medals=['🥇','🥈','🥉'];
    const myId=window._currentUser?.id;
    list.innerHTML=data.map((u,i)=>{
      const av=makeAvatar(u.name||'?', u.avatar_url||null, 42);
      const isMe=window._currentUser && u.email===window._currentUser.email;
      return `<div style="background:${isMe?'rgba(79,142,247,.06)':'var(--surface)'};border:1px solid ${i<3?'rgba(245,166,35,.35)':isMe?'rgba(79,142,247,.3)':'var(--border)'};border-radius:14px;padding:14px 20px;display:flex;align-items:center;gap:14px;transition:transform .15s,box-shadow .15s;"
        onmouseenter="this.style.transform='translateY(-2px)';this.style.boxShadow='0 8px 30px rgba(0,0,0,.4)'"
        onmouseleave="this.style.transform='';this.style.boxShadow=''">
        <div style="font-size:1.4rem;width:32px;text-align:center;flex-shrink:0;">${medals[i]||'<span style="font-size:.85rem;color:var(--muted);">#'+(i+1)+'</span>'}</div>
        ${av}
        <div style="flex:1;">
          <div style="font-weight:900;font-size:.95rem;">${u.name||'مجهول'} ${isMe?'<span style="font-size:.65rem;background:rgba(79,142,247,.15);color:var(--blue);border-radius:4px;padding:1px 6px;">أنت</span>':''}</div>
          <div style="font-size:.75rem;color:var(--muted);margin-top:2px;">✅ حل ${u.solved||0} مسألة</div>
        </div>
        <div style="background:rgba(245,166,35,.12);border:1px solid rgba(245,166,35,.3);border-radius:10px;padding:8px 16px;font-weight:900;color:var(--orange);font-size:.95rem;">⭐ ${u.points||0}</div>
      </div>`;
    }).join('');
  } catch(e) {
    list.innerHTML=`<div style="text-align:center;color:var(--red);padding:40px;">❌ خطأ: ${e.message}</div>`;
  }
}

/* ══════════════════════════════════
   PROFILE
══════════════════════════════════ */
async function renderProfile(){
  const el = document.getElementById('profileContent');
  if(!window._currentUser){
    el.innerHTML = `
      <div style="text-align:center;padding:80px 24px;">
        <div style="font-size:4rem;margin-bottom:16px;">👤</div>
        <div style="font-size:1.3rem;font-weight:900;margin-bottom:8px;">مش مسجل دخول</div>
        <div style="color:var(--muted);margin-bottom:24px;">سجّل دخول عشان تشوف البروفايل بتاعك</div>
        <button class="btn btn-primary" onclick="openAuthModal('login')" style="padding:12px 32px;">🚀 دخول / تسجيل</button>
      </div>`;
    return;
  }
  const user = window._currentUser;
  const name = user.user_metadata?.name || user.email.split('@')[0];
  const solved = getSolvedProblems();
  let dbData = {points:0, solved:0};
  if(window._sb){
    const {data} = await window._sb.from('profiles').select('*').eq('id',user.id).maybeSingle();
    if(data) dbData = data;
  }
  // جيب الصورة من localStorage أو من Supabase
  let avatarUrl = localStorage.getItem('avatar_' + user.id);
  if(!avatarUrl && dbData?.avatar_url) {
    avatarUrl = dbData.avatar_url;
    localStorage.setItem('avatar_' + user.id, avatarUrl);
  }
  const totalPoints = PROBLEMS.reduce((s,p)=>s+p.points,0);
  const pct = Math.round(((dbData.points||0)/totalPoints)*100);
  el.innerHTML = `
    <div class="page-header">
      <div class="page-icon" style="background:rgba(79,142,247,.12);border:1px solid rgba(79,142,247,.3);">👤</div>
      <div><div class="page-title">بروفايلك</div><div class="page-sub">شوف تقدمك ونقاطك</div></div>
    </div>

    <!-- بطاقة البروفايل -->
    <div class="card" style="border-right:4px solid var(--blue);margin-bottom:20px;">
      <div style="display:flex;align-items:center;gap:20px;flex-wrap:wrap;">
        <!-- الأفاتار -->
        <div style="position:relative;flex-shrink:0;cursor:pointer;" onclick="document.getElementById('avatarInput').click()">
          ${avatarUrl
            ? `<img src="${avatarUrl}" style="width:80px;height:80px;border-radius:50%;object-fit:cover;border:3px solid var(--blue);">`
            : `<div style="width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,var(--blue),var(--purple));display:grid;place-items:center;font-size:2.2rem;font-weight:900;color:white;border:3px solid var(--blue);">${name.charAt(0).toUpperCase()}</div>`
          }
          <div style="position:absolute;bottom:2px;left:2px;background:var(--surface);border:2px solid var(--border2);border-radius:50%;width:24px;height:24px;display:grid;place-items:center;font-size:.75rem;">📷</div>
        </div>
        <input type="file" id="avatarInput" accept="image/*" style="display:none" onchange="uploadAvatar(this)">
        <div style="flex:1;">
          <div style="font-size:1.3rem;font-weight:900;">${name}</div>
          <div style="color:var(--muted);font-size:.83rem;margin-top:2px;">${user.email}</div>
          <div style="font-size:.75rem;color:var(--muted);margin-top:4px;">اضغط على الصورة لتغييرها 📷</div>
        </div>
        <button class="btn btn-ghost btn-sm" onclick="logoutUser()">🚪 خروج</button>
      </div>
    </div>

    <!-- الإحصائيات -->
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:14px;margin-bottom:20px;">
      <div class="card" style="text-align:center;padding:20px;">
        <div style="font-size:2rem;font-weight:900;color:var(--orange);">⭐ ${dbData.points||0}</div>
        <div style="font-size:.78rem;color:var(--muted);margin-top:4px;">إجمالي النقاط</div>
      </div>
      <div class="card" style="text-align:center;padding:20px;">
        <div style="font-size:2rem;font-weight:900;color:var(--green);">✅ ${dbData.solved||0}</div>
        <div style="font-size:.78rem;color:var(--muted);margin-top:4px;">مسائل محلولة</div>
      </div>
      <div class="card" style="text-align:center;padding:20px;">
        <div style="font-size:2rem;font-weight:900;color:var(--blue);">📊 ${pct}%</div>
        <div style="font-size:.78rem;color:var(--muted);margin-top:4px;">من الكل</div>
      </div>
      <div class="card" style="text-align:center;padding:20px;">
        <div style="font-size:2rem;font-weight:900;color:var(--purple);">🧩 ${PROBLEMS.length}</div>
        <div style="font-size:.78rem;color:var(--muted);margin-top:4px;">إجمالي التحديات</div>
      </div>
    </div>

    <!-- Progress Bar -->
    <div class="card" style="margin-bottom:20px;">
      <div style="display:flex;justify-content:space-between;margin-bottom:10px;">
        <span style="font-weight:900;">تقدمك الكلي</span>
        <span style="color:var(--orange);font-weight:900;">${dbData.points||0} / ${totalPoints} نقطة</span>
      </div>
      <div style="height:12px;background:var(--surface3);border-radius:99px;overflow:hidden;">
        <div style="height:100%;width:${pct}%;background:linear-gradient(90deg,var(--blue),var(--purple));border-radius:99px;transition:width 1.2s ease;"></div>
      </div>
      <div style="font-size:.75rem;color:var(--muted);margin-top:6px;">${pct}% مكتمل</div>
    </div>

    <!-- المسائل المحلولة -->
    <div class="card">
      <div class="card-title">المسائل المحلولة</div>
      ${PROBLEMS.map(p=>{
        const done = solved.includes(p.id);
        return `<div style="display:flex;align-items:center;gap:12px;padding:11px 0;border-bottom:1px solid var(--border);">
          <span style="font-size:1.1rem;">${done?'✅':'⬜'}</span>
          <span style="flex:1;font-size:.88rem;${done?'':'color:var(--muted);'}">${p.title}</span>
          <span style="font-size:.75rem;padding:2px 8px;border-radius:6px;background:${done?'rgba(34,211,122,.1)':'var(--surface2)'};color:${diffColor(p.difficulty)};">${diffLabel(p.difficulty)}</span>
          <span style="font-size:.78rem;color:var(--orange);font-weight:700;">${done?'+'+p.points+'⭐':p.points+'⭐'}</span>
        </div>`;
      }).join('')}
    </div>
  `;
}

window.uploadAvatar = function(input) {
  const file = input.files[0];
  if(!file || !window._currentUser) return;
  if(file.size > 2*1024*1024){ showToast('⚠️ الصورة أكبر من 2MB','error'); return; }
  const reader = new FileReader();
  reader.onload = async (e) => {
    const base64 = e.target.result;
    localStorage.setItem('avatar_' + window._currentUser.id, base64);
    if(window._sb) {
      try {
        await window._sb.from('profiles').update({ avatar_url: base64 }).eq('id', window._currentUser.id);
        showToast('✅ تم حفظ الصورة!', 'success');
      } catch(err) {
        showToast('✅ تم الحفظ محلياً', 'success');
      }
    } else {
      showToast('✅ تم تحديث الصورة!', 'success');
    }
    updateLoginBtn(window._currentUser);
    renderProfile();
  };
  reader.readAsDataURL(file);
};


/* ══════════════════════════════════
   PAGE 1: IMAGES → PDF
══════════════════════════════════ */
let imgs=[],dragSrc=null;
const dz=document.getElementById('dropzone'),ii=document.getElementById('imgInput');
ii.addEventListener('change',e=>addImgFiles(e.target.files));
dz.addEventListener('click',e=>{if(!e.target.closest('button'))ii.click();});
dz.addEventListener('dragover',e=>{e.preventDefault();dz.classList.add('over');});
dz.addEventListener('dragleave',()=>dz.classList.remove('over'));
dz.addEventListener('drop',e=>{e.preventDefault();dz.classList.remove('over');addImgFiles(e.dataTransfer.files);});

function addImgFiles(files){
  [...files].filter(f=>f.type.startsWith('image/')).forEach(file=>{
    const r=new FileReader();
    r.onload=e=>{imgs.push({id:Math.random(),file,src:e.target.result});renderImgGrid();};
    r.readAsDataURL(file);
  });
  ii.value='';
}
function renderImgGrid(){
  const g=document.getElementById('imgGrid');
  document.getElementById('imgPreview').style.display=imgs.length?'block':'none';
  document.getElementById('imgCount').textContent=imgs.length;
  document.getElementById('imgCount2').textContent=imgs.length;
  g.innerHTML='';
  imgs.forEach((im,i)=>{
    const c=document.createElement('div');
    c.className='img-card';c.draggable=true;
    c.innerHTML=`<img src="${im.src}" loading="lazy"><div class="img-overlay"><span class="img-num">${i+1}</span><button class="rm-btn" data-i="${i}">✕</button></div>`;
    c.addEventListener('dragstart',()=>{dragSrc=i;c.classList.add('dragging');});
    c.addEventListener('dragend',()=>c.classList.remove('dragging'));
    c.addEventListener('dragover',e=>{e.preventDefault();c.classList.add('drag-target');});
    c.addEventListener('dragleave',()=>c.classList.remove('drag-target'));
    c.addEventListener('drop',e=>{e.preventDefault();c.classList.remove('drag-target');
      if(dragSrc!==null&&dragSrc!==i){const mv=imgs.splice(dragSrc,1)[0];imgs.splice(i,0,mv);renderImgGrid();}});
    g.appendChild(c);
  });
  g.querySelectorAll('.rm-btn').forEach(b=>b.addEventListener('click',e=>{
    e.stopPropagation();imgs.splice(+b.dataset.i,1);renderImgGrid();
  }));
}
document.getElementById('clearImgs').addEventListener('click',()=>{imgs=[];renderImgGrid();});
document.getElementById('convertPDF').addEventListener('click',async()=>{
  if(!imgs.length){showToast('اختر صورة على الأقل!','error');return;}
  const btn=document.getElementById('convertPDF'),prog=document.getElementById('imgProg'),
    fill=document.getElementById('imgProgFill'),lbl=document.getElementById('imgProgLbl');
  btn.disabled=true;prog.classList.add('show');
  try{
    const sz=document.getElementById('pgSize').value,or=document.getElementById('pgOrient').value,
      nm=document.getElementById('pdfName').value.trim()||'Assignment';
    let pdf=null;
    for(let i=0;i<imgs.length;i++){
      lbl.textContent=`معالجة ${i+1}/${imgs.length}...`;fill.style.width=(i/imgs.length*90)+'%';
      const el=await loadImg(imgs[i].src);
      const iw=el.naturalWidth,ih=el.naturalHeight;
      let ort=or==='auto'?(iw>=ih?'landscape':'portrait'):or;
      let pw,ph;
      if(sz==='fit'){pw=iw*.2646;ph=ih*.2646;}
      else{const s={a4:[210,297],a3:[297,420],letter:[215.9,279.4]};[pw,ph]=s[sz];if(ort==='landscape')[pw,ph]=[ph,pw];}
      if(!pdf)pdf=new jsPDF({orientation:pw>ph?'landscape':'portrait',unit:'mm',format:[pw,ph]});
      else pdf.addPage([pw,ph],pw>ph?'landscape':'portrait');
      const pad=sz==='fit'?0:6,aw=pw-pad*2,ah=ph-pad*2,r=Math.min(aw/iw,ah/ih),
        dw=iw*r,dh=ih*r,x=pad+(aw-dw)/2,y=pad+(ah-dh)/2;
      pdf.addImage(imgs[i].src,imgs[i].file.type==='image/png'?'PNG':'JPEG',x,y,dw,dh);
      await sleep(10);
    }
    fill.style.width='100%';lbl.textContent='جاري التنزيل...';
    await sleep(300);pdf.save(nm+'.pdf');showToast('✅ تم إنشاء PDF!','success');
  }catch(e){showToast('خطأ في التحويل','error');console.error(e);}
  finally{btn.disabled=false;await sleep(700);prog.classList.remove('show');fill.style.width='0%';}
});

/* ══════════════════════════════════
   PAGE 2: MULTI-FILE JAVA EDITOR
══════════════════════════════════ */
// Each file: {name, code}
let javaFiles=[{name:'Main',code:''}];
let activeFileIdx=0;

function renderFileTabs(){
  const bar=document.getElementById('fileTabsBar');
  bar.innerHTML='';
  javaFiles.forEach((f,i)=>{
    const tab=document.createElement('button');
    tab.className='file-tab'+(i===activeFileIdx?' active':'');
    tab.innerHTML=`<span style="color:${i===activeFileIdx?'var(--green)':'var(--muted)'}">📄</span> ${esc(f.name)}.java`;
    if(javaFiles.length>1){
      const cl=document.createElement('button');
      cl.className='tab-close';cl.textContent='✕';
      cl.onclick=e=>{e.stopPropagation();removeFile(i);};
      tab.appendChild(cl);
    }
    tab.onclick=()=>switchFile(i);
    bar.appendChild(tab);
  });
  const addBtn=document.createElement('button');
  addBtn.className='add-file-btn';addBtn.textContent='+ ملف جديد';
  addBtn.onclick=addNewFile;
  bar.appendChild(addBtn);
  document.getElementById('fileCountBadge').textContent=javaFiles.length;
}

function switchFile(idx){
  saveActiveFile();
  activeFileIdx=idx;
  loadActiveFile();
  renderFileTabs();
}

function saveActiveFile(){
  javaFiles[activeFileIdx].code=document.getElementById('codeEditor').value;
}

function loadActiveFile(){
  const f=javaFiles[activeFileIdx];
  document.getElementById('codeEditor').value=f.code;
  document.getElementById('activeFileName').value=f.name;
  document.getElementById('charCount').textContent=f.code.length+' حرف';
  if(document.getElementById('codePreview').classList.contains('visible'))renderHL();
}

function addNewFile(){
  saveActiveFile();
  const modal=document.getElementById('newFileModal');
  const input=document.getElementById('newFileNameInput');
  modal.style.display='grid';
  input.value='';
  setTimeout(()=>input.focus(),50);
}
function confirmNewFile(){
  const input=document.getElementById('newFileNameInput');
  const finalName=input.value.trim()||'Class'+(javaFiles.length+1);
  closeNewFileModal();
  javaFiles.push({name:finalName,code:`public class ${finalName} {\n    // كود الكلاس هنا\n}`});
  activeFileIdx=javaFiles.length-1;
  renderFileTabs();loadActiveFile();
  showToast('✅ تم إنشاء '+finalName+'.java','success');
}
function closeNewFileModal(){
  document.getElementById('newFileModal').style.display='none';
}

function removeFile(idx){
  if(javaFiles.length<=1){showToast('لازم ملف واحد على الأقل!','error');return;}
  javaFiles.splice(idx,1);
  activeFileIdx=Math.min(activeFileIdx,javaFiles.length-1);
  renderFileTabs();loadActiveFile();
}

function renameActiveFile(){
  const val=document.getElementById('activeFileName').value.trim();
  if(val)javaFiles[activeFileIdx].name=val;
  renderFileTabs();
}

const codeEditor=document.getElementById('codeEditor');
codeEditor.addEventListener('input',()=>{
  javaFiles[activeFileIdx].code=codeEditor.value;
  document.getElementById('charCount').textContent=codeEditor.value.length+' حرف';
  if(document.getElementById('codePreview').classList.contains('visible'))renderHL();
});
codeEditor.addEventListener('keydown',e=>{
  if(e.key==='Tab'){e.preventDefault();const s=codeEditor.selectionStart;
    codeEditor.value=codeEditor.value.substring(0,s)+'    '+codeEditor.value.substring(codeEditor.selectionEnd);
    codeEditor.selectionStart=codeEditor.selectionEnd=s+4;}
});

document.getElementById('copyCodeBtn').addEventListener('click',()=>{
  if(!codeEditor.value.trim()){showToast('لا يوجد كود!','error');return;}
  navigator.clipboard.writeText(codeEditor.value).then(()=>showToast('✅ تم الكوبي!','success'));
});
document.getElementById('clearCodeBtn').addEventListener('click',()=>{
  codeEditor.value='';javaFiles[activeFileIdx].code='';
  document.getElementById('charCount').textContent='0 حرف';
});
document.getElementById('downloadJavaBtn').addEventListener('click',()=>{
  saveActiveFile();
  const f=javaFiles[activeFileIdx];
  if(!f.code.trim()){showToast('اكتب الكود الأول!','error');return;}
  dlBlob(new Blob([f.code],{type:'text/plain'}),f.name+'.java');
  showToast(`✅ تم تنزيل ${f.name}.java`,'success');
});
document.getElementById('downloadZipBtn').addEventListener('click',async()=>{
  saveActiveFile();
  const zip=new JSZip();
  javaFiles.forEach(f=>zip.file(f.name+'.java',f.code));
  const blob=await zip.generateAsync({type:'blob'});
  dlBlob(blob,'AshrafProject.zip');
  showToast('✅ تم تنزيل المشروع كـ ZIP!','success');
});
document.getElementById('togglePreviewBtn').addEventListener('click',()=>{
  const p=document.getElementById('codePreview');
  if(p.classList.toggle('visible'))renderHL();
});
function renderHL(){
  let c=codeEditor.value
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/(\/\/[^\n]*)/g,'<span class="cm">$1</span>')
    .replace(/("(?:[^"\\]|\\.)*")/g,'<span class="str">$1</span>')
    .replace(/\b(public|private|protected|class|interface|void|int|String|boolean|double|float|long|char|byte|short|static|final|new|return|if|else|for|while|import|package|extends|implements|this|super|null|true|false|abstract|try|catch|throws)\b/g,'<span class="kw">$1</span>')
    .replace(/\b(\d+)\b/g,'<span class="num">$1</span>');
  document.getElementById('codePreview').innerHTML=c;
}

/* ── SNIPPETS ── */
const SNIPPETS=[
  {title:'Hello World',desc:'أبسط برنامج Java',tag:'مبتدئ',color:'green',code:`public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`},
  {title:'For Loop',desc:'حلقة تكرار عادية',tag:'أساسي',color:'blue',code:`for (int i = 0; i < 10; i++) {\n    System.out.println("i = " + i);\n}`},
  {title:'ArrayList',desc:'قائمة ديناميكية',tag:'Collections',color:'purple',code:`import java.util.ArrayList;\n\nArrayList<String> list = new ArrayList<>();\nlist.add("أشرف");\nlist.add("Java");\nfor (String item : list) {\n    System.out.println(item);\n}`},
  {title:'Scanner Input',desc:'استقبال مدخلات',tag:'Input',color:'orange',code:`import java.util.Scanner;\n\nScanner sc = new Scanner(System.in);\nSystem.out.print("أدخل اسمك: ");\nString name = sc.nextLine();\nSystem.out.println("مرحباً " + name);\nsc.close();`},
  {title:'Class Template',desc:'قالب كلاس كامل',tag:'OOP',color:'purple',code:`public class Student {\n    private String name;\n    private int age;\n\n    public Student(String name, int age) {\n        this.name = name;\n        this.age = age;\n    }\n\n    public String getName() { return name; }\n    public int getAge() { return age; }\n\n    @Override\n    public String toString() {\n        return "Student{name=" + name + ", age=" + age + "}";\n    }\n}`},
  {title:'Try-Catch',desc:'معالجة الأخطاء',tag:'Exception',color:'orange',code:`try {\n    int result = 10 / 0;\n    System.out.println(result);\n} catch (ArithmeticException e) {\n    System.out.println("خطأ: " + e.getMessage());\n} finally {\n    System.out.println("انتهى البرنامج");\n}`},
  {title:'Interface',desc:'واجهة Interface',tag:'OOP',color:'blue',code:`public interface Shape {\n    double getArea();\n    double getPerimeter();\n}\n\npublic class Circle implements Shape {\n    private double radius;\n    public Circle(double r) { this.radius = r; }\n    public double getArea() { return Math.PI * radius * radius; }\n    public double getPerimeter() { return 2 * Math.PI * radius; }\n}`},
  {title:'Bubble Sort',desc:'خوارزمية الفقاعات',tag:'Algorithms',color:'green',code:`public static void bubbleSort(int[] arr) {\n    int n = arr.length;\n    for (int i = 0; i < n-1; i++) {\n        for (int j = 0; j < n-i-1; j++) {\n            if (arr[j] > arr[j+1]) {\n                int temp = arr[j];\n                arr[j] = arr[j+1];\n                arr[j+1] = temp;\n            }\n        }\n    }\n}`},
];

function buildSnippets(){
  const g=document.getElementById('snippetsGrid');
  SNIPPETS.forEach(s=>{
    const c=document.createElement('div');
    c.className='snip-card';
    c.innerHTML=`<div class="snip-title">${s.title}</div><div class="snip-desc">${s.desc}</div><span class="snip-tag ${s.color}">${s.tag}</span>`;
    c.onclick=()=>{
      saveActiveFile();
      const cur=javaFiles[activeFileIdx].code;
      const sep=cur.trim()?'\n\n// ── '+s.title+' ──\n':'';
      javaFiles[activeFileIdx].code=cur+sep+s.code;
      loadActiveFile();
      showToast('✅ تم إضافة '+s.title,'success');
    };
    g.appendChild(c);
  });
}

/* ══════════════════════════════════
   PAGE 3: CLASS DIAGRAM (PRESERVED)
══════════════════════════════════ */
const COLORS=['#9b59b6','#2980b9','#27ae60','#e67e22','#e74c3c','#16a085','#8e44ad','#d35400'];
let classes=[{name:'Class1',color:COLORS[0],attrs:[],methods:[]}];
let curIdx=0;

function addNewClass(){
  const modal=document.getElementById('newClassModal');
  const input=document.getElementById('newClassNameInput');
  modal.style.display='grid';
  input.value='';
  setTimeout(()=>input.focus(),50);
}
function confirmNewClass(){
  const input=document.getElementById('newClassNameInput');
  const finalName=input.value.trim()||'Class'+(classes.length+1);
  closeNewClassModal();
  classes.push({name:finalName,color:COLORS[classes.length%COLORS.length],attrs:[],methods:[]});
  curIdx=classes.length-1;syncAll();
  showToast('✅ تم إنشاء كلاس '+finalName,'success');
}
function closeNewClassModal(){
  document.getElementById('newClassModal').style.display='none';
}
function deleteCurrentClass(){
  if(classes.length<=1){showToast('لازم كلاس واحد على الأقل!','error');return;}
  classes.splice(curIdx,1);curIdx=Math.min(curIdx,classes.length-1);syncAll();
}
function switchCls(idx){saveCls();curIdx=idx;loadCls();renderTabs();}
function saveCls(){classes[curIdx].name=document.getElementById('clsName').value.trim()||('Class'+(curIdx+1));}
function loadCls(){document.getElementById('clsName').value=classes[curIdx].name;renderAttrList();renderMethodList();}
function syncAll(){renderTabs();loadCls();updateRelSels();drawDiagram();}
function onClsNameChange(){classes[curIdx].name=document.getElementById('clsName').value.trim()||('Class'+(curIdx+1));renderTabs();updateRelSels();drawDiagram();}

function renderTabs(){
  const ct=document.getElementById('classTabs');ct.innerHTML='';
  classes.forEach((cl,i)=>{
    const b=document.createElement('button');b.className='class-tab-btn';
    b.textContent=cl.name||('C'+(i+1));b.style.borderColor=cl.color+'80';
    if(i===curIdx){b.style.background=cl.color+'25';b.style.color=cl.color;b.style.borderColor=cl.color;}
    b.onclick=()=>switchCls(i);ct.appendChild(b);
  });
  const add=document.createElement('button');
  add.className='class-tab-btn add-cls';add.textContent='+ كلاس';add.onclick=addNewClass;ct.appendChild(add);
  if(classes.length>1){
    const del=document.createElement('button');
    del.className='class-tab-btn del-cls';del.textContent='🗑️';del.onclick=deleteCurrentClass;ct.appendChild(del);
  }
  document.getElementById('relPanel').style.display=classes.length>1?'block':'none';
}
function updateRelSels(){
  ['relFrom','relTo'].forEach((id,k)=>{
    const s=document.getElementById(id);if(!s)return;
    const prev=+s.value;
    s.innerHTML=classes.map((cl,i)=>`<option value="${i}">${cl.name}</option>`).join('');
    s.value=(prev<classes.length)?prev:(k===0?0:Math.min(1,classes.length-1));
  });
  document.getElementById('relFrom').onchange=drawDiagram;
  document.getElementById('relTo').onchange=drawDiagram;
}
function addAttr(){
  const v=document.getElementById('attrVis').value,t=document.getElementById('attrIn').value.trim();
  if(!t)return;classes[curIdx].attrs.push({vis:v,text:t});document.getElementById('attrIn').value='';
  renderAttrList();drawDiagram();
}
document.getElementById('attrIn').addEventListener('keydown',e=>{if(e.key==='Enter')addAttr();});
function addMethod(){
  const v=document.getElementById('methVis').value,t=document.getElementById('methIn').value.trim();
  if(!t)return;classes[curIdx].methods.push({vis:v,text:t});document.getElementById('methIn').value='';
  renderMethodList();drawDiagram();
}
document.getElementById('methIn').addEventListener('keydown',e=>{if(e.key==='Enter')addMethod();});
function renderAttrList(){
  const cl=classes[curIdx];
  document.getElementById('attrList').innerHTML=cl.attrs.length
    ?cl.attrs.map((a,i)=>`<div class="attr-item"><span class="attr-vis">${a.vis}</span><span class="attr-txt">${esc(a.text)}</span><button class="attr-remove" onclick="rmA(${i})">✕</button></div>`).join('')
    :'<div style="color:var(--border2);font-size:.76rem;padding:2px 4px">لا توجد متغيرات</div>';
}
function renderMethodList(){
  const cl=classes[curIdx];
  document.getElementById('methodList').innerHTML=cl.methods.length
    ?cl.methods.map((m,i)=>`<div class="attr-item"><span class="attr-vis" style="color:#82aaff">${m.vis}</span><span class="attr-txt" style="color:#82aaff">${esc(m.text)}</span><button class="attr-remove" onclick="rmM(${i})">✕</button></div>`).join('')
    :'<div style="color:var(--border2);font-size:.76rem;padding:2px 4px">لا توجد دوال</div>';
}
function rmA(i){classes[curIdx].attrs.splice(i,1);renderAttrList();drawDiagram();}
function rmM(i){classes[curIdx].methods.splice(i,1);renderMethodList();drawDiagram();}
function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

/* CANVAS */
const BW=240,HH=48,RH=28,PV=14;
function bh(cl){return HH+PV+20+(cl.attrs.length||1)*RH+12+20+(cl.methods.length||1)*RH+PV+6;}
function resizeCv(){
  const cv=document.getElementById('diagCanvas');
  cv.width=cv.parentElement.clientWidth||700;
  cv.height=Math.max(560,classes.length>4?720:580);
}
function getLayout(){
  const cv=document.getElementById('diagCanvas');
  const W=cv.width,H=cv.height,n=classes.length;
  const cols=n<=1?1:n<=2?2:n<=4?2:3,rows=Math.ceil(n/cols);
  return classes.map((cl,i)=>{
    const col=i%cols,row=Math.floor(i/cols),cW=W/cols,cH=H/rows,h=bh(cl);
    return{bx:Math.round(col*cW+(cW-BW)/2),by:Math.round(row*cH+(cH-h)/2),bh:h};
  });
}
function drawDiagram(){
  saveCls();
  const cv=document.getElementById('diagCanvas');
  if(!cv.width||cv.width<10)resizeCv();
  const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
  ctx.fillStyle='#161b24';ctx.fillRect(0,0,W,H);
  ctx.fillStyle='rgba(255,255,255,0.03)';
  for(let x=20;x<W;x+=28)for(let y=20;y<H;y+=28){ctx.beginPath();ctx.arc(x,y,1,0,Math.PI*2);ctx.fill();}
  const layout=getLayout();
  const rfEl=document.getElementById('relFrom'),rtEl=document.getElementById('relTo'),
    ryEl=document.getElementById('relType'),rlEl=document.getElementById('relLabel');
  if(classes.length>1&&rfEl&&rtEl){
    const fi=+rfEl.value,ti=+rtEl.value,ry=ryEl.value,rl=rlEl.value.trim();
    if(ry!=='none'&&fi!==ti&&fi<layout.length&&ti<layout.length){
      const f=layout[fi],t=layout[ti];
      drawRelLine(ctx,ry,rl,f.bx+BW,f.by+f.bh/2,t.bx,t.by+t.bh/2);
    }
  }
  layout.forEach((pos,i)=>drawClassBox(ctx,classes[i],pos.bx,pos.by,pos.bh));
}
function drawClassBox(ctx,cl,bx,by,boxH){
  ctx.save();ctx.shadowColor='rgba(0,0,0,0.7)';ctx.shadowBlur=20;ctx.shadowOffsetX=4;ctx.shadowOffsetY=5;
  rrect(ctx,bx,by,BW,boxH,12);ctx.fillStyle='#1a2235';ctx.fill();ctx.restore();
  ctx.save();rrectTop(ctx,bx,by,BW,HH,12);
  const grad=ctx.createLinearGradient(bx,by,bx,by+HH),c=cl.color||'#9b59b6';
  grad.addColorStop(0,c);grad.addColorStop(1,c+'bb');ctx.fillStyle=grad;ctx.fill();ctx.restore();
  ctx.save();ctx.beginPath();rrectTop(ctx,bx,by,BW,HH,12);ctx.clip();
  ctx.font="bold 15px 'JetBrains Mono',monospace";ctx.fillStyle='#ffffff';
  ctx.textAlign='center';ctx.textBaseline='middle';ctx.shadowColor='rgba(0,0,0,0.4)';ctx.shadowBlur=4;
  ctx.fillText(fitT(ctx,cl.name||'Class',BW-24),bx+BW/2,by+HH/2);ctx.restore();
  rrect(ctx,bx,by,BW,boxH,12);ctx.strokeStyle=c+'88';ctx.lineWidth=2;ctx.stroke();
  let cy=by+HH+PV;
  ctx.save();ctx.fillStyle='rgba(255,255,255,0.06)';ctx.fillRect(bx,cy,BW,20);
  ctx.font="bold 11px 'Cairo',sans-serif";ctx.fillStyle='#a0aec0';ctx.textAlign='left';ctx.textBaseline='middle';
  ctx.fillText('▸ Attributes',bx+10,cy+10);ctx.restore();cy+=20;
  ctx.save();ctx.textAlign='left';ctx.textBaseline='middle';
  if(!cl.attrs.length){ctx.fillStyle='#4a5568';ctx.font="12px 'JetBrains Mono',monospace";ctx.fillText('— empty —',bx+14,cy+RH/2);cy+=RH;}
  else{cl.attrs.forEach(a=>{ctx.fillStyle='#fbbf24';ctx.font="bold 14px 'JetBrains Mono',monospace";ctx.fillText(a.vis,bx+10,cy+RH/2);ctx.fillStyle='#f0f4ff';ctx.font="13px 'JetBrains Mono',monospace";ctx.fillText(fitT(ctx,a.text,BW-36),bx+26,cy+RH/2);cy+=RH;});}
  ctx.restore();cy+=4;
  ctx.save();ctx.beginPath();ctx.moveTo(bx+8,cy);ctx.lineTo(bx+BW-8,cy);ctx.strokeStyle='rgba(255,255,255,0.12)';ctx.lineWidth=1.5;ctx.stroke();ctx.restore();cy+=8;
  ctx.save();ctx.fillStyle='rgba(255,255,255,0.06)';ctx.fillRect(bx,cy,BW,20);
  ctx.font="bold 11px 'Cairo',sans-serif";ctx.fillStyle='#a0aec0';ctx.textAlign='left';ctx.textBaseline='middle';
  ctx.fillText('▸ Methods',bx+10,cy+10);ctx.restore();cy+=20;
  ctx.save();ctx.textAlign='left';ctx.textBaseline='middle';
  if(!cl.methods.length){ctx.fillStyle='#4a5568';ctx.font="12px 'JetBrains Mono',monospace";ctx.fillText('— empty —',bx+14,cy+RH/2);}
  else{cl.methods.forEach(m=>{ctx.fillStyle='#fbbf24';ctx.font="bold 14px 'JetBrains Mono',monospace";ctx.fillText(m.vis,bx+10,cy+RH/2);ctx.fillStyle='#93c5fd';ctx.font="13px 'JetBrains Mono',monospace";ctx.fillText(fitT(ctx,m.text,BW-36),bx+26,cy+RH/2);cy+=RH;});}
  ctx.restore();
}
function fitT(ctx,txt,maxW){if(ctx.measureText(txt).width<=maxW)return txt;while(txt.length>2&&ctx.measureText(txt+'…').width>maxW)txt=txt.slice(0,-1);return txt+'…';}
function drawRelLine(ctx,type,label,fx,fy,tx,ty){
  ctx.save();ctx.strokeStyle='#4f8ef7';ctx.lineWidth=1.8;
  if(type==='implements'||type==='dependency')ctx.setLineDash([6,4]);else ctx.setLineDash([]);
  const mx=(fx+tx)/2;let sx=fx;
  if(type==='aggregation'||type==='composition'){drawDiamond(ctx,fx,fy,9,type==='composition');sx=fx+18;}
  ctx.beginPath();ctx.moveTo(sx,fy);ctx.bezierCurveTo(mx,fy,mx,ty,tx,ty);ctx.stroke();ctx.setLineDash([]);
  const ang=Math.atan2(ty-fy,tx-fx);
  if(type==='extends'||type==='implements')drawHollow(ctx,tx,ty,ang);else drawSolid(ctx,tx,ty,ang);
  if(label){const lx=mx,ly=(fy+ty)/2;ctx.font="bold 10px 'Cairo',sans-serif";ctx.textAlign='center';const tw=ctx.measureText(label).width;ctx.fillStyle='rgba(14,17,23,.9)';ctx.fillRect(lx-tw/2-5,ly-14,tw+10,18);ctx.fillStyle='#e8eaf0';ctx.fillText(label,lx,ly-1);}
  ctx.restore();
}
function drawSolid(ctx,x,y,a){const s=9;ctx.save();ctx.translate(x,y);ctx.rotate(a);ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(-s,-s/2);ctx.lineTo(-s,s/2);ctx.closePath();ctx.fillStyle='#4f8ef7';ctx.fill();ctx.restore();}
function drawHollow(ctx,x,y,a){const s=11;ctx.save();ctx.translate(x,y);ctx.rotate(a);ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(-s,-s/2);ctx.lineTo(-s,s/2);ctx.closePath();ctx.strokeStyle='#4f8ef7';ctx.lineWidth=1.5;ctx.fillStyle='#161b24';ctx.fill();ctx.stroke();ctx.restore();}
function drawDiamond(ctx,x,y,s,f){ctx.save();ctx.beginPath();ctx.moveTo(x,y-s);ctx.lineTo(x+s,y);ctx.lineTo(x,y+s);ctx.lineTo(x-s,y);ctx.closePath();ctx.strokeStyle='#4f8ef7';ctx.lineWidth=1.5;ctx.fillStyle=f?'#4f8ef7':'#161b24';ctx.fill();ctx.stroke();ctx.restore();}
function rrect(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.quadraticCurveTo(x+w,y,x+w,y+r);ctx.lineTo(x+w,y+h-r);ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);ctx.lineTo(x+r,y+h);ctx.quadraticCurveTo(x,y+h,x,y+h-r);ctx.lineTo(x,y+r);ctx.quadraticCurveTo(x,y,x+r,y);ctx.closePath();}
function rrectTop(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.quadraticCurveTo(x+w,y,x+w,y+r);ctx.lineTo(x+w,y+h);ctx.lineTo(x,y+h);ctx.lineTo(x,y+r);ctx.quadraticCurveTo(x,y,x+r,y);ctx.closePath();}
async function saveDiagramPDF(){
  saveCls();resizeCv();drawDiagram();await sleep(100);
  const cv=document.getElementById('diagCanvas');
  const pdf=new jsPDF({orientation:'landscape',unit:'px',format:[cv.width,cv.height]});
  pdf.addImage(cv.toDataURL('image/png'),'PNG',0,0,cv.width,cv.height);
  pdf.save(classes.map(c=>c.name).join('_')+'_Diagram.pdf');
  showToast('✅ تم حفظ الـ Diagram PDF!','success');
}

/* ══ INIT ══ */
window.addEventListener('load',()=>{
  renderFileTabs();loadActiveFile();buildSnippets();
  renderTabs();loadCls();updateRelSels();
  ['sig1','sig2','sig3','sig4','sig5','sig6'].forEach(makeSig);
  setTimeout(()=>{resizeCv();drawDiagram();},100);
});
window.addEventListener('resize',()=>{
  if(document.getElementById('page-diagram').classList.contains('active')){resizeCv();drawDiagram();}
});

/* ══════════════════════════════════
   PAGE 4: FULL PROJECT → ZIP
══════════════════════════════════ */
function refreshProjectPage(){
  makeSig('sig4');
  // Java files list
  saveActiveFile();
  document.getElementById('projFileCount').textContent=javaFiles.length+' ملف';
  const fl=document.getElementById('projFilesList');
  fl.innerHTML=javaFiles.map(f=>`
    <div style="background:var(--surface2);border:1px solid var(--border);border-radius:8px;
      padding:7px 14px;font-family:var(--font-mono);font-size:.8rem;color:var(--green);
      display:flex;align-items:center;gap:7px;">
      <span style="opacity:.5">📄</span> ${esc(f.name)}.java
      <span style="color:var(--muted);font-size:.7rem">${f.code.split('\n').length} سطر</span>
    </div>`).join('');

  // Diagram mini preview
  const mini=document.getElementById('projDiagPreview');
  const wrap=mini.parentElement;
  mini.width=wrap.clientWidth||600;
  mini.height=200;
  // copy diagram onto mini canvas (scaled)
  const src=document.getElementById('diagCanvas');
  if(src&&src.width>0){
    const ctx=mini.getContext('2d');
    ctx.fillStyle='#161b24';ctx.fillRect(0,0,mini.width,mini.height);
    const scale=Math.min(mini.width/src.width,mini.height/src.height);
    const dw=src.width*scale,dh=src.height*scale;
    const dx=(mini.width-dw)/2,dy=(mini.height-dh)/2;
    ctx.drawImage(src,dx,dy,dw,dh);
  }

  // Images
  document.getElementById('projImgCount').textContent=imgs.length+' صورة';
  const it=document.getElementById('projImgThumb');
  it.innerHTML=imgs.slice(0,8).map(im=>`
    <img src="${im.src}" style="width:60px;height:60px;object-fit:cover;border-radius:8px;
      border:1px solid var(--border);">`).join('')
    +(imgs.length>8?`<div style="width:60px;height:60px;border-radius:8px;background:var(--surface2);
      border:1px solid var(--border);display:grid;place-items:center;color:var(--muted);font-size:.8rem;">
      +${imgs.length-8}</div>`:'');

  // Summary
  const inclD=document.getElementById('inclDiagram').checked;
  const inclI=document.getElementById('inclImages').checked;
  let sum='';
  sum+=`📄 <strong style="color:var(--text)">${javaFiles.length} ملف Java</strong><br>`;
  sum+=inclD?`📊 <strong style="color:var(--purple)">Class Diagram (PNG)</strong><br>`:`<span style="text-decoration:line-through;opacity:.4">📊 Class Diagram</span><br>`;
  sum+=inclI&&imgs.length?`🖼️ <strong style="color:var(--blue)">${imgs.length} صورة</strong><br>`:`<span style="text-decoration:line-through;opacity:.4">🖼️ لا توجد صور</span><br>`;
  const nm=document.getElementById('projName').value.trim()||'AshrafProject';
  sum+=`📦 <strong style="color:var(--orange)">${nm}.zip</strong>`;
  document.getElementById('projSummary').innerHTML=sum;
}

document.getElementById('inclDiagram').addEventListener('change',refreshProjectPage);
document.getElementById('inclImages').addEventListener('change',refreshProjectPage);
document.getElementById('projName').addEventListener('input',refreshProjectPage);

document.getElementById('exportZipBtn').addEventListener('click',async()=>{
  saveActiveFile();
  const btn=document.getElementById('exportZipBtn');
  const prog=document.getElementById('projProg');
  const fill=document.getElementById('projProgFill');
  const lbl=document.getElementById('projProgLbl');
  btn.disabled=true;prog.classList.add('show');

  try{
    const zip=new JSZip();
    const nm=document.getElementById('projName').value.trim()||'AshrafProject';

    // 1. Java files
    lbl.textContent='جاري إضافة ملفات Java...';fill.style.width='20%';
    const src=zip.folder('src');
    javaFiles.forEach(f=>src.file(f.name+'.java',f.code));
    await sleep(200);

    // 2. Diagram PNG
    if(document.getElementById('inclDiagram').checked){
      lbl.textContent='جاري تصدير الـ Diagram...';fill.style.width='50%';
      saveCls();resizeCv();drawDiagram();
      await sleep(100);
      const cv=document.getElementById('diagCanvas');
      const dataUrl=cv.toDataURL('image/png');
      const base64=dataUrl.split(',')[1];
      zip.file('ClassDiagram.png',base64,{base64:true});
      await sleep(200);
    }

    // 3. Images
    if(document.getElementById('inclImages').checked&&imgs.length){
      lbl.textContent='جاري إضافة الصور...';fill.style.width='75%';
      const imgFolder=zip.folder('images');
      for(let i=0;i<imgs.length;i++){
        const base64=imgs[i].src.split(',')[1];
        const ext=imgs[i].file.name.split('.').pop()||'jpg';
        imgFolder.file(`image_${i+1}.${ext}`,base64,{base64:true});
      }
      await sleep(200);
    }

    // 4. README
    const readmeTxt=`# ${nm}\nمشروع مُصدَّر من AshrafTools\nبواسطة البشمهندس أشرووووف 👑\n\n## محتويات المشروع\n${javaFiles.map(f=>`- src/${f.name}.java`).join('\n')}${document.getElementById('inclDiagram').checked?'\n- ClassDiagram.png':''}${document.getElementById('inclImages').checked&&imgs.length?`\n- images/ (${imgs.length} صورة)`:''}\n`;
    zip.file('README.md',readmeTxt);

    fill.style.width='90%';lbl.textContent='جاري إنشاء ZIP...';
    await sleep(100);
    const blob=await zip.generateAsync({type:'blob'});
    fill.style.width='100%';lbl.textContent='جاري التنزيل...';
    await sleep(300);
    dlBlob(blob,nm+'.zip');
    showToast('✅ تم تصدير المشروع كـ ZIP!','success');
  }catch(e){showToast('خطأ في التصدير','error');console.error(e);}
  finally{btn.disabled=false;await sleep(800);prog.classList.remove('show');fill.style.width='0%';}
});

/* ══ VISITOR TRACKER ══ */
async function trackVisit(){
  // بعت إيميل لأشرف بس لو أول زيارة في الجلسة دي
  if(sessionStorage.getItem('visited'))return;
  sessionStorage.setItem('visited','1');

  const now = new Date();
  const timeStr = now.toLocaleString('ar-EG',{timeZone:'Africa/Cairo'});
  const ua = navigator.userAgent;
  const isMobile = /Mobi|Android/i.test(ua) ? '📱 موبايل' : '💻 كمبيوتر';
  const lang = navigator.language || 'غير معروف';

  try{
    await fetch('https://formspree.io/f/mreygdzk',{
      method:'POST',
      headers:{'Content-Type':'application/json','Accept':'application/json'},
      body: JSON.stringify({
        email: 'elfrouna@gmail.com',
        _replyto: 'elfrouna@gmail.com',
        message: `👀 حد فتح AshrafTools!\n\n🕐 الوقت: ${timeStr}\n${isMobile}\n🌐 اللغة: ${lang}`,
        _subject: '👀 زيارة جديدة على AshrafTools!'
      })
    });
  }catch(e){console.log('tracker silent fail');}
}
trackVisit();

function dlBlob(blob,name){const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;a.click();}
function loadImg(s){return new Promise((r,j)=>{const i=new Image();i.onload=()=>r(i);i.onerror=j;i.src=s;});}
function sleep(ms){return new Promise(r=>setTimeout(r,ms));}
function showToast(msg,type=''){
  const t=document.getElementById('toast');t.textContent=msg;t.className='toast '+(type||'');
  void t.offsetWidth;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),3200);
}


/* ══ API KEY MODAL ══ */
function openApiKeyModal() {
  const modal = document.getElementById('apiKeyModal');
  modal.style.display = 'flex';
  const saved = localStorage.getItem('or_api_key') || '';
  const inp = document.getElementById('apiKeyInput');
  inp.value = saved;
  const st = document.getElementById('apiKeyStatus');
  st.textContent = saved ? '✅ Key محفوظ — الـ AI Judge شغال' : '⚠️ مفيش Key — هيقبل أي إجابة بدون تحقق';
  st.style.color = saved ? 'var(--green)' : 'var(--orange)';
}
function closeApiKeyModal() {
  document.getElementById('apiKeyModal').style.display = 'none';
}
function saveApiKey() {
  const val = document.getElementById('apiKeyInput').value.trim();
  if(!val) { showToast('⚠️ ادخل الـ Key الأول!','error'); return; }
  localStorage.setItem('or_api_key', val);
  showToast('✅ تم حفظ الـ Key!','success');
  closeApiKeyModal();
}
function clearApiKey() {
  localStorage.removeItem('or_api_key');
  document.getElementById('apiKeyInput').value = '';
  showToast('🗑️ تم حذف الـ Key','success');
  closeApiKeyModal();
}
document.getElementById('apiKeyModal')?.addEventListener('click', function(e){
  if(e.target === this) closeApiKeyModal();
});

/* ══════════════════════════════════
   PAGE: PPTX TO PDF
══════════════════════════════════ */
let pptxFile = null;
const pptxDz = document.getElementById('pptxDropzone');
const pptxInp = document.getElementById('pptxInput');
const pptxPrev = document.getElementById('pptxPreview');
const pptxRender = document.getElementById('pptxRenderContainer');

pptxInp.addEventListener('change', e => handlePptxFile(e.target.files[0]));
pptxDz.addEventListener('click', e => { if(!e.target.closest('button')) pptxInp.click(); });
pptxDz.addEventListener('dragover', e => { e.preventDefault(); pptxDz.classList.add('over'); });
pptxDz.addEventListener('dragleave', () => pptxDz.classList.remove('over'));
pptxDz.addEventListener('drop', e => { e.preventDefault(); pptxDz.classList.remove('over'); handlePptxFile(e.dataTransfer.files[0]); });

function handlePptxFile(file) {
  if(!file || !file.name.endsWith('.pptx')) {
    showToast('⚠️ مسموح بملفات PPTX فقط!', 'error');
    return;
  }
  pptxFile = file;
  document.getElementById('pptxFileName').textContent = file.name;
  pptxPrev.style.display = 'block';
  pptxDz.style.display = 'none';
  pptxInp.value = '';
}

document.getElementById('clearPptxBtn').addEventListener('click', () => {
  pptxFile = null;
  pptxPrev.style.display = 'none';
  pptxDz.style.display = 'block';
  pptxRender.innerHTML = '';
});

document.getElementById('convertPptxBtn').addEventListener('click', async () => {
  if(!pptxFile) return;
  const btn = document.getElementById('convertPptxBtn');
  const prog = document.getElementById('pptxProg');
  const fill = document.getElementById('pptxProgFill');
  const lbl = document.getElementById('pptxProgLbl');
  
  btn.disabled = true;
  prog.classList.add('show');
  lbl.textContent = 'جاري قراءة الملف...';
  fill.style.width = '20%';

  try {
    const reader = new FileReader();
    reader.onload = function(e) {
      lbl.textContent = 'جاري استخراج وتحويل الشرائح (قد يستغرق بعض الوقت)...';
      fill.style.width = '50%';
      
      $(pptxRender).empty();
      
      try {
        $(pptxRender).pptxToHtml({
          pptxFileUrl: e.target.result,
          slideMode: false,
          keyBoardShortCut: false,
          mediaProcess: true,
          jsZipV2: false
        });
      } catch(err) {
        console.error(err);
        lbl.textContent = '❌ حدث خطأ أثناء المعالجة!';
        showToast('خطأ في قراءة ملف الـ PPTX', 'error');
        btn.disabled = false;
        return;
      }

      let waitTimer = setInterval(() => {
        if($(pptxRender).find('.slide').length > 0) {
          clearInterval(waitTimer);
          lbl.textContent = 'جاري تحويل الشرائح لـ PDF...';
          fill.style.width = '80%';
          
          setTimeout(() => {
            const opt = {
              margin: 0,
              filename: pptxFile.name.replace('.pptx', '.pdf'),
              image: { type: 'jpeg', quality: 0.98 },
              html2canvas: { scale: 2, useCORS: true, logging: false },
              jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
            };
            
            html2pdf().set(opt).from(pptxRender).save().then(() => {
              lbl.textContent = '✅ اكتمل التنزيل!';
              fill.style.width = '100%';
              showToast('✅ تم تحويل الملف بنجاح!', 'success');
              setTimeout(() => {
                btn.disabled = false;
                prog.classList.remove('show');
              }, 2000);
            }).catch(err => {
              console.error(err);
              showToast('خطأ أثناء التحويل لـ PDF', 'error');
              btn.disabled = false;
              prog.classList.remove('show');
            });
          }, 3000); 
        }
      }, 500);
      
      setTimeout(() => clearInterval(waitTimer), 20000);
    };
    reader.readAsArrayBuffer(pptxFile);
  } catch(e) {
    console.error(e);
    showToast('حدث خطأ غير متوقع', 'error');
    btn.disabled = false;
    prog.classList.remove('show');
  }
});