import { VariantProps, cva } from 'class-variance-authority';
import {
    ComponentPropsWithoutRef,
    ComponentPropsWithRef,
    ForwardedRef,
    forwardRef,
    ReactNode,
    useCallback,
    useImperativeHandle,
} from 'react';
import { SelectOption, UseFloatingSelectProps } from '../../helpers/types';
import useFloatingSelect from '../../hooks/useFloatingSelect';
import './Select.scss';

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

interface SelectProps extends Omit<ComponentPropsWithRef<'select'>, 'disabled'>, VariantProps<typeof selectVariants> {
    options: SelectOption[];
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

    const { context, refs, getReferenceProps, getFloatingProps } = useFloatingSelect({
        open: menuProps.open,
        setOpen: menuProps.setOpen,
        offset: menuProps.offset,
        closeOnScroll: menuProps.closeOnScroll,
    });

    useImperativeHandle(ref, () => refs.domReference.current as HTMLSelectElement, [refs.domReference]);

    const handleOptionClick = useCallback(
        (value: SelectOption['value']) => {
            const selectElement = refs.domReference.current;

            selectElement!.focus();

            // Get option index
            const index = options.findIndex((opt) => opt.value === value);

            if (selectElement!.selectedIndex !== index) {
                // Update the <select> element's value
                selectElement!.selectedIndex = index;

                // Trigger a change event on the <select> element
                const event = new Event('change', { bubbles: true });
                selectElement!.dispatchEvent(event);
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
                <div
                    {...menuProps}
                    {...getFloatingProps()}
                    ref={refs.setFloating}
                    style={{ ...menuProps.style, ...context.floatingStyles }}
                    className={['rcl-form-select-menu', menuProps.className].join(' ')}
                >
                    {options.map((option, i) => (
                        <div
                            {...menuItemProps}
                            key={i}
                            className={[
                                'rcl-form-select-menu-item',
                                option.disabled ? 'disabled' : '',
                                refs.domReference.current?.value?.toString() === option.value?.toString()
                                    ? 'active'
                                    : '',
                                menuItemProps.className,
                            ].join(' ')}
                            onClick={option.disabled ? undefined : () => handleOptionClick(option.value)}
                        >
                            {renderOption?.(option) ?? option.value}
                        </div>
                    ))}
                </div>
            )}
        </>
    );
});

export default Select;
