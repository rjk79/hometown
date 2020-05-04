export function translateColor(color) {
    let res
    switch (color) {
        case "red":
            res = "lightcoral"
            break
        case "blue":
            res = "lightblue"
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