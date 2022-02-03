export enum UserActionTypes {
  GET_USER_SUCCESS = "@user/GET_USER_SUCCESS",
  GET_USER_ERROR = "@user/GET_USER_ERROR",
  UPDATE_USER_PAGE_NAME = "@user/UPDATE_USER_PAGE_NAME",
  DELETE_COMPONENT_FROM_PAGE = "@user/DELETE_COMPONENT_FROM_PAGE",
  TOGGLE_COMPONENT_VISIBILITY = "@user/TOGGLE_COMPONENT_VISIBILITY",
  UPDATE_COMPONENT_LABEL = "@user/UPDATE_COMPONENT_LABEL",
  UPDATE_COMPONENT_URL = "@user/UPDATE_COMPONENT_URL",
  INCREASE_COMPONENT_INDEX_IN_PAGE = "@user/INCREASE_COMPONENT_INDEX_IN_PAGE",
  DECREASE_COMPONENT_INDEX_IN_PAGE = "@user/DECREASE_COMPONENT_INDEX_IN_PAGE",
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  profileImageUrl?: string;
  pages: IUserPage[];
}

export interface IUserPage {
  _id: string;
  name: string;
  url: string;
  pageImageUrl?: string;
  views: number;
  components: IUserComponent[];
}

export interface IUserComponent {
  _id?: string;
  label?: string;
  url: string;
  style?: IComponentStyle;
  visible: boolean;
  clicks: number;
  layout: {
    rows: number;
    columns: number;
  };
  type: ComponentType;
  mediaUrl?: string;
  icon?: IconType;
}

export interface IComponentStyle {
  backgroundColor: string;
  fontColor: string;
}

export enum ComponentType {
  Text,
  Image,
  TextImage,
  Icon,
  Video,
}

export enum IconType {
  WhatsApp = "WhatsApp",
  TikTok = "TikTok",
  Instagram = "Instagram",
  Facebook = "Facebook",
  Email = "Email",
  Twitter = "Twitter",
  Youtube = "Youtube",
  Phone = "Phone",
  Spotify = "Spotify",
  Website = "Website",
  LinkedIn = "Website",
  Twitch = "Twitch",
  Discord = "Discord",
  Telegram = "Telegram",
  Snapchat = "Snapchat",
  Shopee = "Shopee",
  Pinterest = "Pinterest",
  YoutubeMusic = "Youtube Music",
  GenericShop = "Shop",
  SoundCloud = "SoundCloud",
  FacebookMessager = "Facebook Messager",
  AppleMusic = "Apple Music",
  PayPal = "PayPal",
  Line = "Line",
  Amazon = "Amazon",
  Deezer = "Deezer",
  Behance = "Behance",
  Tumblr = "Tumblr",
  Steam = "Steam",
  Onlyfans = "Onlyfans",
  GoogleDrive = "Google Drive",
  Wattpad = "Wattpad",
  Etsy = "Etsy",
  Shopify = "Shopify",
  Reddit = "Reddit",
  Viber = "Viber",
  Goodreads = "Goodreads",
  Skype = "Skype",
  Medium = "Medium",
  GooglePlay = "Google Play",
  Vimeo = "Vimeo",
  Patreon = "Patreon",
  Bandcamp = "Bandcamp",
  VSCO = "VSCO",
  VK = "VK",
  ApplePodcast = "ApplePodcast",
  WeChat = "WeChat",
  Mixcloud = "Mixcloud",
  AppStore = "AppStore",
  Napster = "Napster",
  Flickr = "Flickr",
  Ebay = "Ebay",
  Clubhouse = "Clubhouse",
  Flipboard = "Flipboard",
  LastFM = "Last.FM",
  Weibo = "Weibo",
  Fansly = "Fansly",
  Digg = "Digg",
  BuyMeACoffee = "Buy me a coffee",
  VibePay = "VibePay",
  Venmo = "Venmo",
  Zelle = "Zelle",
  Letterboxd = "Letterboxd",
  GoogleBlog = "Google Blog",
  Vinted = "Vinted",
  Square = "Square",
  Artstation = "Artstation",
  AmazonMusic = "Amazon Music",
  GoogleMaps = "Google Maps",
  Waze = "Waze",
  Uber = "Uber",
  Tokopedia = "Tokopedia",
  Roblox = "Roblox",
  GooglePodcast = "Google Podcast",
  Lazada = "Lazada",
  GitHub = "GitHub",
  Redbubble = "Redbubble",
  AliExpress = "Ali Express",
  Fiverr = "Fiverr",
  Bigo = "Bigo",
  MercadoLibre = "Mercado Livre",
  Tellonym = "Tellonym",
  Ivoox = "Ivoox",
  Coinbase = "Coinbase",
  Freelancer = "Freelancer",
  Beatstars = "Beatstars",
  Brubank = "Brubank",
  Amino = "Amino",
  Nubank = "Nubank",
  Kwai = "Kwai",
  Wordpress = "Wordpress",
  GenericBank = "Bank",
}

export interface IUserState {
  loading: boolean;
  error?: any;
  profile?: IUser;
}
