document.addEventListener('DOMContentLoaded', function () {
    const alternativas = document.querySelectorAll('.alternatives p');
    const confirmBtns = document.querySelectorAll('.confirm-btn');
    let selectedAlt = null;
    let currentQuestion = 0;
    const questions = document.querySelectorAll('.question');

    function showNextQuestion() {
        const oldMessage = document.querySelector('.feedback-message');
        if (oldMessage) oldMessage.remove();

        questions[currentQuestion].style.display = 'none';
        currentQuestion++;

        if (currentQuestion < questions.length) {
            questions[currentQuestion].style.display = 'block';
        } else {
            const finalMsg = document.createElement('div');
            finalMsg.className = 'feedback-message';
            finalMsg.textContent = 'Você completou todas as questões!';
            document.body.appendChild(finalMsg);
        }

        selectedAlt = null; // Resetar seleção para a próxima pergunta
    }

    alternativas.forEach(function (alt) {
        alt.addEventListener('click', function () {
            alternativas.forEach(function (p) {
                p.classList.remove('selected');
            });
            alt.classList.add('selected');
            selectedAlt = alt;
        });
    });

    confirmBtns.forEach(function (btn, index) {
        btn.addEventListener('click', function () {
            if (!selectedAlt) {
                showMessage("Por favor, selecione uma resposta.", "warning");
                return;
            }

            if (selectedAlt.dataset.correct === "true") {
                selectedAlt.classList.add('correct');
                showMessage("Resposta Correta!", "success");

                btn.disabled = true;
                btn.textContent = "Resposta Confirmada";

                setTimeout(showNextQuestion, 1500);
            } else {
                selectedAlt.classList.add('incorrect');
                showMessage("Resposta Incorreta! Tente novamente.", "error");
            }
        });
    });

    function showMessage(message, type) {
        const oldMessage = document.querySelector('.feedback-message');
        if (oldMessage) oldMessage.remove();

        const msgDiv = document.createElement('div');
        msgDiv.className = `feedback-message ${type}`;
        msgDiv.textContent = message;
        questions[currentQuestion].appendChild(msgDiv);
    }
});
