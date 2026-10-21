/**
 * Star Comics — Product & Recommendation Data Catalog
 * Contains product catalog data for Best Sellers and Recommendations sections.
 */

const BEST_SELLERS_DATA = [
  {
    id: 'bs-absolute-batman',
    title: 'Absolute Batman',
    edition: 'Volume 1',
    subtitle: 'The Zoo',
    issuesCollected: '#1–6',
    price: 15.00,
    image: 'IMG/absolute batman.jpg',
    alt: 'Absolute Batman Volume 1: The Zoo comic cover'
  },
  {
    id: 'bs-absolute-superman',
    title: 'Absolute Superman',
    edition: 'Volume 1',
    subtitle: 'Last Dust of Krypton.',
    issuesCollected: '#1–6.',
    price: 15.00,
    image: 'IMG/absolute superman.jpg',
    alt: 'Absolute Superman Volume 1: Last Dust of Krypton comic cover'
  },
  {
    id: 'bs-absolute-wonder-woman',
    title: 'Absolute Wonder Woman',
    edition: 'Volume 1',
    subtitle: 'The Last Amazon.',
    issuesCollected: '#1–6.',
    price: 15.00,
    image: 'IMG/absolute wonder woman.jpg',
    alt: 'Absolute Wonder Woman Volume 1: The Last Amazon comic cover'
  },
  {
    id: 'bs-absolute-green-arrow',
    title: 'Absolute Green Arrow',
    edition: 'Volume 1',
    subtitle: 'The Longbow Killer.',
    issuesCollected: '#1–6.',
    price: 15.00,
    image: 'IMG/absolute green arrow.jpg',
    alt: 'Absolute Green Arrow Volume 1: The Longbow Killer comic cover'
  },
  {
    id: 'bs-batman',
    title: 'Batman',
    edition: 'Volume 1.',
    subtitle: 'Daylight.',
    issuesCollected: '#1–6',
    price: 15.00,
    image: 'IMG/batman.jpg',
    alt: 'Batman Volume 1: Daylight comic cover'
  },
  {
    id: 'bs-daredevil',
    title: 'Daredevil',
    edition: 'Volume 1.',
    subtitle: "Tomorrow's Devil.",
    issuesCollected: '#1–6',
    price: 15.00,
    image: 'IMG/daredevil.jpg',
    alt: "Daredevil Volume 1: Tomorrow's Devil comic cover"
  }
];

const RECOMMENDATIONS_DATA = [
  {
    id: 'rec-green-arrow',
    title: 'Green Arrow',
    image: 'IMG/green arrow.jpg',
    alt: 'Green Arrow comic cover recommendation'
  },
  {
    id: 'rec-hawkeye',
    title: 'Hawkeye',
    image: 'IMG/hawkeye.jpg',
    alt: 'Hawkeye comic cover recommendation'
  },
  {
    id: 'rec-zatanna',
    title: 'Zatanna',
    image: 'IMG/zatanna.jpg',
    alt: 'Zatanna comic cover recommendation'
  },
  {
    id: 'rec-superman-birthright',
    title: 'Superman: Birthright',
    image: 'IMG/superman birthright.jpg',
    alt: 'Superman: Birthright comic cover recommendation'
  },
  {
    id: 'rec-two-face',
    title: 'Two-Face',
    image: 'IMG/two face.jpg',
    alt: 'Two-Face comic cover recommendation'
  },
  {
    id: 'rec-exquisite-corpses',
    title: 'Exquisite Corpses',
    image: 'IMG/exquisite corpses.jpg',
    alt: 'Exquisite Corpses comic cover recommendation'
  }
];

// Attach to window and global for universal browser & test compatibility
if (typeof window !== 'undefined') {
  window.STAR_DATA = {
    BEST_SELLERS_DATA,
    RECOMMENDATIONS_DATA
  };
}
if (typeof global !== 'undefined') {
  global.STAR_DATA = {
    BEST_SELLERS_DATA,
    RECOMMENDATIONS_DATA
  };
}
