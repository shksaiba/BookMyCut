// BookMyCut photo slots.
// Har slot ke liye pehle LOCAL photo try hoti hai: public/images/<slot>.jpg
// Wo na mile to REMOTE stock link try hota hai (agar neeche diya ho).
// Wo bhi na chale to purana colour block + label dikhta hai.
// Apni photo lagane ke liye bas file ko public/images/ mein slot ke naam se rakh dein,
// jaise public/images/hero.jpg ya public/images/style-1.jpg. Code badalne ki zaroorat nahi.

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=70`;

const REMOTE: Record<string, string> = {
  hero: unsplash('photo-1585747860715-2ba37e788b70'),
  'owner-banner': unsplash('photo-1521590832167-7bcbfaa6381f'),

  'style-1': unsplash('photo-1503951914875-452162b0f3f1'), // Skin fade
  'style-2': unsplash('photo-1599351431202-1e0f0137899a'), // Textured crop
  'style-3': unsplash('photo-1585747860715-2ba37e788b70'), // Classic taper
  'style-4': unsplash('photo-1605497788044-5a32c7078486'), // Quiff
  'style-5': unsplash('photo-1605497788044-5a32c7078486'), // Beard sculpt
  'style-6': unsplash('photo-1522337360788-8b13dee7a37e'), // Burgundy color
  'style-7': unsplash('photo-1562322140-8baeececf3df'), // Layered cut
  'style-8': unsplash('photo-1522337360788-8b13dee7a37e'), // Balayage
  // style-9 (Kids trim) aur style-10 (Princess trim): apni photo public/images mein daalein

  'salon-1': unsplash('photo-1521590832167-7bcbfaa6381f'), // Studio Nine
  'salon-2': unsplash('photo-1503951914875-452162b0f3f1'), // The Cut Room
  'salon-3': unsplash('photo-1560066984-138dadb4c035'), // Glam Lounge
  // salon-4 (Little Snips): apni photo public/images mein daalein
};

export function photoCandidates(slot: string): string[] {
  const list = [`/images/${slot}.jpg`];
  if (REMOTE[slot]) list.push(REMOTE[slot]);
  return list;
}
