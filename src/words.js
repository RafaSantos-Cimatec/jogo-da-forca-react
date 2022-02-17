//Array de palavras.
//Caso não seja digitada uma palavra específica, uma dessas palavras será escolhida aleatoriamente
const words = [
  "amor",
  "alien",
  "afeto",
  "apologia",
  "analogia",

  "bizarro",
  "benevolente",
  "bastardo",
  "banal",
  "beleza",

  "conceito",
  "conserto",
  "cultura",
  "casual",
  "complexo",

  "distinto",
  "desfecho",
  "deboche",
  "democracia",
  "demanda",

  "empatia",
  "expectativa",
  "estigma",
  "escopo",
  "excesso",

  "fato",
  "formal",
  "fundamento",
  "formoso",
  "face",

  "gentil",
  "generosidade",
  "gentileza",
  "garbo",
  "gentalha",

  "hegemonia",
  "hostil",
  "honra",
  "humildade",
  "hediondo",
];

//Retorna elemento aleatório do vetor 'words'
export default function getWord() {
  return words[Math.floor(Math.random() * words.length)];
}
