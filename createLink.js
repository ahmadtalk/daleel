// createLink.js

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
