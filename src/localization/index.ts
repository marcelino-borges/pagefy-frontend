import LocalizedStrings from "react-localization";

interface IAnimations {
  bounce: string;
  bounceIn: string;
  bounceInDown: string;
  bounceInLeft: string;
  bounceInRight: string;
  bounceInUp: string;
  bounceOut: string;
  bounceOutDown: string;
  bounceOutLeft: string;
  bounceOutRight: string;
  bounceOutUp: string;
  fadeIn: string;
  fadeInDown: string;
  fadeInDownBig: string;
  fadeInLeft: string;
  fadeInLeftBig: string;
  fadeInRight: string;
  fadeInRightBig: string;
  fadeInUp: string;
  fadeInUpBig: string;
  fadeOut: string;
  fadeOutDown: string;
  fadeOutDownBig: string;
  fadeOutLeft: string;
  fadeOutLeftBig: string;
  fadeOutRight: string;
  fadeOutRightBig: string;
  fadeOutUp: string;
  fadeOutUpBig: string;
  flash: string;
  flip: string;
  flipInX: string;
  flipInY: string;
  flipOutX: string;
  flipOutY: string;
  headShake: string;
  hinge: string;
  jello: string;
  lightSpeedIn: string;
  lightSpeedOut: string;
  pulse: string;
  rollIn: string;
  rollOut: string;
  rotateIn: string;
  rotateInDownLeft: string;
  rotateInDownRight: string;
  rotateInUpLeft: string;
  rotateInUpRight: string;
  rotateOut: string;
  rotateOutDownLeft: string;
  rotateOutDownRight: string;
  rotateOutUpLeft: string;
  rotateOutUpRight: string;
  rubberBand: string;
  shake: string;
  slideInDown: string;
  slideInLeft: string;
  slideInRight: string;
  slideInUp: string;
  slideOutDown: string;
  slideOutLeft: string;
  slideOutRight: string;
  slideOutUp: string;
  swing: string;
  tada: string;
  wobble: string;
  zoomIn: string;
  zoomInDown: string;
  zoomInLeft: string;
  zoomInRight: string;
  zoomInUp: string;
  zoomOut: string;
  zoomOutDown: string;
  zoomOutLeft: string;
  zoomOutRight: string;
  zoomOutUp: string;
}

interface IPlanDetails {
  name: string;
  benefits: string[];
}

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
  uploadBackgroundImage: string;
  chooseEffect: string;
  toggleVisibility: string;
  remove: string;
  duplicate: string;
  viewPage: string;
  addLink: string;
  addIcon: string;
  addVideo: string;
  addLaunch: string;
  deleteIcon: string;
  deleteComponent: string;
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
  deleteIconConfirmation: string;
  deletePageConfirmation: string;
  yes: string;
  no: string;
  or: string;
  and: string;
  chooseFile: string;
  dragAndDropYourImage: string;
  dropYourImageHere: string;
  clickToSearchIt: string;
  fileReadyToUpload: string;
  next: string;
  webSiteExample: string;
  emailExample: string;
  send: string;
  scheduleComponentVisibleDate: string;
  scheduleComponentVisibleDateInstructions: string;
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
  createPageError: {
    pageUrlBadFormat: string;
    cannotContainWhiteSpaces: string;
  };
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
  chooseAnimation: string;
  selectAnOption: string;
  duration: string;
  startDelay: string;
  animation: string;
  animationInstruction: string;
  noAnimation: string;
  repeatInfinitely: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  email: string;
  agreeWith: string;
  privacyPolicy: string;
  termsOfUse: string;
  wishesCommunications: string;
  register: string;
  createYourAccount: string;
  signUp: string;
  signIn: string;
  signIn2: string;
  accessAccount: string;
  passwordRequirements: string;
  requiredPrivacyAccept: string;
  profile: string;
  signOut: string;
  noAccountYet: string;
  alreadyHaveAccount: string;
  couldntFindPage: string;
  authErrors: {
    urlAlreadyExists: string;
    userAlreadyExists: string;
    invalidCredentials: string;
    userNotFound: string;
    weakPassword: string;
    invalidEmail: string;
    passwordMustAttendRequirements: string;
    invalidToken: string;
  };
  generalErrors: {
    unknownError: string;
    errorSignUp: string;
    errorSignIn: string;
    errorSignOut: string;
    internalError: string;
    signUpNotAllowed: string;
  };
  maximumFileSizeOf: string;
  animations: IAnimations;
  recomended: string;
  createNowYour: string;
  bio: string;
  forYourSocialMedia: string;
  landingPage: string;
  forYourProductOrBusiness: string;
  dependOnNoneToReleaseCreativity: string;
  haveAccessToPremiumResources: string;
  differentiate: string;
  plan: string;
  freePlan: IPlanDetails;
  vipPlan: IPlanDetails;
  premiumPlan: IPlanDetails;
  currency: string;
  year: string;
  purchase: string;
  andWinAVipPlanFor: string;
  faq: {
    menu: string;
    title: string;
    description: string;
    stillNeedHelp: string;
  };
  createNowYourPage: string;
  successUpdatePage: string;
  sorry: string;
  pagePreview: string;
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
  image: "Image",
  text: "Text",
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
  uploadBackgroundImage: "Upload background image",
  chooseEffect: "Choose effect",
  toggleVisibility: "Toggle visibility",
  remove: "Remove",
  addLink: "Add Link",
  addIcon: "Add Icon",
  addVideo: "Add Video",
  addLaunch: "Add Launch",
  deleteIcon: "Delete Icon",
  deleteComponent: "Delete Component",
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
  deleteIconConfirmation: "Do you really wish to delete this icon?",
  deletePageConfirmation: "Do you really want to delete this page?",
  yes: "Yes",
  no: "No",
  or: "or",
  and: "and",
  chooseFile: "Choose a file",
  dragAndDropYourImage: "Drag and drop your image here",
  dropYourImageHere: "Drop your image here",
  clickToSearchIt: "Click to search",
  fileReadyToUpload: "File ready to upload",
  next: "Next",
  webSiteExample: "https://www.mywebsite.com",
  send: "Send",
  scheduleComponentVisibleDate: "Schedule visibility",
  scheduleComponentVisibleDateInstructions:
    "Your link will be visible from this date on.",
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
  createPageError: {
    pageUrlBadFormat:
      "Badly formatted URL. It must have more than 3 characters and it's allowed only letters and hyphens, like this: /my-page",
    cannotContainWhiteSpaces: "Cannot contain white spaces",
  },
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
  chooseAnimation: "Choose animation",
  selectAnOption: "Select an option",
  duration: "Duration",
  startDelay: "Start delay",
  animation: "Animation",
  animationInstruction: "Simulation of your component",
  noAnimation: "No animation",
  repeatInfinitely: "Repeat infinitely",
  firstName: "First name",
  lastName: "Last name",
  password: "Password",
  confirmPassword: "Confirm Password",
  email: "Email",
  agreeWith: "Agree with",
  termsOfUse: "Terms",
  privacyPolicy: "Privacy Policies",
  wishesCommunications: "Wish to receive news by email",
  register: "Register",
  createYourAccount: "Create your account",
  signUp: "Sign Up",
  signIn: "Sign In",
  signIn2: "Sign In",
  accessAccount: "Access your account",
  emailExample: "email@example.com",
  passwordRequirements:
    "Password requirements: \n * Minimum 8 characters \n * At least 1 lowercase letter \n * At least 1 number",

  requiredPrivacyAccept: "You must accept terms and privacy to continue.",
  authErrors: {
    urlAlreadyExists: "URl already exists.",
    userAlreadyExists: "User already exists, try another email.",
    invalidCredentials: "Invalid password.",
    userNotFound: "User not found.",
    weakPassword: "Weak password.",
    invalidEmail: "Invalid email",
    passwordMustAttendRequirements:
      "Password must attend minimum requirements.",
    invalidToken: "Authentication error. Try to sign in again.",
  },
  generalErrors: {
    errorSignUp: "Error creating your account.",
    errorSignIn: "Error to sign in.",
    errorSignOut: "Error to sign out.",
    unknownError: "Unknown error.",
    internalError: "Internal error.",
    signUpNotAllowed: "Socialbio isn't available to the public yet.",
  },
  profile: "Profile",
  signOut: "Sign Out",
  noAccountYet: "I have no account",
  alreadyHaveAccount: "I already have an account",
  couldntFindPage: "Couldn't find the page",
  maximumFileSizeOf: "Maximum allowed size of the file is",
  viewPage: "View page",
  duplicate: "Duplicate",
  animations: {
    bounce: "Bounce",
    bounceIn: "Bounce In",
    bounceInDown: "Bounce In Down",
    bounceInLeft: "Bounce In Left",
    bounceInRight: "Bounce In Right",
    bounceInUp: "Bounce In Up",
    bounceOut: "Bounce Out",
    bounceOutDown: "Bounce Out Down",
    bounceOutLeft: "Bounce Out Left",
    bounceOutRight: "Bounce Out Right",
    bounceOutUp: "Bounce Out Up",
    fadeIn: "Fade In",
    fadeInDown: "Fade In Down",
    fadeInDownBig: "Fade In Down Big",
    fadeInLeft: "Fade In Left",
    fadeInLeftBig: "Fade In Left Big",
    fadeInRight: "Fade In Right",
    fadeInRightBig: "Fade In Right Big",
    fadeInUp: "Fade In Up",
    fadeInUpBig: "Fade In Up Big",
    fadeOut: "Fade Out",
    fadeOutDown: "Fade Out Down",
    fadeOutDownBig: "Fade Out Down Big",
    fadeOutLeft: "Fade Out Left",
    fadeOutLeftBig: "Fade Out Left Big",
    fadeOutRight: "Fade Out Right",
    fadeOutRightBig: "Fade Out Right Big",
    fadeOutUp: "Fade Out Up",
    fadeOutUpBig: "Fade Out Up Big",
    flash: "Flash",
    flip: "Flip",
    flipInX: "Flip In X",
    flipInY: "Flip In Y",
    flipOutX: "Flip Out X",
    flipOutY: "Flip Out Y",
    headShake: "Head Shake",
    hinge: "Hinge",
    jello: "Jello",
    lightSpeedIn: "Light Speed In",
    lightSpeedOut: "Light Speed Out",
    pulse: "Pulse",
    rollIn: "Roll In",
    rollOut: "Roll Out",
    rotateIn: "Rotate In",
    rotateInDownLeft: "Rotate In Down Left",
    rotateInDownRight: "Rotate In Down Right",
    rotateInUpLeft: "Rotate In Up Left",
    rotateInUpRight: "Rotate In Up Right",
    rotateOut: "Rotate Out",
    rotateOutDownLeft: "Rotate Out Down Left",
    rotateOutDownRight: "Rotate Out Down Right",
    rotateOutUpLeft: "Rotate Out Up Left",
    rotateOutUpRight: "Rotate Out Up Right",
    rubberBand: "Rubber Band",
    shake: "Shake",
    slideInDown: "Slide In Down",
    slideInLeft: "Slide In Left",
    slideInRight: "Slide In Right",
    slideInUp: "Slide In Up",
    slideOutDown: "Slide Out Down",
    slideOutLeft: "Slide Out Left",
    slideOutRight: "Slide Out Right",
    slideOutUp: "Slide Out Up",
    swing: "Swing",
    tada: "Ta-da!",
    wobble: "Wobble!",
    zoomIn: "Zoom In",
    zoomInDown: "Zoom In Down",
    zoomInLeft: "Zoom In Left",
    zoomInRight: "Zoom In Right",
    zoomInUp: "Zoom In Up",
    zoomOut: "Zoom Out",
    zoomOutDown: "Zoom Out Down",
    zoomOutLeft: "Zoom Out Left",
    zoomOutRight: "Zoom Out Right",
    zoomOutUp: "Zoom Out Up",
  },
  recomended: "Recomended",
  createNowYour: "Create now your",
  bio: "bio",
  forYourSocialMedia: "for your social media",
  landingPage: "landing page",
  forYourProductOrBusiness: "for your product or business",
  dependOnNoneToReleaseCreativity:
    "Release your creativity depending on NOBODY!",
  haveAccessToPremiumResources:
    "Access premium resources with a low investment!",
  differentiate: "Differentiate from the others!",
  plan: "Plan",
  freePlan: {
    name: "Free",
    benefits: [
      "No need for registering credit card",
      "Support",
      "Unlimited components",
      "Scheduled components",
      "Unlimited sharing",
      "Embeded Youtube video",
      "Many types of components layouts",
      "Custom links",
      "Traffic analytics",
      "Fully customizable buttons",
      "Animated buttons",
      "Social media and more icons",
      "Customizable backgrounds",
      "1 page by account",
    ],
  },
  vipPlan: {
    name: "Vip",
    benefits: [
      "3 pages by account",
      "VIP support",
      "Integration with Google Analytics",
      "Integration with Facebook Pixel",
      "No ads",
      "No SocialBio logo",
    ],
  },
  premiumPlan: {
    name: "Platinum",
    benefits: ["Platinum support", "Unlimited pages by account"],
  },
  currency: "U$",
  year: "year",
  purchase: "Purchase",
  andWinAVipPlanFor: "and win a VIP plan for",
  faq: {
    menu: "FAQ",
    title: "Frequent Questions",
    description: "Find here the most common questions people ask.",
    stillNeedHelp: "Do you still need help?",
  },
  createNowYourPage: "Create now your page!",
  successUpdatePage: "Page updated successfully!",
  sorry: "Sorry",
  pagePreview: "Page Preview",
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
  uploadBackgroundImage: "Enviar imagem de fundo",
  chooseEffect: "Escolher efeito",
  toggleVisibility: "Mudar visibilidade",
  remove: "Remover",
  addLink: "Adicionar Link",
  addIcon: "Adicionar Ícone",
  addVideo: "Adicionar Vídeo",
  addLaunch: "Adicionar Lançamento",
  deleteIcon: "Remover Ícone",
  deleteComponent: "Remover Componente",
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
  deleteIconConfirmation: "Deseja realmente apagar este ícone?",
  deletePageConfirmation: "Deseja realmente apagar esta página?",
  yes: "Sim",
  no: "Não",
  or: "ou",
  and: "e",
  chooseFile: "Escolha um arquivo",
  dragAndDropYourImage: "Arraste e solte sua imagem aqui",
  dropYourImageHere: "Solte sua imagem aqui...",
  clickToSearchIt: "Clique para procurar",
  fileReadyToUpload: "Arquivo pronto para enviar",
  next: "Avançar",
  webSiteExample: "https://www.meusite.com",
  send: "Enviar",
  scheduleComponentVisibleDate: "Agendar visibilidade",
  scheduleComponentVisibleDateInstructions:
    "Seu link ficará visível a partir desta data.",
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
  createPageError: {
    pageUrlBadFormat:
      "URL mal formatada. Necessário conter mais de 3 caracteres e só é permitido letras (sem acento) e hífens, como no exemplo: /minha-pagina",
    cannotContainWhiteSpaces: "Não pode haver espaços em branco.",
  },
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
  chooseAnimation: "Escolher animação",
  selectAnOption: "Selecione uma opção",
  duration: "Duração",
  startDelay: "Atraso para iniciar",
  animation: "Animação",
  animationInstruction: "Simulação do seu componente",
  noAnimation: "Nenhuma animação",
  repeatInfinitely: "Repetir infinitamente",
  firstName: "Primeiro nome",
  lastName: "Sobrenome",
  password: "Senha",
  confirmPassword: "Confirmar Senha",
  email: "E-mail",
  agreeWith: "Concordo com os",
  termsOfUse: "Termos de uso",
  privacyPolicy: "Políticas de Privacidade",
  wishesCommunications: "Desejo receber novidades por e-mail",
  register: "Cadastrar",
  createYourAccount: "Crie sua conta",
  signUp: "Cadastrar",
  accessAccount: "Acesse sua conta",
  signIn: "Entre",
  signIn2: "Entrar",
  emailExample: "email@exemplo.com",
  passwordRequirements:
    "Requisitos para a senha: \n * No mínimo 8 caracteres \n * Pelo menos 1 letra minúscula \n * Pelo menos 1 número",

  requiredPrivacyAccept:
    "Você precisa aceitar os termos de uso e as políticas de privacidade para continuar.",
  authErrors: {
    urlAlreadyExists: "URL já existe.",
    userAlreadyExists: "Usuário já existente, tente outro e-mail.",
    invalidCredentials: "Senha incorreta.",
    userNotFound: "Usuário não localizado.",
    weakPassword: "Senha fraca.",
    invalidEmail: "E-mail inválido.",
    passwordMustAttendRequirements:
      "Senha precisa atender aos requisitos mínimos.",
    invalidToken: "Erro de autenticação. Tente entrar novamente.",
  },
  generalErrors: {
    errorSignUp: "Erro ao criar sua conta.",
    errorSignIn: "Erro ao entrar.",
    errorSignOut: "Erro ao sair.",
    unknownError: "Error desconhecido.",
    internalError: "Erro interno.",
    signUpNotAllowed: "Socialbio ainda não está disponível para o público.",
  },
  profile: "Perfil",
  signOut: "Sair",
  noAccountYet: "Ainda não possuo conta",
  alreadyHaveAccount: "Já possuo uma conta",
  couldntFindPage: "Não foi possível localizar a página.",
  maximumFileSizeOf: "Tamanho máximo permitido do arquivo:",
  viewPage: "Visualizar página",
  duplicate: "Duplicar",
  animations: {
    bounce: "Pulo",
    bounceIn: "Pulo entrando",
    bounceInDown: "Pulo entrando para baixo",
    bounceInLeft: "Pulo entrando para a esquerda",
    bounceInRight: "Pulo entrando para a direita",
    bounceInUp: "Pulo entrando para cima",
    bounceOut: "Pulo saindo",
    bounceOutDown: "Pulo saindo para baixo",
    bounceOutLeft: "Pulo saindo para a esquerda",
    bounceOutRight: "Pulo saindo para direita",
    bounceOutUp: "Pulo saindo para cima",
    fadeIn: "Esmaecer entrando",
    fadeInDown: "Esmaecer entrando para baixo",
    fadeInDownBig: "Esmaecer entrando alto para baixo",
    fadeInLeft: "Esmaecer entrando para a esquerda",
    fadeInLeftBig: "Esmaecer entrando de longe para a esquerda",
    fadeInRight: "Esmaecer entrando para a direita",
    fadeInRightBig: "Esmaecer entrando de longe para a direita",
    fadeInUp: "Esmaecer entrando para cima",
    fadeInUpBig: "Esmaecer entrando de longe para cima",
    fadeOut: "Esmaecer saindo",
    fadeOutDown: "Esmaecer saindo para baixo",
    fadeOutDownBig: "Esmaecer saindo para longe abaixo",
    fadeOutLeft: "Esmaecer saindo para a esquerda",
    fadeOutLeftBig: "Esmaecer saindo para longe à esquerda",
    fadeOutRight: "Esmaecer saindo para a direita",
    fadeOutRightBig: "Esmaecer saindo para longe à direita",
    fadeOutUp: "Esmaecer saindo para cima",
    fadeOutUpBig: "Esmaecer saindo para longe acima",
    flash: "Piscar",
    flip: "Virar",
    flipInX: "Virar entrando no eixo X",
    flipInY: "Virar entrando no eixo Y",
    flipOutX: "Virar saindo no eixo X",
    flipOutY: "Virar saindo no eixo Y",
    headShake: "Vibrar",
    hinge: "Cair como junta",
    jello: "Distorcer",
    lightSpeedIn: "Velocidade da luz entrando",
    lightSpeedOut: "Velocidade da luz saindo",
    pulse: "Pulsar",
    rollIn: "Rolar para dentro",
    rollOut: "Rolar para fora",
    rotateIn: "Girar entrando",
    rotateInDownLeft: "Girar para baixo entrando a partir da esquerda",
    rotateInDownRight: "Girar para baixo entrando a partir da direita",
    rotateInUpLeft: "Girar para cima entrando a partir da esquerda",
    rotateInUpRight: "Girar para cima entrando a partir da direita",
    rotateOut: "Girar para fora",
    rotateOutDownLeft: "Girar para baixo saindo para a esquerda",
    rotateOutDownRight: "Girar para baixo saindo para a direita",
    rotateOutUpLeft: "Girar para cima saindo para a esquerda",
    rotateOutUpRight: "Girar para cima saindo para a direita",
    rubberBand: "Efeito elástico",
    shake: "Balançar",
    slideInDown: "Deslizar entrando para a baixo",
    slideInLeft: "Deslizar entrando para a esquerda",
    slideInRight: "Deslizar entrando para a direita",
    slideInUp: "Deslizar entrando para cima",
    slideOutDown: "Deslizar saindo para baixo",
    slideOutLeft: "Deslizar saindo para a esquerda",
    slideOutRight: "Deslizar saindo para a direita",
    slideOutUp: "Deslizar saindo para cima",
    swing: "Dançar",
    tada: "Assustar",
    wobble: "Oscilar forte",
    zoomIn: "Zoom para perto",
    zoomInDown: "Zoom para perto e para baixo",
    zoomInLeft: "Zoom  para perto e para a esquerda",
    zoomInRight: "Zoom para perto e para direita",
    zoomInUp: "Zoom para perto e para cima",
    zoomOut: "Zoom para longe",
    zoomOutDown: "Zoom para longe e para baixo",
    zoomOutLeft: "Zoom para longe e para a esquerda",
    zoomOutRight: "Zoom para longe e para a direita",
    zoomOutUp: "Zoom para longe e para cima",
  },
  recomended: "Recomendado",
  createNowYour: "Crie agora sua",
  bio: "bio",
  forYourSocialMedia: "para suas redes sociais",
  landingPage: "landing page",
  forYourProductOrBusiness: "para seu produto ou negócio",
  dependOnNoneToReleaseCreativity:
    "Dependa de NINGUÉM para liberar sua criatividade!",
  haveAccessToPremiumResources:
    "Tenha acesso a recursos premium por um baixo investimento!",
  differentiate: "Diferencie-se dos outros!",
  plan: "Plano",
  freePlan: {
    name: "Free",
    benefits: [
      "Não precisa cadastrar cartão de crédito",
      "Suporte",
      "Links personalizados",
      "Componentes ilimitados",
      "Componentes publicados com agendamento",
      "Compartilhamento ilimitado",
      "Vídeo do Youtube incorporado",
      "Vários tipos de layout componentes",
      "Estatísticas de tráfego",
      "Botões totalmente personalizáveis",
      "Botões animados",
      "Ícones para redes sociais e mais",
      "Planos de fundo personalizáveis",
      "1 página por conta",
    ],
  },
  vipPlan: {
    name: "Vip",
    benefits: [
      "3 páginas por conta",
      "Suporte VIP",
      "Integração com Google Analytics",
      "Integração com Facebook Pixel",
      "Sem anúncios",
      "Sem a logo do SocialBio",
    ],
  },
  premiumPlan: {
    name: "Platinum",
    benefits: ["Suporte platinum", "Páginas ilimitadas por conta"],
  },
  currency: "R$",
  year: "ano",
  purchase: "Adquirir",
  andWinAVipPlanFor: "e ganhe um plano VIP por",
  faq: {
    menu: "FAQ",
    title: "Perguntas Frequentes",
    description: "Encontre aqui as perguntas mais comuns que as pessoas fazem.",
    stillNeedHelp: "Ainda precisa de ajuda?",
  },
  createNowYourPage: "Faça agora sua bio!",
  successUpdatePage: "Página atualizada com sucesso!",
  sorry: "Desculpe",
  pagePreview: "Pré-visualização da página",
};

// Composed dictionaries

let strings = new LocalizedStrings({
  en,
  pt,
});

export default strings;
