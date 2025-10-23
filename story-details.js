// قراءة id القصة من الرابط
const urlParams = new URLSearchParams(window.location.search);
const storyId = urlParams.get('id'); // 1, 2, 3 ...

// بيانات القصص مع كل التفاصيل
const stories = [
  {
    id: "1",
    title: "تحقيق كفاءة 40% في عمليات التشغيل عبر الحل الذكي",
    category: "تكنولوجيا",
    date: "12 أكتوبر 2025",
    badge: "قصة جماعية",
   
    scorecards: [
      {number:"40%", label:"زيادة في كفاءة التشغيل"},
      {number:"3,000", label:"ساعة عمل تم توفيرها سنوياً"},
      {number:"100%", label:"رضا الموظفين عن النظام الجديد"}
    ],
    background: "قبل عامين، كانت عملياتنا تعتمد على أنظمة يدوية معقدة...",
    challenges: ["تشتت البيانات...", "العمليات البطيئة...", "نقص المهارات..."],
    activities: ["تصميم بنية حلول...", "التدريب المخصص...", "الأتمتة..."],
    achievements: ["زيادة الثقة...", "تقليل الأخطاء...", "بناء المجتمع..."],
    media: [
      {type:"image", src:"MMM.jpg", alt:"لقطة شاشة للحل الجديد"}, // تم التغيير هنا
      {type:"video", src:"MMN.mp4"}
    ],
    prev: "3",
    next: "2"
  },
  {
    id: "2",
    title: "توسيع نطاق المساعدة إلى 5000 مستفيد جديد خلال شهر واحد",
    category: "الخدمات الإنسانية",
    date: "20 أكتوبر 2025",
    badge: "قصة فردية",
    
    scorecards: [
      {number:"50%", label:"زيادة التغطية"},
      {number:"5,000", label:"عدد المستفيدين الجدد"},
      {number:"95%", label:"رضا المستفيدين"}
    ],
    background: "في البداية كان نطاق المساعدة محدودًا...",
    challenges: ["قلة الموارد...", "نقص التطوع...", "توزيع غير متكافئ..."],
    activities: ["تنظيم حملات توعية...", "توسيع فرق التطوع...", "توزيع الدعم المادي..."],
    achievements: ["زيادة التغطية...", "تحسين توزيع الموارد...", "رضا المستفيدين..."],
    media: [
      {type:"image", src:"MMM.jpg", alt:"لقطة حملة المساعدة"}, // تم التغيير هنا
      {type:"video", src:"MMN.mp4"}
    ],
    prev: "1",
    next: "3"
  },
  {
    id: "3",
    title: "إطلاق منصة التعليم التفاعلية الجديدة وتدريب 800 معلم",
    category: "التعليم",
    date: "5 نوفمبر 2025",
    badge: "قصة جماعية",

    scorecards: [
      {number:"80%", label:"تفاعل المعلمين"},
      {number:"800", label:"عدد المعلمين المدربين"},
      {number:"100%", label:"رضا المشاركين"}
    ],
    background: "كان الهدف تحسين جودة التعليم...",
    challenges: ["قلة الموارد التقنية...", "تباين مستوى المعلمين...", "صعوبة التطبيق الميداني..."],
    activities: ["تطوير محتوى تفاعلي...", "ورش تدريبية...", "تقييم مستمر للمتعلمين..."],
    achievements: ["تحسين المهارات...", "رفع جودة التعليم...", "رضا المعلمين..."],
    media: [
      {type:"image", src:"MMM.jpg", alt:"لقطة منصة التعليم"}, // تم التغيير هنا
      {type:"video", src:"MMN.mp4"}
    ],
    prev: "2",
    next: "1"
  }
];

const story = stories.find(s => s.id == storyId);

if (story) {
  document.querySelector('.story-title').textContent = story.title;
  document.querySelector('.story-category').textContent = story.category;
  document.querySelector('.story-date').textContent = story.date;
  document.querySelector('.badge').textContent = story.badge;

  const storyContent = document.querySelector('.story-content');

  // Scorecards
  const scoreGrid = document.querySelector('.scorecards-grid');
  scoreGrid.innerHTML = '';
  story.scorecards.forEach(s => {
    const div = document.createElement('div');
    div.classList.add('scorecard');
    div.innerHTML = `<div class="number">${s.number}</div><div class="label">${s.label}</div>`;
    scoreGrid.appendChild(div);
  });

  // الأقسام المختلفة
  document.querySelector('.story-background').innerHTML = `<h2>الخلفية  </h2><p>${story.background}</p>`;
  document.querySelector('.story-challenges').innerHTML = `<h2>التحديات</h2><ul>${story.challenges.map(c=>`<li>${c}</li>`).join('')}</ul>`;
  document.querySelector('.story-activities').innerHTML = `<h2>الأنشطة </h2><ol>${story.activities.map(a=>`<li>${a}</li>`).join('')}</ol>`;
  document.querySelector('.story-achievements').innerHTML = `<h2>الإنجازات</h2><ul>${story.achievements.map(a=>`<li>${a}</li>`).join('')}</ul>`;

  // روابط التنقل
  document.querySelector('.nav-prev').href = `story-details.html?id=${story.prev}`;
  document.querySelector('.nav-next').href = `story-details.html?id=${story.next}`;

  // قسم الوسائط
  const mediaSection = document.querySelector('.story-media');
  if (mediaSection && story.media) {
    mediaSection.innerHTML = `<h2>الصور والفيديوهات</h2>`;
    const grid = document.createElement('div');
    grid.classList.add('media-grid');

    const notes = []; // مصفوفة لحفظ الملاحظات مؤقتاً

    story.media.forEach((m, index) => {
      // تجاهل أي بطاقة فارغة
      if (!m.src) return;

      const mediaItem = document.createElement('div');
      mediaItem.classList.add('story-summary-card');

      // إنشاء العنصر الإعلامي (صورة أو فيديو)
      let mediaElem;
      if (m.type === 'image') {
        mediaElem = document.createElement('img');
        mediaElem.src = m.src;
        mediaElem.alt = m.alt || '';
        mediaElem.classList.add('media-thumb');
      } else if (m.type === 'video') {
        mediaElem = document.createElement('video');
        mediaElem.controls = true;
        mediaElem.style.width = '100%';
        mediaElem.style.borderRadius = '8px';
        const source = document.createElement('source');
        source.src = m.src;
        source.type = 'video/mp4';
        mediaElem.appendChild(source);
      }
      mediaItem.appendChild(mediaElem);

      // العنوان والوصف فقط إذا كانت موجودة
      if (m.alt || m.type) {
        const info = document.createElement('div');
        info.innerHTML = `<h3>${m.type === 'image' ? 'عنوان الصورة' : 'عنوان الفيديو'} ${index+1}</h3>
                          <p>وصف مختصر ${m.type}</p>`;
        mediaItem.appendChild(info);
      }

      // زر إرسال ملاحظة
      const noteBtn = document.createElement('button');
      noteBtn.textContent = 'إرسال ملاحظة';
      noteBtn.style.marginTop = '5px';
      noteBtn.addEventListener('click', () => {
        const note = prompt('اكتب ملاحظتك هنا:');
        if (note) {
          notes.push({ mediaIndex: index, type: m.type, note });
          alert('تم إرسال الملاحظة!');
          console.log('ملاحظة جديدة:', notes);
        }
      });
      mediaItem.appendChild(noteBtn);

      grid.appendChild(mediaItem);
    });

    mediaSection.appendChild(grid);
  }

  // تكبير الصور في نافذة منبثقة
  const modal = document.createElement('div');
  modal.classList.add('image-modal');
  modal.innerHTML = `<span class="close">&times;</span><img class="modal-content" /><div class="caption"></div>`;
  document.body.appendChild(modal);

  const modalImg = modal.querySelector('.modal-content');
  const captionText = modal.querySelector('.caption');
  const closeBtn = modal.querySelector('.close');

  document.addEventListener('click', e => {
    if (e.target.classList.contains('media-thumb')) {
      modal.style.display = 'block';
      modalImg.src = e.target.src;
      captionText.innerHTML = e.target.alt || '';
    }
    if (e.target === closeBtn || e.target === modal) {
      modal.style.display = 'none';
    }
  });

} else {
  document.querySelector('.container').innerHTML = "<h2>القصة غير موجودة</h2>";
}
