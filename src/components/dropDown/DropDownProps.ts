import { LabelWeight } from "../../types/commonTypes";

export interface DropDownItem {
    text: string;
    value: string;
}

export interface DropDownProps {
    items: Array<DropDownItem>;
    selectedChanged?: (value: string) => void;
    selectedValue: string;
    label?: string;
    lblWeight?: LabelWeight;
}