// getLinks.js النهائي المحدث بالكامل باحترافية

document.addEventListener('DOMContentLoaded', () => {

  if (typeof supabase === 'undefined') {
    console.error('Supabase غير معرف. تحقق من تحميل supabaseClient.js أولاً.');
    return;
  }

  async function fetchLinks() {
    try {
      const loading = document.getElementById('loading');
      if (loading) loading.classList.remove('d-none');

      const { data, error } = await supabase
        .from('dalillinks')
        .select('*')
        .order('id', { ascending: false });

      if (error) {
        console.error('خطأ في جلب البيانات:', error.message);
        return [];
      }

      return data || [];
    } catch (err) {
      console.error('خطأ عام أثناء جلب الروابط:', err);
      return [];
    } finally {
      const loading = document.getElementById('loading');
      if (loading) loading.classList.add('d-none');
    }
  }

  function displayLinks(links) {
    const container = document.getElementById('links-container');
    if (!container) {
      console.error('العنصر links-container غير موجود في الصفحة.');
      return;
    }

    container.innerHTML = '';

    links.forEach(link => {
      const card = document.createElement('div');
      card.className = 'link-card col-md-6';
      card.innerHTML = `
        <div class="favicon rounded">
          <img src="https://www.google.com/s2/favicons?domain=${new URL(link.url).hostname}" 
               alt="Favicon" class="w-100 h-100 rounded">
        </div>
        <div class="link-content">
          <a href="${link.url}" target="_blank" class="link-title d-block">${link.name}</a>
          <div class="link-url">${link.url}</div>
          <div class="link-description">${link.description || ''}</div>
        </div>
        <div class="category-badge ms-auto">${link.category}</div>
      `;
      container.appendChild(card);
    });
  }

  async function init() {
    const links = await fetchLinks();
    displayLinks(links);
  }

  window.init = init; // اجعل init متاحة في جميع الملفات الأخرى (مثل createLink.js)
  init();

});
