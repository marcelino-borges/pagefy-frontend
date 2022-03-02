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
  launch: string;
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
  addLink: string;
  addIcon: string;
  addVideo: string;
  addLaunch: string;
  deleteIcon: string;
  deletePage: string;
  iconName: string;
  back: string;
  cancel: string;
  add: string;
  searchIconMinCaracters: string;
  url: string;
  invalidUrl: string;
  colorPicker: string;
  deleteComponentConfirmation: string;
  deletePageConfirmation: string;
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
  scheduleComponentVisibleDate: string;
  save: string;
  date: string;
  hour: string;
  time: string;
  urlRequired: string;
  textInComponentRequired: string;
  imageInComponentRequired: string;
  selectAllOptions: string;
  videoUrl: string;
  videoComponentDescription: string;
  youtubeUrlExample: string;
  youtubeIdExample: string;
  youtubeIdInstructions: string;
  youtubeVideoId: string;
  clickHere: string;
  step: string;
  share: string;
  understood: string;
  invalidId: string;
  warningPrivatePage: string;
  create: string;
  createPage: string;
  pageName: string;
  pageUrl: string;
  pageUrlExample: string;
  requiredField: string;
  pageUrlBadFormat: string;
  launchMessageLabel: string;
  launchMessageExample: string;
  launchComponentInstructions: string;
  launchDateTimeBeforeToday: string;
  days: string;
  hours: string;
  minutes: string;
  minutesAbbreviated: string;
  seconds: string;
  secondsAbbreviated: string;
  launchPrefixText: string;
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
  launch: "Launch",
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
  addLink: "Add Link",
  addIcon: "Add Icon",
  addVideo: "Add Video",
  addLaunch: "Add Launch",
  deleteIcon: "Delete Icon",
  deletePage: "Delete Page",
  iconName: "Icon name",
  back: "Back",
  cancel: "Cancel",
  add: "Add",
  searchIconMinCaracters: "Search must have at least 3 caracters.",
  url: "URL",
  invalidUrl: "Invalid URL",
  colorPicker: "Pick a color",
  deleteComponentConfirmation: "Do you really wish to delete this component?",
  deletePageConfirmation: "Do you really want to delete this page?",
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
  scheduleComponentVisibleDate: "Launch date",
  save: "Save",
  date: "Date",
  hour: "Hour",
  time: "Time",
  urlRequired: "URL required",
  textInComponentRequired: "Required for a text component",
  imageInComponentRequired: "Choose an image to your component",
  selectAllOptions: "Select all the options!",
  videoUrl: "Video URL",
  videoComponentDescription:
    "Your video will ocupy 2 columns and 2 rows in your landing page",
  youtubeUrlExample: "https://www.youtube.com/embed/Lq2lNYKYpYw",
  youtubeIdExample: "Lq2lNYKYpYw",
  youtubeVideoId: "Youtube video ID",
  youtubeIdInstructions:
    "Access the YouTube video you want to add to your page and copy it's URL to here",
  clickHere: "Click here",
  step: "Step",
  share: "Share",
  understood: "Got it",
  invalidId: " Invalid ID",
  warningPrivatePage: "This page is not publicly available.",
  create: "Create",
  createPage: "Create Page",
  pageName: "Page name",
  pageUrl: "Page URL",
  requiredField: "Required field",
  pageUrlExample: "/unique-name-of-your-page",
  pageUrlBadFormat:
    "Badly formatted URL. It must have more than 3 characters and it's allowed only letters and hyphens, like this: /my-page",
  launchMessageLabel: "Message",
  launchMessageExample: "for the innauguration of our shop!",
  launchComponentInstructions:
    "There will be a clock with a countdown in your page, showing how long it is to reach the date/time informed here, followed by a message above it.",
  launchDateTimeBeforeToday: "Must be future",
  days: "days",
  hours: "hours",
  minutes: "minutes",
  minutesAbbreviated: "min",
  secondsAbbreviated: "sec",
  seconds: "seconds",
  launchPrefixText: "It's left",
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
  launch: "Lançamento",
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
  addLink: "Adicionar Link",
  addIcon: "Adicionar Ícone",
  addVideo: "Adicionar Vídeo",
  addLaunch: "Adicionar Lançamento",
  deleteIcon: "Remover Ícone",
  deletePage: "Remover Página",
  iconName: "Nome do ícone",
  back: "Voltar",
  cancel: "Cancelar",
  add: "Inserir",
  searchIconMinCaracters: "Busca precisa ter mais de 3 caracteres.",
  url: "URL",
  invalidUrl: "URL inválida",
  colorPicker: "Escolha outra cor",
  deleteComponentConfirmation: "Deseja realmente apagar este componente?",
  deletePageConfirmation: "Deseja realmente apagar esta página?",
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
  scheduleComponentVisibleDate: "Data de lançamento",
  save: "Salvar",
  date: "Data",
  hour: "Hora",
  time: "Horário",
  urlRequired: "URL obrigatória",
  textInComponentRequired: "Obrigatório para um componente de texto",
  imageInComponentRequired: "Escolha uma imagem para seu componente",
  selectAllOptions: "Selecione todas as opcões!",
  videoUrl: "URL do vídeo",
  videoComponentDescription:
    "Seu vídeo ocupará 2 colunas e 2 linhas na sua página",
  youtubeUrlExample: "https://www.youtube.com/embed/Lq2lNYKYpYw",
  youtubeIdExample: "Lq2lNYKYpYw",
  youtubeIdInstructions:
    "Acesse o vídeo do YouTube que você deseja inserir na sua página e copie a URL para cá",
  youtubeVideoId: "ID do video do Youtube",
  clickHere: "Clique aqui",
  step: "Passo",
  share: "Compartilhar",
  understood: "Entendi",
  invalidId: " ID inválido",
  warningPrivatePage: "Esta página não está disponível publicamente.",
  create: "Criar",
  createPage: "Criar Página",
  pageName: "Nome da página",
  pageUrl: "URL da página",
  requiredField: "Campo obrigatório",
  pageUrlExample: "/nome-unico-da-sua-pagina",
  pageUrlBadFormat:
    "URL mal formatada. Necessário conter mais de 3 caracteres e só é permitido letras (sem acento) e hífens, como no exemplo: /minha-pagina",
  launchMessageLabel: "Mensagem",
  launchMessageExample: "para a inauguração da nossa loja",
  launchComponentInstructions:
    "Haverá um cronômetro na sua página, acima de uma mensagem, marcando quanto tempo falta para a data e a hora informada aqui",
  launchDateTimeBeforeToday: "Precisa ser futuro",
  days: "dias",
  hours: "horas",
  minutes: "minutos",
  minutesAbbreviated: "min",
  seconds: "segundos",
  secondsAbbreviated: "seg",
  launchPrefixText: "Restam",
};

// Composed dictionaries

let strings = new LocalizedStrings({
  en,
  pt,
});

export default strings;
