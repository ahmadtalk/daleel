// getLinks.js

const supabaseUrl = 'https://wbkvftjmtnihcavfwikg.supabase.co'; // ضع رابط مشروعك من Supabase
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6India3ZmdGptdG5paGNhdmZ3aWtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MDIyMTIsImV4cCI6MjA1OTQ3ODIxMn0.8ExDJ3Y4nzufeDMuRl82VWPK_3LI14qj5-6qitiCJq0'; // ضع هنا مفتاح anon key الخاص بك
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function fetchLinks() {
    try {
        document.getElementById('loading').classList.remove('d-none');

        const { data, error } = await supabase
            .from('dalillinks')
            .select('*')
            .order('id', { ascending: false });

        if (error) {
            console.error('خطأ في جلب البيانات:', error.message);
            return [];
        }

        return data;
    } catch (err) {
        console.error('خطأ عام أثناء جلب الروابط:', err);
        return [];
    } finally {
        document.getElementById('loading').classList.add('d-none');
    }
}

// وظيفة عرض الروابط
async function init() {
    const links = await fetchLinks();
    displayLinks(links);
}

function displayLinks(links) {
    const container = document.getElementById('links-container');
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

document.addEventListener('DOMContentLoaded', init);
