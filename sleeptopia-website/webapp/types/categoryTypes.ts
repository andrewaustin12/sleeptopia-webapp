export const categories = [
  // Electronic Music
  "House",
  "Deep House",
  "Tech House",
  "Progressive House",
  "Techno",
  "Minimal Techno",
  "Trance",
  "Psytrance",
  "Drum & Bass",
  "Jungle",
  "Dubstep",
  "Future Bass",
  "EDM",
  "Big Room",
  "Hardstyle",
  "Hardcore",
  "Ambient",
  "Downtempo",
  
  // Other Electronic Genres
  "Garage",
  "UK Garage",
  "Breakbeat",
  "IDM",
  "Industrial",
  
  // Non-Electronic Genres
  "Hip-Hop",
  "R&B",
  "Disco",
  "Funk",
  "Latin",
  "Reggae",
  "Dancehall",
  
  // Misc
  "Open Format",
  "Mobile DJ",
  "Wedding DJ",
  "Club DJ",
  "Turntablist",
  "Other"
] as const;

export type Category = typeof categories[number]; 