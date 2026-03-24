import React, { useState } from 'react';
import { CartProvider, useCart } from './CartContext';
import './App.css';

// প্রোডাক্ট ডাটাবেস - এখানে আপনার ফোল্ডারের ছবির পাথ দেওয়া হয়েছে
const products = [
  { id: 1, name: "Premium Headphone", price: 2500, img: "/images/headphone.jpg", tag: "Electronics", featured: true, recommended: false },
  { id: 2, name: "Smart Watch v2", price: 4500, img: "/images/watch.jpg", tag: "Gadget", featured: true, recommended: true },
  { id: 3, name: "Mechanical Keyboard", price: 3200, img: "/images/keyboard.jpg", tag: "PC", featured: false, recommended: true },
  { id: 4, name: "Gaming Mouse", price: 1500, img: "/images/mouse.jpg", tag: "PC", featured: false, recommended: false },
  { id: 5, name: "Wireless Earbuds", price: 2200, img: "/images/earbuds.jpg", tag: "Electronics", featured: true, recommended: false },
  { id: 6, name: "Power Bank 20k", price: 1800, img: "/images/powerbank.jpg", tag: "Gadget", featured: false, recommended: true },
];

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // ফিল্টারিং লজিক
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.tag === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredProducts = products.filter(p => p.featured);
  const recommendedProducts = products.filter(p => p.recommended);

  return (
    <CartProvider>
      <div className="ecom-app">
        {/* Navbar Section */}
        <Navbar toggleCart={() => setIsCartOpen(true)} />

        {/* Hero Section */}
        <header id="home" className="hero-gradient">
          <div className="hero-content">
            <span className="badge">New Tech Arrival 2026</span>
            <h1>The Best Gear for <span className="text-highlight">Professionals</span></h1>
            <p>Handpicked premium gadgets curated by <b>Md Hosen Bakaul</b></p>
            <div className="hero-btns">
              <a href="#shop" className="btn-primary">Start Shopping</a>
              <a href="#featured" className="btn-outline">See Featured</a>
            </div>
          </div>
        </header>

        {/* Featured Section */}
        <section id="featured" className="section featured-bg">
          <h2 className="section-title">🔥 Featured Items</h2>
          <div className="product-grid">
            {featuredProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

        {/* Shop Section with Colorful Filters */}
        <section id="shop" className="section shop-bg">
          <h2 className="section-title">🛍️ Explore All Products</h2>
          
          <div className="filter-wrapper">
            <div className="search-container">
              <input 
                type="text" 
                className="modern-search"
                placeholder="Search products by name..." 
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="search-icon">🔍</span>
            </div>
            
            <div className="category-tabs">
              {['All', 'Electronics', 'Gadget', 'PC'].map(cat => (
                <button 
                  key={cat} 
                  className={`tab-btn ${cat.toLowerCase()} ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="product-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(p => <ProductCard key={p.id} product={p} />)
            ) : (
              <div className="no-result">No products found matching your search.</div>
            )}
          </div>
        </section>

        {/* Recommended Section */}
        <section id="recommended" className="section recommended-bg">
          <h2 className="section-title">⭐ Recommended For You</h2>
          <div className="product-grid">
            {recommendedProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
         {/* About Section */}
  <section id="about" className="about-modern-section">
  <div className="about-container">
    <div className="about-header">
      <span className="mini-title">WHO WE ARE</span>
      <h2>About <span>Hosen  Store</span></h2>
      <div className="title-line"></div>
    </div>
    
    <div className="about-content">
      <p>
        Founded by <b>Md Hosen Bakaul</b>, we are committed to bringing you the most 
        authentic and high-quality gadgets. Quality and customer satisfaction 
        are our top priorities in this modern era of technology.
      </p>
    </div>

    <div className="stats-grid">
      <div className="stat-card">
        <h3>10k+</h3>
        <p>Happy Customers</p>
      </div>
      <div className="stat-card">
        <h3>500+</h3>
        <p>Premium Items</p>
      </div>
      <div className="stat-card">
        <h3>24/7</h3>
        <p>Expert Support</p>
      </div>
    </div>
  </div>
</section>

        {/* Cart Window */}
        <CartModal isOpen={isCartOpen} closeCart={() => setIsCartOpen(false)} />
        
        {/* Premium Footer */}
        <footer className="footer-premium">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="logo">HOSEN<span>STORE</span></div>
              <p>Your ultimate destination for the latest technology and premium gadgets in Bangladesh.</p>
            </div>
            <div className="footer-links">
              <h4>Explore</h4>
              <a href="#home">Home</a>
              <a href="#featured">Featured</a>
              <a href="#shop">Shop</a>
              <a href="#about">About Us</a>
            </div>
            <div className="footer-contact">
              <h4>Contact Info</h4>
              <p>📍 Dhaka, Bangladesh</p>
              <p>📧 hosen@store.com</p>
              <div className="social-icons">
                <span>FB</span> <span>IG</span> <span>TW</span> <span>LI</span>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 Developed by <b>Md Hosen Bakaul</b> | Premium E-commerce UI</p>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
}

// --- Sub-Components ---

function Navbar({ toggleCart }) {
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="glass-nav">
      <div className="nav-container">
        <div className="logo">HOSEN<span>STORE</span></div>
        
        <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? '✕' : '☰'}
        </div>

        <ul className={`nav-links ${isMenuOpen ? 'mobile-active' : ''}`}>
          <li><a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a></li>
          <li><a href="#featured" onClick={() => setIsMenuOpen(false)}>Featured</a></li>
          <li><a href="#shop" onClick={() => setIsMenuOpen(false)}>Shop</a></li>
          <li><a href="#about" onClick={() => setIsMenuOpen(false)}>About</a></li>
        </ul>

        <div className="nav-right">
          <button className="cart-pill" onClick={toggleCart}>
             <span>🛒</span> <span className="count">{cart.length}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const isWishlisted = wishlist.find(item => item.id === product.id);

  return (
    <div className="modern-card">
      <button 
        className={`wish-icon ${isWishlisted ? 'active' : ''}`} 
        onClick={() => toggleWishlist(product)}
      >
        {isWishlisted ? '❤️' : '🤍'}
      </button>
      <div className="card-image-box">
        <img src={product.img} alt={product.name} className="real-img" />
      </div>
      <div className="card-details">
        <span className={`tag-badge ${product.tag.toLowerCase()}`}>{product.tag}</span>
        <h3>{product.name}</h3>
        <div className="card-footer">
          <span className="price">{product.price}৳</span>
          <button className="add-cart-btn" onClick={() => addToCart(product)}>Add +</button>
        </div>
      </div>
    </div>
  );
}

function CartModal({ isOpen, closeCart }) {
  const { cart, removeFromCart, totalPrice } = useCart();

  return (
    <div className={`cart-overlay ${isOpen ? 'active' : ''}`} onClick={closeCart}>
      <div className={`cart-slide-panel ${isOpen ? 'open' : ''}`} onClick={e => e.stopPropagation()}>
        
        {/* Cart Header */}
        <div className="cart-panel-header">
          <h3>Shopping Bag <span>({cart.length})</span></h3>
          <button className="panel-close-btn" onClick={closeCart}>✕</button>
        </div>

        {/* Cart Items List */}
        <div className="cart-panel-body">
          {cart.length === 0 ? (
            <div className="empty-cart-state">
               <span className="empty-icon">🛒</span>
               <p>Your bag is empty!</p>
               <button className="shop-now-btn" onClick={closeCart}>Shop Now</button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.cartId} className="modern-cart-item">
                <div className="item-img-container">
                   <img src={item.img} alt={item.name} />
                </div>
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p className="item-price">{item.price}৳</p>
                </div>
                <button className="delete-item-btn" onClick={() => removeFromCart(item.cartId)}>
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer */}
        {cart.length > 0 && (
          <div className="cart-panel-footer">
            <div className="total-summary">
               <span>Total Amount</span>
               <span className="total-price">{totalPrice}৳</span>
            </div>
            <button className="checkout-now-btn">Proceed to Checkout</button>
            <p className="shipping-info">Free shipping on all orders above 5000৳</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;