export const FLOWERS = ["daisy", "tulip", "sunflower", "cherry", "rose", "lavender", "forgetmenot", "lily"] as const;
export const SEASONS = ["spring", "summer", "autumn", "winter"] as const;
export const COLORS = ["pink", "babyblue", "yellow", "lavender", "mint", "peach", "powder", "red"] as const;

export type FlowerId = (typeof FLOWERS)[number];
export type SeasonId = (typeof SEASONS)[number];
export type ColorId = (typeof COLORS)[number];

/** Each answer names a primary + secondary outcome per category. Primary = 3 pts, secondary = 1 pt. */
export interface Answer {
  text: string;
  emoji: string;
  flower: [FlowerId, FlowerId];
  season: [SeasonId, SeasonId];
  color: [ColorId, ColorId];
}
export interface Question { prompt: string; answers: Answer[] }

const a = (text: string, emoji: string, flower: [FlowerId, FlowerId], season: [SeasonId, SeasonId], color: [ColorId, ColorId]): Answer => ({ text, emoji, flower, season, color });

export const QUESTIONS: Question[] = [
  { prompt: "pick a little place for your heart to wander.", answers: [
    a("a flower field on a sunny afternoon", "🌼", ["daisy", "sunflower"], ["summer", "spring"], ["yellow", "mint"]),
    a("a cozy room while the rain taps on the window", "🌧️", ["lavender", "forgetmenot"], ["winter", "autumn"], ["powder", "lavender"]),
    a("a seaside town with blue skies", "🐚", ["forgetmenot", "tulip"], ["summer", "spring"], ["babyblue", "peach"]),
    a("a garden glowing under the moonlight", "🌙", ["lily", "cherry"], ["winter", "spring"], ["lavender", "babyblue"]),
  ]},
  { prompt: "what kind of gift would make you smile the most?", answers: [
    a("a bouquet picked just for me", "💐", ["rose", "tulip"], ["spring", "summer"], ["pink", "red"]),
    a("a handwritten letter with little doodles", "💌", ["forgetmenot", "lavender"], ["autumn", "winter"], ["powder", "peach"]),
    a("a cute trinket that reminds someone of me", "🎀", ["cherry", "daisy"], ["spring", "autumn"], ["pink", "mint"]),
    a("a spontaneous adventure with someone i love", "🎈", ["sunflower", "rose"], ["summer", "autumn"], ["red", "yellow"]),
  ]},
  { prompt: "if your feelings were weather, what would they be?", answers: [
    a("warm sunshine after the rain", "🌤️", ["sunflower", "lily"], ["spring", "summer"], ["yellow", "mint"]),
    a("soft clouds drifting across a blue sky", "☁️", ["cherry", "forgetmenot"], ["spring", "winter"], ["babyblue", "powder"]),
    a("a colorful sunset with a little breeze", "🌅", ["rose", "tulip"], ["autumn", "summer"], ["peach", "red"]),
    a("spring rain that makes everything bloom", "🌱", ["tulip", "daisy"], ["spring", "autumn"], ["mint", "pink"]),
  ]},
  { prompt: "choose a little magical companion.", answers: [
    a("a butterfly that follows me everywhere", "🦋", ["daisy", "cherry"], ["spring", "summer"], ["mint", "pink"]),
    a("a tiny bird that sings whenever i'm happy", "🐦", ["sunflower", "daisy"], ["summer", "spring"], ["yellow", "peach"]),
    a("a sleepy cat that understands my feelings", "🐈", ["lavender", "forgetmenot"], ["winter", "autumn"], ["powder", "lavender"]),
    a("a little star that grants wishes", "⭐", ["lily", "lavender"], ["winter", "spring"], ["lavender", "babyblue"]),
  ]},
  { prompt: "how do you usually show someone you care?", answers: [
    a("remembering the tiniest details", "🔎", ["forgetmenot", "lily"], ["autumn", "winter"], ["powder", "babyblue"]),
    a("making them laugh whenever i can", "😆", ["daisy", "sunflower"], ["summer", "spring"], ["yellow", "mint"]),
    a("giving them little things that remind me of them", "🎁", ["tulip", "cherry"], ["spring", "autumn"], ["pink", "peach"]),
    a("staying beside them when they need me", "🫶", ["rose", "lavender"], ["winter", "autumn"], ["red", "lavender"]),
  ]},
  { prompt: "which little corner of the world feels most like you?", answers: [
    a("a pastel flower shop", "🌷", ["tulip", "rose"], ["spring", "summer"], ["pink", "peach"]),
    a("a tiny seaside café", "☕", ["forgetmenot", "daisy"], ["summer", "autumn"], ["babyblue", "mint"]),
    a("a sunny picnic beneath fruit trees", "🍓", ["sunflower", "daisy"], ["summer", "spring"], ["yellow", "red"]),
    a("a bookstore filled with fairy tales", "📚", ["lavender", "lily"], ["autumn", "winter"], ["lavender", "powder"]),
  ]},
  { prompt: "choose the sky you would keep in a bottle.", answers: [
    a("a peachy pink sunrise", "🌄", ["cherry", "tulip"], ["spring", "summer"], ["peach", "pink"]),
    a("a bright blue afternoon", "🩵", ["daisy", "forgetmenot"], ["summer", "spring"], ["babyblue", "mint"]),
    a("a golden yellow sunset", "🌇", ["sunflower", "rose"], ["autumn", "summer"], ["yellow", "red"]),
    a("a lavender sky filled with stars", "✨", ["lily", "lavender"], ["winter", "autumn"], ["lavender", "powder"]),
  ]},
  { prompt: "when life gets a little overwhelming, what sounds comforting?", answers: [
    a("painting, writing, or making something with my hands", "🎨", ["lavender", "tulip"], ["autumn", "winter"], ["peach", "lavender"]),
    a("talking to someone who makes me laugh", "📞", ["sunflower", "daisy"], ["summer", "spring"], ["red", "yellow"]),
    a("spending time somewhere beautiful", "🌸", ["cherry", "lily"], ["spring", "summer"], ["mint", "pink"]),
    a("having a little space to recharge", "🛌", ["forgetmenot", "lavender"], ["winter", "autumn"], ["powder", "babyblue"]),
  ]},
  { prompt: "what kind of magic would you like to have?", answers: [
    a("making flowers bloom wherever i walk", "🌺", ["daisy", "tulip"], ["spring", "summer"], ["mint", "pink"]),
    a("turning ordinary days into little adventures", "🗺️", ["rose", "sunflower"], ["summer", "autumn"], ["red", "peach"]),
    a("bringing warmth to people who need it", "🕯️", ["sunflower", "lily"], ["winter", "summer"], ["yellow", "peach"]),
    a("collecting beautiful memories like tiny stars", "🫙", ["forgetmenot", "cherry"], ["autumn", "winter"], ["babyblue", "lavender"]),
  ]},
  { prompt: "choose a little sentence that feels close to your heart.", answers: [
    a("there is beauty in growing at your own pace", "🐌", ["lily", "tulip"], ["spring", "winter"], ["mint", "powder"]),
    a("life becomes sweeter when shared with others", "🍰", ["rose", "sunflower"], ["summer", "autumn"], ["pink", "red"]),
    a("the world is full of little things worth loving", "🐞", ["daisy", "cherry"], ["spring", "summer"], ["yellow", "pink"]),
    a("even ordinary days can become precious stories", "📖", ["lavender", "forgetmenot"], ["autumn", "winter"], ["lavender", "peach"]),
  ]},
];

export interface FlowerInfo { name: string; tagline: string; story: string; note: string; petal: string; center: string; bg: string }
export const FLOWER_INFO: Record<FlowerId, FlowerInfo> = {
  daisy: { name: "daisy", tagline: "cheerful, approachable & full of little joys", petal: "#FFFFFF", center: "#FFD45C", bg: "#FFF0A8",
    story: "you're the kind of person who notices the ladybug on the windowsill and points it out to everyone. people feel lighter around you, like they've been allowed to breathe a little. you don't need grand occasions to be happy — a good snack and a sunny bench will do. your joy is contagious in the quietest, most generous way.",
    note: "keep collecting small happy things. they add up to a whole meadow." },
  tulip: { name: "tulip", tagline: "affectionate, expressive & quietly confident", petal: "#FF9EC4", center: "#FFE07A", bg: "#FFC6DF",
    story: "you love with your whole chest, even if you say it softly. you remember how someone takes their tea and you show up with it before they ask. there's a calm confidence in you — you know what you like, and you don't need to shout about it. you open up slowly, and when you do, it's breathtaking.",
    note: "the people who get to see you fully open are very lucky. so are you." },
  sunflower: { name: "sunflower", tagline: "warm, optimistic & generous with happiness", petal: "#FFC93C", center: "#9A5B3A", bg: "#FFF0A8",
    story: "you naturally turn toward the light, and somehow you bring everyone with you. you're the friend who plans the picnic, packs extra snacks, and laughs the loudest at the bad jokes. even on cloudy days, you find a little sliver of sun to stand in. your warmth isn't a performance — it's just how you're built.",
    note: "remember to let others hold the sun for you sometimes, too." },
  cherry: { name: "cherry blossom", tagline: "dreamy, sensitive & fond of beautiful moments", petal: "#FFC6DF", center: "#FF7FAF", bg: "#FFE6F0",
    story: "you feel things deeply and beautifully — a song, a sky, a sentence can stay with you for days. you know that the loveliest moments are often the briefest, so you try to really be there for them. people trust you with their tender things. your softness is not fragile; it's a kind of courage.",
    note: "you're allowed to bloom all at once and rest afterwards." },
  rose: { name: "rose", tagline: "passionate, thoughtful & emotionally expressive", petal: "#FF6F91", center: "#D94470", bg: "#FFC6DF",
    story: "when you care about something, you care completely — no halfway, no lukewarm. you have big feelings and the honesty to name them, which makes you a rare and wonderful friend. you'd cross a whole city to bring someone soup. there's a little fire in you that keeps everyone around you warm.",
    note: "your intensity is a gift. the right people will never ask you to shrink it." },
  lavender: { name: "lavender", tagline: "imaginative, introspective & comfort-loving", petal: "#B79CFF", center: "#8E6FE0", bg: "#E5D5FF",
    story: "you carry a whole universe inside you — stories, half-written ideas, worlds you visit when the room gets quiet. you love blankets, rainy afternoons, and the specific joy of a good notebook. you recharge in stillness and come back with something beautiful to share. people find you calming without quite knowing why.",
    note: "your quiet is full of magic. it's okay to keep some of it just for you." },
  forgetmenot: { name: "forget-me-not", tagline: "sentimental, loyal & attentive to memories", petal: "#8FB8FF", center: "#FFE07A", bg: "#C6E4FF",
    story: "you keep ticket stubs, old voice notes, and the exact date you met your best friend. loyalty comes easily to you; once someone is in your heart, they're in for good. you notice the tiny changes — a new haircut, a tired voice — and you gently ask about them. you are the keeper of everyone's best memories.",
    note: "someone out there remembers you as fondly as you remember them." },
  lily: { name: "lily of the valley", tagline: "gentle, hopeful & quietly enchanting", petal: "#FFFFFF", center: "#BFE8C6", bg: "#D9F4DC",
    story: "you have a soft kind of magic that sneaks up on people. you're hopeful even when it's hard, and that hope quietly lights up whatever room you're in. you grow at your own pace and you're not in a hurry to be anything other than yourself. people often realise, a little later, how much you meant to them.",
    note: "small and steady still counts as blooming. you're doing beautifully." },
};

export interface SeasonInfo { name: string; emoji: string; text: string; tint: string }
export const SEASON_INFO: Record<SeasonId, SeasonInfo> = {
  spring: { name: "spring", emoji: "🌱", tint: "#D9F4DC", text: "you're full of fresh starts and curious little 'what ifs'. like spring, you believe things can always grow into something new." },
  summer: { name: "summer", emoji: "☀️", tint: "#FFF0A8", text: "you're bright, spontaneous and affectionate — long golden days, sticky popsicles and laughing too loud are your natural habitat." },
  autumn: { name: "autumn", emoji: "🍂", tint: "#FFDCC2", text: "you're reflective and creative, with a soft spot for nostalgia. you find meaning in changing leaves and warm drinks held with both hands." },
  winter: { name: "winter", emoji: "❄️", tint: "#C6E4FF", text: "you're thoughtful and imaginative, drawn to cozy corners and quiet starlit evenings where the best ideas tend to visit." },
};

export interface ColorInfo { name: string; hex: string; text: string }
export const COLOR_INFO: Record<ColorId, ColorInfo> = {
  pink: { name: "cotton candy pink", hex: "#FFC6DF", text: "affectionate and playful — you add a little sweetness to everything you touch." },
  babyblue: { name: "baby blue", hex: "#C6E4FF", text: "open-minded and dreamy — you see possibility in wide skies and new ideas." },
  yellow: { name: "butter yellow", hex: "#FFF0A8", text: "cheerful and warm-hearted — you glow like a kitchen window on a sunny morning." },
  lavender: { name: "lavender purple", hex: "#E5D5FF", text: "creative and a little whimsical — your aura smells faintly of daydreams." },
  mint: { name: "mint green", hex: "#D9F4DC", text: "fresh and curious — you're naturally playful, like the first leaf of the year." },
  peach: { name: "peach", hex: "#FFDCC2", text: "friendly and expressive — your warmth makes strangers feel like old friends." },
  powder: { name: "powder blue", hex: "#AFCBFF", text: "thoughtful and reflective — calm water with a whole sky inside it." },
  red: { name: "strawberry red", hex: "#FF8FA3", text: "lively and passionate — you are full of personality and impossible to forget." },
};

export const SURPRISES = [
  "sunflowers follow the sun when they're young — just like you chasing good days. 🌻",
  "a group of butterflies is called a kaleidoscope. 🦋",
  "you are someone's favorite notification. 💌",
  "tulips keep growing about an inch after they're cut. they just can't help it. 🌷",
  "forget-me-nots were once believed to help people remember their loved ones. 💙",
  "today is a good day to drink water and be gentle with yourself. 💧",
  "lavender has been used for over 2,500 years to help people relax. 💜",
  "some daisies are actually two flowers in one — a ring of petals and a tiny bouquet in the center. 🌼",
  "the moon is always full; we just see different parts of it. like you. 🌙",
  "you deserve a little treat. this is your sign. 🍓",
];
