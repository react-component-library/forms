import { Dispatch, SetStateAction } from 'react';

export interface SelectOption {
    [key: string]: any;
    label: string;
    value: string | number | readonly string[] | undefined;
    disabled?: boolean;
}

export interface UseFloatingSelectProps {
    open?: boolean;
    setOpen?: Dispatch<SetStateAction<boolean>>;
    offset?: number;
    closeOnScroll?: boolean;
    isTypeaheadEnabled?: boolean;
}
