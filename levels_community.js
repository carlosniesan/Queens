// Niveles comunitarios de Queens
// Basados en el repositorio: samimsu/queens-game-linkedin
// Incluye niveles creados por la comunidad

const LEVELS_COMMUNITY = [
    // ========== NIVELES 6x6 ==========
    
    // Nivel 1 - community-level/90
    {
        size: 6,
        colorRegions: [
            ["F", "E", "E", "E", "E", "F"],
            ["D", "D", "F", "F", "D", "D"],
            ["C", "D", "D", "D", "D", "D"],
            ["C", "C", "C", "C", "C", "B"],
            ["A", "A", "B", "B", "B", "B"],
            ["A", "A", "A", "A", "A", "A"]
        ]
    },
    
    // Nivel 2 - community-level/69
    {
        size: 6,
        colorRegions: [
            ["D", "D", "D", "D", "D", "D"],
            ["A", "A", "A", "B", "D", "B"],
            ["A", "C", "C", "B", "D", "B"],
            ["A", "A", "A", "B", "B", "B"],
            ["E", "E", "E", "E", "E", "E"],
            ["E", "E", "E", "E", "E", "F"]
        ]
    },
    
    // Nivel 3 - community-level/167
    {
        size: 6,
        colorRegions: [
            ["F", "A", "B", "A", "B", "D"],
            ["A", "A", "B", "C", "B", "C"],
            ["B", "B", "B", "C", "D", "C"],
            ["A", "C", "C", "C", "D", "E"],
            ["B", "B", "D", "D", "D", "E"],
            ["F", "C", "C", "E", "E", "E"]
        ]
    },
    
    // Nivel 4 - community-level/10
    {
        size: 6,
        colorRegions: [
            ["B", "B", "B", "A", "A", "E"],
            ["B", "B", "B", "A", "A", "E"],
            ["C", "B", "A", "A", "E", "E"],
            ["C", "F", "D", "D", "E", "C"],
            ["C", "F", "F", "D", "C", "C"],
            ["C", "C", "C", "C", "C", "C"]
        ]
    },
    
    // Nivel 5 - community-level/262
    {
        size: 6,
        colorRegions: [
            ["A", "B", "D", "D", "E", "F"],
            ["A", "B", "D", "D", "E", "E"],
            ["A", "B", "C", "D", "E", "D"],
            ["A", "B", "C", "D", "D", "D"],
            ["A", "B", "C", "C", "C", "C"],
            ["B", "B", "B", "B", "B", "B"]
        ]
    },
    
    // ========== NIVELES 7x7 ==========
    
    // Nivel 6 - community-level/63
    {
        size: 7,
        colorRegions: [
            ["C", "C", "A", "B", "B", "B", "B"],
            ["C", "C", "A", "A", "C", "B", "D"],
            ["E", "C", "C", "C", "C", "C", "D"],
            ["E", "E", "D", "D", "D", "D", "D"],
            ["F", "E", "E", "E", "E", "D", "D"],
            ["F", "F", "F", "F", "E", "E", "D"],
            ["G", "G", "G", "F", "F", "E", "D"]
        ]
    },
    
    // Nivel 7 - community-level/91
    {
        size: 7,
        colorRegions: [
            ["A", "F", "F", "F", "F", "F", "F"],
            ["A", "C", "E", "E", "E", "D", "F"],
            ["A", "C", "G", "B", "E", "D", "F"],
            ["A", "C", "G", "B", "E", "D", "F"],
            ["A", "C", "G", "B", "E", "D", "F"],
            ["A", "C", "G", "G", "E", "D", "F"],
            ["A", "A", "A", "A", "A", "A", "A"]
        ]
    },
    
    // Nivel 8 - community-level/293
    {
        size: 7,
        colorRegions: [
            ["F", "F", "F", "F", "F", "F", "F"],
            ["F", "G", "G", "G", "G", "G", "C"],
            ["E", "G", "A", "A", "A", "C", "C"],
            ["E", "E", "B", "B", "A", "C", "C"],
            ["E", "E", "C", "C", "C", "C", "D"],
            ["E", "E", "E", "E", "C", "C", "D"],
            ["E", "E", "E", "E", "D", "D", "D"]
        ]
    },
    
    // Nivel 9 - community-level/79
    {
        size: 7,
        colorRegions: [
            ["A", "A", "A", "A", "A", "A", "A"],
            ["G", "G", "G", "E", "C", "D", "A"],
            ["G", "G", "G", "E", "C", "D", "A"],
            ["F", "F", "E", "E", "C", "D", "A"],
            ["F", "F", "E", "C", "C", "B", "A"],
            ["F", "E", "E", "C", "B", "B", "A"],
            ["F", "F", "F", "C", "B", "B", "A"]
        ]
    },
    
    // Nivel 10 - community-level/196
    {
        size: 7,
        colorRegions: [
            ["A", "A", "B", "B", "B", "C", "C"],
            ["A", "A", "A", "B", "B", "C", "C"],
            ["D", "D", "A", "D", "D", "E", "C"],
            ["D", "D", "D", "D", "D", "E", "E"],
            ["F", "D", "D", "D", "G", "G", "E"],
            ["F", "D", "D", "D", "D", "G", "E"],
            ["F", "F", "F", "D", "D", "G", "G"]
        ]
    },
    
    // ========== NIVELES 11x11 ==========
    
    // Nivel 11 - community-level/6
    {
        size: 11,
        colorRegions: [
            ["E", "E", "E", "E", "E", "B", "B", "I", "A", "A", "A"],
            ["E", "E", "G", "G", "G", "B", "B", "I", "A", "I", "A"],
            ["E", "E", "G", "B", "B", "B", "B", "I", "A", "I", "A"],
            ["E", "E", "E", "I", "I", "B", "B", "I", "I", "I", "A"],
            ["E", "E", "I", "I", "D", "D", "B", "B", "I", "I", "A"],
            ["E", "E", "I", "D", "D", "D", "D", "B", "B", "A", "A"],
            ["E", "I", "I", "I", "D", "D", "H", "H", "B", "B", "A"],
            ["I", "I", "F", "I", "I", "D", "D", "H", "C", "C", "A"],
            ["I", "F", "F", "F", "I", "I", "H", "H", "H", "C", "A"],
            ["F", "F", "F", "J", "J", "I", "I", "C", "C", "C", "A"],
            ["J", "J", "J", "J", "J", "J", "C", "C", "C", "C", "A"]
        ]
    },
    
    // Nivel 12 - community-level/106
    {
        size: 11,
        colorRegions: [
            ["F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F"],
            ["A", "J", "A", "A", "A", "J", "A", "A", "A", "A", "A"],
            ["C", "J", "J", "A", "J", "J", "C", "C", "C", "C", "C"],
            ["C", "J", "B", "J", "B", "J", "C", "C", "C", "C", "C"],
            ["C", "J", "J", "J", "J", "J", "C", "K", "K", "K", "C"],
            ["C", "I", "I", "I", "I", "I", "I", "I", "K", "I", "C"],
            ["C", "J", "J", "J", "J", "J", "C", "K", "K", "K", "C"],
            ["C", "J", "B", "J", "B", "J", "C", "C", "C", "C", "C"],
            ["C", "J", "J", "D", "J", "J", "C", "C", "C", "C", "C"],
            ["E", "J", "D", "D", "D", "J", "E", "E", "E", "E", "E"],
            ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"]
        ]
    },
    
    // Nivel 13 - community-level/269
    {
        size: 11,
        colorRegions: [
            ["A", "A", "A", "A", "B", "C", "C", "C", "C", "C", "C"],
            ["D", "D", "D", "A", "B", "B", "B", "B", "B", "C", "A"],
            ["D", "E", "D", "A", "A", "A", "B", "B", "C", "C", "A"],
            ["D", "E", "E", "E", "E", "A", "A", "A", "A", "C", "A"],
            ["D", "E", "F", "F", "F", "F", "F", "F", "A", "C", "A"],
            ["D", "E", "F", "I", "I", "I", "I", "F", "A", "A", "A"],
            ["D", "E", "F", "F", "F", "F", "F", "F", "A", "G", "A"],
            ["D", "E", "E", "E", "E", "A", "A", "A", "A", "G", "A"],
            ["D", "H", "D", "A", "A", "A", "J", "J", "G", "G", "A"],
            ["D", "D", "D", "A", "J", "J", "J", "J", "J", "G", "A"],
            ["A", "A", "A", "A", "J", "K", "K", "K", "K", "K", "K"]
        ]
    }
];
