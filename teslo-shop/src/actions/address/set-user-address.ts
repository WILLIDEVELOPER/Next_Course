"use server";

export const setUserAddress = async () =>{
    try {

    }catch (error) {
        console.log(error)
        return {
            ok: false,
            message: "No se pudo guardar la dirección"
        }
    }
}