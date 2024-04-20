import { VariantProps, cva } from 'class-variance-authority';
import { ChangeEvent, ComponentPropsWithRef, ForwardedRef, forwardRef } from 'react';
import './Switch.scss';

const switchVariants = cva(['rcl-form-switch'], {
    variants: {
        color: {
            accent: ['accent'],
            success: ['success'],
            error: ['error'],
            warning: ['warning'],
            inherit: ['inherit'],
        },
        disabled: {
            true: ['bg-black/[0.08] opacity-50'],
            false: [],
        },
    },
    defaultVariants: {
        disabled: false,
        color: 'accent',
    },
});

interface SwitchProps
    extends Omit<ComponentPropsWithRef<'input'>, 'disabled' | 'color'>,
        VariantProps<typeof switchVariants> {
    ref?: ForwardedRef<HTMLInputElement>;
    onCheckedChange?: (checked: boolean) => void;
}

const Switch = forwardRef((props: SwitchProps, ref: ForwardedRef<HTMLInputElement>) => {
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
            className={switchVariants({ color, disabled, className })}
        />
    );
});

export default Switch;
