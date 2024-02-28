import { z } from "zod";

export const formSchema = z.object({
    namaPemesan: z.string().min(1, {
      message: "nama harus di isi",
    }),
    nomorIdentitas: z
      .string()
      .min(16, {
        message: "isian salah..data harus 16 digit",
      })
      .max(16, { message: "isian salah..data harus 16 digit" }),
    jenisKelamin: z.string().min(1, {
      message: "jenis kelamin harus di isi",
    }),
    tipeKamar: z.string().min(1, {
      message: "tipe kamar harus di isi",
    }),
    harga: z.coerce.number(),
    tanggalPesan: z.date(),
    durasiMenginap: z.coerce
      .number()
      .gte(1, { message: "durasi menginap harus di isi format angka" }),
    sarapan: z.boolean().default(false),
    total: z.coerce.number(),
  });