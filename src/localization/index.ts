import LocalizedStrings from "react-localization";

interface IDictionary {
  home: string;
  pages: string;
  theme: string;
  statistics: string;
  support: string;
  pageNotFound: string;
  views: string;
  image: string;
  text: string;
  textImage: string;
  icon: string;
  video: string;
  unknown: string;
  columns: string;
  rows: string;
  clicks: string;
  type: string;
  backgroundColor: string;
  fontColor: string;
  uploadImage: string;
  chooseEffect: string;
  toggleVisibility: string;
  remove: string;
  addComponent: string;
  addIcon: string;
  deleteIcon: string;
  addVideo: string;
  iconName: string;
  back: string;
  cancel: string;
  add: string;
  searchIconMinCaracters: string;
  url: string;
  invalidUrl: string;
  colorPicker: string;
  deleteComponentConfirmation: string;
  yes: string;
  no: string;
  or: string;
  chooseFile: string;
  dragAndDropYourImage: string;
  dropYourImageHere: string;
  clickToSearchIt: string;
  imageReadyToUpload: string;
  next: string;
  webSiteExample: string;
  send: string;
  scheduleLaunchComponentDate: string;
  save: string;
  date: string;
}

// Dictionaries

const en: IDictionary = {
  home: "Home",
  pages: "Pages",
  theme: "Theme",
  statistics: "Statistics",
  support: "Support",
  pageNotFound: "There's nothing here!",
  views: "Views",
  image: "Imagem",
  text: "Texto",
  textImage: "Image & Text",
  icon: "Icon",
  video: "Video",
  unknown: "Unknown",
  columns: "Columns",
  rows: "Rows",
  clicks: "Clicks",
  type: "Type",
  backgroundColor: "Background color",
  fontColor: "Font color",
  uploadImage: "Upload image",
  chooseEffect: "Choose effect",
  toggleVisibility: "Toggle visibility",
  remove: "Remove",
  addComponent: "Add Component",
  addIcon: "Add Icon",
  deleteIcon: "Delete Icon",
  addVideo: "Add Video",
  iconName: "Icon name",
  back: "Back",
  cancel: "Cancel",
  add: "Add",
  searchIconMinCaracters: "Search must have at least 3 caracters.",
  url: "URL",
  invalidUrl: "Invalid URL",
  colorPicker: "Pick a color",
  deleteComponentConfirmation: "Do you really wish to delete this component?",
  yes: "Yes",
  no: "No",
  or: "or",
  chooseFile: "Choose a file",
  dragAndDropYourImage: "Drag and drop your image here",
  dropYourImageHere: "Drop your image here",
  clickToSearchIt: "Click to search",
  imageReadyToUpload: "Image ready to upload",
  next: "Next",
  webSiteExample: "https://www.mywebsite.com",
  send: "Send",
  scheduleLaunchComponentDate: "Launch date",
  save: "Save",
  date: "Date",
};

const pt: IDictionary = {
  home: "Início",
  pages: "Páginas",
  theme: "Tema",
  statistics: "Estatísticas",
  support: "Suporte",
  pageNotFound: "Nada por aqui!",
  views: "Visualizações",
  image: "Imagem",
  text: "Texto",
  textImage: "Imagem & Texto",
  icon: "Ícone",
  video: "Vídeo",
  unknown: "Desconhecido",
  columns: "Colunas",
  rows: "Linhas",
  clicks: "Cliques",
  type: "Tipo",
  backgroundColor: "Cor do fundo",
  fontColor: "Cor da fonte",
  uploadImage: "Enviar imagem",
  chooseEffect: "Escolher efeito",
  toggleVisibility: "Mudar visibilidade",
  remove: "Remover",
  addComponent: "Inserir Componente",
  addIcon: "Inserir Ícone",
  deleteIcon: "Remover Ícone",
  addVideo: "Inserir Vídeo",
  iconName: "Nome do ícone",
  back: "Voltar",
  cancel: "Cancelar",
  add: "Inserir",
  searchIconMinCaracters: "Busca precisa ter mais de 3 caracteres.",
  url: "URL",
  invalidUrl: "URL inválida",
  colorPicker: "Escolha outra cor",
  deleteComponentConfirmation: "Deseja realmente apagar este componente?",
  yes: "Sim",
  no: "Não",
  or: "ou",
  chooseFile: "Escolha um arquivo",
  dragAndDropYourImage: "Arraste e solte sua imagem aqui",
  dropYourImageHere: "Solte sua imagem aqui...",
  clickToSearchIt: "Clique para procurar",
  imageReadyToUpload: "Imagem pronta para enviar",
  next: "Avançar",
  webSiteExample: "https://www.meusite.com",
  send: "Enviar",
  scheduleLaunchComponentDate: "Data de lançamento",
  save: "Salvar",
  date: "Data",
};

// Composed dictionaries

let strings = new LocalizedStrings({
  en,
  pt,
});

export default strings;
