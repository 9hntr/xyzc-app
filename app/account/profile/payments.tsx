import React from "react";
import { MercadoPago } from "@/app/Components/icons/Mercadopago";
import { Stripe } from "@/app/Components/icons/Stripe";

export const Payments = () => {
  return (
    <div className="w-full px-6">
      <p className="mt-2 text-lg font-semibold text-primary">Payment Methods</p>

      <p className="mt-2 text-sm text-muted-foreground">
        Let your supporters pay using credit or debit cards, Apple Pay, Google
        Pay and more!
      </p>

      <div className="mt-6 flex flex-row items-center justify-center">
        <div className="flex flex-row items-center justify-center">
          <Stripe />
        </div>
        {/* <Button className="rounded-3xl ml-auto px-8">Connect</Button> */}
        <button
          disabled={true}
          className="ml-auto flex items-center justify-center rounded-3xl border-2 border-primary px-6 py-2 text-sm font-semibold text-primary"
        >
          Unavailable
        </button>
      </div>
      <div className="mt-2 flex flex-row items-center justify-center">
        <div className="flex flex-row items-center justify-center">
          <MercadoPago />
        </div>
        {/* <Button className="rounded-3xl ml-auto px-8">Connect</Button> */}
        <button
          disabled={true}
          className="ml-auto flex items-center justify-center rounded-3xl border-2 border-primary px-6 py-2 text-sm font-semibold text-primary"
        >
          Unavailable
        </button>
      </div>
    </div>
  );
};
