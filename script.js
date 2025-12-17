// Variables globales
let grid = [];
let regions = [];
let moveHistory = [];
let soundEnabled = true;
let currentLevel = 0;
let currentGridSize = 6; // Tamaño dinámico del grid
let filteredLevels = []; // Niveles filtrados por tamaño
let availableSizes = []; // Tamaños disponibles
const CELL_STATES = {
    EMPTY: null,
    MARKED: 'marked',
    QUEEN: 'queen'
};

// Nota: Los niveles se cargan desde levels.js

// Elementos del DOM
const gridElement = document.getElementById('grid');
const prevLevelBtn = document.getElementById('prevLevelBtn');
const nextLevelBtn = document.getElementById('nextLevelBtn');
const levelLabel = document.getElementById('levelLabel');
const randomLevelBtn = document.getElementById('randomLevelBtn');
const sizeFilter = document.getElementById('sizeFilter');
const undoBtn = document.getElementById('undoBtn');
const resetBtn = document.getElementById('resetBtn');
const infoBtn = document.getElementById('infoBtn');
const themeBtn = document.getElementById('themeBtn');
const volumeBtn = document.getElementById('volumeBtn');
const messageElement = document.getElementById('message');
const victoryModal = document.getElementById('victoryModal');
const infoModal = document.getElementById('infoModal');
const closeInfoBtn = document.getElementById('closeInfoBtn');
const playAgainBtn = document.getElementById('playAgainBtn');
const closeVictoryBtn = document.getElementById('closeVictoryBtn');

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    initializeSizeFilter();
    initializeGame();
    setupEventListeners();
    loadTheme();
});

// Setup de event listeners
function setupEventListeners() {
    prevLevelBtn.addEventListener('click', previousLevel);
    nextLevelBtn.addEventListener('click', nextLevel);
    randomLevelBtn.addEventListener('click', goToRandomLevel);
    sizeFilter.addEventListener('change', filterLevelsBySize);
    undoBtn.addEventListener('click', undoMove);
    resetBtn.addEventListener('click', resetGame);
    infoBtn.addEventListener('click', () => showModal(infoModal));
    themeBtn.addEventListener('click', toggleTheme);
    volumeBtn.addEventListener('click', toggleVolume);
    closeInfoBtn.addEventListener('click', () => hideModal(infoModal));
    playAgainBtn.addEventListener('click', () => {
        hideModal(victoryModal);
        nextLevel();
    });
    closeVictoryBtn.addEventListener('click', () => hideModal(victoryModal));
}

// Inicializar el juego
function initializeGame() {
    // Cargar el nivel actual para obtener su tamaño
    const levelData = LEVELS[currentLevel % LEVELS.length];
    currentGridSize = levelData.size;
    
    grid = Array(currentGridSize).fill().map(() => Array(currentGridSize).fill(CELL_STATES.EMPTY));
    regions = loadLevel(currentLevel);
    moveHistory = [];
    createGrid();
    updateUndoButton();
    updateLevelLabel();
}

// Actualizar label del nivel
function updateLevelLabel() {
    levelLabel.textContent = `Nivel: ${currentLevel + 1}`;
}

// Cargar un nivel específico
function loadLevel(levelIndex) {
    const levelData = LEVELS[levelIndex % LEVELS.length];
    const levelPattern = levelData.colorRegions;
    const size = levelData.size;
    const regions = Array(size).fill().map(() => Array(size).fill(0));
    
    // Convertir letras a números (A=0, B=1, C=2, etc.)
    const letterToNumber = {};
    let nextNumber = 0;
    
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            const letter = levelPattern[row][col];
            if (!(letter in letterToNumber)) {
                letterToNumber[letter] = nextNumber++;
            }
            regions[row][col] = letterToNumber[letter];
        }
    }
    
    return regions;
}

// Crear la cuadrícula
function createGrid() {
    gridElement.innerHTML = '';
    
    // Establecer el número de columnas dinámicamente
    gridElement.style.gridTemplateColumns = `repeat(${currentGridSize}, 1fr)`;
    
    for (let row = 0; row < currentGridSize; row++) {
        for (let col = 0; col < currentGridSize; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = row;
            cell.dataset.col = col;
            
            // Aplicar color de región
            const regionId = regions[row][col];
            cell.style.backgroundColor = `var(--region-${regionId})`;
            cell.style.opacity = '0.85';
            
            // Agregar el contenido de la celda si existe
            updateCellContent(cell, grid[row][col]);
            
            cell.addEventListener('click', () => handleCellClick(row, col));
            gridElement.appendChild(cell);
        }
    }
}

// Actualizar contenido de una celda
function updateCellContent(cell, state) {
    cell.textContent = '';
    cell.classList.remove('queen', 'marked');
    
    if (state === CELL_STATES.QUEEN) {
        cell.textContent = '👑';
        cell.classList.add('queen');
    } else if (state === CELL_STATES.MARKED) {
        cell.textContent = '✖';
        cell.classList.add('marked');
    }
}

// Manejar clic en celda - Ciclo: vacío → X → 👑 → vacío
function handleCellClick(row, col) {
    // Guardar el estado anterior para el historial
    const previousState = grid[row][col];
    
    // Guardar en el historial
    moveHistory.push({
        row: row,
        col: col,
        previousState: previousState
    });
    
    // Ciclo de estados: null → marked → queen → null
    let newState;
    let soundType;
    
    if (grid[row][col] === CELL_STATES.EMPTY) {
        newState = CELL_STATES.MARKED;
        soundType = 'mark';
    } else if (grid[row][col] === CELL_STATES.MARKED) {
        newState = CELL_STATES.QUEEN;
        soundType = 'place';
    } else {
        newState = CELL_STATES.EMPTY;
        soundType = 'remove';
    }
    
    grid[row][col] = newState;
    
    // Actualizar la visualización
    updateCell(row, col);
    updateUndoButton();
    playSound(soundType);
    
    // Verificar errores
    checkErrors();
    
    // Verificar victoria
    if (checkVictory()) {
        setTimeout(() => {
            showVictory();
        }, 500);
    }
}

// Actualizar una celda específica
function updateCell(row, col) {
    const cellIndex = row * currentGridSize + col;
    const cell = gridElement.children[cellIndex];
    
    // Mantener el color de región
    const regionId = regions[row][col];
    cell.style.backgroundColor = `var(--region-${regionId})`;
    cell.style.opacity = '0.85';
    
    updateCellContent(cell, grid[row][col]);
}

// Deshacer movimiento
function undoMove() {
    if (moveHistory.length === 0) return;
    
    const lastMove = moveHistory.pop();
    grid[lastMove.row][lastMove.col] = lastMove.previousState;
    
    updateCell(lastMove.row, lastMove.col);
    updateUndoButton();
    checkErrors();
    playSound('undo');
}

// Actualizar botón de deshacer
function updateUndoButton() {
    undoBtn.disabled = moveHistory.length === 0;
}

// Reiniciar juego
function resetGame() {
    // Cargar el nivel actual para obtener su tamaño
    const levelData = LEVELS[currentLevel % LEVELS.length];
    currentGridSize = levelData.size;
    
    grid = Array(currentGridSize).fill().map(() => Array(currentGridSize).fill(CELL_STATES.EMPTY));
    regions = loadLevel(currentLevel);
    moveHistory = [];
    createGrid();
    updateUndoButton();
    updateLevelLabel();
    playSound('reset');
}

// Verificar errores
function checkErrors() {
    // Limpiar errores anteriores
    document.querySelectorAll('.cell').forEach(cell => {
        cell.classList.remove('error');
    });
    
    let hasErrors = false;
    
    // Verificar cada reina
    for (let row = 0; row < currentGridSize; row++) {
        for (let col = 0; col < currentGridSize; col++) {
            if (grid[row][col] === CELL_STATES.QUEEN) {
                if (hasQueenError(row, col)) {
                    markCellError(row, col);
                    hasErrors = true;
                }
            }
        }
    }
    
    return !hasErrors;
}

// Verificar si una reina tiene algún error
function hasQueenError(row, col) {
    return isQueenTouching(row, col) || 
           hasMultipleQueensInRow(row) || 
           hasMultipleQueensInColumn(col) || 
           hasMultipleQueensInRegion(row, col);
}

// Verificar si una reina está tocando otra (incluso en diagonal)
function isQueenTouching(row, col) {
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1],  [1, 0],  [1, 1]
    ];
    
    for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;
        
        if (newRow >= 0 && newRow < currentGridSize && newCol >= 0 && newCol < currentGridSize) {
            if (grid[newRow][newCol] === CELL_STATES.QUEEN) {
                return true;
            }
        }
    }
    
    return false;
}

// Verificar si hay múltiples reinas en la misma fila
function hasMultipleQueensInRow(row) {
    let count = 0;
    for (let col = 0; col < currentGridSize; col++) {
        if (grid[row][col] === CELL_STATES.QUEEN) {
            count++;
        }
    }
    return count > 1;
}

// Verificar si hay múltiples reinas en la misma columna
function hasMultipleQueensInColumn(col) {
    let count = 0;
    for (let row = 0; row < currentGridSize; row++) {
        if (grid[row][col] === CELL_STATES.QUEEN) {
            count++;
        }
    }
    return count > 1;
}

// Verificar si hay múltiples reinas en la misma región
function hasMultipleQueensInRegion(row, col) {
    const regionId = regions[row][col];
    let count = 0;
    
    for (let r = 0; r < currentGridSize; r++) {
        for (let c = 0; c < currentGridSize; c++) {
            if (regions[r][c] === regionId && grid[r][c] === CELL_STATES.QUEEN) {
                count++;
            }
        }
    }
    
    return count > 1;
}

// Marcar celda con error
function markCellError(row, col) {
    const cellIndex = row * currentGridSize + col;
    const cell = gridElement.children[cellIndex];
    cell.classList.add('error');
}

// Verificar victoria
function checkVictory() {
    // Contar reinas
    let queenCount = 0;
    for (let row = 0; row < currentGridSize; row++) {
        for (let col = 0; col < currentGridSize; col++) {
            if (grid[row][col] === CELL_STATES.QUEEN) {
                queenCount++;
            }
        }
    }
    
    // Debe haber exactamente N reinas (donde N = tamaño del grid)
    if (queenCount !== currentGridSize) return false;
    
    // Verificar que no haya errores
    if (!checkErrors()) return false;
    
    // Verificar que cada fila tenga exactamente una reina
    for (let row = 0; row < currentGridSize; row++) {
        let rowQueens = 0;
        for (let col = 0; col < currentGridSize; col++) {
            if (grid[row][col] === CELL_STATES.QUEEN) rowQueens++;
        }
        if (rowQueens !== 1) return false;
    }
    
    // Verificar que cada columna tenga exactamente una reina
    for (let col = 0; col < currentGridSize; col++) {
        let colQueens = 0;
        for (let row = 0; row < currentGridSize; row++) {
            if (grid[row][col] === CELL_STATES.QUEEN) colQueens++;
        }
        if (colQueens !== 1) return false;
    }
    
    // Verificar que cada región tenga exactamente una reina
    const regionQueens = Array(currentGridSize).fill(0);
    for (let row = 0; row < currentGridSize; row++) {
        for (let col = 0; col < currentGridSize; col++) {
            if (grid[row][col] === CELL_STATES.QUEEN) {
                regionQueens[regions[row][col]]++;
            }
        }
    }
    
    for (let i = 0; i < currentGridSize; i++) {
        if (regionQueens[i] !== 1) return false;
    }
    
    return true;
}

// Mostrar victoria
function showVictory() {
    document.querySelectorAll('.cell.queen').forEach(cell => {
        cell.classList.add('success');
    });
    
    playSound('victory');
    
    const isLastLevel = currentLevel === LEVELS.length - 1;
    const message = isLastLevel 
        ? '¡Completaste todos los niveles!' 
        : `¡Nivel ${currentLevel + 1} completado!`;
    
    showMessage(message, 'success');
    
    // Actualizar texto del modal
    const victoryText = document.getElementById('victoryText');
    if (victoryText) {
        victoryText.textContent = message;
    }
    
    // Actualizar texto del botón
    const playAgainBtn = document.getElementById('playAgainBtn');
    if (playAgainBtn && isLastLevel) {
        playAgainBtn.textContent = 'Reiniciar desde el Nivel 1';
    }
    
    showModal(victoryModal);
}

// Mostrar mensaje
function showMessage(text, type = '') {
    // Mensajes deshabilitados
}

// Mostrar modal
function showModal(modal) {
    modal.classList.add('show');
}

// Ocultar modal
function hideModal(modal) {
    modal.classList.remove('show');
}

// Alternar tema
function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    playSound('click');
}

// Cargar tema guardado
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
}

// Alternar volumen
function toggleVolume() {
    soundEnabled = !soundEnabled;
    volumeBtn.classList.toggle('muted');
    volumeBtn.querySelector('.icon').textContent = soundEnabled ? '🔊' : '🔇';
    
    if (soundEnabled) {
        playSound('click');
    }
}

// Reproducir sonido
function playSound(type) {
    if (!soundEnabled) return;
    
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    
    const frequencies = {
        'place': 440,
        'remove': 330,
        'mark': 370,
        'undo': 392,
        'reset': 294,
        'start': 523,
        'victory': 659,
        'click': 523
    };
    
    oscillator.frequency.value = frequencies[type] || 440;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.1);
    
    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 0.1);
}

// Inicializar filtro de tamaños
function initializeSizeFilter() {
    // Obtener todos los tamaños únicos de los niveles
    const sizes = new Set();
    LEVELS.forEach(level => sizes.add(level.size));
    availableSizes = Array.from(sizes).sort((a, b) => a - b);
    
    // Poblar el select
    availableSizes.forEach(size => {
        const option = document.createElement('option');
        option.value = size;
        option.textContent = `${size}x${size}`;
        sizeFilter.appendChild(option);
    });
    
    // Inicializar con todos los niveles
    filteredLevels = LEVELS.map((_, index) => index);
}

// Filtrar niveles por tamaño
function filterLevelsBySize() {
    const selectedSize = sizeFilter.value;
    
    if (selectedSize === 'all') {
        filteredLevels = LEVELS.map((_, index) => index);
    } else {
        const size = parseInt(selectedSize);
        filteredLevels = LEVELS.map((level, index) => ({ level, index }))
            .filter(item => item.level.size === size)
            .map(item => item.index);
    }
    
    // Si hay niveles filtrados, ir al primero
    if (filteredLevels.length > 0) {
        currentLevel = filteredLevels[0];
        resetGame();
    } else {
        showMessage('No hay niveles de este tamaño');
    }
}

// Ir a nivel aleatorio
function goToRandomLevel() {
    const levelsToChoose = filteredLevels.length > 0 ? filteredLevels : LEVELS.map((_, i) => i);
    const randomIndex = Math.floor(Math.random() * levelsToChoose.length);
    currentLevel = levelsToChoose[randomIndex];
    resetGame();
    playSound('click');
}

// Navegar al siguiente nivel (respetando el filtro)
function nextLevel() {
    const levelsToUse = filteredLevels.length > 0 ? filteredLevels : LEVELS.map((_, i) => i);
    const currentIndexInFiltered = levelsToUse.indexOf(currentLevel);
    const nextIndex = (currentIndexInFiltered + 1) % levelsToUse.length;
    currentLevel = levelsToUse[nextIndex];
    resetGame();
    playSound('click');
}

// Navegar al nivel anterior (respetando el filtro)
function previousLevel() {
    const levelsToUse = filteredLevels.length > 0 ? filteredLevels : LEVELS.map((_, i) => i);
    const currentIndexInFiltered = levelsToUse.indexOf(currentLevel);
    const prevIndex = currentIndexInFiltered === 0 ? levelsToUse.length - 1 : currentIndexInFiltered - 1;
    currentLevel = levelsToUse[prevIndex];
    resetGame();
    playSound('click');
}
