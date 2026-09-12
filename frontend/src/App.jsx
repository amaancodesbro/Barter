import "./App.css";

function App() {
  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">
          BARTER<span>™</span>
        </div>

        <div className="nav-links">
          <a href="#">[ HOME ]</a>
          <a href="#">[ BROWSE ]</a>
          <a href="#">[ HOW IT WORKS ]</a>
          <a href="#">[ ABOUT ]</a>
        </div>

        <div className="nav-actions">
          <div className="search-box">
            🔍 SEARCH ITEMS...
          </div>

          <a href="#">[ LOGIN ]</a>
          <button>[ REGISTER ]</button>
        </div>
      </nav>


      {/* HERO */}
      <section className="hero">
        <div className="voxel voxel-1"></div>
        <div className="voxel voxel-2"></div>
        <div className="voxel voxel-3"></div>
        <div className="voxel voxel-4"></div>
        <div className="voxel voxel-5"></div>

        <div className="hero-text">
          <p className="small-text">
            NO MONEY.<br />
            JUST VALUE.
          </p>

          <h1>
            BARTER<br />
            TRADE<br />
            DIFFERENTLY.
          </h1>

          <p className="hero-description">
            REAL PEOPLE.<br />
            REAL ITEMS.<br />
            A MORE INTERESTING WORLD.
          </p>

          <button className="browse-button">
            [ BROWSE ITEMS → ]
          </button>
        </div>


        {/* 3D HERO BOX */}
        <div className="hero-box">
          <div className="crate-side"></div>
          <div className="crate-bottom"></div>
          <div className="crate-bolt bolt-1"></div>
          <div className="crate-bolt bolt-2"></div>
          <div className="crate-bolt bolt-3"></div>
          <div className="crate-bolt bolt-4"></div>

          <div className="box-label">
            SNEAKERS
          </div>
          

          <div className="product-image">
            <img src="/assets/hero-sneaker.png" alt="Sneakers" />
           </div>

          <div className="condition-tag">
            USED<br />
            .GOOD COND.
          </div>

          <div className="box-bottom">
            <span>◉ SWAP?</span>
            <span>BARTER™</span>
          </div>

        </div>

      </section>


      {/* FEATURED ITEMS */}
      <section className="products-section">

        <div className="section-title">
          <h2>FEATURED ITEMS</h2>
          <div></div>
          <span>[ VIEW ALL → ]</span>
        </div>

        <div className="product-grid">

          <div className="product-card">
            <div className="product-name">IPHONE 15</div>
           <div className="product-placeholder">
             <img src="/iphone15.png" alt="iPhone 15" />
           </div>
            <div className="tag like-new">LIKE NEW</div>
            <div className="card-bottom">BARTER™</div>
            <p>TECH</p>
          </div>

          <div className="product-card">
            <div className="product-name">PS5</div>
            <div className="product-placeholder">🎮</div>
            <div className="tag good">GOOD COND.</div>
            <div className="card-bottom">BARTER™</div>
            <p>GAMING</p>
          </div>

          <div className="product-card">
            <div className="product-name">NIKE DUNKS</div>
            <div className="product-placeholder">👟</div>
            <div className="tag used">USED</div>
            <div className="card-bottom">BARTER™</div>
            <p>FASHION</p>
          </div>

          <div className="product-card">
            <div className="product-name">MACBOOK AIR</div>
            <div className="product-placeholder">💻</div>
            <div className="tag good">GOOD COND.</div>
            <div className="card-bottom">BARTER™</div>
            <p>TECH</p>
          </div>

          <div className="product-card">
            <div className="product-name">GUITAR</div>
            <div className="product-placeholder">🎸</div>
            <div className="tag used">USED</div>
            <div className="card-bottom">BARTER™</div>
            <p>MUSIC</p>
          </div>

          <div className="product-card">
            <div className="product-name">DYSON AIRWRAP</div>
            <div className="product-placeholder">💄</div>
            <div className="tag like-new">LIKE NEW</div>
            <div className="card-bottom">BARTER™</div>
            <p>BEAUTY</p>
          </div>

        </div>

      </section>


      {/* SUGGESTED */}
      <section className="products-section">

        <div className="section-title">
          <h2>SUGGESTED FOR YOU</h2>
          <div></div>
          <span>[ VIEW ALL → ]</span>
        </div>

        <div className="product-grid">

          <div className="product-card">
            <div className="product-name">LEGO SET</div>
            <div className="product-placeholder">🚀</div>
            <div className="tag used">USED</div>
            <div className="card-bottom">BARTER™</div>
            <p>COLLECTIBLES</p>
          </div>

          <div className="product-card">
            <div className="product-name">FUJIFILM CAMERA</div>
            <div className="product-placeholder">📷</div>
            <div className="tag good">GOOD COND.</div>
            <div className="card-bottom">BARTER™</div>
            <p>PHOTOGRAPHY</p>
          </div>

          <div className="product-card">
            <div className="product-name">HOODIE</div>
            <div className="product-placeholder">👕</div>
            <div className="tag like-new">LIKE NEW</div>
            <div className="card-bottom">BARTER™</div>
            <p>FASHION</p>
          </div>

          <div className="product-card">
            <div className="product-name">MECHANICAL KB</div>
            <div className="product-placeholder">⌨️</div>
            <div className="tag used">USED</div>
            <div className="card-bottom">BARTER™</div>
            <p>TECH</p>
          </div>

          <div className="product-card">
            <div className="product-name">SKATEBOARD</div>
            <div className="product-placeholder">🛹</div>
            <div className="tag good">GOOD COND.</div>
            <div className="card-bottom">BARTER™</div>
            <p>SPORTS</p>
          </div>

          <div className="product-card">
            <div className="product-name">WATCH</div>
            <div className="product-placeholder">⌚</div>
            <div className="tag like-new">LIKE NEW</div>
            <div className="card-bottom">BARTER™</div>
            <p>ACCESSORIES</p>
          </div>

        </div>

      </section>


      {/* FOOTER */}
      <footer>
        <div>
          ◉ &nbsp; A COMMUNITY MARKETPLACE FOR A MORE INTERESTING TOMORROW.
        </div>

        <div>
          PRIVACY &nbsp;&nbsp;&nbsp; TERMS &nbsp;&nbsp;&nbsp; CONTACT
        </div>
      </footer>

    </div>
  );
}

export default App;