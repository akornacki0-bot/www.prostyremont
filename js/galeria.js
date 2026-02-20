// /js/galeria.js

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.gallery-item');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // 1. Usuń klasę 'active' ze wszystkich przycisków
            buttons.forEach(btn => btn.classList.remove('active'));
            // 2. Dodaj 'active' do klikniętego przycisku
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            // 3. Filtrowanie elementów
            items.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    // Mała animacja pojawiania się
                    item.style.opacity = '0';
                    setTimeout(() => { item.style.opacity = '1'; }, 10);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});
