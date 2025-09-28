document.addEventListener('DOMContentLoaded', () => {
    let cart = [];

    const cartSection = document.querySelector('#keranjang');
    const checkoutSection = document.querySelector('#checkout');
    const cartItemsContainers = document.querySelectorAll('.cart-items');
    const cartTotals = document.querySelectorAll('.cart-total');
    const addToCartButtons = document.querySelectorAll('.btn-primary:not(#confirm-button)'); // Kecualikan tombol konfirmasi
    const navLinks = document.querySelectorAll('nav a');
    const darkModeToggle = document.createElement('button');
    const header = document.querySelector('header');
    const checkoutForm = document.querySelector('#checkout-form');
    const confirmButton = document.querySelector('#confirm-button');

    darkModeToggle.textContent = 'Toggle Dark Mode';
    darkModeToggle.className = 'btn btn-secondary';
    header.querySelector('.header-content').appendChild(darkModeToggle);

    console.log('Checkout form:', checkoutForm);
    console.log('Confirm button:', confirmButton);

    function updateCartDisplay() {
        if (cart.length === 0) {
            cartItemsContainers.forEach(container => {
                container.innerHTML = 'Keranjang kosong';
            });
            cartTotals.forEach(total => {
                total.innerHTML = 'Total: Rp 0';
            });
        } else {
            const itemsHtml = cart.map(item => `Produk: <strong>${item.name}</strong>`).join(', ');
            const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
            cartItemsContainers.forEach(container => {
                container.innerHTML = itemsHtml;
            });
            cartTotals.forEach(total => {
                total.innerHTML = `Total: <strong>Rp ${totalPrice.toLocaleString('id-ID')}</strong>`;
            });
        }
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productCard = e.target.closest('.product-card');
            const productName = productCard.querySelector('.product-title').textContent;
            const productPriceText = productCard.querySelector('.product-price').textContent;
            const productPrice = parseInt(productPriceText.replace(/Rp\s|\./g, ''));

            cart.push({ name: productName, price: productPrice });
            updateCartDisplay();
            alert(`${productName} telah ditambahkan ke keranjang!`);
            cartSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            document.body.style.backgroundColor = '#1a1a1a';
            document.body.style.color = '#ffffff';
            document.querySelectorAll('.product-card').forEach(card => {
                card.style.backgroundColor = '#2c2c2c';
            });
            document.querySelectorAll('.product-title').forEach(title => {
                title.style.color = '#ffffff';
            });
            document.querySelector('#about').style.backgroundColor = '#1a252f';
            document.querySelector('footer').style.backgroundColor = '#1a252f';
            document.querySelectorAll('.contact-item').forEach(item => {
                item.style.backgroundColor = '#1a6da9';
            });
        } else {
            document.body.style.backgroundColor = '#fafafa';
            document.body.style.color = '#333';
            document.querySelectorAll('.product-card').forEach(card => {
                card.style.backgroundColor = 'white';
            });
            document.querySelectorAll('.product-title').forEach(title => {
                title.style.color = '#2c3e50';
            });
            document.querySelector('#about').style.backgroundColor = '#2c3e50';
            document.querySelector('footer').style.backgroundColor = '#2c3e50';
            document.querySelectorAll('.contact-item').forEach(item => {
                item.style.backgroundColor = '#3498db';
            });
        }
    });

    function handleCheckout() {
        const name = checkoutForm.querySelector('#nama').value;
        const email = checkoutForm.querySelector('#email').value;
        const address = checkoutForm.querySelector('#alamat').value;
        const paymentMethod = checkoutForm.querySelector('input[name="pembayaran"]:checked');

        if (name && email && address && paymentMethod) {
            const totalText = cartTotals[1].querySelector('strong') ? cartTotals[1].querySelector('strong').textContent : 'Rp 0';
            alert(`Pesanan atas nama ${name} telah dikonfirmasi!\nMetode Pembayaran: ${paymentMethod.value}\nTotal: ${totalText}`);
            cart = [];
            updateCartDisplay();
            checkoutForm.reset();
        } else {
            alert('Harap lengkapi semua field!');
        }
    }

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Form submitted');
            handleCheckout();
        });
    } else {
        console.error('Checkout form not found');
    }

    if (confirmButton) {
        confirmButton.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Confirm button clicked');
            handleCheckout();
        });
    } else {
        console.error('Confirm button not found');
    }
});