// app.js النهائي المحدّث والمنظم بالكامل

document.addEventListener('DOMContentLoaded', () => {

  if (typeof supabase === 'undefined') {
    console.error('Supabase غير معرف. تحقق من تحميل supabaseClient.js أولاً.');
    return;
  }

  // تبديل الوضع الليلي والنهاري
  const toggleDarkModeBtn = document.getElementById('toggleDarkMode');

  if (toggleDarkModeBtn) {
    toggleDarkModeBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const currentMode = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
      localStorage.setItem('mode', currentMode);
    });

    // استعادة الوضع الحالي من localStorage
    const savedMode = localStorage.getItem('mode');
    if (savedMode === 'dark') {
      document.body.classList.add('dark-mode');
    }
  } else {
    console.error('زر تبديل الوضع الليلي غير موجود.');
  }

  // البحث والفلترة
  const searchInput = document.getElementById('search');
  const filterSelect = document.getElementById('filter');

  if (searchInput && filterSelect && typeof init === 'function') {
    searchInput.addEventListener('input', applyFilters);
    filterSelect.addEventListener('change', applyFilters);
  }

  async function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = filterSelect.value;

    const links = await fetchLinks();

    const filteredLinks = links.filter(link => {
      const matchesCategory = selectedCategory === 'all' || link.category === selectedCategory;
      const matchesSearch = link.name.toLowerCase().includes(searchTerm) ||
                             link.url.toLowerCase().includes(searchTerm) ||
                             (link.description && link.description.toLowerCase().includes(searchTerm));
      return matchesCategory && matchesSearch;
    });

    displayLinks(filteredLinks);
  }

});
