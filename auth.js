// ══ Supabase — Auth + Database ══
  const { createClient } = supabase;
  const sb = createClient(
    'https://ciayroltxdoifrvomyju.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpYXlyb2x0eGRvaWZydm9teWp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxOTM3MjQsImV4cCI6MjA4ODc2OTcyNH0.QyFYCOT54qEK5t8IhcTKmt6yHHDIj6yZMF6VBzFtUV0'
  );

  // ══ فتح/قفل المودال ══
  window.openAuthModal = (mode = 'login') => {
    document.getElementById('authModal').style.display = 'flex';
    window.switchAuthMode(mode);
  };
  window.closeAuthModal = () => {
    document.getElementById('authModal').style.display = 'none';
    document.getElementById('authEmail').value = '';
    document.getElementById('authPass').value = '';
    document.getElementById('authName').value = '';
    document.getElementById('authError').textContent = '';
  };
  window.switchAuthMode = (mode) => {
    const isLogin = mode === 'login';
    document.getElementById('authTitle').textContent = isLogin ? '🔑 تسجيل الدخول' : '🚀 حساب جديد';
    document.getElementById('authNameWrap').style.display = isLogin ? 'none' : 'block';
    document.getElementById('authSubmitBtn').textContent = isLogin ? 'دخول' : 'إنشاء حساب';
    document.getElementById('authSwitchText').innerHTML = isLogin
      ? `مش عندك حساب؟ <span onclick="switchAuthMode('register')" style="color:var(--blue);cursor:pointer;font-weight:700;">سجّل دلوقتي</span>`
      : `عندك حساب؟ <span onclick="switchAuthMode('login')" style="color:var(--blue);cursor:pointer;font-weight:700;">سجّل دخول</span>`;
    document.getElementById('authModal').dataset.mode = mode;
    document.getElementById('authError').textContent = '';
  };

  // ══ تسجيل / دخول ══
  window.submitAuth = async () => {
    const mode = document.getElementById('authModal').dataset.mode;
    const email = document.getElementById('authEmail').value.trim();
    const pass = document.getElementById('authPass').value;
    const name = document.getElementById('authName').value.trim();
    const errEl = document.getElementById('authError');
    const btn = document.getElementById('authSubmitBtn');
    errEl.textContent = '';
    if (!email || !pass) { errEl.textContent = '⚠️ ادخل الإيميل والباسورد'; return; }
    if (mode === 'register' && !name) { errEl.textContent = '⚠️ ادخل اسمك'; return; }
    btn.disabled = true; btn.textContent = '...جاري';

    try {
      if (mode === 'register') {
        const { data, error } = await sb.auth.signUp({
          email, password: pass,
          options: { data: { name } }
        });
        if (error) throw error;
        // حفظ في profiles
        await sb.from('profiles').insert({
          id: data.user.id,
          name, email, points: 0, solved: 0
        });
        showToast('🎉 أهلاً ' + name + '! تم إنشاء حسابك', 'success');
        window.closeAuthModal();
      } else {
        const { data, error } = await sb.auth.signInWithPassword({ email, password: pass });
        if (error) throw error;
        // تأكد إن الـ profile موجود
        const uid = data.user.id;
        const { data: existing } = await sb.from('profiles').select('id').eq('id', uid).maybeSingle();
        if (!existing) {
          const uname = data.user.user_metadata?.name || email.split('@')[0];
          await sb.from('profiles').insert({ id: uid, name: uname, email, points: 0, solved: 0 });
        }
        const uname2 = data.user.user_metadata?.name || email.split('@')[0];
        showToast('✅ أهلاً ' + uname2 + '!', 'success');
        window.closeAuthModal();
      }
    } catch(e) {
      const msgs = {
        'Invalid login credentials': '⚠️ الإيميل أو الباسورد غلط',
        'User already registered': '⚠️ الإيميل ده موجود بالفعل',
        'Password should be at least 6 characters': '⚠️ الباسورد ضعيف (٦ حروف على الأقل)',
        'Unable to validate email address: invalid format': '⚠️ الإيميل مش صح',
      };
      errEl.textContent = msgs[e.message] || '❌ ' + e.message;
    }
    btn.disabled = false;
    btn.textContent = mode === 'login' ? 'دخول' : 'إنشاء حساب';
  };

  // ══ تسجيل الخروج ══
  window.logoutUser = async () => {
    await sb.auth.signOut();
    showToast('👋 تم تسجيل الخروج', '');
    updateLoginBtn(null);
  };

  // ══ تحديث الزرار بالأفاتار ══
  function updateLoginBtn(user) {
    const loginBtn = document.getElementById('loginBtn');
    if (!loginBtn) return;
    if (user) {
      const name = user.user_metadata?.name || user.email.split('@')[0];
      const avatarUrl = localStorage.getItem('avatar_' + user.id) || null;
      const av = typeof makeAvatar === 'function'
        ? makeAvatar(name, avatarUrl, 26)
        : '<span style="font-size:1.1rem;">👤</span>';
      loginBtn.innerHTML = av +
        `<span style="max-width:90px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${name.split(' ')[0]}</span>
        <span style="opacity:.4;font-size:.7rem;" onclick="event.stopPropagation();window.logoutUser()">✕</span>`;
      loginBtn.onclick = () => {
        const tab = document.querySelector('.tab-btn[onclick*="profile"]');
        switchTab('profile', tab);
      };
      loginBtn.style.background = 'rgba(34,211,122,.1)';
      loginBtn.style.border = '1px solid rgba(34,211,122,.3)';
      loginBtn.style.color = 'var(--green)';
      window._currentUser = user;
    } else {
      loginBtn.innerHTML = '🚀 دخول / تسجيل';
      loginBtn.onclick = () => window.openAuthModal('login');
      loginBtn.style.background = '';
      loginBtn.style.border = '';
      loginBtn.style.color = '';
      window._currentUser = null;
    }
  }

  // ══ تحقق من الجلسة الحالية ══
  sb.auth.getSession().then(({ data: { session } }) => {
    updateLoginBtn(session?.user || null);
  });

  sb.auth.onAuthStateChange((_event, session) => {
    updateLoginBtn(session?.user || null);
  });

  window._sb = sb;
  window._supabaseReady = true;