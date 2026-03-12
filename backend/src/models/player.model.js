const mongoose = require('mongoose');

const VALID_POSITIONS = [
    'GK', 'CB', 'LB', 'RB', 'LWB', 'RWB',
    'CDM', 'CM', 'CAM', 'LM', 'RM',
    'ST', 'CF', 'LW', 'RW'
];

const playerSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true
        },

        name: {
            type: String,
            required: [true, 'El nom és obligatori'],
            trim: true,
            minlength: [2, 'El nom ha de tenir mínim 2 caràcters'],
            maxlength: [50, 'El nom no pot superar els 50 caràcters'],
        },

        position: {
            type: String,
            required: [true, 'La posició és obligatòria'],
            enum: {
                values: VALID_POSITIONS,
                message: `La posició ha de ser una de: ${VALID_POSITIONS.join(', ')}`
            }
        },

        number: {
            type: Number,
            required: [true, 'El dorsal és obligatori'],
            min: [1, 'El dorsal mínim és 1'],
            max: [99, 'El dorsal màxim és 99']
        },

        isInjured: {
            type: Boolean,
            required: true,
            default: false
        },

        birthDate: {
            type: Date,
            required: [true, 'La data de naixement és obligatòria']
        },

        contractEnd: {
            type: Date,
            required: [true, 'La data de fi de contracte és obligatòria'],
            validate: {
                validator: function (value) {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return value >= today;
                },
                message: 'La data de fi de contracte no pot ser anterior a avui'
            }
        },

        teams: {
            type: [String],
            required: [true, 'Ha de tenir almenys un equip'],
            validate: {
                validator: function (arr) {
                    return arr.length > 0;
                },
                message: 'Ha de tenir almenys un equip'
            }
        },

        image: {
            type: String,
            required: [true, 'La imatge és obligatòria'],
            validate: {
                validator: function (url) {
                    return /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(url);
                },
                message: 'La imatge ha de ser una URL vàlida'
            }
        },

        description: {
            type: String,
            required: [true, 'La descripció és obligatòria'],
            minlength: [10, 'La descripció ha de tenir mínim 10 caràcters'],
            maxlength: [2000, 'La descripció no pot superar els 2000 caràcters']
        }
    },
    {
        timestamps: true
    }
);

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
