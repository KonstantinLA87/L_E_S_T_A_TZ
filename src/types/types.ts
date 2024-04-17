// Types
export enum ShipTypes {
    SUBMARINE = "submarine",
    DESTROYER = "destroyer",
    CRUISER = "cruiser",
    BATTLESHIP = "battleship",
    AIRCARRIER = "aircarrier",
}

export type ShipType = ShipTypes
export type TypesFilter = Record<ShipType, boolean>

export interface ShipTypesListItem {
    name: ShipType
    translate: string
}



// Nations
export enum Nations {
    JAPAN = "japan",
    USA = "usa",
    USSR = "ussr",
    GERMANY = "germany",
    UK = "uk",
    FRANCE = "france",
    ASIA = "pan_asia",
    ITALY = "italy",
    COMMON = "commonwealth",
    AMERICA = "pan_america",
    EUROPE = "europe",
    NETHERLANDS = "netherlands",
    SPAIN = "spain",
}

export type Nation = Nations
export type NationsFilter = Record<Nation, boolean>

export interface NationsListItem {
    name: Nation
    translate: string
}



// ShipsData
enum IconSizes {
    SMALL = "small",
    MEDIUM = "medium",
    LARGE = "large",
}

type ShipsDataIcons = Record<IconSizes, string>
type ShipsDataType = Record<string, ShipType>
type ShipsDataNation = Record<string, Nations>

export interface ShipsData {
    name: string
    descriprtion: string | null
    icons: ShipsDataIcons
    level: number
    type: ShipsDataType
    nation: ShipsDataNation
}