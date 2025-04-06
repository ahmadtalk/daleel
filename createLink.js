// createLink.js

const supabaseUrl = 'https://wbkvftjmtnihcavfwikg.supabase.co'; // ضع هنا رابط مشروعك
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6India3ZmdGptdG5paGNhdmZ3aWtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MDIyMTIsImV4cCI6MjA1OTQ3ODIxMn0.8ExDJ3Y4nzufeDMuRl82VWPK_3LI14qj5-6qitiCJq0'; // ضع هنا مفتاح anon key الخاص بك
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

const linkForm = document.getElementById('linkForm');

linkForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newLink = {
        name: document.getElementById('newName').value.trim(),
        url: document.getElementById('newUrl').value.trim(),
        description: document.getElementById('newDescription').value.trim(),
        category: document.getElementById('newCategory').value
    };

    const { data, error } = await supabase
        .from('dalillinks')
        .insert([newLink]);

    if (error) {
        console.error('خطأ في إضافة الرابط:', error.message);
        alert('حدث خطأ أثناء إضافة الرابط. حاول مجددًا.');
    } else {
        console.log('تمت إضافة الرابط:', data);
        // تحديث العرض مباشرة بعد الإضافة
        await init();
        bootstrap.Modal.getInstance(document.getElementById('addLinkModal')).hide();
        linkForm.reset();
    }
});
