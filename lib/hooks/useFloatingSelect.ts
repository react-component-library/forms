import {
    autoUpdate,
    flip as floatingUiFlip,
    hide as floatingUiHide,
    offset as floatingUiOffset,
    shift as floatingUiShift,
    size as floatingUiSize,
    useClick,
    useDismiss,
    useFloating,
    useInteractions,
} from '@floating-ui/react';
import { useControlledState } from '@react-component-library/utils/hooks';
import { useEffect } from 'react';
import { UseFloatingSelectProps } from '../helpers/types';

const useFloatingSelect = (props: UseFloatingSelectProps = {}) => {
    const { open: controlledOpen, setOpen: controlledSetOpen, offset = 0, closeOnScroll = false } = props;

    const [open, setOpen] = useControlledState({
        initialState: false,
        value: controlledOpen,
        setValue: controlledSetOpen,
    });

    const { refs, context, middlewareData } = useFloating<HTMLSelectElement>({
        whileElementsMounted: autoUpdate,
        placement: 'bottom-start',
        middleware: [
            floatingUiOffset(offset),
            floatingUiFlip({ padding: 0 }),
            floatingUiShift({ padding: 0 }),
            floatingUiSize({
                apply: ({ availableWidth, availableHeight, elements }) => {
                    Object.assign(elements.floating.style, {
                        width: `${elements.reference.getBoundingClientRect().width}px`,
                        maxWidth: `${availableWidth}px`,
                        maxHeight: `${availableHeight}px`,
                    });
                },
                padding: 0,
            }),
            floatingUiHide({
                padding: 0,
            }),
        ],
        open: open,
        onOpenChange: setOpen,
    });

    useEffect(() => {
        const hidden = middlewareData.hide?.referenceHidden;

        if (hidden) {
            setOpen(false);
        }
    }, [middlewareData.hide?.referenceHidden, setOpen]);

    const click = useClick(context);

    const dismiss = useDismiss(context, { ancestorScroll: closeOnScroll });

    const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

    return {
        context,
        refs,
        getReferenceProps,
        getFloatingProps,
    };
};

export default useFloatingSelect;
