
interface CategoryIndex {
    [key: string]: number;
}

interface CategoryLabel {
    [key: string]: string;
}

interface CategoryUnit {
    [key: string]: {
        base: string;
        decimals: number;
    };
}

interface ExtensionRefperiod {
    [key: string]: string;
}

interface DimensionCategory {
    index: CategoryIndex;
    label: CategoryLabel;
    unit?: CategoryUnit;
}

interface DimensionExtension {
    elimination: boolean;
    eliminationValueCode?: string;
    show: string;
    refperiod?: ExtensionRefperiod;
}

interface DimensionLinkDescribedby {
    extension: {
        [key: string]: string;
    };
}

interface Dimension {
    label: string;
    category: DimensionCategory;
    extension: DimensionExtension;
    link?: {
        describedby: DimensionLinkDescribedby[];
    };
}



interface Note {
    [key: string]: string[];
}

interface Role {
    time: string[];
    metric: string[];
}

interface Id {
    [key: string]: string[];
}

interface Size {
    [key: string]: number;
}

interface Source {
    name: string;
    phone: string;
    mail: string;
    raw: string;
}

interface ExtensionPx {
    infofile: string;
    tableid: string;
    decimals: number;
    officialStatistics: boolean;
    aggregallowed: boolean;
    language: string;
    matrix: string;
    subjectCode: string;
}

interface Contact {
    name: string;
    phone: string;
    mail: string;
    raw: string;
}

interface Extension {
    px: ExtensionPx;
    contact: Contact[];
}

interface ApiResponse {
    version: string;
    class: string;
    label: string;
    source: string;
    updated: string;
    note: Note;
    role: Role;
    id: Id;
    size: Size;
    dimension: {
        [key: string]: Dimension;
    };
    extension: Extension;
    value: number[];
}

export type {
    ApiResponse,
    Dimension,
    DimensionCategory,
    DimensionExtension,
    Extension,
    Note,
    Role,
    Size,
    Source,
};
