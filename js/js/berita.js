document.addEventListener('DOMContentLoaded', () => {
    // GANTI DENGAN KUNCI API ANDA DARI CONTENTFUL
    const SPACE_ID = 'YOUR_SPACE_ID';
    const ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN';

    const newsContainer = document.getElementById('news-container');
    const spinner = document.querySelector('.loading-spinner');

    // URL API untuk mengambil entri dengan tipe konten 'berita'
    const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=berita&order=-sys.createdAt`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Hilangkan spinner setelah data diterima
            if (spinner) {
                spinner.style.display = 'none';
            }

            // Buat map untuk aset (gambar) agar mudah diakses
            const assets = new Map(data.includes.Asset.map(asset => [asset.sys.id, asset.fields]));
            
            // Tampilkan setiap berita
            data.items.forEach(item => {
                const fields = item.fields;
                const imageUrl = assets.get(fields.gambar.sys.id).file.url;
                
                const newsCard = document.createElement('div');
                newsCard.classList.add('news-card');
                
                newsCard.innerHTML = `
                    <img src="https:${imageUrl}" alt="${fields.judul}">
                    <div class="news-card-content">
                        <h3>${fields.judul}</h3>
                        <p>${fields.isiBerita}</p>
                        <span class="news-date">${new Date(item.sys.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                `;
                
                newsContainer.appendChild(newsCard);
            });
        })
        .catch(error => {
            console.error('Error fetching news:', error);
            if (spinner) {
                spinner.style.display = 'none';
            }
            newsContainer.innerHTML = '<p>Gagal memuat berita. Silakan coba lagi nanti.</p>';
        });
});