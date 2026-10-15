// Add some default rows when page loads
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    if (document.getElementById('gpa-courses-container')) {
      addCourseRow();
      addCourseRow();
      addCourseRow();
      addCourseRow();
    }
  }, 500);
});

// ==========================================
// COURSE MAP & STUDENT GUIDE (CS/Big Data)
// ==========================================

const courseData = [
  // Level 1 - Fall
  { id: 'CSE014', code: 'CSE 014', name: 'Structured Programming', cr: 3, prereqs: [], level: 1, term: 'Fall', type: 'pink' },
  { id: 'PHY211', code: 'PHY 211', name: 'Physics II', cr: 3, prereqs: [], level: 1, term: 'Fall', type: 'orange' },
  { id: 'MAT111', code: 'MAT 111', name: 'Mathematics I', cr: 3, prereqs: [], level: 1, term: 'Fall', type: 'orange' },
  { id: 'UC1', code: 'UC1 1xx', name: 'Univ Req 1', cr: 2, prereqs: [], level: 1, term: 'Fall', type: 'lightgreen' },
  { id: 'UC2', code: 'UC2 1xx', name: 'Univ Req 2', cr: 2, prereqs: [], level: 1, term: 'Fall', type: 'lightgreen' },
  { id: 'UE1', code: 'UE1 1xx', name: 'Univ Elect 1', cr: 2, prereqs: [], level: 1, term: 'Fall', type: 'lightgreen' },
  
  // Level 1 - Spring
  { id: 'CSE015', code: 'CSE 015', name: 'Object Oriented Programming', cr: 3, prereqs: ['CSE014'], level: 1, term: 'Spring', type: 'pink' },
  { id: 'MAT131', code: 'MAT 131', name: 'Probability & Statistics I', cr: 3, prereqs: ['MAT111'], level: 1, term: 'Spring', type: 'orange' },
  { id: 'CSE315', code: 'CSE 315', name: 'Discrete Mathematics', cr: 3, prereqs: [], level: 1, term: 'Spring', type: 'orange' },
  { id: 'MAT112', code: 'MAT 112', name: 'Mathematics II', cr: 3, prereqs: ['MAT111'], level: 1, term: 'Spring', type: 'orange' },
  { id: 'UC3', code: 'UC3 2xx', name: 'Univ Req 3', cr: 2, prereqs: [], level: 1, term: 'Spring', type: 'lightgreen' },
  { id: 'UE2', code: 'UE2 2xx', name: 'Univ Elect 2', cr: 2, prereqs: [], level: 1, term: 'Spring', type: 'lightgreen' },

  // Level 2 - Fall
  { id: 'CSE111', code: 'CSE 111', name: 'Data Structures', cr: 3, prereqs: ['CSE015'], level: 2, term: 'Fall', type: 'pink' },
  { id: 'CSE131', code: 'CSE 131', name: 'Logic Design', cr: 3, prereqs: ['PHY211'], level: 2, term: 'Fall', type: 'pink' },
  { id: 'MAT231', code: 'MAT 231', name: 'Probability & Statistics II', cr: 3, prereqs: ['MAT131'], level: 2, term: 'Fall', type: 'orange' },
  { id: 'AIE111', code: 'AIE 111', name: 'Artificial Intelligence', cr: 3, prereqs: ['CSE015'], level: 2, term: 'Fall', type: 'pink' },
  { id: 'MAT212', code: 'MAT 212', name: 'Linear Algebra', cr: 3, prereqs: ['MAT112'], level: 2, term: 'Fall', type: 'orange' },
  { id: 'UC4', code: 'UC4 2xx', name: 'Univ Req 4', cr: 2, prereqs: [], level: 2, term: 'Fall', type: 'lightgreen' },

  // Level 2 - Spring
  { id: 'CSE211', code: 'CSE 211', name: 'Web Programming', cr: 3, prereqs: ['CSE111'], level: 2, term: 'Spring', type: 'green' },
  { id: 'CSE221', code: 'CSE 221', name: 'Database Systems', cr: 3, prereqs: ['CSE111'], level: 2, term: 'Spring', type: 'pink' },
  { id: 'CSE132', code: 'CSE 132', name: 'Comp Architecture & Org', cr: 3, prereqs: ['CSE131'], level: 2, term: 'Spring', type: 'pink' },
  { id: 'MAT312', code: 'MAT 312', name: 'Differential Equations', cr: 3, prereqs: ['MAT112'], level: 2, term: 'Spring', type: 'orange' },
  { id: 'CSE191', code: 'CSE 191', name: 'Field Training 1 (CS)', cr: 2, prereqs: [], level: 2, term: 'Spring', type: 'orange' },
  { id: 'CSE251_SE', code: 'CSE 251', name: 'Software Engineering', cr: 3, prereqs: ['CSE111'], level: 2, term: 'Spring', type: 'pink' },

  // Level 3 - Fall
  { id: 'CSE261', code: 'CSE 261', name: 'Computer Networks', cr: 3, prereqs: ['CSE132'], level: 3, term: 'Fall', type: 'pink' },
  { id: 'E1', code: 'E1 3xx', name: 'Tech ELECT 1', cr: 3, prereqs: [], level: 3, term: 'Fall', type: 'yellow' },
  { id: 'AIE121', code: 'AIE 121', name: 'Machine Learning', cr: 3, prereqs: ['AIE111', 'MAT231'], level: 3, term: 'Fall', type: 'pink' },
  { id: 'CSE251_SA', code: 'CSE 251', name: 'Systems Analysis & Design', cr: 3, prereqs: ['CSE221'], level: 3, term: 'Fall', type: 'green' },
  { id: 'CSE233', code: 'CSE 233', name: 'Operating Systems', cr: 3, prereqs: ['CSE111', 'CSE132'], level: 3, term: 'Fall', type: 'pink' },
  { id: 'UC5', code: 'UC5 2xx', name: 'Univ Req 5', cr: 2, prereqs: [], level: 3, term: 'Fall', type: 'lightgreen' },

  // Level 3 - Spring
  { id: 'CSE112', code: 'CSE 112', name: 'Design and Analysis of Algorithms', cr: 4, prereqs: ['CSE111'], level: 3, term: 'Spring', type: 'pink' },
  { id: 'CSE292', code: 'CSE 292', name: 'Field Training 2 (CS)', cr: 2, prereqs: [], level: 3, term: 'Spring', type: 'orange' },
  { id: 'CSE241', code: 'CSE 241', name: 'Security of Information Systems', cr: 3, prereqs: ['CSE261'], level: 3, term: 'Spring', type: 'green' },
  { id: 'E2', code: 'E2 4xx', name: 'Tech ELECT 2', cr: 3, prereqs: [], level: 3, term: 'Spring', type: 'yellow' },
  { id: 'CSE323', code: 'CSE 323', name: 'Advanced Database Systems', cr: 3, prereqs: ['CSE221'], level: 3, term: 'Spring', type: 'green' },
  { id: 'UC6', code: 'UC6 3xx', name: 'Univ Req 6', cr: 2, prereqs: [], level: 3, term: 'Spring', type: 'lightgreen' },

  // Level 4 - Fall
  { id: 'CSE363', code: 'CSE 363', name: 'Cloud Computing', cr: 3, prereqs: ['CSE261'], level: 4, term: 'Fall', type: 'green' },
  { id: 'CSE454', code: 'CSE 454', name: 'Advanced Software Engineering', cr: 3, prereqs: ['CSE251_SE'], level: 4, term: 'Fall', type: 'green' },
  { id: 'CSE493', code: 'CSE 493', name: 'Graduation Project 1', cr: 3, prereqs: ['CSE251_SE'], level: 4, term: 'Fall', type: 'orange' },
  { id: 'AIE323', code: 'AIE 323', name: 'Data Mining', cr: 3, prereqs: ['CSE221', 'AIE121'], level: 4, term: 'Fall', type: 'green' },
  { id: 'UC7', code: 'UC7 3xx', name: 'Univ Req 7', cr: 2, prereqs: [], level: 4, term: 'Fall', type: 'lightgreen' },
  { id: 'E3', code: 'E3 4xx', name: 'Tech ELECT 3', cr: 3, prereqs: [], level: 4, term: 'Fall', type: 'yellow' },

  // Level 4 - Spring
  { id: 'CSE474', code: 'CSE 474', name: 'Distributed Information Systems', cr: 3, prereqs: ['CSE363'], level: 4, term: 'Spring', type: 'green' },
  { id: 'CSE494', code: 'CSE 494', name: 'Graduation Project 2', cr: 3, prereqs: ['CSE493'], level: 4, term: 'Spring', type: 'orange' },
  { id: 'CSE411', code: 'CSE 411', name: 'Theory of Computation & Compilers', cr: 3, prereqs: [], level: 4, term: 'Spring', type: 'green' },
  { id: 'E4', code: 'E4 4xx', name: 'Tech ELECT 4', cr: 3, prereqs: [], level: 4, term: 'Spring', type: 'yellow' },
  { id: 'E5', code: 'E5 4xx', name: 'Tech ELECT 5', cr: 3, prereqs: [], level: 4, term: 'Spring', type: 'yellow' },
  { id: 'UE3', code: 'UE3 3xx', name: 'Univ Elect 3', cr: 2, prereqs: [], level: 4, term: 'Spring', type: 'lightgreen' }
];

let passedCourses = new Set();
const TOTAL_CREDITS = 127;

function getCourseColor(type, state) {
  if (state === 'locked') return 'var(--bg)';
  if (state === 'passed') return 'rgba(34,211,122,0.15)';
  switch(type) {
    case 'pink': return 'rgba(233, 30, 99, 0.1)';
    case 'orange': return 'rgba(255, 152, 0, 0.1)';
    case 'green': return 'rgba(76, 175, 80, 0.1)';
    case 'lightgreen': return 'rgba(139, 195, 74, 0.1)';
    case 'yellow': return 'rgba(255, 235, 59, 0.1)';
    default: return 'var(--surface2)';
  }
}

function getCourseBorder(type, state) {
  if (state === 'locked') return '1px solid var(--border)';
  if (state === 'passed') return '1px solid var(--green)';
  switch(type) {
    case 'pink': return '1px solid #e91e63';
    case 'orange': return '1px solid #ff9800';
    case 'green': return '1px solid #4caf50';
    case 'lightgreen': return '1px solid #8bc34a';
    case 'yellow': return '1px solid #cddc39';
    default: return '1px solid var(--border)';
  }
}

function checkPrerequisites(course) {
  if (course.prereqs.length === 0) return true;
  return course.prereqs.every(prereqId => passedCourses.has(prereqId));
}

function toggleCourse(courseId) {
  if (passedCourses.has(courseId)) {
    removeCourseAndDependents(courseId);
  } else {
    const course = courseData.find(c => c.id === courseId);
    if (checkPrerequisites(course)) {
      passedCourses.add(courseId);
    } else {
      alert('يجب اجتياز متطلبات هذه المادة أولاً!');
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

function resetCourseMap() {
  if(confirm('هل أنت متأكد من إعادة تعيين جميع المواد؟')) {
    passedCourses.clear();
    updateCourseMap();
  }
}

function updateCourseMap() {
  const container = document.getElementById('course-map-container');
  if (!container) return;
  
  container.innerHTML = '';
  let earnedCredits = 0;
  const levels = [1, 2, 3, 4];
  
  levels.forEach(level => {
    const levelDiv = document.createElement('div');
    levelDiv.style.cssText = 'background:var(--surface);border-radius:12px;padding:20px;border:1px solid var(--border);';
    
    const levelTitle = document.createElement('h3');
    levelTitle.textContent = `Level ${level}`;
    levelTitle.style.cssText = 'margin-bottom:15px;color:var(--text);';
    levelDiv.appendChild(levelTitle);
    
    const terms = ['Fall', 'Spring'];
    const termsContainer = document.createElement('div');
    termsContainer.style.cssText = 'display:flex;gap:20px;flex-wrap:wrap;';
    
    terms.forEach(term => {
      const termDiv = document.createElement('div');
      termDiv.style.cssText = 'flex:1;min-width:250px;background:var(--surface2);padding:15px;border-radius:10px;';
      
      const termTitle = document.createElement('h4');
      termTitle.textContent = term === 'Fall' ? 'الفصل الأول (Fall)' : 'الفصل الثاني (Spring)';
      termTitle.style.cssText = 'margin-bottom:12px;color:var(--muted);font-size:0.9rem;border-bottom:1px solid var(--border);padding-bottom:5px;';
      termDiv.appendChild(termTitle);
      
      const courses = courseData.filter(c => c.level === level && c.term === term);
      const coursesGrid = document.createElement('div');
      coursesGrid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fill, minmax(140px, 1fr));gap:10px;';
      
      courses.forEach(course => {
        const isPassed = passedCourses.has(course.id);
        const isAvailable = checkPrerequisites(course);
        const state = isPassed ? `passed` : (isAvailable ? `available` : `locked`);
        
        if (isPassed) earnedCredits += course.cr;
        
        const cBtn = document.createElement('div');
        cBtn.onclick = () => toggleCourse(course.id);
        cBtn.style.cssText = `
          background: ${getCourseColor(course.type, state)};
          border: ${getCourseBorder(course.type, state)};
          padding: 10px;
          border-radius: 8px;
          cursor: ${isAvailable ? 'pointer' : 'not-allowed'};
          transition: all 0.3s ease;
          position: relative;
          opacity: ${state === 'locked' ? '0.6' : '1'};
          display: flex;
          flex-direction: column;
          gap: 5px;
        `;
        
        if(isAvailable) {
            cBtn.onmouseenter = () => cBtn.style.transform = 'translateY(-2px)';
            cBtn.onmouseleave = () => cBtn.style.transform = 'translateY(0)';
        }
        
        const codeEl = document.createElement('div');
        codeEl.style.cssText = 'font-weight:900;font-size:0.8rem;font-family:var(--font-mono);';
        codeEl.textContent = course.code;
        
        const nameEl = document.createElement('div');
        nameEl.style.cssText = 'font-size:0.75rem;line-height:1.2;flex:1;';
        nameEl.textContent = course.name;
        
        const crEl = document.createElement('div');
        crEl.style.cssText = 'font-size:0.7rem;color:var(--muted);align-self:flex-end;';
        crEl.innerHTML = `${course.cr} CR ${isPassed ? '✅' : (state === 'locked' ? '🔒' : '')}`;
        
        cBtn.appendChild(codeEl);
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
  
  const progressText = document.getElementById('guide-progress-text');
  const progressBar = document.getElementById('guide-progress-bar');
  if (progressText && progressBar) {
    progressText.textContent = `${earnedCredits} / ${TOTAL_CREDITS} CR`;
    const percent = Math.min((earnedCredits / TOTAL_CREDITS) * 100, 100);
    progressBar.style.width = `${percent}%`;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    updateCourseMap();
  }, 500);
});
