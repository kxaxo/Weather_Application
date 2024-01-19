let string = "<>wdad"

let i = 0;
let check_is_found = false
const check_list = ["<", ">", "'", "-"]
while (i < check_list.length) {
    if (string.search(check_list[i]) !== -1) {
        check_is_found = true
        console.log("error")
        break
    } else {
        i++;
    }
}