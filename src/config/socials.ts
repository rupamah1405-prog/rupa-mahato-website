// Single source of truth for social media profile links and contact configuration.
// Edit these values to dynamically update across the entire website.

export interface SocialConfig {
  instagram: {
    url: string;
    handle: string; // e.g. "@sundartaseva"
  };
  linkedin: {
    url: string;
    displayName: string; // e.g. "Rupa Mahato"
  };
  email: {
    address: string; // Fixed and prominently displayed
    url: string; // "mailto:..."
  };
}

export const socialsConfig: SocialConfig = {
  instagram: {
    url: "https://www.instagram.com/smmrupa02",
    handle: "@smmrupa02"
  },
  linkedin: {
    url: "https://www.linkedin.com/",
    displayName: "Rupa Mahato"
  },
  email: {
    address: "rupamah1405@gmail.com",
    url: "mailto:rupamah1405@gmail.com"
  }
};
