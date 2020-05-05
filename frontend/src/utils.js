export function translateColor(color) {
    let res
    switch (color) {
        case "red":
            res = "lightcoral"
            break
        case "orange":
            res = "orange"
            break
        case "yellow":
            res = "yellow"
            break
        case "green":
            res = "greenyellow"
            break
        case "blue":
            res = "lightblue"
            break
        case "purple":
            res = "darkorchid"
            break
        case "pink":
            res = "pink"
            break
        case "black":
            res = "rgb(15, 15, 15)"
            break
        case "white":
            res = "rgb(235, 235, 235)"
            break
        default:
    }
    return res
}