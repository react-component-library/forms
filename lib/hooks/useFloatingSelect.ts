import {
    autoUpdate,
    flip as floatingUiFlip,
    hide as floatingUiHide,
    offset as floatingUiOffset,
    size as floatingUiSize,
    useClick,
    useDismiss,
    useFloating,
    useInteractions,
    useListNavigation,
    useTypeahead,
} from '@floating-ui/react';
import { useControlledState } from '@react-component-library/utils/hooks';
import { useEffect, useRef, useState } from 'react';
import { UseFloatingSelectProps } from '../helpers/types';

const useFloatingSelect = (props: UseFloatingSelectProps = {}) => {
    const {
        open: controlledOpen,
        setOpen: controlledSetOpen,
        offset = 4,
        closeOnScroll = false,
        isTypeaheadEnabled = true,
    } = props;

    const selectedIndexRef = useRef(null);

    const [activeIndex, setActiveIndex] = useState<number>(null);

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
            floatingUiSize({
                apply: ({ availableWidth, availableHeight, elements }) => {
                    Object.assign(elements.floating.style, {
                        width: `${elements.reference.getBoundingClientRect().width}px`,
                        maxWidth: `${availableWidth}px`,
                        maxHeight: `${availableHeight - 8}px`,
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

    const optionsRef = useRef<HTMLDivElement[]>([]);
    const labelsRef = useRef<string[]>([]);

    const listNavigation = useListNavigation(context, {
        listRef: optionsRef,
        activeIndex: activeIndex,
        onNavigate: setActiveIndex,
        selectedIndex: selectedIndexRef.current,
        loop: isTypeaheadEnabled,
    });

    const typeahead = useTypeahead(context, {
        listRef: labelsRef,
        activeIndex: activeIndex,
        selectedIndex: selectedIndexRef.current,
        onMatch: setActiveIndex,
        enabled: isTypeaheadEnabled,
    });

    const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
        listNavigation,
        typeahead,
        click,
        dismiss,
    ]);

    return {
        context,
        refs,
        optionsRef,
        labelsRef,
        getReferenceProps,
        getFloatingProps,
        getItemProps,
        activeIndex,
        setActiveIndex,
        selectedIndexRef,
    };
};

export default useFloatingSelect;
