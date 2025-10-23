const searchInput = document.querySelector('.search-input');
const filterTags = document.querySelectorAll('.filter-tag');
const sortDropdown = document.querySelector('.sort-dropdown');
const storiesGrid = document.querySelector('.stories-grid');
const storyCards = Array.from(document.querySelectorAll('.story-card'));

// حالة لا توجد نتائج
const zeroState = document.createElement('div');
zeroState.classList.add('zero-state');
zeroState.innerHTML = `
  <h2>لا توجد نتائج</h2>
  <p>لم يتم العثور على قصص مطابقة للبحث أو الفلترة.</p>
  <button class="reset-btn">إعادة عرض كل القصص</button>
`;
storiesGrid.parentNode.appendChild(zeroState);

document.querySelector('.reset-btn').addEventListener('click', resetFilters);

function resetFilters() {
    searchInput.value = '';
    filterTags.forEach(tag => tag.classList.remove('active'));
    filterTags[0].classList.add('active');
    sortDropdown.value = 'recent';
    filterAndSortStories();
}

function filterAndSortStories() {
    const searchTerm = searchInput.value.toLowerCase();
    const activeFilter = document.querySelector('.filter-tag.active').textContent;
    let visibleCount = 0;

    let filteredStories = storyCards.filter(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const summary = card.querySelector('.card-summary').textContent.toLowerCase();
        const category = card.querySelector('.card-category').textContent;
        const matchesSearch = title.includes(searchTerm) || summary.includes(searchTerm);
        const matchesFilter = (activeFilter === 'كل القصص') || (category === activeFilter);
        return matchesSearch && matchesFilter;
    });

    const sortValue = sortDropdown.value;
    if (sortValue === 'oldest') filteredStories.reverse();
    else if (sortValue === 'category') {
        filteredStories.sort((a,b) =>
            a.querySelector('.card-category').textContent.localeCompare(b.querySelector('.card-category').textContent)
        );
    }

    storyCards.forEach(card => card.style.display = 'none');
    filteredStories.forEach(card => { card.style.display = 'block'; visibleCount++; });
    zeroState.style.display = visibleCount === 0 ? 'block' : 'none';
}

// 🔹 تخزين تفاصيل القصة في localStorage عند الضغط
storyCards.forEach(card => {
    const detailsBtn = card.querySelector('.details-btn');
    if (detailsBtn) {
        detailsBtn.addEventListener('click', () => {
            const storyData = {
                title: card.querySelector('.card-title').textContent,
                category: card.querySelector('.card-category').textContent,
                date: card.querySelector('.card-date').textContent,
                summary: card.querySelector('.card-summary').textContent,
                image: card.querySelector('img').getAttribute('src')
            };
            localStorage.setItem('selectedStory', JSON.stringify(storyData));
            window.location.href = 'story-details.html';
        });
    }
});

searchInput.addEventListener('input', filterAndSortStories);
filterTags.forEach(tag => tag.addEventListener('click', () => {
    filterTags.forEach(t => t.classList.remove('active'));
    tag.classList.add('active');
    filterAndSortStories();
}));
sortDropdown.addEventListener('change', filterAndSortStories);

// التهيئة عند تحميل الصفحة
filterTags[0].classList.add('active');
filterAndSortStories();
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});
