export function translateColor(color) {
    let res
    switch (color) {
        case "red":
            res = "rgb(205, 0, 0)"
            break
        case "orange":
            res = "rgb(210, 55, 0)"
            break
        case "yellow":
            res = "gold"
            break
        case "green":
            res = "rgb(55, 140, 45)"
            break
        case "blue":
            res = "rgb(0, 100, 195)"
            break
        case "purple":
            res = "rgb(110, 0, 80)"
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