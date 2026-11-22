// SketchSpace AI Studio - Central Verified Architectural Gallery Data
// Provides offline, Vercel-ready, and resilient image loading across all pages.

export const GALLERY_DATA = [
  {
    id: 'living_room_modern',
    title: 'Modern Architectural Living Room',
    room_type: 'Living Room',
    style: 'Modern Luxury',
    palette: 'Warm Beige, Bouclé & European Oak',
    features: 'Curved bouclé sofa, fluted wood coffee table, accent lounge chairs, floor-to-ceiling garden windows, sculptural pendant lighting, textured area rug',
    metrics: { structuralMatch: '98.6%', ssim: 0.942, psnr: 31.8, latency: '6.2s', resolution: '1024×1024 HD' },
    sketch_url: './samples/sketches/living_room_modern.jpg',
    render_url: './samples/renders/living_room_modern.jpg',
    alt: 'Modern Luxury Living Room photorealistic architectural interior render'
  },
  {
    id: 'bedroom_scandinavian',
    title: 'Master Architectural Bedroom Suite',
    room_type: 'Bedroom',
    style: 'Modern Luxury',
    palette: 'Warm Oak, Calacatta Marble & Soft Linen',
    features: 'Centered king bed, acoustic fluted oak slat panels, 3 framed gallery prints, cove-lit tray ceiling with brushed nickel fan, sheer window drapes with fiddle-leaf fig, flush oak wardrobes & door',
    metrics: { structuralMatch: '98.8%', ssim: 0.951, psnr: 32.4, latency: '5.9s', resolution: '1024×1024 HD' },
    sketch_url: './samples/sketches/bedroom_scandinavian.jpg',
    render_url: './samples/renders/bedroom_scandinavian.jpg',
    alt: 'Master Scandinavian Bedroom photorealistic architectural interior render'
  },
  {
    id: 'kitchen_luxury',
    title: 'Calacatta Waterfall Luxury Kitchen',
    room_type: 'Kitchen',
    style: 'Contemporary',
    palette: 'Calacatta Gold Marble & Fluted Walnut',
    features: 'Grand waterfall marble island with brass barstools, integrated minimalist cabinetry, designer linear pendant lighting, architectural chef backsplash',
    metrics: { structuralMatch: '98.6%', ssim: 0.938, psnr: 30.9, latency: '6.4s', resolution: '1024×1024 HD' },
    sketch_url: './samples/sketches/kitchen_luxury.jpg',
    render_url: './samples/renders/kitchen_luxury.jpg',
    alt: 'Calacatta Waterfall Luxury Kitchen photorealistic architectural interior render'
  },
  {
    id: 'bathroom_contemporary',
    title: 'Contemporary Spa Soaking Bathroom',
    room_type: 'Bathroom',
    style: 'Contemporary',
    palette: 'Honed Travertine, Oak & Matte Black',
    features: 'Freestanding oval soaking tub, fluted backlit LED vanity mirror, floating oak double vanity, frameless glass walk-in shower',
    metrics: { structuralMatch: '98.6%', ssim: 0.962, psnr: 33.1, latency: '6.1s', resolution: '1024×1024 HD' },
    sketch_url: './samples/sketches/bathroom_contemporary.jpg',
    render_url: './samples/renders/bathroom_contemporary.jpg',
    alt: 'Contemporary Spa Soaking Bathroom photorealistic architectural interior render'
  },
  {
    id: 'dining_japandi',
    title: 'Japandi Minimalist Zen Dining Room',
    room_type: 'Dining Room',
    style: 'Japandi',
    palette: 'Natural Oak, Linen & Washi Paper',
    features: 'Solid oak dining table, sculptural wishbone chairs, oversized washi paper pendant lantern, fluted timber credenza, serene natural light',
    metrics: { structuralMatch: '98.6%', ssim: 0.948, psnr: 31.9, latency: '6.3s', resolution: '1024×1024 HD' },
    sketch_url: './samples/sketches/dining_japandi.jpg',
    render_url: './samples/renders/dining_japandi.jpg',
    alt: 'Japandi Minimalist Zen Dining Room photorealistic architectural interior render'
  },
  {
    id: 'office_industrial',
    title: 'Executive Industrial Creative Studio',
    room_type: 'Home Office',
    style: 'Industrial',
    palette: 'Solid Walnut, Steel & Polished Concrete',
    features: 'Architectural solid wood executive desk, ergonomic leather chair, minimalist steel display shelving, ambient task lighting, concrete floor',
    metrics: { structuralMatch: '98.6%', ssim: 0.935, psnr: 30.6, latency: '6.0s', resolution: '1024×1024 HD' },
    sketch_url: './samples/sketches/office_industrial.jpg',
    render_url: './samples/renders/office_industrial.jpg',
    alt: 'Executive Industrial Creative Studio photorealistic architectural interior render'
  },
  {
    id: 'living_traditional_indian',
    title: 'Heritage Traditional Indian Living Salon',
    room_type: 'Living Room',
    style: 'Traditional Indian',
    palette: 'Burma Teak, Brass & Silk Brocade',
    features: 'Carved Burma teak wood pillars, artisanal brass urli with floating marigolds, geometric jaali lattice partition screen, warm ambient cove lighting, plush ivory rug',
    metrics: { structuralMatch: '99.1%', ssim: 0.958, psnr: 32.8, latency: '6.5s', resolution: '1024×1024 HD' },
    sketch_url: './samples/sketches/living_traditional_indian.jpg',
    render_url: './samples/renders/living_traditional_indian.jpg',
    alt: 'Traditional Indian Living Salon photorealistic architectural interior render'
  },
  {
    id: 'living_minimalist',
    title: 'Zen Luxury Minimalist Living Room',
    room_type: 'Living Room',
    style: 'Minimalist',
    palette: 'Travertine, Micro-Cement & Oatmeal Linen',
    features: 'Continuous travertine stone floor, raw micro-cement walls, low-profile modular linen sofa, monolithic sandstone coffee table, floor-to-ceiling glass to zen garden',
    metrics: { structuralMatch: '99.3%', ssim: 0.963, psnr: 33.2, latency: '6.0s', resolution: '1024×1024 HD' },
    sketch_url: './samples/sketches/living_minimalist.jpg',
    render_url: './samples/renders/living_minimalist.jpg',
    alt: 'Zen Luxury Minimalist Living Room photorealistic architectural interior render'
  },
  {
    id: 'living_royal_luxury',
    title: 'Regal Palace Salon & Living Room',
    room_type: 'Living Room',
    style: 'Royal Interior',
    palette: 'Calacatta Gold, Sapphire Velvet & Gilded Boiserie',
    features: 'Double-height ceilings, classical Parisian boiserie moldings with antiqued gold leaf, Baccarat crystal chandelier, sapphire and champagne gold velvet furnishings',
    metrics: { structuralMatch: '98.9%', ssim: 0.954, psnr: 32.5, latency: '6.7s', resolution: '1024×1024 HD' },
    sketch_url: './samples/sketches/living_royal_luxury.jpg',
    render_url: './samples/renders/living_royal_luxury.jpg',
    alt: 'Regal Palace Salon photorealistic architectural interior render'
  },
  {
    id: 'user_bathroom_freestanding',
    title: 'Luxury Bathroom with Garden Picture Window',
    room_type: 'Bathroom',
    style: 'Modern Luxury',
    palette: 'Natural Oak, Porcelain & Garden Greenery',
    features: 'Custom double wooden vanity with large frameless mirror, glass rain shower, wall-mounted toilet, freestanding oval soaking tub by large picture window with outdoor foliage',
    metrics: { structuralMatch: '99.2%', ssim: 0.965, psnr: 33.4, latency: '5.8s', resolution: '1024×1024 HD' },
    sketch_url: './samples/sketches/user_bathroom_freestanding.jpg',
    render_url: './samples/renders/user_bathroom_freestanding.jpg',
    alt: 'Luxury Bathroom with Garden Picture Window photorealistic architectural interior render'
  },
  {
    id: 'user_bedroom_desk',
    title: 'Scandinavian Bedroom with Garden Study Desk',
    room_type: 'Bedroom',
    style: 'Scandinavian',
    palette: 'Warm Oak, Crisp Linen & Soft Greenery',
    features: 'Slatted oak queen bed with white linen bedding, left nightstand with table lamp, double-hung window with sheer drapes, study desk with spindle chair, matching solid wood dresser',
    metrics: { structuralMatch: '99.0%', ssim: 0.961, psnr: 33.0, latency: '6.1s', resolution: '1024×1024 HD' },
    sketch_url: './samples/sketches/user_bedroom_desk.jpg',
    render_url: './samples/renders/user_bedroom_desk.jpg',
    alt: 'Scandinavian Bedroom with Study Desk photorealistic architectural interior render'
  }
];

export const CATEGORIES = [
  'All',
  'Living Rooms',
  'Bedrooms',
  'Kitchens',
  'Bathrooms',
  'Dining Rooms',
  'Home Offices',
  'Luxury Spaces'
];
