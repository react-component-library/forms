import { VariantProps, cva } from 'class-variance-authority';
import { ChangeEvent, ComponentPropsWithRef, ForwardedRef, forwardRef } from 'react';
import './Radio.scss';

const radioVariants = cva(['rcl-form-radio'], {
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

interface RadioProps
    extends Omit<ComponentPropsWithRef<'input'>, 'disabled' | 'color'>,
        VariantProps<typeof radioVariants> {
    onCheckedChange?: (checked: boolean) => void;
}

const Radio = forwardRef((props: RadioProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { color, disabled, className, onCheckedChange, onChange, ...rest } = props;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e);

        onCheckedChange?.(e.target.checked);
    };

    return (
        <input
            {...rest}
            ref={ref}
            type="radio"
            disabled={disabled ? disabled : undefined}
            onChange={handleChange}
            className={radioVariants({ color, disabled, className })}
        />
    );
});

export default Radio;
