import { VariantProps, cva } from 'class-variance-authority';
import { ChangeEvent, ComponentPropsWithRef, ForwardedRef, forwardRef } from 'react';
import './Checkbox.scss';

const checkboxVariants = cva(['rcl-form-checkox'], {
    variants: {
        color: {
            accent: ['accent'],
            success: ['success'],
            error: ['error'],
            warning: ['warning'],
            inherit: ['inherit'],
        },
        disabled: {
            true: ['disabled'],
            false: [],
        },
    },
    defaultVariants: {
        disabled: false,
        color: 'accent',
    },
});

interface CheckboxProps
    extends Omit<ComponentPropsWithRef<'input'>, 'disabled' | 'color'>,
        VariantProps<typeof checkboxVariants> {
    onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = forwardRef((props: CheckboxProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { color, disabled, className, onCheckedChange, onChange, ...rest } = props;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e);

        onCheckedChange?.(e.target.checked);
    };

    return (
        <input
            {...rest}
            ref={ref}
            type="checkbox"
            disabled={disabled ? disabled : undefined}
            onChange={handleChange}
            className={checkboxVariants({ color, disabled, className })}
        />
    );
});

export default Checkbox;
