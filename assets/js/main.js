document.addEventListener('DOMContentLoaded', () => {
    let timerInterval;
    let countdownInterval;
    let currentSeconds = 0;
    let isCountdownRunning = false; // Nueva variable para controlar la cuenta regresiva de cancelación
    let hasCancelled = false; // Nueva variable para controlar si el temporizador fue cancelado
    const timerElement = document.getElementById('timer');
    const startBtn = document.getElementById('start-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const secondsInput = document.getElementById('seconds-input');

    function formatTime(seconds) {
        return seconds.toString().padStart(2, '0');
    }

    function startTimer(seconds) {
        currentSeconds = seconds;
        timerElement.textContent = formatTime(currentSeconds);
        stopCountdown(); // Asegúrate de que la cuenta regresiva de cancelación esté detenida

        timerInterval = setInterval(() => {
            currentSeconds--;
            timerElement.textContent = formatTime(currentSeconds);
            if (currentSeconds <= 0) {
                clearInterval(timerInterval);
                alert('Temporizador terminado');
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    function startCountdown() {
        let countdownSeconds = 20;
        timerElement.textContent = formatTime(countdownSeconds);

        countdownInterval = setInterval(() => {
            countdownSeconds--;
            timerElement.textContent = formatTime(countdownSeconds);
            if (countdownSeconds <= 18) {
                clearInterval(countdownInterval);
                hasCancelled = true; // Marca como cancelado después de mostrar 18
            }
        }, 1000);
    }

    function stopCountdown() {
        clearInterval(countdownInterval);
    }

    function resetTimer() {
        currentSeconds = 20;
        timerElement.textContent = formatTime(currentSeconds);
    }

    startBtn.addEventListener('click', () => {
        const seconds = parseInt(secondsInput.value, 10);
        if (!isNaN(seconds) && seconds >= 0) {
            if (isCountdownRunning) {
                // Continúa la cuenta regresiva desde el punto en el que se detuvo
                startTimer(currentSeconds);
                isCountdownRunning = false;
            } else if (hasCancelled) {
                // Si se ha cancelado, reanuda desde el número real
                startTimer(currentSeconds);
                hasCancelled = false;
            } else {
                // Inicia un nuevo temporizador
                startTimer(seconds);
            }
        }
    });

    cancelBtn.addEventListener('click', () => {
        if (timerInterval) {
            stopTimer();
            startCountdown(); // Inicia la cuenta regresiva desde 20 hasta 18
            isCountdownRunning = true; // Marca que está en cuenta regresiva
        } else if (hasCancelled) {
            resetTimer(); // Reinicia el temporizador si se ha cancelado dos veces
            hasCancelled = false; // Resetea el estado de cancelación
            isCountdownRunning = false; // Resetea el estado de cuenta regresiva
        }
    });
});
