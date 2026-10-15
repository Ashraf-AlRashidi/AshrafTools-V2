// ==========================================
// COURSE MAP & STUDENT GUIDE (CS/Big Data)
// ==========================================

const guideTopics = [
  { id: 't1', title: 'يعني ايه Credit Hours', icon: '⏱️', content: `
    <h3>ما هي الساعات المعتمدة (Credit Hours)؟</h3>
    <p>الساعات المعتمدة (Credit Hours) هي الوحدة الأساسية لقياس وزن المادة الأكاديمي. وتظهر في الخطة الدراسية تحت عمود <strong>CH</strong>.</p>
    <p>كلما زادت الساعات المعتمدة للمادة، زاد تأثيرها على معدلك التراكمي (GPA). مثلاً مادة <em>Structured Programming</em> وزنها 3 ساعات معتمدة، بينما متطلبات الجامعة مثل <em>University Requirement</em> يكون وزنها ساعتين.</p>
    <div style="background:rgba(34,211,122,.1);padding:10px;border-left:4px solid var(--green);margin-top:10px;">
      💡 <strong>نصيحة:</strong> ركز جداً في المواد ذات الـ 3 و 4 ساعات لأن تأثيرها كبير جداً على الـ GPA سواء بالسلب أو الإيجاب!
    </div>
  `},
  { id: 't2', title: 'يعني ايه Semester', icon: '📅', content: `
    <h3>ما هو الفصل الدراسي (Semester)؟</h3>
    <p>الـ Semester هو الفصل الدراسي. الخطة الدراسية مقسمة على <strong>8 فصول دراسية (Semesters)</strong>، مما يعني 4 سنوات دراسية.</p>
    <p>في كل مستوى (Level) يوجد فصلين: فصل الخريف (Fall) وفصل الربيع (Spring).</p>
  `},
  { id: 't3', title: 'يعني ايه Level', icon: '🎓', content: `
    <h3>ما هو المستوى (Level)؟</h3>
    <p>الـ Level يعبر عن السنة الدراسية للطالب. الخطة تتكون من 4 مستويات:</p>
    <ul>
      <li><strong>Level 1:</strong> السنة الأولى (الفرقة الإعدادية/الأولى)</li>
      <li><strong>Level 2:</strong> السنة الثانية</li>
      <li><strong>Level 3:</strong> السنة الثالثة</li>
      <li><strong>Level 4:</strong> السنة الرابعة والأخيرة</li>
    </ul>
  `},
  { id: 't4', title: 'يعني ايه Lecture', icon: '🧑‍🏫', content: `
    <h3>ما هي المحاضرة (Lecture / LCT)؟</h3>
    <p>تحت عمود <strong>LCT</strong> في الخطة، تجد عدد ساعات <strong>المحاضرات (Lectures)</strong>.</p>
    <p>المحاضرة هي الجزء النظري من المادة حيث يقوم الدكتور بشرح المفاهيم الأساسية. مثلاً مادة <em>Structured Programming</em> تحتوي على ساعتين LCT أسبوعياً.</p>
  `},
  { id: 't5', title: 'يعني ايه Lab', icon: '🧪', content: `
    <h3>ما هو المعمل (Laboratory / LAB)؟</h3>
    <p>عمود <strong>LAB</strong> يوضح عدد ساعات <strong>المعمل (Laboratory)</strong> الأسبوعية.</p>
    <p>المعمل هو الجزء العملي والتطبيقي للمادة (كتابة أكواد، تجارب علمية). في <em>Structured Programming</em>، ستقضي 3 ساعات أسبوعياً في المعمل للتطبيق العملي.</p>
  `},
  { id: 't6', title: 'يعني ايه Tutorial', icon: '👨‍🏫', content: `
    <h3>ما هو السكشن (Tutorial / TUT)؟</h3>
    <p>عمود <strong>TUT</strong> يعني <strong>السكشن (Tutorial)</strong>.</p>
    <p>هو وقت مخصص للمراجعة، حل المسائل، والتدريب العملي مع المعيد. مواد مثل الرياضيات <em>Mathematics I</em> و <em>Probability</em> تحتوي على ساعات TUT.</p>
  `},
  { id: 't7', title: 'يعني ايه Contact Hours', icon: '⏰', content: `
    <h3>ساعات الاتصال (Contact Hours / CNTCT)</h3>
    <p>عمود <strong>CNTCT</strong> هو مجموع الساعات الفعلية التي تقضيها في الجامعة لدراسة المادة أسبوعياً.</p>
    <p>طريقة الحساب: <strong>CNTCT = LCT + LAB + TUT + OTH</strong></p>
    <p>مثلاً <em>Structured Programming</em>: 2 محاضرة + 3 معمل = 5 ساعات Contact Hours.</p>
  `},
  { id: 't8', title: 'يعني ايه Student Workload', icon: '📚', content: `
    <h3>عبء الطالب (Student Workload / SWL)</h3>
    <p>عمود <strong>SWL</strong> يعبر عن الوقت الإجمالي المتوقع أن يبذله الطالب في دراسة المادة خلال الفصل الدراسي (يشمل المحاضرات، المعامل، والمذاكرة الشخصية والمشاريع).</p>
    <p>رقم مثل 180 يعني أنه متوقع منك قضاء 180 ساعة طوال الترم لإتقان هذه المادة.</p>
  `},
  { id: 't9', title: 'يعني ايه ECTS', icon: '🌍', content: `
    <h3>نظام تحويل الساعات الأوروبي (ECTS)</h3>
    <p>عمود <strong>ECTS</strong> (European Credit Transfer and Accumulation System) هو نظام عالمي لمعادلة الساعات الدراسية. يسهل هذا النظام انتقال الطلاب بين الجامعات الأوروبية والدولية.</p>
    <p>مثلاً، مادة بوزن 3 Credit Hours قد تعادل 6 ECTS.</p>
  `},
  { id: 't10', title: 'University Requirement', icon: '🏛️', content: `
    <h3>متطلبات الجامعة الإجبارية (University Requirement / UC)</h3>
    <p>هي مواد عامة تفرضها الجامعة على جميع طلابها بغض النظر عن تخصصهم. تهدف لتوسيع مدارك الطالب وثقافته.</p>
    <p>تظهر في الخطة برموز مثل UC1, UC2, UC3... وكل منها يمثل ساعتين معتمدتين.</p>
  `},
  { id: 't11', title: 'University Elective', icon: '🎨', content: `
    <h3>متطلبات الجامعة الاختيارية (University Elective / UE)</h3>
    <p>هي مواد اختيارية تقدمها الجامعة، حيث تختار مادة واحدة من قائمة محددة لتلبية متطلب الجامعة الاختياري. تظهر في الخطة كـ UE1, UE2.</p>
  `},
  { id: 't12', title: 'Major Compulsory', icon: '🎯', content: `
    <h3>مواد التخصص الإجبارية (Major Compulsory)</h3>
    <p>هي المواد الأساسية في تخصصك (Computer Science) التي يجب دراستها ولا يمكن التخرج بدونها، مثل <em>Data Structures</em> و <em>Operating Systems</em>.</p>
  `},
  { id: 't13', title: 'Major Elective', icon: '✨', content: `
    <h3>مواد التخصص الاختيارية (Major Elective / E)</h3>
    <p>مواد اختيارية متقدمة في تخصصك. تتيح لك التركيز على مسار معين تحبه (مثل الذكاء الاصطناعي أو الأمن السيبراني).</p>
    <p>تظهر في الخطة في المستوى الثالث والرابع كـ E1, E2, E3...</p>
  `},
  { id: 't14', title: 'Course Code', icon: '🔢', content: `
    <h3>كود المادة (Course Code)</h3>
    <p>كل مادة لها كود فريد يتكون من حروف وأرقام، مثلاً <strong>CSE 014</strong>.</p>
    <ul>
      <li><strong>الحروف (CSE):</strong> ترمز للقسم، وهنا Computer Science & Engineering. (AIE ترمز لـ Artificial Intelligence).</li>
      <li><strong>الأرقام (014):</strong> تشير إلى مستوى وصعوبة المادة ورقمها التسلسلي في القسم. الأرقام التي تبدأ بـ 1 أو 2 تكون في المستويات الأولى، و3 أو 4 للمستويات المتقدمة.</li>
    </ul>
  `},
  { id: 't15', title: 'Field Training', icon: '🏢', content: `
    <h3>التدريب الميداني (Field Training)</h3>
    <p>لتتخرج، يجب أن تكتسب خبرة عملية. الخطة تتضمن:</p>
    <ul>
      <li><strong>Field Training 1 (CSE191):</strong> تدريب ميداني أول.</li>
      <li><strong>Field Training 2 (CSE292):</strong> تدريب ميداني متقدم.</li>
    </ul>
    <p>يساعدك التدريب على ربط ما تعلمته بسوق العمل الحقيقي.</p>
  `},
  { id: 't16', title: 'Graduation Project', icon: '🎓', content: `
    <h3>مشروع التخرج (Graduation Project)</h3>
    <p>في السنة الأخيرة (Level 4)، ستقوم بتنفيذ مشروع تخرج متكامل لتطبيق كل ما تعلمته.</p>
    <p>ينقسم المشروع إلى جزئين يمتدان على فصلين دراسيين:</p>
    <ul>
      <li><strong>Graduation Project 1 (CSE493):</strong> في فصل الخريف (الفصل السابع) - للبحث وجمع المتطلبات والتخطيط والتصميم.</li>
      <li><strong>Graduation Project 2 (CSE494):</strong> في فصل الربيع (الفصل الثامن) - لتنفيذ وبرمجة وتسليم المشروع.</li>
    </ul>
  `},
  { id: 't17', title: 'ازاي تقرا Study Plan', icon: '🗺️', content: `
    <h3>كيف تقرأ الخطة الدراسية (Study Plan)؟</h3>
    <p>الخطة الدراسية هي الجدول الزمني الأكاديمي. لفهم أي صف في الجدول:</p>
    <div style="background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:15px;margin-top:15px;overflow-x:auto;">
      <table style="width:100%;text-align:left;border-collapse:collapse;">
        <tr style="border-bottom:1px solid var(--border);color:var(--muted);">
          <th style="padding:8px;">Code</th>
          <th style="padding:8px;">Course Name</th>
          <th style="padding:8px;">LCT</th>
          <th style="padding:8px;">LAB</th>
          <th style="padding:8px;">CH</th>
        </tr>
        <tr>
          <td style="padding:8px;font-family:var(--font-mono);">CSE 014</td>
          <td style="padding:8px;font-weight:bold;">Structured Programming</td>
          <td style="padding:8px;">2</td>
          <td style="padding:8px;">3</td>
          <td style="padding:8px;color:var(--blue);font-weight:bold;">3</td>
        </tr>
      </table>
    </div>
    <ul style="margin-top:15px;">
      <li>المادة كودها <strong>CSE 014</strong> واسمها <strong>Structured Programming</strong>.</li>
      <li>لها <strong>ساعتين LCT</strong> (محاضرة) و <strong>3 ساعات LAB</strong> (عملي).</li>
      <li>وزنها الكلي <strong>3 CH</strong> (ساعات معتمدة) يؤثر في الـ GPA.</li>
    </ul>
    <button class="btn btn-primary" style="margin-top:20px;" onclick="renderStudyPlanView()">👀 عرض الخطة الدراسية التفاعلية</button>
  `},
  { id: 't18', title: 'ازاي تقرا Course Map', icon: '🧭', content: `
    <h3>خريطة المواد التفاعلية (Course Map)</h3>
    <p>خريطة المواد تساعدك على رؤية المسار الذي يجب أن تسلكه وما هي المواد التي تفتح مواد أخرى (المتطلبات السابقة).</p>
    <button class="btn btn-purple" style="margin-top:15px;" onclick="renderInteractiveCourseMap()">🚀 فتح خريطة المواد التفاعلية</button>
  `},
  { id: 't19', title: 'الـ Electives (اختياراتك)', icon: '✨', content: `
    <h3>كيف تختار المواد الاختيارية (Electives)؟</h3>
    <p>في المستويين الثالث والرابع، ستجد مواد مرمزة بـ E1, E2, E3, E4, E5. هذه هي المواد الاختيارية في تخصصك.</p>
    <p>كل رمز له قائمة مواد تختار منها مادة واحدة. مثلاً في <strong>E1</strong> يمكنك الاختيار من:</p>
    <ul>
      <li>Embedded Systems</li>
      <li>Introduction to Parallel Computing</li>
      <li>Image Processing</li>
      <li>Mobile Programming</li>
    </ul>
    <p>اختر ما يتماشى مع شغفك ومجال عملك المستقبلي!</p>
  `}
];

// ==========================================
// COURSE DATA WITH EXTENDED METADATA
// ==========================================
const courseData = [
  // Level 1 - Fall
  { id: 'CSE014', code: 'CSE 014', name: 'Structured Programming', cr: 3, prereqs: [], level: 1, term: 'Fall', type: 'pink', lct: 2, lab: 3, tut: 0, oth: 0, cntct: 5, swl: 180, ects: 6 },
  { id: 'PHY211', code: 'PHY 211', name: 'Physics II', cr: 3, prereqs: [], level: 1, term: 'Fall', type: 'orange', lct: 2, lab: 2, tut: 0, oth: 0, cntct: 4, swl: 150, ects: 6 },
  { id: 'MAT111', code: 'MAT 111', name: 'Mathematics I', cr: 3, prereqs: [], level: 1, term: 'Fall', type: 'orange', lct: 3, lab: 0, tut: 1, oth: 0, cntct: 4, swl: 150, ects: 6 },
  { id: 'UC1', code: 'UC1 1xx', name: 'University Requirement (1)', cr: 2, prereqs: [], level: 1, term: 'Fall', type: 'lightgreen', lct: 2, lab: 0, tut: 0, oth: 0, cntct: 2, swl: 90, ects: 4 },
  { id: 'UC2', code: 'UC2 1xx', name: 'University Requirement (2)', cr: 2, prereqs: [], level: 1, term: 'Fall', type: 'lightgreen', lct: 2, lab: 0, tut: 0, oth: 0, cntct: 2, swl: 90, ects: 4 },
  { id: 'UE1', code: 'UE1 1xx', name: 'Elective University (1)', cr: 2, prereqs: [], level: 1, term: 'Fall', type: 'lightgreen', lct: 2, lab: 0, tut: 0, oth: 0, cntct: 2, swl: 90, ects: 4 },
  
  // Level 1 - Spring
  { id: 'CSE015', code: 'CSE 015', name: 'Object Oriented Programming', cr: 3, prereqs: ['CSE014'], level: 1, term: 'Spring', type: 'pink', lct: 2, lab: 3, tut: 0, oth: 0, cntct: 5, swl: 180, ects: 6 },
  { id: 'MAT131', code: 'MAT 131', name: 'Probability & Statistics I', cr: 3, prereqs: ['MAT111'], level: 1, term: 'Spring', type: 'orange', lct: 2, lab: 1, tut: 2, oth: 0, cntct: 5, swl: 195, ects: 6 },
  { id: 'CSE315', code: 'CSE 315', name: 'Discrete Mathematics', cr: 3, prereqs: [], level: 1, term: 'Spring', type: 'orange', lct: 2, lab: 0, tut: 2, oth: 0, cntct: 4, swl: 150, ects: 6 },
  { id: 'MAT112', code: 'MAT 112', name: 'Mathematics II', cr: 3, prereqs: ['MAT111'], level: 1, term: 'Spring', type: 'orange', lct: 3, lab: 0, tut: 1, oth: 0, cntct: 4, swl: 150, ects: 6 },
  { id: 'UC3', code: 'UC3 2xx', name: 'University Requirement (3)', cr: 2, prereqs: [], level: 1, term: 'Spring', type: 'lightgreen', lct: 2, lab: 0, tut: 0, oth: 0, cntct: 2, swl: 90, ects: 4 },
  { id: 'UE2', code: 'UE2 2xx', name: 'Elective University (2)', cr: 2, prereqs: [], level: 1, term: 'Spring', type: 'lightgreen', lct: 2, lab: 0, tut: 0, oth: 0, cntct: 2, swl: 90, ects: 4 },

  // Level 2 - Fall
  { id: 'CSE111', code: 'CSE 111', name: 'Data Structures', cr: 3, prereqs: ['CSE015'], level: 2, term: 'Fall', type: 'pink', lct: 2, lab: 3, tut: 0, oth: 0, cntct: 5, swl: 180, ects: 6 },
  { id: 'CSE131', code: 'CSE 131', name: 'Logic Design', cr: 3, prereqs: ['PHY211'], level: 2, term: 'Fall', type: 'pink', lct: 2, lab: 2, tut: 2, oth: 0, cntct: 6, swl: 195, ects: 6 },
  { id: 'MAT231', code: 'MAT 231', name: 'Probability & Statistics II', cr: 3, prereqs: ['MAT131'], level: 2, term: 'Fall', type: 'orange', lct: 2, lab: 2, tut: 1, oth: 0, cntct: 5, swl: 195, ects: 6 },
  { id: 'AIE111', code: 'AIE 111', name: 'Artificial Intelligence', cr: 3, prereqs: ['CSE015'], level: 2, term: 'Fall', type: 'pink', lct: 2, lab: 2, tut: 1, oth: 0, cntct: 5, swl: 180, ects: 6 },
  { id: 'MAT212', code: 'MAT 212', name: 'Linear Algebra', cr: 3, prereqs: ['MAT112'], level: 2, term: 'Fall', type: 'orange', lct: 2, lab: 2, tut: 0, oth: 0, cntct: 4, swl: 150, ects: 6 },
  { id: 'UC4', code: 'UC4 2xx', name: 'University Requirement (4)', cr: 2, prereqs: [], level: 2, term: 'Fall', type: 'lightgreen', lct: 2, lab: 0, tut: 0, oth: 0, cntct: 2, swl: 90, ects: 4 },

  // Level 2 - Spring
  { id: 'MAT312', code: 'MAT 312', name: 'Differential Equations', cr: 3, prereqs: ['MAT112'], level: 2, term: 'Spring', type: 'orange', lct: 2, lab: 0, tut: 2, oth: 0, cntct: 4, swl: 150, ects: 6 },
  { id: 'CSE132', code: 'CSE 132', name: 'Computer Architecture & Organization', cr: 3, prereqs: ['CSE131'], level: 2, term: 'Spring', type: 'pink', lct: 2, lab: 2, tut: 1, oth: 0, cntct: 5, swl: 165, ects: 6 },
  { id: 'CSE211', code: 'CSE 211', name: 'Web Programming', cr: 3, prereqs: ['CSE111'], level: 2, term: 'Spring', type: 'green', lct: 2, lab: 2, tut: 1, oth: 0, cntct: 5, swl: 165, ects: 6 },
  { id: 'CSE221', code: 'CSE 221', name: 'Database Systems', cr: 3, prereqs: ['CSE111'], level: 2, term: 'Spring', type: 'pink', lct: 2, lab: 2, tut: 1, oth: 0, cntct: 5, swl: 180, ects: 6 },
  { id: 'CSE191', code: 'CSE 191', name: 'Field Training 1 in Computer Science', cr: 2, prereqs: [], level: 2, term: 'Spring', type: 'orange', lct: 2, lab: 0, tut: 0, oth: 0, cntct: 2, swl: 60, ects: 4 },
  { id: 'CSE251_SE', code: 'CSE 251', name: 'Software Engineering', cr: 3, prereqs: ['CSE111'], level: 2, term: 'Spring', type: 'pink', lct: 2, lab: 2, tut: 1, oth: 0, cntct: 5, swl: 180, ects: 6 },

  // Level 3 - Fall
  { id: 'CSE233', code: 'CSE 233', name: 'Operating Systems', cr: 3, prereqs: ['CSE111', 'CSE132'], level: 3, term: 'Fall', type: 'pink', lct: 2, lab: 2, tut: 1, oth: 0, cntct: 5, swl: 165, ects: 6 },
  { id: 'E1', code: 'E1 3xx', name: 'Elective Course (1)', cr: 3, prereqs: [], level: 3, term: 'Fall', type: 'yellow', lct: 2, lab: 2, tut: 1, oth: 0, cntct: 5, swl: 180, ects: 6 },
  { id: 'CSE261', code: 'CSE 261', name: 'Computer Networks', cr: 3, prereqs: ['CSE132'], level: 3, term: 'Fall', type: 'pink', lct: 2, lab: 2, tut: 1, oth: 0, cntct: 5, swl: 165, ects: 6 },
  { id: 'AIE121', code: 'AIE 121', name: 'Machine Learning', cr: 3, prereqs: ['AIE111', 'MAT231'], level: 3, term: 'Fall', type: 'pink', lct: 2, lab: 2, tut: 1, oth: 0, cntct: 5, swl: 180, ects: 6 },
  { id: 'CSE352', code: 'CSE 352', name: 'Systems Analysis & Design', cr: 3, prereqs: ['CSE221'], level: 3, term: 'Fall', type: 'green', lct: 2, lab: 2, tut: 1, oth: 0, cntct: 5, swl: 165, ects: 6 },
  { id: 'UC5', code: 'UC5 2xx', name: 'University Requirement (5)', cr: 2, prereqs: [], level: 3, term: 'Fall', type: 'lightgreen', lct: 2, lab: 0, tut: 0, oth: 0, cntct: 2, swl: 90, ects: 4 },

  // Level 3 - Spring
  { id: 'CSE112', code: 'CSE 112', name: 'Design and Analysis of Algorithms', cr: 4, prereqs: ['CSE111'], level: 3, term: 'Spring', type: 'pink', lct: 3, lab: 0, tut: 3, oth: 0, cntct: 6, swl: 195, ects: 8 },
  { id: 'CSE241', code: 'CSE 241', name: 'Security of Information Systems', cr: 3, prereqs: ['CSE261'], level: 3, term: 'Spring', type: 'green', lct: 2, lab: 2, tut: 1, oth: 0, cntct: 5, swl: 150, ects: 6 },
  { id: 'CSE323', code: 'CSE 323', name: 'Advanced Database Systems', cr: 3, prereqs: ['CSE221'], level: 3, term: 'Spring', type: 'green', lct: 2, lab: 2, tut: 1, oth: 0, cntct: 5, swl: 180, ects: 6 },
  { id: 'E2', code: 'E2 4xx', name: 'Elective Course (2)', cr: 3, prereqs: [], level: 3, term: 'Spring', type: 'yellow', lct: 2, lab: 2, tut: 1, oth: 0, cntct: 5, swl: 180, ects: 6 },
  { id: 'CSE292', code: 'CSE 292', name: 'Field Training 2 in Computer Science', cr: 2, prereqs: [], level: 3, term: 'Spring', type: 'orange', lct: 2, lab: 0, tut: 0, oth: 0, cntct: 2, swl: 60, ects: 4 },
  { id: 'UC6', code: 'UC6 3xx', name: 'University Requirement (6)', cr: 2, prereqs: [], level: 3, term: 'Spring', type: 'lightgreen', lct: 2, lab: 0, tut: 0, oth: 0, cntct: 2, swl: 90, ects: 4 },

  // Level 4 - Fall
  { id: 'CSE363', code: 'CSE 363', name: 'Cloud Computing', cr: 3, prereqs: ['CSE261'], level: 4, term: 'Fall', type: 'green', lct: 2, lab: 2, tut: 1, oth: 0, cntct: 5, swl: 180, ects: 6 },
  { id: 'CSE454', code: 'CSE 454', name: 'Advanced Software Engineering', cr: 3, prereqs: ['CSE251_SE'], level: 4, term: 'Fall', type: 'green', lct: 2, lab: 2, tut: 1, oth: 0, cntct: 5, swl: 180, ects: 6 },
  { id: 'AIE323', code: 'AIE 323', name: 'Data Mining', cr: 3, prereqs: ['CSE221', 'AIE121'], level: 4, term: 'Fall', type: 'green', lct: 2, lab: 2, tut: 1, oth: 0, cntct: 5, swl: 180, ects: 6 },
  { id: 'CSE493', code: 'CSE 493', name: 'Graduation Project 1', cr: 3, prereqs: ['CSE251_SE'], level: 4, term: 'Fall', type: 'orange', lct: 2, lab: 3, tut: 0, oth: 0, cntct: 5, swl: 180, ects: 6 },
  { id: 'UC7', code: 'UC7 3xx', name: 'University Requirement (7)', cr: 2, prereqs: [], level: 4, term: 'Fall', type: 'lightgreen', lct: 2, lab: 0, tut: 0, oth: 0, cntct: 2, swl: 90, ects: 4 },
  { id: 'E3', code: 'E3 4xx', name: 'Elective Course (3)', cr: 3, prereqs: [], level: 4, term: 'Fall', type: 'yellow', lct: 2, lab: 2, tut: 1, oth: 0, cntct: 5, swl: 180, ects: 6 },

  // Level 4 - Spring
  { id: 'CSE411', code: 'CSE 411', name: 'Theory of Computation & Compilers', cr: 3, prereqs: [], level: 4, term: 'Spring', type: 'green', lct: 2, lab: 2, tut: 1, oth: 0, cntct: 5, swl: 180, ects: 6 },
  { id: 'CSE474', code: 'CSE 474', name: 'Distributed Information Systems', cr: 3, prereqs: ['CSE363'], level: 4, term: 'Spring', type: 'green', lct: 2, lab: 2, tut: 1, oth: 0, cntct: 5, swl: 180, ects: 6 },
  { id: 'CSE494', code: 'CSE 494', name: 'Graduation Project 2', cr: 3, prereqs: ['CSE493'], level: 4, term: 'Spring', type: 'orange', lct: 2, lab: 3, tut: 0, oth: 0, cntct: 5, swl: 180, ects: 6 },
  { id: 'E4', code: 'E4 4xx', name: 'Elective Course (4)', cr: 3, prereqs: [], level: 4, term: 'Spring', type: 'yellow', lct: 2, lab: 2, tut: 1, oth: 0, cntct: 5, swl: 180, ects: 6 },
  { id: 'E5', code: 'E5 4xx', name: 'Elective Course (5)', cr: 3, prereqs: [], level: 4, term: 'Spring', type: 'yellow', lct: 2, lab: 2, tut: 1, oth: 0, cntct: 5, swl: 180, ects: 6 },
  { id: 'UE3', code: 'UE3 3xx', name: 'Elective University (3)', cr: 2, prereqs: [], level: 4, term: 'Spring', type: 'lightgreen', lct: 2, lab: 0, tut: 0, oth: 0, cntct: 2, swl: 90, ects: 4 }
];

let passedCourses = new Set();
const TOTAL_CREDITS = 127;

function initGuideMenu() {
  const menuContainer = document.getElementById('guide-menu-container');
  if (!menuContainer) return;
  menuContainer.innerHTML = '';

  guideTopics.forEach((topic, idx) => {
    const btn = document.createElement('div');
    btn.className = 'guide-menu-item';
    btn.style.cssText = "padding: 10px 15px; border-radius: 8px; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 10px; color: var(--text);";
    btn.innerHTML = \`<span style="font-size:1.2rem">\${topic.icon}</span> <span style="font-size:0.95rem;font-weight:600;">\${topic.title}</span>\`;
    
    // hover effect
    btn.onmouseenter = () => { if(btn.dataset.active !== 'true') btn.style.background = 'rgba(79,142,247,0.1)'; };
    btn.onmouseleave = () => { if(btn.dataset.active !== 'true') btn.style.background = 'transparent'; };

    btn.onclick = () => {
      document.querySelectorAll('.guide-menu-item').forEach(b => {
        b.style.background = 'transparent';
        b.style.color = 'var(--text)';
        b.dataset.active = 'false';
      });
      btn.style.background = 'rgba(79,142,247,0.15)';
      btn.style.color = 'var(--blue)';
      btn.dataset.active = 'true';
      
      const titleEl = document.getElementById('guide-content-title');
      const bodyEl = document.getElementById('guide-content-body');
      
      titleEl.innerHTML = \`\${topic.icon} \${topic.title}\`;
      bodyEl.innerHTML = topic.content;
      bodyEl.style.animation = 'none';
      bodyEl.offsetHeight; // trigger reflow
      bodyEl.style.animation = 'fadeSlideUp 0.3s ease forwards';
    };
    menuContainer.appendChild(btn);
  });
}

function renderStudyPlanView() {
  const titleEl = document.getElementById('guide-content-title');
  const bodyEl = document.getElementById('guide-content-body');
  
  titleEl.innerHTML = '🗺️ الخطة الدراسية (Study Plan)';
  
  let html = '<div style="margin-bottom:20px;color:var(--muted);">هذا الجدول يوضح الخطة الدراسية كاملة لتخصص Software Engineering / Computer Science وفقاً للكتيب الرسمي.</div>';
  html += '<div style="overflow-x:auto;border:1px solid var(--border);border-radius:12px;background:var(--surface2);">';
  html += '<table style="width:100%;text-align:left;border-collapse:collapse;min-width:700px;font-size:0.9rem;">';
  html += '<tr style="background:rgba(79,142,247,0.1);border-bottom:2px solid var(--border);">';
  html += '<th style="padding:12px;">Semester</th><th style="padding:12px;">Code</th><th style="padding:12px;">Course Name</th>';
  html += '<th style="padding:12px;">LCT</th><th style="padding:12px;">LAB</th><th style="padding:12px;">TUT</th>';
  html += '<th style="padding:12px;">CNTCT</th><th style="padding:12px;color:var(--blue);">CH</th><th style="padding:12px;">SWL</th><th style="padding:12px;">ECTS</th>';
  html += '</tr>';

  let currentLevel = 1;
  let currentTerm = 'Fall';
  let semesterNum = 1;

  courseData.forEach(c => {
    if (c.level !== currentLevel || c.term !== currentTerm) {
       currentLevel = c.level;
       currentTerm = c.term;
       semesterNum++;
    }
    html += \`<tr style="border-bottom:1px solid var(--border); transition: background 0.2s;" onmouseenter="this.style.background='rgba(79,142,247,0.05)'" onmouseleave="this.style.background='transparent'">
      <td style="padding:10px;font-weight:900;">\${semesterNum}</td>
      <td style="padding:10px;font-family:var(--font-mono);color:var(--muted);">\${c.code}</td>
      <td style="padding:10px;font-weight:bold;">\${c.name}</td>
      <td style="padding:10px;">\${c.lct}</td>
      <td style="padding:10px;">\${c.lab}</td>
      <td style="padding:10px;">\${c.tut}</td>
      <td style="padding:10px;font-weight:bold;">\${c.cntct}</td>
      <td style="padding:10px;font-weight:900;color:var(--blue);">\${c.cr}</td>
      <td style="padding:10px;">\${c.swl}</td>
      <td style="padding:10px;">\${c.ects}</td>
    </tr>\`;
  });
  
  html += '</table></div>';
  bodyEl.innerHTML = html;
}

function renderInteractiveCourseMap() {
  const titleEl = document.getElementById('guide-content-title');
  const bodyEl = document.getElementById('guide-content-body');
  
  titleEl.innerHTML = '🧭 خريطة المواد التفاعلية';
  
  let html = \`
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px;flex-wrap:wrap;gap:10px;">
      <div>
         <span style="font-weight:900;font-size:1.1rem;color:var(--blue);" id="map-cr-display">0 / 127 CR</span> 
         <span style="color:var(--muted);font-size:0.9rem;">(أكملت هذه الساعات)</span>
      </div>
      <div style="display:flex;gap:10px;">
        <div style="font-size:0.8rem;display:flex;align-items:center;gap:5px;"><div style="width:12px;height:12px;background:rgba(34,211,122,0.2);border:1px solid var(--green);border-radius:3px;"></div> مجتازة</div>
        <div style="font-size:0.8rem;display:flex;align-items:center;gap:5px;"><div style="width:12px;height:12px;background:var(--surface2);border:1px solid var(--blue);border-radius:3px;"></div> متاحة</div>
        <div style="font-size:0.8rem;display:flex;align-items:center;gap:5px;"><div style="width:12px;height:12px;background:var(--bg);border:1px solid var(--border);border-radius:3px;"></div> مغلقة</div>
      </div>
      <button class="btn btn-ghost btn-sm" onclick="resetCourseMap()" style="color:var(--red);border:1px solid var(--red);">🔄 إعادة ضبط الخريطة</button>
    </div>
    <div id="interactive-map-grid" style="display:flex;flex-direction:column;gap:20px;"></div>
  \`;
  bodyEl.innerHTML = html;
  updateCourseMap();
}

function getCourseColor(type, state) {
  if (state === "locked") return "var(--bg)";
  if (state === "passed") return "rgba(34,211,122,0.15)";
  switch(type) {
    case "pink": return "rgba(233, 30, 99, 0.1)";
    case "orange": return "rgba(255, 152, 0, 0.1)";
    case "green": return "rgba(76, 175, 80, 0.1)";
    case "lightgreen": return "rgba(139, 195, 74, 0.1)";
    case "yellow": return "rgba(255, 235, 59, 0.1)";
    default: return "var(--surface2)";
  }
}

function getCourseBorder(type, state) {
  if (state === "locked") return "1px solid var(--border)";
  if (state === "passed") return "1px solid var(--green)";
  switch(type) {
    case "pink": return "1px solid #e91e63";
    case "orange": return "1px solid #ff9800";
    case "green": return "1px solid #4caf50";
    case "lightgreen": return "1px solid #8bc34a";
    case "yellow": return "1px solid #cddc39";
    default: return "1px solid var(--border)";
  }
}

function checkPrerequisites(course) {
  if (course.prereqs.length === 0) return true;
  return course.prereqs.every(prereqId => passedCourses.has(prereqId));
}

window.toggleCourse = function(courseId) {
  if (passedCourses.has(courseId)) {
    removeCourseAndDependents(courseId);
  } else {
    const course = courseData.find(c => c.id === courseId);
    if (checkPrerequisites(course)) {
      passedCourses.add(courseId);
    } else {
      alert("يجب اجتياز متطلبات هذه المادة أولاً!");
    }
  }
  updateCourseMap();
}

function removeCourseAndDependents(courseId) {
  passedCourses.delete(courseId);
  courseData.forEach(c => {
    if (c.prereqs.includes(courseId) && passedCourses.has(c.id)) {
      removeCourseAndDependents(c.id);
    }
  });
}

window.resetCourseMap = function() {
  if(confirm("هل أنت متأكد من إعادة تعيين الخريطة؟")) {
    passedCourses.clear();
    updateCourseMap();
  }
}

window.showCourseInfo = function(e, courseId) {
  e.stopPropagation(); // prevent toggle
  const course = courseData.find(c => c.id === courseId);
  if(!course) return;
  alert(\`تفاصيل المادة: \${course.name} (\${course.code})\\nالمتطلبات: \${course.prereqs.join(', ') || 'لا يوجد'}\\nمحاضرات (LCT): \${course.lct}\\nمعامل (LAB): \${course.lab}\\nسكاشن (TUT): \${course.tut}\\nإجمالي ساعات التواصل: \${course.cntct}\\nوزن المادة (CH): \${course.cr}\\nالعبء الطلابي (SWL): \${course.swl}\\nنظام التقييم الأوروبي (ECTS): \${course.ects}\`);
}

function updateCourseMap() {
  const container = document.getElementById("interactive-map-grid");
  if (!container) return;
  
  container.innerHTML = "";
  let earnedCredits = 0;
  const levels = [1, 2, 3, 4];
  
  levels.forEach(level => {
    const levelDiv = document.createElement("div");
    levelDiv.style.cssText = "background:var(--surface2);border-radius:12px;padding:20px;border:1px solid var(--border);";
    
    const levelTitle = document.createElement("h3");
    levelTitle.textContent = "Level " + level;
    levelTitle.style.cssText = "margin-bottom:15px;color:var(--text);font-size:1.2rem;";
    levelDiv.appendChild(levelTitle);
    
    const terms = ["Fall", "Spring"];
    const termsContainer = document.createElement("div");
    termsContainer.style.cssText = "display:flex;gap:20px;flex-wrap:wrap;";
    
    terms.forEach(term => {
      const termDiv = document.createElement("div");
      termDiv.style.cssText = "flex:1;min-width:250px;background:var(--surface);padding:15px;border-radius:10px;border:1px solid var(--border);";
      
      const termTitle = document.createElement("h4");
      termTitle.textContent = term === "Fall" ? "الخريف (Fall)" : "الربيع (Spring)";
      termTitle.style.cssText = "margin-bottom:12px;color:var(--muted);font-size:0.9rem;border-bottom:1px solid var(--border);padding-bottom:5px;";
      termDiv.appendChild(termTitle);
      
      const courses = courseData.filter(c => c.level === level && c.term === term);
      const coursesGrid = document.createElement("div");
      coursesGrid.style.cssText = "display:grid;grid-template-columns:repeat(auto-fill, minmax(135px, 1fr));gap:10px;";
      
      courses.forEach(course => {
        const isPassed = passedCourses.has(course.id);
        const isAvailable = checkPrerequisites(course);
        const state = isPassed ? "passed" : (isAvailable ? "available" : "locked");
        
        if (isPassed) earnedCredits += course.cr;
        
        const cBtn = document.createElement("div");
        cBtn.onclick = () => toggleCourse(course.id);
        cBtn.style.cssText = "background: " + getCourseColor(course.type, state) + "; border: " + getCourseBorder(course.type, state) + "; padding: 10px; border-radius: 8px; cursor: " + (isAvailable ? "pointer" : "not-allowed") + "; transition: all 0.3s ease; position: relative; opacity: " + (state === "locked" ? "0.6" : "1") + "; display: flex; flex-direction: column; gap: 5px; user-select:none;";
        
        if(isAvailable) {
            cBtn.onmouseenter = () => cBtn.style.transform = "translateY(-2px)";
            cBtn.onmouseleave = () => cBtn.style.transform = "translateY(0)";
        }
        
        const topRow = document.createElement('div');
        topRow.style.cssText = 'display:flex;justify-content:space-between;align-items:center;';
        
        const codeEl = document.createElement("div");
        codeEl.style.cssText = "font-weight:900;font-size:0.75rem;font-family:var(--font-mono);";
        codeEl.textContent = course.code;
        
        const infoBtn = document.createElement("div");
        infoBtn.innerHTML = 'ℹ️';
        infoBtn.style.cssText = 'cursor:help;font-size:0.8rem;';
        infoBtn.title = 'التفاصيل';
        infoBtn.onclick = (e) => showCourseInfo(e, course.id);
        
        topRow.appendChild(codeEl);
        topRow.appendChild(infoBtn);
        
        const nameEl = document.createElement("div");
        nameEl.style.cssText = "font-size:0.75rem;line-height:1.2;flex:1;margin-top:2px;";
        nameEl.textContent = course.name;
        
        const crEl = document.createElement("div");
        crEl.style.cssText = "font-size:0.7rem;color:var(--muted);align-self:flex-end;margin-top:4px;display:flex;justify-content:space-between;width:100%;";
        crEl.innerHTML = \`<span>\${course.cr} CH</span> <span>\${isPassed ? "✅" : (state === "locked" ? "🔒" : "")}</span>\`;
        
        cBtn.appendChild(topRow);
        cBtn.appendChild(nameEl);
        cBtn.appendChild(crEl);
        coursesGrid.appendChild(cBtn);
      });
      
      termDiv.appendChild(coursesGrid);
      termsContainer.appendChild(termDiv);
    });
    
    levelDiv.appendChild(termsContainer);
    container.appendChild(levelDiv);
  });
  
  const crDisplay = document.getElementById("map-cr-display");
  if (crDisplay) {
    crDisplay.textContent = earnedCredits + " / " + TOTAL_CREDITS + " CR";
  }
}

// Global initialization
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    initGuideMenu();
  }, 500);
});
