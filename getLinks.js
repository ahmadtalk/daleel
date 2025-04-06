// getLinks.js - نسخة محدثة لتصميم الكروت الجديدة

document.addEventListener('DOMContentLoaded', () => {
  init();
});

async function init() {
  await fetchLinks();
}

async function fetchLinks() {
  try {
    const loading = document.getElementById('loading');
    if (loading) loading.style.display = 'block';

    const { data, error } = await supabase
      .from('dalillinks')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.error('خطأ أثناء جلب البيانات:', error.message);
      return;
    }

    displayLinks(data);

  } catch (err) {
    console.error('خطأ عام أثناء جلب البيانات:', err);
  } finally {
    const loading = document.getElementById('loading');
    if (loading) loading.style.display = 'none';
  }
}

function displayLinks(links) {
  const container = document.getElementById('links-container');
  container.innerHTML = '';

  if (!links || links.length === 0) {
    container.innerHTML = '<p class="text-center">لا توجد روابط مضافة بعد.</p>';
    return;
  }

  links.forEach(link => {
    const card = document.createElement('div');
    card.className = 'link-card';

    const header = document.createElement('div');
    header.className = 'link-header';

    const favicon = document.createElement('img');
    try {
      const url = new URL(link.url);
      favicon.src = `https://www.google.com/s2/favicons?domain=${url.hostname}`;
    } catch (e) {
      favicon.src = '/favicon.ico';
    }
    favicon.alt = 'أيقونة';

    const title = document.createElement('a');
    title.href = link.url;
    title.target = '_blank';
    title.rel = 'noopener';
    title.className = 'link-title';
    title.textContent = link.name || 'اسم غير متوفر';

    const category = document.createElement('div');
    category.className = 'link-category';
    category.textContent = link.category || 'بدون تصنيف';

    header.appendChild(favicon);
    header.appendChild(title);
    header.appendChild(category);

    card.appendChild(header);

    if (link.description) {
      const description = document.createElement('p');
      description.className = 'link-description';
      description.textContent = link.description;
      card.appendChild(description);
    }

    container.appendChild(card);
  });
}
