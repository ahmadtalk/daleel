document.addEventListener('DOMContentLoaded', () => {
  const linkForm = document.getElementById('linkForm');

  linkForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newLink = {
        name: document.getElementById('newName').value.trim(),
        url: document.getElementById('newUrl').value.trim(),
        description: document.getElementById('newDescription').value.trim(),
        category: document.getElementById('newCategory').value
    };

    try {
        const { data, error } = await supabase
            .from('dalillinks')
            .insert([newLink]);

        if (error) {
            console.error('خطأ أثناء الإضافة:', error.message);
            alert('حدث خطأ أثناء إضافة الرابط. حاول مرة أخرى.');
            return;
        }

        console.log('تمت الإضافة بنجاح:', data);
        await init(); // إعادة تحميل الروابط بعد الإضافة
        bootstrap.Modal.getInstance(document.getElementById('addLinkModal')).hide();
        linkForm.reset();

    } catch (err) {
        console.error('خطأ غير متوقع:', err);
        alert('حدث خطأ غير متوقع. يرجى المحاولة لاحقًا.');
    }
  });
});
