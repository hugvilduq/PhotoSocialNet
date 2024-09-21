'use strict';

function badLanguage(str) {
    if (str.includes("caca") ||
        str.includes("culo") ||
        str.includes("pedo") ||
        str.includes("pis")
    ){
        return 1;
    }
    else{
        return 0;
    }
}

export { badLanguage };