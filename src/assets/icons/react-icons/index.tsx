export interface IIconifyIcon {
  userFriendlyName: string;
  variations: string[];
  keywords: string[];
}

const icons: IIconifyIcon[] = [
  {
    userFriendlyName: "WhatsApp",
    variations: [
      "logos:whatsapp",
      "dashicons:whatsapp",
      "fa-brands:whatsapp",
      "uil:whatsapp-alt",
    ],
    keywords: ["whatsapp", "wpp", "zap", "zapzap", "zap zap"],
  },
  {
    userFriendlyName: "TikTok",
    variations: [
      "ic:baseline-tiktok",
      "ph:tiktok-logo-light",
      "iconoir:tiktok",
      "logos:tiktok",
      "logos:tiktok-icon",
    ],
    keywords: ["tiktok", "tik", "tok"],
  },
  {
    userFriendlyName: "Instagram",
    variations: [
      "ant-design:instagram-outlined",
      "ant-design:instagram-filled",
      "entypo-social:instagram-with-circle",
      "fa-brands:instagram-square",
      "icomoon-free:instagram",
      "logos:instagram",
    ],
    keywords: ["instagram", "insta"],
  },
  {
    userFriendlyName: "Facebook",
    variations: [
      "bi:facebook",
      "entypo-social:facebook",
      "bx:bxl-facebook",
      "iconoir:facebook",
      "iconoir:facebook",
    ],
    keywords: ["facebook", "face", "fb", "book"],
  },
  {
    userFriendlyName: "Email",
    variations: [
      "carbon:email",
      "clarity:email-line",
      "clarity:email-solid",
      "ic:round-email",
      "fxemoji:email",
      "ic:sharp-alternate-email",
      "icon-park:email-block",
    ],
    keywords: ["email", "e-mail", "mail", "@", "message", "mensagem", "msg"],
  },
  {
    userFriendlyName: "Twitter",
    variations: [
      "akar-icons:twitter-fill",
      "logos:twitter",
      "entypo-social:twitter-with-circle",
      "et:twitter",
      "fa-brands:twitter-square",
    ],
    keywords: ["twitter"],
  },
  {
    userFriendlyName: "YouTube",
    variations: [
      "akar-icons:youtube-fill",
      "ant-design:youtube-outlined",
      "foundation:social-youtube",
      "entypo-social:youtube-with-circle",
      "logos:youtube",
      "openmoji:youtube",
      "entypo-social:youtube-with-circle",
      "fa-brands:youtube-square",
    ],
    keywords: ["youtube", "yt", "you", "tube", "video", "vídeo"],
  },
  {
    userFriendlyName: "Phone",
    variations: [
      "akar-icons:phone",
      "ant-design:phone-filled",
      "carbon:phone-voice-filled",
      "carbon:phone-voice",
      "bi:phone",
      "bi:phone-fill",
      "carbon:phone-ip",
    ],
    keywords: [
      "phone",
      "fone",
      "telefone",
      "celphone",
      "smartphone",
      "tel",
      "call",
      "ring",
    ],
  },
  {
    userFriendlyName: "Spotify",
    variations: [
      "akar-icons:spotify-fill",
      "logos:spotify-icon",
      "logos:spotify",
      "simple-line-icons:social-spotify",
    ],
    keywords: ["spotify", "spot"],
  },
  {
    userFriendlyName: "Website",
    variations: [
      "whh:website",
      "dashicons:whatsapp",
      "fa-brands:whatsapp",
      "uil:whatsapp-alt",
    ],
    keywords: [
      "website",
      "web",
      "site",
      "url",
      "link",
      "domain",
      "domínio",
      "dominio",
    ],
  },
  {
    userFriendlyName: "LinkedIn",
    variations: [
      "akar-icons:linkedin-fill",
      "entypo-social:linkedin-with-circle",
      "et:linkedin",
      "fa-brands:linkedin-in",
      "logos:linkedin",
      "logos:linkedin-icon",
    ],
    keywords: ["linkedin", "in"],
  },
  {
    userFriendlyName: "Twitch",
    variations: [
      "akar-icons:twitch-fill",
      "ph:twitch-logo-fill",
      "ph:twitch-logo-light",
      "logos:twitch",
    ],
    keywords: ["twitch"],
  },
  {
    userFriendlyName: "Discord",
    variations: [
      "akar-icons:discord-fill",
      "bx:bxl-discord",
      "logos:discord",
      "logos:discord-icon",
    ],
    keywords: ["discord"],
  },
  {
    userFriendlyName: "Telegram",
    variations: [
      "akar-icons:telegram-fill",
      "bx:bxl-telegram",
      "la:telegram",
      "logos:telegram",
    ],
    keywords: ["telegram"],
  },
  {
    userFriendlyName: "Snapchat",
    variations: [
      "akar-icons:snapchat-fill",
      "bi:snapchat",
      "fa:snapchat-square",
      "fa:snapchat",
    ],
    keywords: ["snapchat"],
  },
  {
    userFriendlyName: "Pinterest",
    variations: [
      "akar-icons:pinterest-fill",
      "bx:bxl-pinterest-alt",
      "fa-brands:pinterest-square",
      "logos:pinterest",
    ],
    keywords: ["pinterest"],
  },
  {
    userFriendlyName: "Shop",
    variations: [
      "ant-design:shop-filled",
      "ant-design:shop-outlined",
      "flat-color-icons:shop",
      "grommet-icons:shop",
    ],
    keywords: [
      "shop",
      "shopping",
      "loja",
      "compra",
      "compras",
      "comprar",
      "produto",
      "products",
    ],
  },
  {
    userFriendlyName: "SoundCloud",
    variations: [
      "akar-icons:soundcloud-fill",
      "icomoon-free:soundcloud2",
      "logos:soundcloud",
    ],
    keywords: ["soundcloud"],
  },
  {
    userFriendlyName: "Messenger",
    variations: ["bi:messenger", "teenyicons:messenger-outline"],
    keywords: ["messenger"],
  },
  {
    userFriendlyName: "Apple Music",
    variations: ["cib:apple-music"],
    keywords: ["apple", "music", "apple music"],
  },
  {
    userFriendlyName: "PayPal",
    variations: [
      "bi:paypal",
      "bx:bxl-paypal",
      "cib:cc-paypal",
      "fontisto:paypal",
      "logos:paypal",
    ],
    keywords: ["paypal"],
  },
  {
    userFriendlyName: "Line",
    variations: ["bi:line"],
    keywords: ["line"],
  },
  {
    userFriendlyName: "Amazon",
    variations: [
      "ant-design:amazon-circle-filled",
      "ant-design:amazon-outlined",
      "ant-design:amazon-square-filled",
      "cib:amazon-aws",
      "cib:amazon-pay",
      "cib:cc-amazon-pay",
    ],
    keywords: ["amazon", "amazon pay"],
  },
  {
    userFriendlyName: "Deezer",
    variations: ["fa-brands:deezer", "jam:deezer-circle", "jam:deezer-square"],
    keywords: ["deezer"],
  },
  {
    userFriendlyName: "Behance",
    variations: [
      "ant-design:behance-circle-filled",
      "ant-design:behance-outlined",
      "ant-design:behance-square-filled",
      "logos:behance",
    ],
    keywords: ["behance"],
  },
  {
    userFriendlyName: "Tumblr",
    variations: [
      "akar-icons:tumblr-fill",
      "brandico:tumblr-rect",
      "el:tumblr",
      "entypo-social:tumblr-with-circle",
      "logos:tumblr",
    ],
    keywords: ["tumblr"],
  },
  {
    userFriendlyName: "Steam",
    variations: [
      "bi:steam",
      "fa-brands:steam-square",
      "icomoon-free:steam",
      "la:steam",
    ],
    keywords: ["steam"],
  },
  {
    userFriendlyName: "Onlyfans",
    variations: ["simple-icons:onlyfans"],
    keywords: ["xxxxxxx", "xxxxxxx"],
  },
  // {
  //   userFriendlyName: "XXXX",
  //   icon: ["xxxxxxx", "xxxxxxx", "xxxxxxx", "xxxxxxx"],
  //   keywords: ["xxxxxxx", "xxxxxxx"],
  // },
];

export default icons;
