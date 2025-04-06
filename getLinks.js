// getLinks.js النهائي المحدث والمنظّم بالكامل

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

    console.log('نتيجة fetchLinks():', { data, error }); // 🔥 الطباعة المهمة هنا

    if (error) {
      console.error('خطأ في جلب البيانات:', error.message);
      return [];
    }

    if (!data || !Array.isArray(data)) {
      console.error('البيانات المستلمة ليست مصفوفة:', data);
      return [];
    }

    return data;
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

    // تنظيف الكروت القديمة
    container.innerHTML = '';

    if (!links.length) {
      container.innerHTML = '<p class="text-center">لا توجد روابط مضافة بعد.</p>';
      return;
    }

    links.forEach(link => {
      const card = document.createElement('div');
      card.className = 'link-card col-md-6 mb-3';

      const name = link.name || 'بدون اسم';
      const url = link.url || '#';
      const description = link.description || '';
      const category = link.category || 'غير مصنف';
      const domain = url !== '#' ? new URL(url).hostname : '';

      card.innerHTML = `
        <div class="favicon rounded">
          ${domain ? `<img src="https://www.google.com/s2/favicons?domain=${domain}" alt="Favicon" class="w-100 h-100 rounded">` : ''}
        </div>
        <div class="link-content">
          <a href="${url}" target="_blank" class="link-title d-block">${name}</a>
          <div class="link-url">${url}</div>
          <div class="link-description">${description}</div>
        </div>
        <div class="category-badge ms-auto">${category}</div>
      `;

      container.appendChild(card);
    });
  }

  async function init() {
    const links = await fetchLinks();
    displayLinks(links);
  }

  window.init = init; // كشف الدالة لاستخدامها خارج الملف أيضًا
  init();

});
