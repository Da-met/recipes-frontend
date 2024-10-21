// import axios from "axios"

export const timeProcessing = (time) => {
    // let house = Number(time[12]) + 3
    return ( `${time[11] + time[12] + time[13] + time[14] + time[15] }    ${time[8] + time[9]}.${time[5] + time[6]}.${time[0] + time[1] + time[2] + time[3]} ` )
}


// export const addSavedRecipes = (id, userData) => {       
//     let idAddRecipe = {
//         idAddRecipe: id,
//     }
//     axios.patch(`/add-saved-recipes/${userData}`, idAddRecipe)
// }