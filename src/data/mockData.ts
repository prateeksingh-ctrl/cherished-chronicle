// Mock data for the 2025 Recap Magazine

export interface Memory {
  id: string;
  imageUrl: string;
  caption: string;
  date: string;
  rotation: number;
}

export interface Goal {
  id: string;
  title: string;
  isCompleted: boolean;
  category: 'travel' | 'dates' | 'savings' | 'personal';
  icon?: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
}

export const memories: Memory[] = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=500&fit=crop',
    caption: 'Our first coffee date of the year ☕',
    date: 'January 2025',
    rotation: -2,
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=300&fit=crop',
    caption: 'Valentine\'s dinner was magical ✨',
    date: 'February 2025',
    rotation: 1,
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=400&h=400&fit=crop',
    caption: 'Spring picnic in the park 🌸',
    date: 'March 2025',
    rotation: -1,
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=400&h=350&fit=crop',
    caption: 'Road trip adventures together 🚗',
    date: 'April 2025',
    rotation: 2,
  },
  {
    id: '5',
    imageUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&h=450&fit=crop',
    caption: 'Cooking dinner together 👨‍🍳',
    date: 'May 2025',
    rotation: -1.5,
  },
  {
    id: '6',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=380&fit=crop',
    caption: 'Summer sunset watching 🌅',
    date: 'June 2025',
    rotation: 1.5,
  },
  {
    id: '7',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=420&fit=crop',
    caption: 'Beach day memories 🏖️',
    date: 'July 2025',
    rotation: -2.5,
  },
  {
    id: '8',
    imageUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=360&fit=crop',
    caption: 'Stargazing night under the stars ⭐',
    date: 'August 2025',
    rotation: 2,
  },
];

export const goals: Goal[] = [
  { id: '1', title: 'Visit Paris together', isCompleted: false, category: 'travel' },
  { id: '2', title: 'Japan cherry blossom trip', isCompleted: false, category: 'travel' },
  { id: '3', title: 'Cozy cabin weekend', isCompleted: true, category: 'travel' },
  { id: '4', title: 'Cooking class date', isCompleted: false, category: 'dates' },
  { id: '5', title: 'Pottery workshop', isCompleted: false, category: 'dates' },
  { id: '6', title: 'Romantic spa day', isCompleted: true, category: 'dates' },
  { id: '7', title: 'Save for dream vacation', isCompleted: false, category: 'savings' },
  { id: '8', title: 'Anniversary surprise fund', isCompleted: false, category: 'savings' },
];

export const songs: Song[] = [
  {
    id: '1',
    title: 'Perfect',
    artist: 'Ed Sheeran',
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
  },
  {
    id: '2',
    title: 'All of Me',
    artist: 'John Legend',
    coverUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop',
  },
  {
    id: '3',
    title: 'Thinking Out Loud',
    artist: 'Ed Sheeran',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
  },
];

export const loveNote = `My dearest love,

This year with you has been nothing short of magical. Every moment, every laugh, every quiet evening together has been a treasure I hold close to my heart.

Thank you for being my partner in this beautiful journey called life. Here's to many more years of love, laughter, and adventures together.

Forever yours,
With all my love 💕`;
