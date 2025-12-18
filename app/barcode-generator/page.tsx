"use client";

import { useState, useRef, useEffect } from "react";
import JsBarcode from "jsbarcode";
import { useReactToPrint } from "react-to-print";

export default function BarcodeGenerator() {
  const [brand, setBrand] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [copies, setCopies] = useState(1);

  const printRef = useRef<HTMLDivElement>(null);

  // 🔒 BARCODE FIX HEIGHT (TIDAK TERPENGARUH PANJANG SKU)
  useEffect(() => {
    if (!sku) return;

    const barcodes =
      document.querySelectorAll<HTMLCanvasElement>("canvas.barcode");

    barcodes.forEach((el) => {
      JsBarcode(el, sku, {
        format: "CODE128",
        width: 1.4, // BAR RAPAT, BUKAN SCALE
        height: 42, // 🔥 FIX ABSOLUTE HEIGHT
        displayValue: false,
        margin: 0,
      });
    });
  }, [sku, copies]);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });

  const rows = Math.ceil(copies / 2);

  return (
    <div className="page">
      {/* ===== SIDEBAR ===== */}
      <div className="sidebar">
        <h2>Barcode Label</h2>

        <label>Product</label>
        <input value={brand} onChange={(e) => setBrand(e.target.value)} />

        <label>SKU</label>
        <input value={sku} onChange={(e) => setSku(e.target.value)} />

        <label>Price</label>
        <input value={price} onChange={(e) => setPrice(e.target.value)} />

        <label>Copies</label>
        <input
          type="number"
          min={1}
          value={copies}
          onChange={(e) => setCopies(Math.max(1, Number(e.target.value)))}
        />

        <button onClick={handlePrint}>PRINT</button>
      </div>

      {/* ===== PREVIEW / PRINT ===== */}
      <div className="preview">
        <div ref={printRef}>
          {Array.from({ length: rows }).map((_, rowIndex) => {
            const left = rowIndex * 2;
            const right = left + 1;

            return (
              <div key={rowIndex} className="row">
                {left < copies && (
                  <Label brand={brand} sku={sku} price={price} />
                )}
                {right < copies && (
                  <Label brand={brand} sku={sku} price={price} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ===== STYLE ===== */}
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
        }

        .page {
          display: flex;
          height: 100vh;
          background: #000;
          color: white;
          font-family: Arial, Helvetica, sans-serif;
        }

        .sidebar {
          width: 280px;
          padding: 20px;
          border-right: 1px solid #222;
        }

        .sidebar h2 {
          margin-bottom: 16px;
        }

        .sidebar label {
          font-size: 12px;
          opacity: 0.7;
        }

        .sidebar input {
          width: 100%;
          margin-bottom: 12px;
          padding: 6px;
          background: #111;
          border: 1px solid #333;
          color: white;
        }

        .sidebar button {
          width: 100%;
          padding: 10px;
          background: white;
          color: black;
          font-weight: bold;
          border: none;
          cursor: pointer;
        }

        .preview {
          flex: 1;
          padding: 20px;
          background: #111;
          overflow: auto;
        }

        /* ===== PRINT LAYOUT ===== */

        .row {
          width: 85mm;
          height: 20mm;
          display: flex;
          gap: 5mm;
          background: white;
          margin-bottom: 6mm;
        }

        .label {
          width: 40mm;
          height: 20mm;
          padding: 1mm;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          color: black;
        }

        .brand {
          text-align: center;
          font-size: 7px;
          font-weight: bold;
          text-transform: uppercase;
          white-space: nowrap;
        }

        canvas.barcode {
          width: 100%;
          height: 10mm; /* VISUAL HEIGHT, BUKAN SCALE */
          display: block;
        }

        .bottom {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        /* SKU */
        .bottom span:first-child {
          font-size: 6px;
          font-weight: bold;
          white-space: nowrap;
  
        }

        /* HARGA */
        .bottom span:last-child {
          font-size: 10px;   /* ← UBAH DI SINI KALO MAU LEBIH BESAR */
          font-weight: 800;
          white-space: nowrap;
        }

        @media print {
          @page {
            size: 85mm 20mm;
            margin: 0;
          }

          html, body {
            margin: 0;
            padding: 0;
            height: auto;
            overflow: hidden;
          }

          .sidebar {
            display: none;
          }

          .preview {
            padding: 0;
            overflow: visible;
            height:auto;
          }

          .row {
            margin: 0;
            break-after: page;
          }

          .row:last-child {
            break-after:auto;
          }
        }
      `}</style>
    </div>
  );
}

/* ===== LABEL COMPONENT ===== */
function Label({
  brand,
  sku,
  price,
}: {
  brand: string;
  sku: string;
  price: string;
}) {
  return (
    <div className="label">
      <div className="brand">{brand || "PRODUCT"}</div>

      {sku ? <canvas className="barcode" /> : null}

      <div className="bottom">
        <span>{sku || "-"}</span>
        <span>{price ? `Rp ${price}` : "-"}</span>
      </div>
    </div>
  );
}
