import { VariantProps, cva } from 'class-variance-authority';
import {
    Children,
    ComponentPropsWithoutRef,
    ComponentPropsWithRef,
    ForwardedRef,
    forwardRef,
    ReactNode,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
} from 'react';
import { SelectOption, UseFloatingSelectProps } from '../../helpers/types';
import useFloatingSelect from '../../hooks/useFloatingSelect';
import './Select.scss';
import { FloatingFocusManager } from '@floating-ui/react';

const selectVariants = cva(['rcl-form-select'], {
    variants: {
        invalid: {
            true: ['invalid'],
            false: [],
        },
        valid: {
            true: ['valid'],
            false: [],
        },
        disabled: {
            true: ['disabled'],
            false: [],
        },
    },
    defaultVariants: {
        disabled: false,
        invalid: false,
        valid: false,
    },
});

interface MenuProps extends ComponentPropsWithoutRef<'div'>, UseFloatingSelectProps {}

interface MenuItemProps extends ComponentPropsWithoutRef<'div'> {}

interface SelectProps
    extends Omit<ComponentPropsWithRef<'select'>, 'children' | 'disabled'>,
        VariantProps<typeof selectVariants> {
    options?: SelectOption[];
    menuProps?: MenuProps;
    menuItemProps?: MenuItemProps;
    renderOption?: (option: SelectOption) => ReactNode;
}

const Select = forwardRef((props: SelectProps, ref: ForwardedRef<HTMLSelectElement>) => {
    const {
        options,
        menuProps = {},
        menuItemProps = {},
        renderOption,
        invalid,
        valid,
        disabled,
        className,
        ...rest
    } = props;

    const { open, setOpen, offset, closeOnScroll, ...menuRest } = menuProps;

    const {
        context,
        refs,
        optionsRef,
        labelsRef,
        getReferenceProps,
        getFloatingProps,
        getItemProps,
        activeIndex,
        selectedIndexRef,
    } = useFloatingSelect({
        open: open,
        setOpen: setOpen,
        offset: offset,
        closeOnScroll: closeOnScroll,
    });

    useImperativeHandle(ref, () => refs.domReference.current, [refs.domReference]);

    const handleOptionClick = useCallback(
        (value: SelectOption['value']) => {
            const selectElement = refs.domReference.current;

            selectElement.focus();

            // Get option index
            const index = options.findIndex((opt) => opt.value === value);

            if (selectElement.selectedIndex !== index) {
                // Update the <select> element's value
                selectElement.selectedIndex = index;

                // Trigger a change event on the <select> element
                const event = new Event('change', { bubbles: true });
                selectElement.dispatchEvent(event);
            }

            context.onOpenChange(false);
        },
        [context, options, refs.domReference]
    );

    return (
        <>
            <select
                {...rest}
                {...getReferenceProps()}
                ref={refs.setReference}
                disabled={disabled ? disabled : undefined}
                className={selectVariants({ invalid, valid, disabled, className })}
            >
                {options.map((option, i) => (
                    <option hidden key={i} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {context.open && (
                <FloatingFocusManager context={context} modal={false}>
                    <div
                        {...menuRest}
                        {...getFloatingProps()}
                        ref={refs.setFloating}
                        style={{ ...menuRest.style, ...context.floatingStyles }}
                        className={['rcl-form-select-menu', menuRest.className].join(' ')}
                    >
                        {options.map((option, i) => {
                            const isSelected =
                                refs.domReference.current?.value?.toString() === option.value?.toString();

                            if (isSelected) {
                                selectedIndexRef.current = i;
                            }

                            const isActive = activeIndex === i;

                            return (
                                <div
                                    {...menuItemProps}
                                    {...getItemProps({
                                        onClick() {
                                            if (option.disabled) return;

                                            handleOptionClick(option.value);
                                        },
                                        onKeyDown(event) {
                                            if (option.disabled) return;

                                            if (event.key === 'Enter') {
                                                event.preventDefault();
                                                handleOptionClick(option.value);
                                            }
                                        },
                                    })}
                                    key={i}
                                    className={[
                                        'rcl-form-select-menu-item',
                                        isActive ? 'focus' : '',
                                        isSelected ? 'selected' : '',
                                        option.disabled ? 'disabled' : '',
                                        menuItemProps.className,
                                    ].join(' ')}
                                    ref={(node) => {
                                        optionsRef.current[i] = node;
                                        labelsRef.current[i] = option.label;
                                    }}
                                    tabIndex={isActive ? 0 : -1}
                                    aria-selected={isActive && isSelected}
                                    role="option"
                                >
                                    {renderOption ? renderOption(option) : option.value}
                                </div>
                            );
                        })}
                    </div>
                </FloatingFocusManager>
            )}
        </>
    );
});

export default Select;
