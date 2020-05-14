module.exports = CARDS = {
    STARTING_CARDS: [
        {
            name: "Wheat Field",
            description: "When a 1 is rolled on anyone's turn, gain a coin",
            color: "blue",
            activation_numbers: [1],
            magnitude: 1,
            symbol: "Wheat",
            quantity: 6
        },
        {
            name: "Bakery",
            description: "When a 2 or 3 is rolled on your turn, gain 1 coin",
            color: "green",
            activation_numbers: [2, 3],
            magnitude: 1,
            symbol: "Bread",
            quantity: 6
        }
    ],
    LANDMARKS: [
        {
            name: "Train Station",
            description: "Roll either 1 or 2 dice",
            color: "orange",
            activation_numbers: [],
            magnitude: null,
            symbol: "Tower",
            quantity: 4
        },
        {
            name: "Shopping Mall",
            description: "Anytime you gain coins from a {Coffee} or {Bread} building, gain 1 extra",
            color: "orange",
            activation_numbers: [],
            magnitude: null,
            symbol: "Tower",
            quantity: 4
        },
        {
            name: "Amusement Park",
            description: "Take another turn if you roll doubles",
            color: "orange",
            activation_numbers: [],
            magnitude: null,
            symbol: "Tower",
            quantity: 4
        },
        {
            name: "Radio Tower",
            description: "Once per turn, you may reroll your dice",
            color: "orange",
            activation_numbers: [],
            magnitude: null,
            symbol: "Tower",
            quantity: 4
        }
    ],
    BASE_GAME_CARDS: [
        // {
        //     name: "",
        //     description: "",
        //     color: "",
        //     activation_numbers: [],
        //     magnitude: 
        //     symbol:
        //     quantity: 
        // },
        {
            name: "Wheat Field",
            description: "When a 1 is rolled on anyone's turn, gain a coin",
            color: "blue",
            activation_numbers: [1],
            magnitude: 1,
            symbol: "Wheat",
            quantity: 6,
            cost: 1
        },
        {
            name: "Ranch",
            description: "When a 2 is rolled on anyone's turn, gain a coin",
            color: "blue",
            activation_numbers: [2],
            magnitude: 1,
            symbol: "Cow",
            quantity: 6,
            cost: 1
        },
        {
            name: "Forest",
            description: "When a 5 is rolled on anyone's turn, gain a coin",
            color: "blue",
            activation_numbers: [5],
            magnitude: 1,
            symbol: "Gear",
            quantity: 6,
            cost: 3
        },
        {
            name: "Mine",
            description: "When a 9 is rolled on anyone's turn, gain 5 coins",
            color: "blue",
            activation_numbers: [9],
            magnitude: 5,
            symbol: "Gear",
            quantity: 6,
            cost: 6
        },
        {
            name: "Apple Orchard",
            description: "When a 10 is rolled on anyone's turn, gain 3 coins",
            color: "blue",
            activation_numbers: [10],
            magnitude: 3,
            symbol: "Wheat",
            quantity: 6,
            cost: 3
        },
        {
            name: "Bakery",
            description: "When a 2 or 3 is rolled on your turn, gain 1 coin",
            color: "green",
            activation_numbers: [2, 3],
            magnitude: 1,
            symbol: "Bread",
            quantity: 6,
            cost: 1
        },
        {
            name: "Convenience Store",
            description: "When a 4 is rolled on your turn, gain 3 coins",
            color: "green",
            activation_numbers: [4],
            magnitude: 3,
            symbol: "Bread",
            quantity: 6,
            cost: 2
        },
        {
            name: "Cheese Factory",
            description: "When a 7 is rolled on your turn, gain 3 coins per {Cow} you own",
            color: "green",
            activation_numbers: [7],
            magnitude: null,
            symbol: "Factory",
            quantity: 6,
            cost: 5
        },
        {
            name: "Furniture Factory",
            description: "When a 8 is rolled on your turn, gain 3 coins per {Gear} building you own",
            color: "green",
            activation_numbers: [8],
            magnitude: null,
            symbol: "Factory",
            quantity: 6,
            cost: 3
        },
        {
            name: "Fruit and Vegetable Market",
            description: "When a 11 or 12 is rolled on your turn, gain 2 coins per {Wheat} building you own",
            color: "green",
            activation_numbers: [11, 12],
            magnitude: null,
            symbol: "Fruit",
            quantity: 6,
            cost: 2
        },
        {
            name: "Cafe",
            description: "When a 3 is rolled on someone else's turn, take 1 coin from them",
            color: "red",
            activation_numbers: [3],
            magnitude: 1,
            symbol: "Cup",
            quantity: 6,
            cost: 2
        },
        {
            name: "Family Restaurant",
            description: "When a 9 or 10 is rolled on someone else's turn, take 2 coins from them",
            color: "red",
            activation_numbers: [9, 10],
            magnitude: 2,
            symbol: "Cup",
            quantity: 6,
            cost: 3
        },
        {
            name: "Stadium",
            description: "When a 6 is rolled on your turn, take 2 coins from all players",
            color: "purple",
            activation_numbers: [6],
            magnitude: 2,
            symbol: "Tower",
            quantity: 4,
            cost: 6
        },
        {
            name: "TV Station",
            description: "When a 6 is rolled on your turn, take 5 coins from any player",
            color: "purple",
            activation_numbers: [6],
            magnitude: null,
            symbol: "Tower",
            quantity: 4,
            cost: 7
        },
        {
            name: "Business Center",
            description: "When a 6 is rolled on your turn, trade a building with any player",
            color: "purple",
            activation_numbers: [6],
            magnitude: null,
            symbol: "Tower",
            quantity: 4,
            cost: 8
        }
    ]
}
    


