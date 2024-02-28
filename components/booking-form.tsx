"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, buttonVariants } from "@/components/ui/button";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { useEffect, useState, useTransition } from "react";
import { saveData } from "@/lib/actions";
import { formSchema } from "@/schemas";
import Link from "next/link";

const BookingForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      namaPemesan: "",
      nomorIdentitas: "",
      jenisKelamin: "",
      tipeKamar: "",
      harga: 0,
      tanggalPesan: new Date(),
      durasiMenginap: 1,
      sarapan: false,
      total: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => {
      const valuesWithTotal = {
        ...values,
        total: total, // Gunakan nilai total dari state
      };
      saveData(valuesWithTotal);
    });
  }

  const [hargaPilih, setHarga] = useState(0);
  const [tipeKamar, setTipeKamar] = useState("");
  const [total, setTotal] = useState(0);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // Ketika nilai tipe kamar berubah, perbarui harga sesuai dengan pilihan
    if (tipeKamar === "STANDARD") {
      setHarga(800000);
    } else if (tipeKamar === "DELUXE") {
      setHarga(1000000);
    } else if (tipeKamar === "FAMILY") {
      setHarga(1200000);
    }
  }, [tipeKamar]);

  const handleTipeKamarChange = (value: any) => {
    setTipeKamar(value);
  };

  const handleTotalChange = () => {
    const { tipeKamar, durasiMenginap, sarapan } = form.getValues();

    let totalBayar = 0;
    if (tipeKamar === "STANDARD") {
      totalBayar = 800000 * durasiMenginap;
    } else if (tipeKamar === "DELUXE") {
      totalBayar = 1000000 * durasiMenginap;
    } else if (tipeKamar === "FAMILY") {
      totalBayar = 1200000 * durasiMenginap;
    }
    if (durasiMenginap > 3) {
      totalBayar *= 0.9;
    }
    if (sarapan) {
      totalBayar += 80000;
    }

    setTotal(totalBayar);
  };

  return (
    <div className="max-w-3xl w-full mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Form Booking Kamar</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="namaPemesan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan nama anda" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nomorIdentitas"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor Identitas</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jenisKelamin"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Jenis Kelamin</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="PRIA" />
                          </FormControl>
                          <FormLabel className="font-normal">Pria</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="WANITA" />
                          </FormControl>
                          <FormLabel className="font-normal">Wanita</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tipeKamar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipe Kamar</FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleTipeKamarChange(value);
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Tipe Kamar Anda" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="STANDARD">Standard</SelectItem>
                        <SelectItem value="DELUXE">Deluxe</SelectItem>
                        <SelectItem value="FAMILY">Family</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="harga"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Harga</FormLabel>
                    <FormControl>
                      <Input {...field} disabled value={hargaPilih} />
                    </FormControl>
                    <FormDescription>
                      Selalu nantikan promo menarik dari kami.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tanggalPesan"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Tanggal Pesan</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="durasiMenginap"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Durasi Menginap</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" />
                    </FormControl>
                    <FormDescription>
                      Discount 10% untuk setiap menginap lebih dari 3 hari
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sarapan"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(value) => {
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Termasuk Sarapan</FormLabel>
                      <FormDescription>
                        Breakfast tersedia mulai 07.00 WIB
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="total"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Harga</FormLabel>
                    <FormControl>
                      <div className="flex gap-x-10">
                        <Input {...field} readOnly value={total} />
                        <Button onClick={handleTotalChange} type="button">
                          Hitung
                        </Button>
                      </div>
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Link
            href={"/"}
            className={cn(buttonVariants({ variant: "outline" }), "w-full")}
          >
            Back
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BookingForm;
