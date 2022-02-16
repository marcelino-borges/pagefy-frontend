export enum UserActionTypes {
  GET_USER_SUCCESS = "@user/GET_USER_SUCCESS",
  GET_USER_ERROR = "@user/GET_USER_ERROR",
  UPDATE_USER_PAGE_NAME = "@user/UPDATE_USER_PAGE_NAME",
  TOGGLE_COMPONENT_VISIBILITY = "@user/TOGGLE_COMPONENT_VISIBILITY",
  UPDATE_COMPONENT_LABEL = "@user/UPDATE_COMPONENT_LABEL",
  UPDATE_COMPONENT_URL = "@user/UPDATE_COMPONENT_URL",
  UPDATE_COMPONENT_BACKGROUND_COLOR = "@user/UPDATE_COMPONENT_BACKGROUND_COLOR",
  UPDATE_COMPONENT_FONT_COLOR = "@user/UPDATE_COMPONENT_FONT_COLOR",
  INCREASE_COMPONENT_INDEX_IN_PAGE = "@user/INCREASE_COMPONENT_INDEX_IN_PAGE",
  DECREASE_COMPONENT_INDEX_IN_PAGE = "@user/DECREASE_COMPONENT_INDEX_IN_PAGE",
  ADD_COMPONENT_IN_PAGE = "@user/ADD_COMPONENT_IN_PAGE",
  DELETE_COMPONENT_FROM_PAGE = "@user/DELETE_COMPONENT_FROM_PAGE",
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
  iconDetails?: IIconDetails;
  launchDate?: string;
}

export interface IIconDetails {
  userFriendlyName: string;
  icon: string;
}

export interface IComponentStyle {
  backgroundColor?: string;
  color?: string;
}

export const enum ComponentType {
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
  LinkedIn = "LinkedIn",
  Twitch = "Twitch",
  Discord = "Discord",
  Telegram = "Telegram",
  Snapchat = "Snapchat",
  Pinterest = "Pinterest",
  YoutubeMusic = "Youtube Music",
  GenericShop = "Shop",
  SoundCloud = "SoundCloud",
  FacebookMessenger = "Facebook Messenger",
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
  Flipboard = "Flipboard",
  LastFM = "Last.FM",
  Weibo = "Weibo",
  Digg = "Digg",
  BuyMeACoffee = "Buy me a coffee",
  Venmo = "Venmo",
  Zelle = "Zelle",
  Letterboxd = "Letterboxd",
  Blogger = "Blogger",
  Artstation = "Artstation",
  AmazonPrime = "Amazon Prime",
  GoogleMaps = "Google Maps",
  Waze = "Waze",
  Uber = "Uber",
  UberEats = "Uber Eats",
  Roblox = "Roblox",
  GooglePodcast = "Google Podcast",
  GitHub = "GitHub",
  Git = "Git",
  Redbubble = "Redbubble",
  Fiverr = "Fiverr",
  Bitcoin = "Bitcoin",
  Nubank = "Nubank",
  GenericCurrency = "Generic Currency",
  Dollar = "Dollar",
  Euro = "Euro",
  VisualStudio = "Visual Studio",
  NotepadPlusPlus = "Notepad++",
  Notepad = "Notepad",
  Calendar = "Calendar",
  Clock = "Clock",
  Timer = "Timer",
  Android = "Android",
  Upload = "Upload",
  Download = "Download",
  Smartphone = "Smartphone",

  Clubhouse = "Clubhouse", // nao achei
  Fansly = "Fansly", // nao achei
  VibePay = "VibePay", // nao achei
  GoogleBlog = "Google Blog", // nao achei
  Vinted = "Vinted", // nao achei
  Square = "Square", // nao achei
  AmazonMusic = "Amazon Music", // nao achei
  Tokopedia = "Tokopedia", // nao achei
  Lazada = "Lazada", // nao achei
  AliExpress = "Ali Express", // nao achei
  Bigo = "Bigo", // nao achei
  MercadoLibre = "Mercado Livre", // nao achei
  Tellonym = "Tellonym", // nao achei
  Ivoox = "Ivoox", // nao achei
  Coinbase = "Coinbase", // nao achei
  Beatstars = "Beatstars", // nao achei
  Brubank = "Brubank", // nao achei
  Amino = "Amino", // nao achei
  Kwai = "Kwai", // nao achei
  Wordpress = "Wordpress",
  GenericBank = "Bank",
  Shopee = "Shopee", //falta icone
}

export interface IUserState {
  loading: boolean;
  error?: any;
  profile?: IUser;
}
