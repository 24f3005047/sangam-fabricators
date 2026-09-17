# Product Requirement Document (PRD)

## Project Title
**Sangam Fabricators (FibreCraft) — Business Website & Custom Enquiry Portal**

---

## 1. Project Overview & Background
* **Business Name**: Sangam Fabricators (also referred to as *FibreCraft*)
* **Location**: Lucknow, Uttar Pradesh, India
* **Core Business**: A specialized manufacturing workshop and factory that creates high-durability, weather-resistant, and premium aesthetic products using resin, fibre-reinforced plastic (FRP), and composite materials.
* **Core Value Proposition**:
  - **"Any Design, Any Scale"**: Capable of manufacturing anything if a customer shares an image, 3D concept, sketch, or physical reference.
  - **Unbeatable Pricing & Supreme Quality**: Highly competitive, budget-friendly ("cheapest rates") without compromising on finish, durability, structural strength, or aesthetic detail.
  - **Dual Fulfillment Scale**: Cater to both direct individual retail orders and high-volume wholesale/commercial orders (event planners, temples, institutions, commercial complexes).

---

## 2. Target Audience & Personas
1. **Event Planners, Tent House Owners & Decorators**:
   - Looking for eye-catching, reusable, lightweight, yet sturdy party entrance gates, pillars, wedding backdrops, and theme decor.
2. **Religious Institutions & Temple Trusts**:
   - Seeking detailed, durable, and weather-proof God statues (Murti/Idols), temple domes, relief artwork, and spiritual icons.
3. **Retail & Residential Clients**:
   - Ordering custom decorative panels, custom personal busts/portraits, garden sculptures, home decor fountains, or customized architectural elements.
4. **Wholesale Distributors & Commercial Contractors**:
   - Bulk purchasers looking for wholesale rates, reliable manufacturing turnaround times, and bulk dispatch across UP and across India.

---

## 3. Product & Service Spectrum
* **Party & Event Entrances / Gates**: Elaborate theme gates, wedding arches, decorative pillars, stage setups, floral relief structures.
* **God Statues & Religious Idols**: High-definition, hand-finished FRP statues of Hindu deities (e.g., Hanuman Ji, Shiva, Durga Mata, Ganesha, Buddha, etc.) in various sizes (from 2ft to 30ft+).
* **Custom & Made-to-Order Sculptures**: Any 3D figure, animal statues, modern abstract art, themed park figurines, or custom human portraits/busts made from photographs.
* **Architectural & Decorative Elements**: Relief wall murals, brackets, cornices, domes, planters, water fountains, and outdoor garden furniture.
* **Custom Reference Manufacturing**: Special service where customers provide a photo, Pinterest pin, or AutoCAD/3D model for exact custom fabrication.

---

## 4. Key Website Objectives
1. **Showcase Visual Portfolio & Finish**: Emphasize real, high-resolution photographs and videos of past factory work to establish credibility and demonstrate build quality.
2. **Lead Generation & Instant Quoting**: Quick pathways for prospective clients to upload/share their reference photos and get estimated costs via WhatsApp, phone, or direct enquiry forms.
3. **Establish Local & Regional Authority**: Highlight manufacturing capabilities based in Lucknow with shipping/delivery capabilities across Uttar Pradesh and nationwide.
4. **Transparent Business Terms**: Clearly highlight capacity for both **Retail** (single piece customized) and **Wholesale** (bulk event & distributor supply).

---

## 5. Website Architecture & Site Map

\```mermaid
flowchart TD
    Home[1. Home Page] --> Products[2. Products Catalog]
    Home --> CustomOrder[3. Custom Orders & References]
    Home --> Gallery[4. Gallery & Portfolio]
    Home --> Wholesale[5. Wholesale & Bulk Enquiries]
    Home --> About[6. About Us / Workshop Tour]
    Home --> Contact[7. Contact & Direct Quote]

    Products --> Statues[God Statues & Idols]
    Products --> Gates[Event Entrances & Gates]
    Products --> Murals[Portraits & 3D Sculptures]
    Products --> CustomFibre[Architectural Fibre Works]

    CustomOrder --> WhatsAppCTA[Direct WhatsApp Reference Upload]
    Contact --> QuickCall[Click-to-Call / Location Map]
\\\

### Page Breakdown & Key Features

| Page / Section | Key Purpose & Content Components |
| :--- | :--- |
| **Home** | Hero section with compelling tagline ("Custom Fibre & Resin Products at Factory-Direct Prices"), Highlight badges (Cheapest Rates, Premium Finish, Retail & Wholesale), Featured Products carousel, Client testimonials/completed sites, Direct "Send Reference on WhatsApp" CTA. |
| **Products & Catalog** | Categorized product listings with filter tags (*Religious*, *Events/Weddings*, *Sculptures*, *Architectural*). Each item includes dimensions, resin type, weather resistance details, and a "Request Price" button. |
| **Custom Order Workflow** | Simple 3-step explainer: **1. Share Reference/Photo** -> **2. Get Best Quote & Dimensions** -> **3. Factory Fabrication & Delivery**. |
| **Portfolio / Gallery** | High-quality visual gallery with before/after finishing images, workshop in-progress snapshots, and installed gate setups. |
| **Wholesale & Bulk Supply** | Tailored section for event managers and commercial contractors detailing bulk order discounts, delivery logistics, and repeat partner perks. |
| **About Us & Workshop** | Story of the Lucknow workshop, artisans' skills, materials used (grade-A resins, fibre mats, protective PU coats), durability against sun and rain. |
| **Contact & Location** | Full factory address in Lucknow, interactive Google Map, direct phone numbers, operational hours, and contact form with image attachment support. |

---

## 6. Functional & Technical Requirements

### 6.1 Functional Features
* **WhatsApp Integration**: Floating WhatsApp chat button pre-filled with messages like: *"Hi Sangam Fabricators, I have a custom reference image and need a price quote."*
* **Reference Upload / Enquiry Form**: Form fields: Name, Phone Number, City, Retail vs. Wholesale select, Project Description, and Image Upload attachment.
* **Click-to-Call & Location**: Sticky mobile-friendly call buttons for fast conversions.
* **Fast Image Optimization**: Lazy loading and modern formats (WebP) to maintain high-speed loading even with heavy photo galleries.

### 6.2 Non-Functional Requirements
* **Mobile-First Responsive Design**: Over 70% of potential event decorators and retail buyers browse via mobile.
* **SEO & Local Optimization**: Optimized for keywords like *"Fibre statues manufacturer Lucknow"*, *"Event entrance gate manufacturer UP"*, *"Custom resin statue maker"*, *"Wholesale FRP products Lucknow"*.
* **Speed & Performance**: Lightweight clean code, optimized assets, CDN caching.

---

## 7. Next Steps & Implementation Roadmap
1. **Brand & Asset Gathering**: Collect workshop photographs, catalogue pictures of past gates, statues, and client installations.
2. **UI/UX Wireframing**: Design clean, bold, and trust-inspiring layout templates.
3. **Frontend Development**: Implement responsive components, product galleries, and interactive contact triggers.
4. **Content & SEO Tuning**: Write engaging copy highlighting the best price guarantee, local presence in Lucknow, and contact numbers.
5. **Testing & Launch**: Test forms, mobile responsiveness, WhatsApp redirection, and deploy to production.