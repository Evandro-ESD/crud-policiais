import { getAll, createPolicial } from "../repository/policiaisRepository";


export const getAllPoliciais = async () => {
    getAll()
}


 let r = await createPolicial()

 console.log(r)