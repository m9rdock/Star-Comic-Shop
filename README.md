# Star Comics — E-Commerce Website

A modern, responsive e-commerce web application for **Star Comics**, an online comic book bookstore specializing in graphic novels and trade paperbacks (TPBs).

---

## 📁 Required Folder Structure

This project follows the clean, standard directory structure required for Visual Studio Code and web development:

```text
comics/
├── index.html          # Main HTML entry point
├── IMG/                # All original images (hero banner & 12 comic covers)
│   ├── hero banner.jpg
│   ├── absolute batman.jpg
│   ├── absolute superman.jpg
│   ├── absolute wonder woman.jpg
│   ├── absolute green arrow.jpg
│   ├── batman.jpg
│   ├── daredevil.jpg
│   ├── green arrow.jpg
│   ├── hawkeye.jpg
│   ├── zatanna.jpg
│   ├── superman birthright.jpg
│   ├── two face.jpg
│   └── exquisite corpses.jpg
├── styles/             # Modular CSS stylesheets
│   ├── variables.css   # Color palette, Poppins font, spacing, & shadows
│   ├── base.css        # CSS reset, typography, and layout foundations
│   ├── components.css  # Header, Hero, Best Sellers, Carousel, Cart, & Footer
│   └── responsive.css  # Tablet & mobile responsive breakpoints
├── js/                 # Modular, dependency-free JavaScript
│   ├── data.js         # Product and recommendation catalog
│   ├── cart.js         # Cart state manager with localStorage persistence
│   ├── toast.js        # Feedback toast notifications
│   ├── app.js          # Main application bootstrapper
│   └── components/     # Component UI controllers
│       ├── header.js
│       ├── hero.js
│       ├── bestSellers.js
│       ├── recommendations.js
│       ├── cartDrawer.js
│       └── footer.js
└── .vscode/            # Visual Studio Code configuration files
    ├── settings.json   # Live Server extension configuration
    ├── launch.json     # F5 Debug launcher for Chrome and Edge
    └── extensions.json # Recommended extensions (Live Server)
```

---

## 🚀 How to Open and Run in Visual Studio Code

### Method 1: Using Live Server (Recommended)
1. Open Visual Studio Code.
2. Select **File > Open Folder...** and choose the `comics` folder (`c:\Users\anyap\Downloads\comics`).
3. If you have the **Live Server** extension installed:
   - Right-click on `index.html` in the file explorer and click **"Open with Live Server"**.
   - Or click the **"Go Live"** button in the blue status bar at the bottom right.
4. Your browser will automatically open to `http://127.0.0.1:5500` with live reload enabled!

### Method 2: Pressing F5 in VS Code
1. Open the project folder in Visual Studio Code.
2. Press **`F5`** (or **`Ctrl + F5`**).
3. Select **"Open in Chrome"** or **"Open in Edge"** (configured in `.vscode/launch.json`).

### Method 3: Direct File Opening
- You can directly double-click `index.html` or right-click `index.html` and choose **Open with > Google Chrome** / **Microsoft Edge**.
- Everything runs seamlessly with zero external build tools or installations needed.

### Method 4: Using `start.bat` or `node server.js`
- Double-click `start.bat` in the project folder to start the built-in local server on port 3000 (`http://localhost:3000`).

---

## 🎨 Brand Identity & Features

### 1. Color Palette
- **White (`#FFFFFF`):** Primary background and clean negative space.
- **Mustard Yellow (`#D6A62E`):** Primary accent for CTA buttons, badge counters, and highlights.
- **Pastel Pink (`#F6DDE5`):** Secondary accent for subtle backgrounds, hover states, and details.
- **Soft Blue (`#A9C7E8`):** Complementary accent for secondary tags, links, and buttons.
- **Dark Charcoal (`#292929`):** High-contrast primary text color for optimal readability.

### 2. Typography
- **Poppins** loaded via Google Fonts across the entire website:
  - **Poppins Bold (700):** Headings, section titles, and action buttons.
  - **Poppins Regular (400):** Body text, editions, and prices.
  - **Poppins Italic (400 italic):** Subtitles and editorial details.

### 3. Sticky Navigation Bar
- Stays fixed at the top while scrolling with a clean shadow elevation effect.
- Brand logo: **Star Comics** with a mustard yellow star accent.
- Navigation links in exact order:
  1. **Home** (scrolls to hero banner)
  2. **Best Sellers** (scrolls to Best Sellers section)
  3. **Recommendations** (scrolls to Recommendations section)
  4. **Shopping Cart Icon** (opens cart drawer with real-time live badge counter)

### 4. Hero Banner
- Features the supplied background image (`IMG/hero banner.jpg`) with a subtle dark overlay.
- Heading: **"Looking for Comics?"**
- Subtitle: **"You came to the right place."**
- CTA Button: **"Start Shopping"** (smoothly scrolls to the Recommendations section).

### 5. Best Sellers Section
- Responsive 3-column desktop grid (2 columns on tablet, 1 column on mobile).
- Exactly 6 trade paperback products with consistent aspect ratio:
  1. **Absolute Batman** — Volume 1, *The Zoo*, Issues #1–6, $15.00
  2. **Absolute Superman** — Volume 1, *Last Dust of Krypton.*, Issues #1–6., $15.00
  3. **Absolute Wonder Woman** — Volume 1, *The Last Amazon.*, Issues #1–6., $15.00
  4. **Absolute Green Arrow** — Volume 1, *The Longbow Killer.*, Issues #1–6., $15.00
  5. **Batman** — Volume 1., *Daylight.*, Issues #1–6, $15.00
  6. **Daredevil** — Volume 1., *Tomorrow's Devil.*, Issues #1–6, $15.00
- Each product card contains: Cover image, title, edition/subtitle, issues collected, price ($15.00), and an interactive **Add to Cart** button.

### 6. Recommendations Carousel
- Displays exactly 6 covers in a horizontal, scrollable carousel:
  1. Green Arrow
  2. Hawkeye
  3. Zatanna
  4. Superman: Birthright
  5. Two-Face
  6. Exquisite Corpses
- **Strictly covers only:** No titles, prices, descriptions, or buttons.
- Includes smooth scrolling, left/right arrow buttons, and touch gesture swipe support for mobile.

### 7. Functional Shopping Cart
- Slide-out side drawer with backdrop overlay and smooth animations.
- Accessible keyboard support (press `Escape` to close).
- Thumbnail, title, volume, unit price, quantity controls (`−` / `+`), and line-item subtotal for each item.
- Overall item counter and overall subtotal calculated automatically.
- Empty state with **"Your cart is empty."** and a **"Continue Shopping"** button.
- Labeled **"Checkout (Demo)"** button with an accessible modal explaining demonstration status.
- **localStorage persistence:** Cart contents and quantities are preserved across browser refreshes.
- Confirmation toast notification appears when adding an item to the cart without interrupting browsing.

### 8. Footer
- Minimal, clean layout with **Star Comics**, tagline *"Your next favorite story starts here."*, and a dynamic copyright year.
