// Inicialização do reconhecimento de voz
const recognition = new webkitSpeechRecognition,
    // Seleção dos elementos HTML relevantes
    startButton = document.querySelector("#start-button"),
    stopButton = document.querySelector("#stop-button"),
    TextFala = document.querySelector(".Falar"),
    TextFalando = document.querySelector(".Falando");

// Configurações do reconhecimento de voz

// Seleção do elemento de seleção de idioma
const languageSelection = document.querySelector("#languageSelection");

// Define a linguagem do reconhecimento de voz com base no valor padrão do elemento de seleção de idioma
recognition.lang = languageSelection.value;

// Adiciona um evento de mudança ao elemento de seleção de idioma
languageSelection.addEventListener("change", () => {
    // Altera a linguagem do reconhecimento de voz para o idioma selecionado
    recognition.lang = languageSelection.value;
});

recognition.continuous = !0;
recognition.interimResults = !0;

// Variável para armazenar o texto transcrito
let finalTranscript = "";

// Função chamada quando há resultados do reconhecimento de voz
recognition.onresult = a => {
    let b = "";
    for (let c = a.resultIndex; c < a.results.length; c++) {
        const d = a.results[c][0].transcript;
        a.results[c].isFinal ? finalTranscript += d + " " : b += d
    }
    // Atualização do texto transcrito no elemento HTML
    document.querySelector("#final").innerHTML = finalTranscript + b
},
// Evento de clique no botão de iniciar
document.querySelector("#start-button").addEventListener("click", () => {
    // Inicia o reconhecimento de voz
    recognition.start(),
    // Alterações de estilo dos botões e textos
    startButton.style.transition = "all 0.8s",
    stopButton.style.transition = "all 0.8s",
    startButton.style.display = "none",
    stopButton.style.display = "block",
    TextFala.style.display = "none",
    TextFalando.style.display = "block"
}),
// Evento de clique no botão de parar
document.querySelector("#stop-button").addEventListener("click", () => {
    // Para o reconhecimento de voz
    recognition.stop(),
    // Alterações de estilo dos botões e textos
    startButton.style.transition = "all 0.8s",
    stopButton.style.transition = "all 0.8s",
    stopButton.style.display = "none",
    startButton.style.display = "block",
    TextFala.style.display = "block",
    TextFalando.style.display = "none"
}),
// Evento de clique no botão de limpar
document.querySelector("#clear-button").addEventListener("click", () => {
    // Limpa o texto transcrito
    finalTranscript = "",
    // Atualiza o elemento HTML com o texto vazio
    document.querySelector("#final").innerHTML = finalTranscript
}),
// Evento de clique no botão de copiar
document.querySelector("#copy-button").addEventListener("click", () => {
    // Copia o texto transcrito para a área de transferência
    navigator.clipboard.writeText(finalTranscript),
    // Exibe um alerta informando que o texto foi copiado
    alert("Texto copiado para a área de transferência!")
}),
// Evento de clique no botão de iniciar (para exibir o botão de parar)
startButton.addEventListener("click", () => {
    stopButton.style.display = "block"
});
