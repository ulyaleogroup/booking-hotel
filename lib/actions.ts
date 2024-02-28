"use server"

import prisma from "@/lib/db"
import { formSchema } from "@/schemas";
import { Room, Gender } from "@prisma/client"
import { z } from "zod";

export const saveData = async (values: z.infer<typeof formSchema>) => {
    const validatedFields = formSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }
    let { namaPemesan, nomorIdentitas, jenisKelamin, tipeKamar, harga, tanggalPesan, durasiMenginap, sarapan, total } = validatedFields.data;
    if (tipeKamar === "STANDARD") {
        harga = 800000
    } else if (tipeKamar === "DELUXE") {
        harga = 1000000
    }else{
        harga = 1200000
    }

    const createData = await prisma.book.create({
        data: {
            namaPemesan,
            nomorIdentitas: parseInt(nomorIdentitas),
            jenisKelamin: jenisKelamin as Gender,
            tipeKamar: tipeKamar as Room,
            harga,
            tanggalPesan,
            durasiMenginap,
            sarapan,
            total,
        }
    })
    // console.log(data);
    console.log(createData);

}