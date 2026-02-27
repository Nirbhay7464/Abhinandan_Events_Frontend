// lib/dummy-data/gallery.ts

export const DUMMY_PHOTOS = [
  {
    category: "Corporate",
    items: [
      { image: "1771585398380-Screenshot 2026-02-20 163302.png", title: "Tech Conference 2024" },
      // { image: "1771416004332-events2.jpg", title: "Corporate Meetup" },
    ],
  },
  {
    category: "Wedding",
    items: [
      { image: "1771585528026-Screenshot 2026-02-20 163512.png", title: "Destination Wedding" },
      // { image: "1770982212574-wed2.png", title: "Luxury Decor Setup" },
    ],
  },
  {
    category: "Social",
    items: [
      { image: "1771585291281-Screenshot 2026-02-20 163028.png", title: "Charity Gala" },
    ],
  },
  {
    category: "Conference",
    items: [
      // { image: "1770980700100-LOGOroyal.png", title: "Industry Summit" },
    ],
  },
];

export const DUMMY_VIDEOS = [
  {
    id: 1,
    category: "Corporate",
    title: "Product Launch Highlights",
    platform: "youtube",
    url: "https://youtube.com/shorts/m75yqyOkZ48?si=cod3pMew4HJEf0Dr"
  },
   {
    id: 1,
    category: "Corporate",
    title: "Product Launch Highlights",
    platform: "youtube",
    url: "https://youtube.com/shorts/fDf2D9AOqK8?si=JCaLBLI-kryEcrdy"
  },
  
  {
    id: 2,
    category: "Wedding",
    title: "Wedding Reel",
    platform: "instagram",
    url: "https://www.instagram.com/reel/DUk-gnKDKmF/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==",
    thumbnail: "/Reel1.png" // ⬅️ ADD THIS
  },
  {
    id: 3,
    category: "Wedding",
    title: "Wedding Reel",
    platform: "instagram",
    url: "https://www.instagram.com/reel/DUA0ixxCLeN/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==",
    thumbnail: "/Reel2.png" // ⬅️ ADD THIS
  }
];
export const DUMMY_GALLERY_STATS = {
  totalPhotos: 450,
  totalVideos: 85,
  categories: ["Corporate", "Weddings", "Social", "Conferences"]
};
