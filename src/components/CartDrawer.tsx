"use client";

import React, { useState } from "react";

export interface CartEntry {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  dedication?: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartEntry[];
  onUpdateQty: (id: string, delta: number) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onClearCart,
}: CartDrawerProps) {
  const [dedication, setDedication] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [orderCompleted, setOrderCompleted] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderCompleted(true);
    setTimeout(() => {
      onClearCart();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#110E0C]/60 backdrop-blur-xs transition-opacity"
        onClick={() => {
          setOrderCompleted(false);
          onClose();
        }}
      />

      {/* Drawer Content */}
      <aside className="relative z-10 w-full max-w-md bg-[#F6EFE2] text-[#2E2A27] h-full shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-[#DDD7D0]">
        {/* Header */}
        <div className="p-6 border-b border-[#E2DACB] flex items-center justify-between bg-[#F6EFE2]/95 sticky top-0 z-10 backdrop-blur-sm">
          <div>
            <span className="text-[10px] uppercase tracking-[0.28em] text-[#8C857B] block">
              ENTREGA EXPRESS 30 MIN
            </span>
            <h3 className="font-editorial text-3xl font-medium text-[#2E2A27]">
              Tu Cesta Floral
            </h3>
          </div>
          <button
            onClick={() => {
              setOrderCompleted(false);
              onClose();
            }}
            className="w-9 h-9 bg-white text-[#2E2A27] flex items-center justify-center hover:bg-[#4A443F] hover:text-white transition-colors cursor-pointer"
            aria-label="Cerrar carrito"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex-1 space-y-6">
          {orderCompleted ? (
            <div className="bg-white p-8 text-center space-y-4 border border-[#E2DACB] my-8">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#A8762A]/15 text-[#A8762A] flex items-center justify-center text-2xl">
                ✓
              </div>
              <h4 className="font-editorial text-3xl text-[#2E2A27]">
                ¡Pedido en Preparación!
              </h4>
              <p className="text-sm text-[#7E776E] leading-relaxed">
                Nuestros floristas ya están preparando tu ramo con flores recién
                cortadas. Tu mensajero llegará en menos de{" "}
                <strong className="text-[#2E2A27]">30 minutos</strong>.
              </p>
              {recipientName && (
                <p className="text-xs text-[#A8762A] font-medium">
                  Destinatario: {recipientName}
                </p>
              )}
              <button
                onClick={() => {
                  setOrderCompleted(false);
                  onClose();
                }}
                className="w-full py-3.5 bg-[#4A443F] text-[#F6EFE2] text-xs uppercase tracking-[0.2em] hover:bg-[#2E2A27] transition-colors cursor-pointer"
              >
                Volver a la Tienda
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-20 h-24 mx-auto bg-[#DDD7D0] arch-top flex items-center justify-center text-2xl text-[#4A443F]">
                ✿
              </div>
              <p className="font-editorial text-2xl text-[#2E2A27]">
                Tu cesta está vacía
              </p>
              <p className="text-sm text-[#8C857B] max-w-xs mx-auto">
                Explora nuestra colección de ramos frescos y sorprende hoy mismo
                a tu persona favorita.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 bg-white p-3.5 border border-[#E6DFD3]"
                  >
                    <div className="w-16 h-20 bg-[#F4F4F4] arch-top overflow-hidden flex items-end justify-center shrink-0 pt-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-18 object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-editorial text-xl font-medium text-[#2E2A27] truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-[#A8762A] font-semibold">
                        ${item.price}.00 USD
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => onUpdateQty(item.id, -1)}
                          className="w-6 h-6 bg-[#F6EFE2] text-[#2E2A27] text-xs flex items-center justify-center hover:bg-[#4A443F] hover:text-white transition-colors cursor-pointer"
                        >
                          -
                        </button>
                        <span className="text-xs font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQty(item.id, 1)}
                          className="w-6 h-6 bg-[#F6EFE2] text-[#2E2A27] text-xs flex items-center justify-center hover:bg-[#4A443F] hover:text-white transition-colors cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-right font-editorial text-xl font-semibold text-[#2E2A27]">
                      ${item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              {/* Express Delivery & Dedication Form */}
              <form
                id="checkout-form"
                onSubmit={handleCheckout}
                className="bg-white p-5 border border-[#E6DFD3] space-y-4"
              >
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#A8762A] font-semibold">
                  Personaliza tu Entrega
                </p>
                <div>
                  <label className="block text-xs text-[#6E675F] mb-1">
                    ¿Para quién es este ramo?
                  </label>
                  <input
                    type="text"
                    required
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Ej. Sofía Martínez"
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E2DACB] focus:outline-none focus:border-[#A8762A]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#6E675F] mb-1">
                    Dirección de entrega (Garantía 30 min)
                  </label>
                  <input
                    type="text"
                    required
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Calle, número y colonia..."
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E2DACB] focus:outline-none focus:border-[#A8762A]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#6E675F] mb-1">
                    Mensaje en tarjeta caligrafiada (Gratis)
                  </label>
                  <textarea
                    rows={2}
                    value={dedication}
                    onChange={(e) => setDedication(e.target.value)}
                    placeholder="Escribe aquí tu dedicatoria especial..."
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E2DACB] focus:outline-none focus:border-[#A8762A]"
                  />
                </div>
              </form>
            </>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && !orderCompleted && (
          <div className="p-6 bg-white border-t border-[#E2DACB] space-y-4">
            <div className="flex items-center justify-between text-xs text-[#8C857B]">
              <span>Envío Express Climatizado (30 min)</span>
              <span className="text-[#A8762A] font-medium">GRATIS</span>
            </div>
            <div className="flex items-center justify-between border-t border-[#F0EAE0] pt-3">
              <span className="font-editorial text-2xl text-[#2E2A27]">
                Total Estimado
              </span>
              <span className="font-editorial text-3xl font-semibold text-[#2E2A27]">
                ${subtotal}.00 USD
              </span>
            </div>
            <button
              type="submit"
              form="checkout-form"
              className="w-full py-4 bg-[#4A443F] text-[#F6EFE2] text-xs font-medium uppercase tracking-[0.22em] hover:bg-[#2E2A27] transition-colors cursor-pointer"
            >
              Confirmar Pedido Express →
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
