import { MaterialData, MaterialObject } from "kodikwrapper";

export type KodikMaterialData = MaterialData & {
    anime_poster_url?: string;
};

export type KodikMaterialObject = MaterialObject & {
    material_data: KodikMaterialData;
};