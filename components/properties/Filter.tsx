'use client'
import React from "react";
import regionesComunas from "@/app/properties/portal/regiones-comunas.json";
// import Select, { Option } from "@/components/Select/Select";
import AutoComplete, { Option as AutoOption } from "@/components/AutoComplete/AutoComplete";
import { TextField } from "@/components/TextField/TextField";
import ClpRangeSlider from "./ClpRangeSlider/ClpRangeSlider";
import UfRangeSlider from "./UfRangeSlider/UfRangeSlider";

export default function Filter() {
  // Obtener comunas según la región seleccionada
  const getComunasOptions = () => {
    if (!region) return [];
    const regionData = (regionesComunas as Array<{region: string, comunas: string[]}>).find(r => r.region === region.label);
    if (!regionData) return [];
    return regionData.comunas.map((comuna, idx) => ({ id: idx + 1, label: comuna }));
  };
  const [comuna, setComuna] = React.useState<AutoOption | null>(null);
  // const opciones: Option[] = [
  //   { id: 1, label: "Manzana" },
  //   { id: 2, label: "Banana" },
  //   { id: 3, label: "Naranja" },
  // ];
  // const [selected, setSelected] = React.useState<number | null>(null);

  const operationOptions: AutoOption[] = [
    { id: 1, label: "En venta" },
    { id: 2, label: "En arriendo" },
  ];
  const propertyTypeOptions: AutoOption[] = [
    { id: 1, label: "Casa" },
    { id: 2, label: "Departamento" },
    { id: 3, label: "Terreno" },
  ];
  const regionOptions: AutoOption[] = [
    { id: 1, label: "Arica y Parinacota" },
    { id: 2, label: "Tarapacá" },
    { id: 3, label: "Antofagasta" },
    { id: 4, label: "Atacama" },
    { id: 5, label: "Coquimbo" },
    { id: 6, label: "Valparaíso" },
    { id: 7, label: "Metropolitana de Santiago" },
    { id: 8, label: "O'Higgins" },
    { id: 9, label: "Maule" },
    { id: 10, label: "Ñuble" },
    { id: 11, label: "Biobío" },
    { id: 12, label: "La Araucanía" },
    { id: 13, label: "Los Ríos" },
    { id: 14, label: "Los Lagos" },
    { id: 15, label: "Aysén" },
    { id: 16, label: "Magallanes" },
  ];
  const [operation, setOperation] = React.useState<AutoOption | null>(null);
  const [propertyType, setPropertyType] = React.useState<AutoOption | null>(null);
  const [region, setRegion] = React.useState<AutoOption | null>(null);
  const [testValue, setTestValue] = React.useState("");

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4 py-2">
        <AutoComplete
          options={operationOptions}
          label="Operación"
          placeholder="Operación"
          value={operation}
          onChange={setOperation}
        />
        <AutoComplete
          options={propertyTypeOptions}
          label="Tipo de propiedad"
          placeholder="Tipo de propiedad"
          value={propertyType}
          onChange={setPropertyType}
        />
        <AutoComplete
          options={regionOptions}
          label="Región"
          placeholder="Región"
          value={region}
          onChange={setRegion}
        />
        <AutoComplete
          options={getComunasOptions()}
          label="Comuna"
          placeholder="Comuna"
          value={comuna}
          onChange={setComuna}
        />
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
        <div>
          {/* UF RangeSlider a la izquierda */}
          <UfRangeSlider min={0} max={10000} />
        </div>
        <div>
          {/* CLP RangeSlider a la derecha */}
          <ClpRangeSlider min={0} max={50000000} />
        </div>
      </div>
    </div>
  );
}
