const mongoose = require('mongoose');

const VALID_POSITIONS = ['GK', 'DF', 'MF', 'FW'];

const playerSchema = new mongoose.Schema( {
        name: {
            type: String,
            required: [true, 'El nom es obligatori'],
            minlength: [2, 'El nom ha de tenir minim 2 caracteres'],
            maxlength: [50, 'El nom no pot superar els 50 caracteres'],
            trim: true,
        },
        age: {
            type: Number,
            required: [true, 'La edat es obligatoria'],
            min: [15, 'La edat minima es 15'],
            max: [50, 'La edat maxima es 50'],
        },
        isInjured: {
            type: Boolean,
            required: true,
            default: false,
        },
        contractEnd: {
            type: Date,
            required: [true, 'La data de fi de contracte es obligatoria'],
            validate: {
                validator: function (value) {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return value >= today;
                },
                message: 'La data de fi de contracte no pot ser anterior a avui',
            },
        },
        positions: {
            type: [String],
            required: [true, 'Ha de tenir almenys una posició'],
            validate: [
                {
                    validator: function (arr) {
                        return arr.length > 0;
                    },
                    message: 'Ha de tenir almenys una posició',
                },
                {
                    validator: function (arr) {
                        return arr.every((pos) => VALID_POSITIONS.includes(pos));
                    },
                    message: `Les posicions han de ser una de: ${VALID_POSITIONS.join(', ')}`,
                },
            ],
        },
        marketValue: {
            type: Number,
            required: [true, 'El valor de mercat es obligatori'],
            min: [0, 'El valor de mercat no pot ser negatiu'],
        },
        club: {
            type: String,
            required: [true, 'El club es obligatori'],
            minlength: [2, 'El club ha de tenir almenys 2 caracteres'],
            maxlength: [50, 'El club no pot superar 50 caracteres'],
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;