export type GalleryItem = {
  poster: string;
  video?: string;
  playback?: string;
  caption: string;
  alt: string;
  width: number;
  height: number;
};

function still(file: string, caption: string, alt: string, width: number, height: number): GalleryItem {
  return { poster: `${file}.webp`, caption, alt, width, height };
}

function clip(file: string, caption: string, alt: string, width: number, height: number, usePreviewForPlayback = false): GalleryItem {
  const video = `${file}.mp4`;
  return { ...still(file, caption, alt, width, height), video, playback: usePreviewForPlayback ? video : `full/${video}` };
}

export const gallery = [
  clip('cross-cut-aerial', 'Cross Cut Road from above', 'A forward aerial view over traffic and storefronts on Cross Cut Road', 720, 406),
  clip('green-screen-rig', 'Green-screen camera setup', 'A camera operator framing a performer in front of a green screen', 720, 406),
  clip('xfactor-intro-loop', 'Xfactor event intro', 'A red animated event identity with a row of speaker portraits', 960, 350, true),
  clip('narrative-preview', 'Narrative film preview', 'The camera moves in toward an orange-striped office building from above', 720, 406),
  clip('property-film', 'Real estate ad film', 'A model home and the surrounding residential development', 720, 406),
  clip('industrial-aerial', 'Manufacturing aerial', 'A drone approaches a group outside an industrial building', 384, 216, true),
  clip('town-hall-clock', 'Town Hall clock tower', 'A view of the clock tower at Town Hall in Coimbatore', 720, 406),
  still('chill-bro-art', 'Chill Bro thumbnail', 'Pixel-art short film thumbnail with the cast lined up across a green landscape', 1280, 720),
  clip('aerial-court', 'Panda Sports aerial', 'An overhead shot rotating close around a person on a blue and red sports court', 720, 406),
  clip('pixel-environment', 'Pixel-art landscape', 'Animated clouds over a pixel-art valley and mountain range', 384, 216),
  still('conclave-stage', 'Conclave stage graphics', 'A red LED backdrop installed on a conference stage', 1600, 901),
  clip('conclave-teaser', 'Learning conclave teaser', 'Animated typography inside a violet tunnel of light', 384, 216),
  still('on-stage', 'On stage', 'A group posing together on stage', 1280, 720),
  clip('ukkadam-lake', 'Ukkadam Lake at sunrise', 'Golden sunlight reflected in Ukkadam Lake', 384, 216),
  still('cooling-ad', 'Cooling campaign artwork', 'A wide air conditioner advertisement set against icy mountains', 1600, 349),
  clip('tamil-property-film', 'Tamil real estate ad film', 'Moving shots of palm-lined roads at a residential development', 384, 216),
  clip('chase-scene', 'Chase sequence', 'A black-and-white shot following a man through a truck yard', 720, 406),
  clip('rural-pitch', 'Rural entrepreneurship pitch', 'A speaker presents at a rural entrepreneurship event', 384, 216),
  clip('speaker-led', 'Speaker introduction graphics', 'Watches rotate across a red background in an ultrawide stage animation', 960, 360),
  still('event-gathering', 'At an event', 'A group gathering for a photo at an event', 1280, 960),
  clip('future-scientist', 'Future scientist animation', 'An illustrated scientist moves through a glowing portal into a forest', 720, 406),
  still('foundry-stage', 'Foundry inauguration stage', 'A red exhibition backdrop behind a row of chairs onstage', 1280, 720),
  clip('november-40', 'Foundry exhibition reel', 'A trade exhibition title over a red animated background', 178, 300),
  clip('november-38', 'Exhibition floor walkthrough', 'A vertical tracking shot across a conference hall and its seating', 406, 720),
  clip('march-event', 'Camera workflow demo', 'A red-lit camera and drone gear setup followed by a shot of the planning checklist', 720, 406),
  clip('automotive-film', 'Automotive product film', 'A moving view along the side of a vehicle in a showroom', 720, 406),
  clip('concert-reel', 'Concert reel', 'A performer onstage under colored concert lighting', 406, 720),
  still('production-portrait', 'A moment offstage', 'Two people posing indoors', 480, 640),
  clip('october-clip', 'Behind the scenes', 'A camera operator holding a gimbal at the start of a shot', 720, 406, true),
  still('kaiju-poster', 'Godzilla poster study', 'A two-tone illustration of Godzilla with Japanese lettering', 1600, 1131),
  clip('bot-episode', 'Sci-fi episode', 'A blue-lit corridor in a science-fiction sequence', 384, 216),
  clip('ck-film', 'Crazy Kadhal title animation', 'A glowing handwritten title against a dark background', 384, 168),
  clip('may-clip', 'Title sequence study', 'A motion graphic tracing a path from planning to execution', 720, 406),
  clip('november-54', 'Dance event promo', 'Dancers under warm lights in a decorated venue', 406, 720),
  clip('november-47', 'Dance workshop announcement', 'A vertical workshop poster featuring its instructor', 168, 300),
  clip('november-44', 'Dance workshop guest reel', 'A vertical guest introduction with gold event graphics', 168, 300),
  clip('manar-teaser', 'School programme teaser', 'Students and teachers work together during classroom activities', 720, 406),
  clip('parliament-reel', 'Student parliament reel', 'Students drafting policy and presenting during a parliament programme', 720, 406),
  clip('promo-film', 'Event promotion film', 'A group seated around a table during a discussion', 384, 216),
  clip('darshan-kb', 'Knowledge base explainer', 'A presenter with interface graphics for a knowledge base', 720, 406),
  clip('social-media-sample', 'Social media sample', 'An on-screen browser demo expands over the presenter', 720, 406),
  still('group-portrait', 'A group portrait', 'Three people standing together indoors', 480, 741),
  clip('conclave-reel', 'Save-the-date reel', 'The opening spotlight reveals event typography and the audience', 720, 406),
  clip('orator-led', 'Oratory Club statistics', 'Animated green statistic counters across a wide stage display', 960, 350),
  clip('chapter-teaser', 'Conclave chapter teaser', 'A speaker appears in an ultrawide conference montage', 384, 140),
];
export const galleryAssets = '/assets/people/darshan';

